import path from 'path'
// import {createServer} from 'http'
import { createServer as createHttpsServer } from 'https'
import { fileURLToPath } from 'url'
import { BD } from './js/BD.js'
import { Servicios } from './js/Servicios.js'
import { Requisicion } from './js/Requisicion.js'
import { createReadStream, existsSync, readFileSync } from 'fs'
import { setInterval } from 'timers'
import Archivos from './js/Archivos.js'

// Archivos del certificado y la clave
const options = {
	key: readFileSync('ssl/key.pem'),
	cert: readFileSync('ssl/cert.pem')
}

class Server {
	constructor() {
		createHttpsServer(options, (req, res) => req.method == "GET" ? this.GET(req, res) : this.POST(req, res)).
			listen(443, '127.0.0.1', () => {
				console.clear()
				console.info("Servidor HTTPS a la escucha en el puerto 443")
			})
		this.servicios = new Servicios()
		this.archivos = new Archivos()
	}

	GET(requisicion, respuesta) {
		// const url = requisicion.url == '/' ? './index.html' : requisicion.url // Para cuando teclean localhost

		let url = requisicion.url
		let ruta

		if(url === 'altas_test')
			ruta = './test/altas_test.html'
		else if (url === '/') {
			ruta = '/index.html'; // Si la URL es la raíz, redirige a index.html
		} else if (url === '/dashboard') {
			ruta = './dashboard.html' // Si la URL es /dashboard, utiliza dashboard.html
		} else if (url === '/altas') {
			ruta = './altas.html' // Si la URL es /altas, utiliza altas.html
		} else if (url === '/bajas') {
			ruta = './bajas.html' // Si la URL es /bajas, utiliza bajas.html
		} else if (url === '/consultas') {
			ruta = './consultas.html' // Si la URL es /consultas, utiliza consultas.html
		} else if (url === '/cambios') {
			ruta = './cambios.html' // Si la URL es /cambios, utiliza dashboard.html
		} else if (url.startsWith('/uploads/')) {
			// Si la URL empieza con /uploads/, dirige a la carpeta uploads
			ruta = `.${url}`; 
		} else {
			ruta = `.${url}` // De lo contrario, construye la ruta usando la URL directamente
		}

		if (ruta === undefined) {
			this.mostrarError404(respuesta)
			return
		}

		const archivo = fileURLToPath(import.meta.url) // Archivo meta (el que se está ejecutando)
		const directorio = path.dirname(archivo) // Recupero mi directorio base
		// const ruta = path.join(directorio, url) // Ruta absoluta del recurso solicitado
		const rutaCompleta = path.join(directorio, ruta);

		if (existsSync(rutaCompleta)) {
			const flujo = createReadStream(rutaCompleta, 'UTF-8'),
				extension = this.extension(ruta).toLowerCase()

			respuesta.writeHead(200, { 'Content-Type': this.contentType(extension) })
			if (this.esArchivoBinario(extension)) respuesta.end(readFileSync(rutaCompleta), 'binary')
			flujo.pipe(respuesta) // Respuesta fragmentada al cliente (chunk)
		}
		else {
			// respuesta.writeHead(404, {'Content-Type': this.contentType("txt")})
			// respuesta.end("404 Error: Archivo no encontrado")
			this.mostrarError404(respuesta)
		}
	}

	async POST(requisicion, respuesta) {
		if (requisicion.url === '/upload') {
			this.archivos.handleUpload(requisicion, respuesta)
		} else if (requisicion.url === '/delete') {
            // Manejo de la eliminación de archivos
            let data = ''
            requisicion.on('data', chunk => data += chunk);
            requisicion.on('end', () => {
                const { filename } = JSON.parse(data)
                this.archivos.deleteFile(filename, respuesta)
            })
        } else if (requisicion.url === '/rename') {
            // Manejo del renombrado de archivos
            let data = ''
            requisicion.on('data', chunk => data += chunk)
            requisicion.on('end', () => {
                const { currentName, newName } = JSON.parse(data)
                this.archivos.renameFile(currentName, newName, respuesta)
            })
        } else {
			let data = ""

			global.DB = new BD("CONFIGURACION")
			requisicion.on('data', chunk => data += chunk) // Datos llegando, se está armando la requisición
			requisicion.on('end', () => { // No hay más datos, la requisición ya está armada
				const solicitud = new Requisicion(this.esJSON(data)) // Espero un dato json, verifico

				// ver en la consola
				console.log(solicitud)

				if (solicitud.ok && this.servicios[solicitud.servicio]) { // ¿Solicitud bien formada y es legal?
					let intervalo = setInterval(() => {
						if (DB.configuracion) {
							const funcion = this.servicios[solicitud.servicio](solicitud)

							funcion.then((r) => {
								respuesta.writeHead(200, { 'Content-Type': this.contentType("json") })
								respuesta.end(JSON.stringify(r))
							}).catch((error) => { console.error("Ocurrio un error", error) });
							clearInterval(intervalo)
						}
					}, 100)
				} else {
					respuesta.writeHead(404, { 'Content-Type': this.contentType("txt") })
					respuesta.end("Servicio desconocido o formato de datos incorrecto")
				}
			})
		}
	}

	extension(archivo) {
		return archivo.slice((archivo.lastIndexOf(".") - 1 >>> 0) + 2)
	}

	contentType(extension) {
		switch (extension) {
			case "png": return 'image/png'
			case "jpg": return 'image/jpeg'
			case "ico": return 'image/x-icon'
			case "css": return 'text/css; charset=UTF-8'
			case "txt": return 'text/plain; charset=UTF-8'
			case "html": return 'text/html; charset=UTF-8'
			case "js": return 'text/javascript; charset=UTF-8'
			case 'pdf': return 'application/pdf; charset=UTF-8'
		}
		return 'text/plain'
	}

	esJSON(texto) {
		try { return JSON.parse(texto) }
		catch (e) { return false }
	}

	esArchivoBinario(extension) {
		return ["png", "jpg", "ico", "pdf"].indexOf(extension) >= 0
	}

	// ERROR 404
	mostrarError404(respuesta) {
		const archivoError404 = './404.html'

		if (existsSync(archivoError404)) {
			const flujo = createReadStream(archivoError404, 'UTF-8')

			respuesta.writeHead(404, { 'Content-Type': this.contentType("html") })
			flujo.pipe(respuesta)
		} else {
			respuesta.writeHead(404, { 'Content-Type': this.contentType("txt") })
			respuesta.end("404 Error: Archivo no encontrado")
		}
	}
}
new Server()
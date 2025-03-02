class altas {
	constructor(reset = false) {
		if (reset) {
			window.ajax = new Ajax()
			window.vista = new altas_ui()
			window.controlador = new altas()
			window.ui = new UI()
			window.archcam = new ARCH_CAM_MODAL()

			this.constantes()
			this.configuracion()
		}
	}

	llamarmodal() {
		archcam.generarModal()
	}

	async constantes() {
		const servicio = { servicio: "CONSTANTES" }

		try {
			let respuesta = await ajax.post(servicio)
			respuesta = JSON.parse(respuesta)

			window.DG = {} // Creo el objeto global de las constantes
			for (const constante of respuesta.resultado)
				DG[constante.constante] = constante.valor
		}
		catch (e) {
			//SWEET
			vista.mensaje("error", "ERROR CONSTANTES", "Ocurrió un error en obtener las Constantes, vuelva a intentarlo", e)
		}
	}

	configuracion() {
		const intervalo = setInterval(async () => {
			if (window.hasOwnProperty("DG")) {
				try {
					let configuracion = [], respuesta
					const servicio = { servicio: "CONFIGURACION" }

					clearInterval(intervalo)
					respuesta = await ajax.post(servicio)
					respuesta = JSON.parse(respuesta)
					if (respuesta.ok == DG.CONSULTA_EXITOSA) {
						const campos = respuesta.resultado

						//TODO: MANEJO DE LA SESION
						if (sessionStorage.getItem("autenticado")) {
							console.log("SESION: ", sessionStorage.getItem("autenticado"))

							// Borro los campos inactivos o que no se consideran en esta vista
							for (const campo in campos)
								if (campos[campo] == DG.CAMPO_INACTIVO || !vista.esElemento(campo))
									delete campos[campo]
								else configuracion.push(campo)

							// Conservo la configuración en global
							window.CONFIGURACION = configuracion

							// Solicito a la vista que se actualice
							vista.configuracion()

							// Si es necesario, consulto los géneros
							if (CONFIGURACION.includes("genero")) this.generos()

						} else {
							// alert("No has iniciado sesión")
							// window.location.replace("index.html")

							console.log("SESION: ", sessionStorage.getItem("autenticado"))

							// Borro los campos inactivos o que no se consideran en esta vista
							for (const campo in campos)
								if (campos[campo] == DG.CAMPO_INACTIVO || !vista.esElemento(campo))
									delete campos[campo]
								else configuracion.push(campo)

							// Conservo la configuración en global
							window.CONFIGURACION = configuracion

							// Solicito a la vista que se actualice
							vista.configuracion()

							// Si es necesario, consulto los géneros
							if (CONFIGURACION.includes("genero")) this.generos()

							// Configuracion de la vista para invitado
							// vista.contenedor.removeChild(vista.menu)
							vista.nombreUsuario.innerText = "INVITADO"
							// vista.desplegable.disabled = true
							// vista.logo.removeAttribute("href")
							vista.encabezado.innerText = "Registrarse"
						}
					}
					else { throw DG.CONSULTA_FALLIDA }

				} catch (e) {
					//SWEET
					vista.mensaje("error", "ERROR CONFIGURACIÓN", "Ocurrió un error en la configuración, vuelva a intentarlo", e)
				}
			}
		}, 100)
	}

	cerrarSesion() {
		// Eliminar el estado de autenticación de sessionStorage
		sessionStorage.removeItem("usuario")
		sessionStorage.removeItem("loggedIn")
		// this.configuracion()
		window.location.replace("/")
	}

	async generos() {
		let servicio = { servicio: "CONSULTAS_CATALOGO", catalogo: "generos" }

		try {
			let respuesta = await ajax.post(servicio)
			respuesta = JSON.parse(respuesta)
			if (respuesta.ok == DG.CONSULTA_EXITOSA) vista.generos(respuesta.resultado)
			else throw DG.CONSULTA_FALLIDA
		}
		catch {
			//SWEET 
			vista.mensaje("error", "ERROR EN GÉNEROS", "Ocurrió un error, vuelva a intentarlo")
		}
	}

	validar(datos) {
		for (const campo of CONFIGURACION) {
			switch (campo) {
				case "nombre":
				case "pApellido":
				case "sApellido":
				case "nacimiento":
				case "login":
				case "pwd":
					// case "foto": 
					if (datos[campo] == "") return false
					break
				case "genero": if (parseInt(datos[campo]) == DG.INDEFINIDO) return false
					break
			}
		}
		return true
	}

	//TODO: ALTAS
	async procesar(datos) {
		// Preparo datos para el envío
		datos["servicio"] = "ALTAS"
		datos["genero"] = parseInt(datos["genero"])

		// Ya que no jala en la validacion, lo pongo aquí
		if (datos["foto"] == "") datos["foto"] = "ND"

		console.log("DATOS: ", datos)

		try {
			let respuesta = await ajax.post(datos)
			respuesta = JSON.parse(respuesta)
			console.log(respuesta)
			if (!respuesta.ok) throw DG.ALTA_FALLIDA
			else {
				if (!controlador.esImagenBase64(datos["foto"])) {
					console.log("No es imagen, por lo tanto, es documento")

					let archivo = archcam.consultarArchivoCargado()
					const nombreSinExtension = controlador.quitarExtension(archivo)

					if(datos["login"] != nombreSinExtension)
						console.log("El archivo recien cargado no coincide con el login")
						archcam.eliminarArchivo(archivo)
				}

				vista.mensaje("success", "ÉXITO", "Registro exitoso")
			}
		}
		catch (e) {
			//SWEET
			vista.mensaje("error", "ERROR", "Error al procesar el alta")
		}
	}

	esImagenBase64(base64String) {
		if (!base64String) return false

		var regex = /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/=]+$/;
		return regex.test(decodeURIComponent(base64String))
	}

	quitarExtension(archivo) {
		const indicePunto = archivo.lastIndexOf('.')
		if (indicePunto === -1) return archivo  // Si no hay punto, no hay extensión
		return archivo.substring(0, indicePunto)
	}
}

window.onload = () => new altas(true)
class cambios {
	constructor(reset = false) {
		if (reset) {

			window.ajax = new Ajax()
			window.vista = new cambios_ui()
			window.controlador = new cambios()
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

							//Ejecuta el motodo de consultar informacion almacenada para los Cambios
							if (sessionStorage.getItem("EditID") != "" || sessionStorage.getItem("EditID") != null)
								this.procesar_consulta_id(sessionStorage.getItem("EditID"))

						} else {
							//SWEET
							vista.mensaje("question", "Autenticación", "No has iniciado sesión")

							setTimeout(() => {
								window.location.replace("/")
							}, 3000)
						}
					}
					else { throw DG.CONSULTA_FALLIDA }

				} catch {
					//SWEET
					vista.mensaje("error", "ERROR CONFIGURACIÓN", "Ocurrió un error en la configuración, vuelva a intentarlo")
				}
			}
		}, 100)
	}

	cerrarSesion() {
		// Eliminar el estado de autenticación de sessionStorage
		sessionStorage.removeItem("usuario")
		sessionStorage.removeItem("autenticado")
		this.configuracion()
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

	validar_cambio(datos) {
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
				case "id": if (datos[campo] == "") return false
					break
			}
		}
		return true
	}

	//TODO: CAMBIOS
	async procesar_cambio(datos) {
		// Preparo datos para el envío
		datos["servicio"] = "CAMBIOS"
		datos["genero"] = parseInt(datos["genero"])

		// Ya que no jala en la validacion, lo pongo aquí
		if (datos["foto"] == "") datos["foto"] = "ND"

		try {
			let respuesta = await ajax.post(datos)
			respuesta = JSON.parse(respuesta)
			console.log(respuesta)
			if (!respuesta.ok) throw DG.CAMBIO_FALLIDO
			else {
				if (!controlador.esImagenBase64(datos["foto"])) {
					console.log("No es imagen, por lo tanto, es documento")

					let archivo = archcam.consultarArchivoCargado()
					const nombreSinExtension = controlador.quitarExtension(archivo)

					if(datos["login"] != nombreSinExtension)
						console.log("El archivo recien cargado no coincide con el login")
						archcam.eliminarArchivo(archivo)
				}

				vista.mensaje("success", "ÉXITO", "Registro modificado")
			}
		}
		catch (e) {
			//SWEET
			vista.mensaje("error", "ERROR", "Error al procesar la modificacion")
		}
	}

	//TODO: CAMBIOS
	async procesar_consulta_id(id) {
		//Preparamiento de los datos
		const datos = { servicio: "CONSULTAS_ID", id: id }

		try {
			let respuesta = await ajax.post(datos)
			respuesta = JSON.parse(respuesta)
			if (!respuesta.ok) throw DG.CONSULTA_FALLIDA
			else {
				console.log(respuesta)
				//LLenar Formulario
				vista.llenarFormulario(respuesta.resultado)
				//Borrar los datos despues de usarlos
				this.borarDatosTemp()
			}
		}
		catch (error) {
			//SWEET
			vista.mensaje("error", "ERROR", "Error al procesar la consulta ", error)
			this.borarDatosTemp()
		}
	}

	borarDatosTemp() {
		sessionStorage.removeItem("EditID")
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

window.onload = () => new cambios(true)
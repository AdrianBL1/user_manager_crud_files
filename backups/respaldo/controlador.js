class Controlador {
	constructor(reset = false){
		if(reset){
			this.camaras = []
			this.getCamaras()
		}
	}

	// Cargo el array de cámaras disponibles
	async getCamaras() {
		const dispositivos = await navigator.mediaDevices.enumerateDevices()

		for(const dispositivo of dispositivos)
			if(dispositivo.kind === "videoinput")
				this.camaras.push(dispositivo)
	}

	//TODO: ALTAS
	async procesar(datos) {
		// Preparo datos para el envío
		console.log("DATOS: ", datos)
	}
}
document.addEventListener('DOMContentLoaded', function() {
	window.controladorCamaras = new Controlador(true)
})
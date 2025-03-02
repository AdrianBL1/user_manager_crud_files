class Vista{
	constructor(){
		this.videocamaras = document.querySelector("#videocamaras")
		this.video = document.querySelector("#video")
		this.image = document.querySelector("#iconoFoto > img")
		this.imageText = document.querySelector("#imageText")
		this.iconoFoto = document.querySelector("#iconoFoto")
		this.canvas = document.querySelector("#canvas")
		this.fotoBase64 = "ND"
		this.foto = document.querySelector("#foto-contenedor > img")
		this.activa = 0

		// Este atributo es falso, no debería de existir
		this.fotoRecuperada = "ND"

		this.procesar_alta = document.querySelector("#procesar_alta")
		this.recuperar_foto = document.querySelector("#recuperar_foto")

		this.cargarSelectCamaras()
		this.fijarEventos()
	}

	_getUserMedia() {
		return (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments)
	}

	fijarEventos(){
		this.iconoFoto.addEventListener("click", this.tomarFoto)
		this.procesar_alta.addEventListener("click", this.procesar_click)
		this.recuperar_foto.addEventListener("click", this.recuperar_foto_click)
	}

	// Carga el select de las cámaras
	cargarSelectCamaras() {
		let nCamara = 1
		const c = this.videocamaras,
			op = document.createElement("option")

		c.innerHTML = ""
		op.text = "Seleccione una cámara"; op.value = '0'; c.appendChild(op)
		let intervalo = setInterval(()=>{
			if(controladorCamaras.hasOwnProperty("camaras")){
				for(const camara of controlador.camaras) {
					const o = document.createElement('option')
		
					o.text = camara.label ? camara.label : "Cámara " + nCamara
					o.value = camara.deviceId
					c.appendChild(o)
				}
				clearInterval(intervalo)
			}
		}, 250)

		c.addEventListener('change', (e) => {
			if(this.video.srcObject)
				this.video.srcObject.getTracks().forEach(track => track.stop())
			this.activa = c.value
			if(c.value != '0') vistaCamaras.mostrarVideo(c.value) // Mostrar el nuevo flujo
			else vistaCamaras.video.srcObject = null

			if (!e.target.selectedIndex) vistaCamaras.imageText.removeAttribute("disabled")
			else {
				// UI.image.value = ""
				vistaCamaras.imageText.value = ""
				vistaCamaras.imageText.setAttribute("disabled", "disabled")
			}
		})
	}

	// Muestra el flujo de video obtenido
	async mostrarVideo(idDeDispositivo) {
		await vista._getUserMedia ({ video: { deviceId: idDeDispositivo } },
			streamObtenido => {
				vistaCamaras.video.srcObject = streamObtenido
				vistaCamaras.video.play()
			},
			error => console.log("Permiso denegado o error: ", error)
		);
	}

	// Captura y muestra una foto
	tomarFoto(){
		const video = vista.video,
			canvas = vista.canvas,
			contexto = canvas.getContext("2d") // Obtengo contexto canvas y dibujo

		video.pause(); // Pauso la reproducción de video
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
		vistaCamaras.fotoBase64 = canvas.toDataURL(); // Convierte el contenido de canvas a Base64
		video.play(); // Reactivo la reproducción de video
	}

	getBase64(file) {
		// La instancia de img creada por el constructor descargará la imagen inmediatamente después de asignar el valor src. En comparación con createElement () creando <img>, guarda append (), lo que evita la redundancia y contaminación del documento
		const img = new Image(320, 240);

		img.src = URL.createObjectURL(file); // Lo convertimos a un objeto de tipo objectURL y a la fuente de la imagen le ponemos el objectURL
		img.addEventListener("load", () =>  this.drawImage(img));
	}

			drawImage(img) {
				const canvas = vistaCamaras.canvas,
					  contexto = canvas.getContext("2d") // Obtengo contexto canvas y dibujo

				canvas.width = img.width, // Hay que asegurar que el tamaño del canvas sea el mismo que el de la imagen
				canvas.height = img.height;

				contexto.drawImage(img, 0, 0, canvas.width, canvas.height); // Dibuja la imagen en el lienzo

				this.fotoBase64 = canvas.toDataURL(); // Convertir imagen a dataURL
			}

	apagarCamaras() {
		if(this.video && this.video.srcObject)
			this.video.srcObject.getTracks().forEach(track => track.stop())
		if(this.video && this.video.srcObject)
			this.video.srcObject = null;
	}

	procesar_click(e) {
		// console.log(vista.recuperar())
		controladorCamaras.procesar(vista.recuperar())
	}

	recuperar_foto_click(e){
		vistaCamaras.foto.src = vistaCamaras.fotoBase64
	}

	recuperar(...args) {
		let d = {"servicio":"ALTAS"};

		if(!args.length) args.push("*");
		for(let arg of args) {
			if(arg == "*" || arg == "nombre") d.usuario = "Jorge Mario";
			if(arg == "*" || arg == "pApellido") d.pApellido = "Figueroa";
			if(arg == "*" || arg == "sApellido") d.sApellido = "García";
			if(arg == "*" || arg == "nacimiento") d.nacimiento = "2000-12-06";
			if(arg == "*" || arg == "genero") d.genero = 1;
			if(arg == "*" || arg == "login") d.login = "FIGJ701019HVZG" + this.intRandom(0, 10000)
			if(arg == "*" || arg == "pwd") d.pwd = "123";

			// Recupero la foto y codifico para enviar al server
			if(arg == "*" || arg == "foto") d.foto = encodeURIComponent(vistaCamaras.fotoBase64);

			// Las siguientes instrucciones se deben borrar
			if(vistaCamaras.fotoRecuperada == "ND")
				vistaCamaras.fotoRecuperada = vistaCamaras.fotoBase64

		}
		return d;
	}

	// Genera un entero a 4 dígitos con ceros a la izquierda
	intRandom(min, max) {
		let aleatorio = Math.random() * (max - min) + min;

		aleatorio = Math.trunc(aleatorio)
		return aleatorio.toString().padStart(4, '0')
	}	
}
document.addEventListener('DOMContentLoaded', function() {
    window.vistaCamaras = new Vista()
})


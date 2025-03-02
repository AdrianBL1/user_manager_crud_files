class altas_ui {
	constructor() {
		this.body = document.body
		this.elementos = ["nombre", "pApellido", "sApellido", "nacimiento", "genero", "login", "pwd", "foto"]
	}

	esElemento(elemento){
		return this.elementos.includes(elemento)
	}

	configuracion() {
		// Config. Header
		const header = document.createElement("header")
		this.body.appendChild(header)

		// Crear Contenedor
		this.header = document.querySelector("header")

		//NUEVA NAVBAR
		this.header.append(ui.div({class:["navbar"]}))
		this.navbar = document.querySelector(".navbar")
		
		//LOGO
		this.navbar.append(ui.div({class: ["logo"]}))
		this.logo = document.querySelector(".logo")
		this.logo.append(ui.imagen({src: "favicon.ico", alt: "Logo"}))
		this.logo.append(ui.ancla({ href: "#", text: "CRUD"}))

		//NAV
		this.navbar.append(ui.div({class: ["menu"]}))
		this.menu = document.querySelector(".menu")
		this.menu.append(ui.ancla({ href: "/dashboard", text: "Dashboard"}))
		this.menu.append(ui.ancla({ href: "/altas", text: "Altas"}))
		this.menu.append(ui.ancla({ href: "/bajas", text: "Bajas"}))
		this.menu.append(ui.ancla({ href: "/cambios", text: "Cambios"}))
		this.menu.append(ui.ancla({ href: "/consultas", text: "Consultas"}))

		//PERFIL
		this.navbar.append(ui.div({class:["perfil"]}))
		this.perfil = document.querySelector(".perfil")
		this.perfil.append(ui.div({class:["contenido-perfil"]}))
		this.contenidoPerfil = document.querySelector(".contenido-perfil")
		this.contenidoPerfil.append(ui.parrafo({id:"nombreUsuario", text: sessionStorage.getItem("usuario")}))
		this.nombreUsuario = document.querySelector("#nombreUsuario")
		this.contenidoPerfil.append(ui.imagen({id:"fotoPerfil", src: "img/user.png", alt: "Usuario"}))
		this.perfil.append(ui.div({class:["desplegable"]}))
		this.desplegable = document.querySelector(".desplegable")
		// this.desplegable.append(ui.ancla({ href: "/perfil", text: "Perfil"}))
		// this.desplegable.append(ui.ancla({ href: "#", text: "Configuraciones"}))
		// this.desplegable.append(ui.ancla({ href: "#", text: "Ayuda"}))
		this.desplegable.append(ui.ancla({ href: "#", text: "Cerrar Sesión", id:"cerrarSesion"}))
		this.cerrarSesion = document.querySelector("#cerrarSesion")
		this.navbar.append(ui.div({id:"toggleMenu", class:["menu-toggle"]}))
		this.menuToggle = document.querySelector("#toggleMenu")
		this.menuToggle.append(ui.div({}))
		this.menuToggle.append(ui.div({}))
		this.menuToggle.append(ui.div({}))

		// Crear contenedor de contenido principal
		this.body.append(ui.div({ class: ["contenedor", "contenido-principal"] }))
		this.contenido_principal = document.querySelector(".contenido-principal")

		// Agregal elementos del contenido principal
		this.contenido_principal.append(ui.div({ class: ["altas-barra"] }))
		this.altas_barra = document.querySelector(".altas-barra")
		this.altas_barra.append(ui.encabezado(2, {id:"encabezado", text: "Agregar nuevo Usuario" }))
		this.encabezado = document.querySelector("#encabezado")

		// Crear Formulario
		try{
			this.contenido_principal.append(ui.form({id:"formulario", class:["formulario"]}))
		} catch (Error) {
			vista.mensaje(Error)
		}

		// Config. Formulario
		this.formulario = document.querySelector("#formulario")
		const fieldset = document.createElement("fieldset")
		this.formulario.appendChild(fieldset)
		this.fieldset = document.querySelector("fieldset")
		this.fieldset.append(ui.legend({text:"LLENA TODOS LOS CAMPOS"}))
		this.fieldset.append(ui.div({class:["contenedor-campos"]}))
	
		this.contenedor_campos = document.querySelector(".contenedor-campos")

		for (const campo of CONFIGURACION) {
			switch(campo) {
				case "nombre": {
					this.contenedor_campos.append(ui.div({class:["campo"]}))
					this.campo = document.querySelector(".campo:last-child")
					this.campo.append(ui.label({text:"Nombre:"}))
					this.campo.append(ui.input({id:"nombre", type:"text", placeholder:"Nombre", class:["input-text"]}))}
				break
				case "pApellido": {
					this.contenedor_campos.append(ui.div({class:["campo"]}))
					this.campo = document.querySelector(".campo:last-child")
					this.campo.append(ui.label({text:"Primer Apellido:"}))
					this.campo.append(ui.input({id:"pApellido", type:"text", placeholder:"Apellido", class:["input-text"]}))
				}
				break
				case "sApellido": {
					this.contenedor_campos.append(ui.div({class:["campo"]}))
					this.campo = document.querySelector(".campo:last-child")
					this.campo.append(ui.label({text:"Segundo Apellido:"}))
					this.campo.append(ui.input({id:"sApellido", type:"text", placeholder:"Segundo apellido", class:["input-text"]}))
				}
				break
				case "nacimiento": {
					this.contenedor_campos.append(ui.div({class:["campo"]}))
					this.campo = document.querySelector(".campo:last-child")
					this.campo.append(ui.label({text:"Nacimiento:"}))
					this.campo.append(ui.input({id:"nacimiento", type:"date", class:["input-text"]}))
				}
				break
				case "genero": {
					this.contenedor_campos.append(ui.div({class:["campo"]}))
					this.campo = document.querySelector(".campo:last-child")
					this.campo.append(ui.label({text:"Género:"}))
					this.campo.append(ui.select({id:"genero", class:["input-text"]}))
				}
				break
				case "login": {
					this.contenedor_campos.append(ui.div({class:["campo"]}))
					this.campo = document.querySelector(".campo:last-child")
					this.campo.append(ui.label({text:"Login:"}))
					this.campo.append(ui.input({id:"login", type:"text", placeholder:"Login", class:["input-text"]}))
				}
				break
				case "pwd": {
					this.contenedor_campos.append(ui.div({class:["campo"]}))
					this.campo = document.querySelector(".campo:last-child")
					this.campo.append(ui.label({text:"Contraseña:"}))
					this.campo.append(ui.input({id:"pwd", type:"password", placeholder:"Contraseña", class:["input-text"]}))
				}
				break
				case "foto": {
					this.contenedor_campos.append(ui.div({class:["campo"]}))
					this.campo = document.querySelector(".campo:last-child")
					this.campo.append(ui.label({text:"Foto:"}))
					// this.campo.append(ui.input({id:"foto", type:"text", placeholder:"Foto", class:["input-text"]}))

					this.campo.append(ui.input({ id: "abrirModal", type:"button", value: "Agregar Foto" }))
					this.campo.append(ui.input({id: "foto", type: "hidden"}))
					this.abrirModal = document.querySelector("#abrirModal")
					this.generarModal()
				}
				break
			}

			// Creo el atributo en la vista
			this[campo] = document.querySelector("#" + campo)
		}

		// Agrego el botón de procesar (Se muestra u oculta automáticamente)
		this.Procesar()

		this.body.append(ui.footer({ html: "<p>© 2024 Adrian BL - <span>CRUD: User Manager</span></p>" }))
	}

	Procesar() {
		this.menuToggle.addEventListener("click", this.toggleMenu)

		// Cierre de sesion
		this.cerrarSesion.addEventListener("click", this.cerrarSesion_click)
		
		// Creo el control
		this.fieldset.append(ui.div({class:["contenedor-boton","flex"]}))
		this.contenedor_boton = document.querySelector(".contenedor-boton")
		this.contenedor_boton.append(ui.button({id:"limpiar", text:"Limpiar"}))
		this.contenedor_boton.append(ui.input({id:"procesar_alta", type:"button", value: "Registrar", class:["oculto"]}))

		// Creo el atributo en la vista
		this.limpiar = document.querySelector("#limpiar")
		this.procesar_alta = document.querySelector("#procesar_alta")

		// Fijo el evento click
		this.limpiar.addEventListener("click", this.limpiar_click)
		this.procesar_alta.addEventListener("click", this.procesar_click)

		// Un monitor para la validación automática
		setInterval(() => {
			const datos = this.recuperar()

			if(controlador.validar(datos)) this.procesar_alta.classList.remove("oculto")
			else this.procesar_alta.classList.add("oculto")

		}, 500)
	}

	toggleMenu(){
		const menu = document.querySelector('.navbar .menu');
        const perfil = document.querySelector('.perfil')
        if (menu.style.display === 'flex') {
            menu.style.display = 'none';
            perfil.style.display = 'none';
        } else {
            menu.style.display = 'flex';
            perfil.style.display = 'flex'
        }
	}

	generarModal(){
		controlador.llamarmodal()
	}

	procesar_click(e) {
		controlador.procesar(vista.recuperar())
	}

	limpiar_click(e){
		e.preventDefault()
		this.form.reset()
	}

	generos(datos){
		let indefinida = document.createElement("option")

		indefinida.value = DG.INDEFINIDO
		indefinida.text = "Elija un género"
		this.genero.add(indefinida)

		for (const genero in datos){
			let option = document.createElement("option")

			option.value = datos[genero].genero 
			option.text = datos[genero].descripcion
			this.genero.add(option)
		}
	}

	cerrarSesion_click(e) {
		alert("cerrar sesion")
		// controlador.cerrarSesion()
	}

	recuperar() {
		let datos = {}

		for (const campo of CONFIGURACION)
			if(this[campo])
				datos[campo] = this[campo].value
		return datos
	}

	mensaje(icono,titulo,texto){
		// alert(texto)
		// TODO: ALTERNATIVA SWEETALERT
		// Se agregaron parametros (icono, titulo y texto)
		Swal.fire({
			icon: icono,
			title: titulo,
			text: texto,
		})
	}
}
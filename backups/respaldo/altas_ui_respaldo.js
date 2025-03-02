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

					// this.campo.append(ui.input({id:"foto", type:"text", placeholder:"Foto", class:["input-text"]}))
					
					// TODO: MODAL
					this.campo.append(ui.input({ id: "abrirModal", type:"button", value: "Agregar Foto" }))
					this.campo.append(ui.input({id: "foto", type: "hidden"}))
					this.abrirModal = document.querySelector("#abrirModal")

					this.body.insertAdjacentHTML("afterend",
					`<div id="modal" class="modal">
						<div class="modal-contenido">
						
							<span class="close">&times;</span>
							<h3>Agrega Foto o Identificación</h3>
							
							<div class="tabs-content">
								<div class="tabs">
									<a id="tab1" name="foto" href="#tab1">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
											stroke="#9D9D9D" fill="none" stroke-linecap="round" stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
											<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
										</svg>
										Foto
									</a>
									<a id="tab2" name="archivo" href="#tab2">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
											stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5
														6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5">
											</path>
										</svg>
										Archivos
									</a>
								</div>
							</div>
							<div class="tab-content-wrapper">
								<div id="tab1-content" class="tab-content">
									<div id="contenedor">
										<div class="agrupaciones">
											<h3>Fotografía</h3>
											<article class="agrupacion">
												<div id="duplaVideocamara" class="duplaColumna">
													<label for="videocamaras">Videocámara</label>
													<select id="videocamaras"></select>
												</div>
											</article>
											<article class="flex-space-around">
												<video muted="muted" id="video"></video>
												<div id="iconoFoto">
													<img src="img/camara.svg" class="camara" title="Tomar fotografía"></img>
												</div>
												<canvas id="canvas"></canvas>
											</article>
											<div id="foto-contenedor" class="agrupacion-columna">
												<img src="" alt="Foto recuperada">
											</div>
										</div>
										<button id="procesar_alta">ALTA</button>
										<button id="recuperar_foto">RECUPERAR FOTO</button>
									</div>
								</div>
								<div id="tab2-content" class="tab-content">
									<form class="dropzone-box">
										<h2>Cargar y adjuntar archivos</h2>
										<p>
											Adjuntar archivos a este proyecto
										</p>
										<div class="dropzone-area">
											<div class="file-upload-icon">
												<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
													stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
													stroke-linejoin="round">
													<path stroke="none" d="M0 0h24v24H0z" fill="none" />
													<path d="M14 3v4a1 1 0 0 0 1 1h4" />
													<path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
												</svg>
											</div>
											<p>Haga clic para cargar o arrastre y suelte</p>
											<input type="file" required id="upload-file" name="uploaded-file">
											<p class="message">No Files Selected</p>
										</div>
										<div class="dropzone-actions">
											<button type="reset">
												Cancelar
											</button>
											<button id="submit-button" type="submit">
												Guardar
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>`
					)
				}
				break
			}

			// Creo el atributo en la vista
			this[campo] = document.querySelector("#" + campo)
		}

		// Agrego el botón de procesar (Se muestra u oculta automáticamente)
		this.Procesar()

		this.body.append(ui.footer({ html: "<p>Adrian Basilio López - <span>Desarrollo Web Avanzado</span></p>" }))
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

		// Evento de abrir modal imagen
		this.abrirModal.addEventListener("click", this.abrirModal_click)

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

	procesar_click(e) {
		controlador.procesar(vista.recuperar())
	}

	abrirModal_click(e){
		modal.style.display = "block";
		vista.Modal()
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

	// TODO: MANEJO DEL MODAL
	Modal(){
		const modal 		= document.querySelector("#modal")
        const closeModal 	= document.querySelector(".close")

        closeModal.addEventListener("click", () => {
            modal.style.display = "none"
        })

        window.addEventListener("click", (event) => {
            if (event.target == modal) {
                modal.style.display = "none"
            }
        })

		this.Tabs()
	}

	Tabs(){
		const tabs = document.querySelectorAll(".tabs a");
        const tabContents = document.querySelectorAll(".tab-content");

            tabs.forEach(tab => {
                tab.addEventListener("click", function (event) {
                    event.preventDefault();

                    // Remove active class from all tabs
                    tabs.forEach(t => t.classList.remove("active"));

                    // Remove active class from all tab contents
                    tabContents.forEach(content => content.classList.remove("tab-content--active"));

                    // Add active class to the clicked tab
                    this.classList.add("active");

                    // Get the target content and add active class
                    const targetContent = document.querySelector(this.getAttribute("href") + "-content");
                    targetContent.classList.add("tab-content--active");
                });
            });

            // Activate the first tab and content by default
            tabs[0].classList.add("active");
            tabContents[0].classList.add("tab-content--active");
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
class ARCH_CAM_MODAL {
    constructor() {
        this.camaras = []
        this.getCamaras()
        this.archvioAgregado
    }

    generarModal() {
        vista.body.insertAdjacentHTML("afterend",
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
                                        <div class="duplaColumna">
                                            <label for="">Subir archivo</label>
                                            <input type="text" id="imageText" placeholder="Click para seleccionar" readonly="readonly">
                                        </div>
                                    </article>
                                    <article class="flex-space-around">
                                        <video muted="muted" id="video"></video>
                                        <div id="iconoFoto">
                                            <div class="camara">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-cog" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3" />
                                                    <path d="M14.973 13.406a3 3 0 1 0 -2.973 2.594" />
                                                    <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                    <path d="M19.001 15.5v1.5" />
                                                    <path d="M19.001 21v1.5" />
                                                    <path d="M22.032 17.25l-1.299 .75" />
                                                    <path d="M17.27 20l-1.3 .75" />
                                                    <path d="M15.97 17.25l1.3 .75" />
                                                    <path d="M20.733 20l1.3 .75" />
                                                </svg>
                                            </div>
                                            <p>Tomar Fotografía</p>
                                        </div>
                                        <canvas id="canvas"></canvas>
                                    </article>
                                </div>
                                <br><hr>
                                <button id="procesar_alta">GUARDAR FOTO</button>
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
                                    <input type="file" accept=".pdf,.doc,.docx,.txt" required id="upload-file" name="uploaded-file">
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

        this.crearAtributosCamara()
        this.cargarSelectCamaras()
        this.fijarEventos()

        this.documentos()
    }

    crearAtributosCamara() {
        // TODO: ATRBUTOS PARA LA CAMARA 
        this.videocamaras = document.querySelector("#videocamaras")
        this.video = document.querySelector("#video")
        this.image = document.querySelector("#iconoFoto > img")
        this.imageText = document.querySelector("#imageText")
        this.iconoFoto = document.querySelector("#iconoFoto")
        this.canvas = document.querySelector("#canvas")
        this.fotoBase64 = "ND"
        this.foto = document.querySelector("#foto-contenedor > img")
        this.activa = 0

        this.procesar_alta = document.querySelector("#procesar_alta")
    }

    _getUserMedia() {
        return (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments)
    }

    fijarEventos() {
        // Evento de abrir modal imagen
        vista.abrirModal.addEventListener("click", this.abrirModal_click)

        // Eventos de la camara
        this.iconoFoto.addEventListener("click", this.tomarFoto)
        this.procesar_alta.addEventListener("click", this.procesar_click)
    }

    // TODO: MODAL
    abrirModal_click(e) {
        const modalE = document.querySelector("#modal")
        modalE.style.display = "block"
        archcam.ventanaModal()
    }

    ventanaModal() {

        const modal = document.querySelector("#modal")
        const closeModal = document.querySelector(".close")

        closeModal.addEventListener("click", () => {
            modal.style.display = "none"
        })

        window.addEventListener("click", (event) => {
            if (event.target == modal) {
                modal.style.display = "none"
            }
        })

        this.tabs()
    }

    tabs() {
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

    // TODO: CAMARAS
    // Carga el select de las cámaras
    cargarSelectCamaras() {
        let nCamara = 1
        const c = this.videocamaras,
            op = document.createElement("option")

        c.innerHTML = ""
        op.text = "Seleccione una cámara"; op.value = '0'; c.appendChild(op)
        let intervalo = setInterval(() => {
            if (this.hasOwnProperty("camaras")) {
                for (const camara of this.camaras) {
                    const o = document.createElement('option')

                    o.text = camara.label ? camara.label : "Cámara " + nCamara
                    o.value = camara.deviceId
                    c.appendChild(o)
                }
                clearInterval(intervalo)
            }
        }, 250)

        c.addEventListener('change', (e) => {
            if (this.video.srcObject)
                this.video.srcObject.getTracks().forEach(track => track.stop())
            this.activa = c.value
            if (c.value != '0') this.mostrarVideo(c.value) // Mostrar el nuevo flujo
            else this.video.srcObject = null

            if (!e.target.selectedIndex) vista.imageText.removeAttribute("disabled")
            else {
                // UI.image.value = ""
                this.imageText.value = ""
                this.imageText.setAttribute("disabled", "disabled")
            }
        })
    }

    // Muestra el flujo de video obtenido
    async mostrarVideo(idDeDispositivo) {
        await this._getUserMedia({ video: { deviceId: idDeDispositivo } },
            streamObtenido => {
                this.video.srcObject = streamObtenido
                this.video.play()
            },
            error => console.log("Permiso denegado o error: ", error)
        );
    }

    // Captura y muestra una foto
    tomarFoto() {
        const video = archcam.video,
            canvas = archcam.canvas,
            contexto = canvas.getContext("2d") // Obtengo contexto canvas y dibujo

        video.pause(); // Pauso la reproducción de video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
        archcam.fotoBase64 = canvas.toDataURL(); // Convierte el contenido de canvas a Base64
        video.play(); // Reactivo la reproducción de video
    }

    getBase64(file) {
        // La instancia de img creada por el constructor descargará la imagen inmediatamente después de asignar el valor src. En comparación con createElement () creando <img>, guarda append (), lo que evita la redundancia y contaminación del documento
        const img = new Image(320, 240);

        img.src = URL.createObjectURL(file); // Lo convertimos a un objeto de tipo objectURL y a la fuente de la imagen le ponemos el objectURL
        img.addEventListener("load", () => this.drawImage(img));
    }

    drawImage(img) {
        const canvas = this.canvas,
            contexto = canvas.getContext("2d") // Obtengo contexto canvas y dibujo

        canvas.width = img.width, // Hay que asegurar que el tamaño del canvas sea el mismo que el de la imagen
            canvas.height = img.height;

        contexto.drawImage(img, 0, 0, canvas.width, canvas.height); // Dibuja la imagen en el lienzo

        this.fotoBase64 = canvas.toDataURL(); // Convertir imagen a dataURL
    }

    apagarCamaras() {
        if (this.video && this.video.srcObject)
            this.video.srcObject.getTracks().forEach(track => track.stop())
        if (this.video && this.video.srcObject)
            this.video.srcObject = null;
    }

    procesar_click(e) {
        archcam.procesar_foto(archcam.recuperar())
    }

    recuperar(...args) {
        let d = {}

        if (!args.length) args.push("*");
        for (let arg of args) {

            // Recupero la foto y codifico para enviar al server
            if (arg == "*" || arg == "foto") d.foto = encodeURIComponent(this.fotoBase64);

        }
        return d;
    }

    // Cargo el array de cámaras disponibles
    async getCamaras() {
        const dispositivos = await navigator.mediaDevices.enumerateDevices()

        for (const dispositivo of dispositivos)
            if (dispositivo.kind === "videoinput")
                this.camaras.push(dispositivo)
    }

    procesar_foto(datos) {
        //Agrego el valor de la vista foto con la foto tomada
        vista.foto.value = datos.foto
        if (!vista.foto.value == "" || !vista.foto.value == null) {
            alert("Imagen cargada")
            vista.abrirModal.value = "Foto agregada"
        }
        else {
            alert("Error al cargar la imagen")
            vista.foto.value == "ND"
        }
    }

    // Documentos
    documentos() {
        const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];
        const inputFiles = document.querySelectorAll(".dropzone-area input[type='file']");
        const inputElement = inputFiles[0];
        const dropZoneElement = inputElement.closest(".dropzone-area");

        inputElement.addEventListener("change", (e) => {
            if (inputElement.files.length) {
                updateDropzoneFileList(dropZoneElement, inputElement.files[0]);
            }
        });

        dropZoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("dropzone--over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            dropZoneElement.addEventListener(type, (e) => {
                dropZoneElement.classList.remove("dropzone--over");
            });
        });

        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault();

            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateDropzoneFileList(dropZoneElement, e.dataTransfer.files[0]);
            }

            dropZoneElement.classList.remove("dropzone--over");
        });

        const updateDropzoneFileList = (dropzoneElement, file) => {
            let dropzoneFileMessage = dropzoneElement.querySelector(".message");
            dropzoneFileMessage.innerHTML = `${file.name}, ${file.size} bytes`;
        };

        dropzoneBox.addEventListener("reset", (e) => {
            let dropzoneFileMessage = dropZoneElement.querySelector(".message");
            dropzoneFileMessage.innerHTML = `No Files Selected`;
        });

        dropzoneBox.addEventListener("submit", (e) => {
            e.preventDefault()
            const file = inputElement.files[0];

            if (!vista.login.value == "" || !vista.login.value == null) {
                let extension = file.name.split('.')[1];
                let nuevo_nombre = `${vista.login.value}.${extension}`

                const formData = new FormData()
                formData.append('file', file, nuevo_nombre)

                if (file) {
                    if (!vista.login.value == "" || !vista.login.value == null) {
                        fetch('/upload', {
                            method: 'POST',
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                alert(data.message)
                                archcam.archivoCargado(data.filename)
                            })
                            .catch(error => {
                                console.error('Error:', error)
                                alert("Error: ", error)
                            })
                    } else alert("Error al subir documento")
                }

                vista.foto.value = nuevo_nombre

                alert("Información de documento cargada")
                vista.abrirModal.value = "Información de documento cargada"

            } else {
                alert("Error al cargar la información de documento \nEs necesario agregar primero un nombre de Usuario para cargar un Documento")
                vista.foto.value == "ND"
            }
        })
    }

    archivoCargado(filename) {
        this.archivoCargado = filename
    }

    consultarArchivoCargado() {
        return this.archivoCargado
    }

    eliminarArchivo(filename) {
        if (filename) {

            fetch('/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filename })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error('Error:', error)
                });

        } else {
            console.log("No hay archivo cargado")
        }
    }

    renombrarArchivo(currentName, newName) {
        if(currentName && newName){
            fetch('/rename', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentName, newName })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            console.log("No se proporcionaron los nombres de archivo");
        }
    }
}
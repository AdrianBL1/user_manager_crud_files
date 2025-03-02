# User Manager CRUD Files
 Gestor de usuarios con Node y MariaDB #2 con manejo de archivos y fotos.

Este proyecto es una aplicación web para la gestión de usuarios, que incluye funcionalidades de altas, bajas, cambios y consultas con manejo de archivos y fotos.

Este proyecto forma de la siguiente versión del proyecto: [user_manager_crud](https://github.com/AdrianBL1/user_manager_crud)

# Demostración

## Autenticación

<div align="center">
    <img src="/docs/capturas/auth.jpeg" alt="Autenticación">
</div>

## Dashboard

Vista principal de la interfaz de Dashboard:
<div align="center">
    <img src="/docs/capturas/dashboard.jpg" alt="Dashboard">
</div>

Vista del Dashboard al abrir una imágen de un usuario:
<div align="center">
    <img src="/docs/capturas/dashboard_foto.jpg" alt="Dashboard">
</div>

Vista del Dashboard al abrir un documento de un usuario:
<div align="center">
    <img src="/docs/capturas/dashboard_docs.jpeg" alt="Dashboard">
</div>

## Altas

Vista principal de la interfaz de Altas:
<div align="center">
    <img src="/docs/capturas/altas.jpeg" alt="Altas">
</div>

Vista de altas al ejecutar la acción de tomar una foto:
<div align="center">
    <img src="/docs/capturas/altas_foto.jpeg" alt="Altas">
</div>

#1 Al abrir la cámara:
<div align="center">
    <img src="/docs/capturas/altas_foto_cap.jpg" alt="Altas">
</div>

#2 Al tomar una foto:
<div align="center">
    <img src="/docs/capturas/altas_foto_cap_2.jpg" alt="Altas">
</div>

#3 Al cambiar la opción para seleccionar un documento de identificacion en lugar de la foto:
<div align="center">
    <img src="/docs/capturas/altas_docs.jpeg" alt="Altas">
</div>

Al guardar los datos (con una foto o documento) de forma exitosa:
<div align="center">
    <img src="/docs/capturas/altas_exito.jpeg" alt="Altas">
</div>

## Bajas

<div align="center">
    <img src="/docs/capturas/bajas.jpeg" alt="Bajas">
</div>

## Cambios

<div align="center">
    <img src="/docs/capturas/cambios.jpeg" alt="Cambios">
</div>

## Consultas

<div align="center">
    <img src="/docs/capturas/consultas.jpeg" alt="Consultas">
</div>

Resultado de consulta:
<div align="center">
    <img src="/docs/capturas/consultas_2.jpeg" alt="Consultas">
</div>

## Estructura del Proyecto
```bash
master/
├── .gitattributes
├── .gitignore
├── 404.html
├── altas.html
├── bajas.html
├── cambios.html
├── consultas.html
├── dashboard.html
├── favicon.ico
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── Server.js
├── node_modules
│   └── (Archivos de Node.js)
├── backups/
│   └── respaldo/
│       └── ...
├── css/
│   ├── estilos_oscuro.css
│   ├── estilos.css
│   ├── login.css
│   └── modal/
│       └── estilos.css
├── db/
│   └── (Base de datos no disponible)
├── docs/
│   ├── (capturas)
│   └── comandos_node.txt <- Instrucciones para configurar el proyecto
├── img/
│   └── user.png
├── js/
│   ├── altas/
│   │   ├── altas_ui.js <- Interfaz
│   │   ├── altas.js    <- Controlador
│   │   └── arch_cam_modal.js
│   ├── auth/
│   │   ├── index_ui.js <- Interfaz
│   │   └── index.js    <- Controlador
│   ├── bajas/
│   │   ├── bajas_ui.js <- Interfaz
│   │   └── bajas.js    <- Controlador
│   ├── cambios/
│   │   ├── cambios_ui.js <- Interfaz
│   │   └── cambios.js    <- Controlador
│   ├── consultas/
│   │   ├── consultas_ui.js <- Interfaz
│   │   └── consultas.js    <- Controlador
│   ├── dashboard/
│   │   ├── dashboard_ui.js <- Interfaz
│   │   └── dashboard.js    <- Controlador
│   ├── uploads/
│   ├── Ajax.js
│   ├── Archivos.js
│   ├── BD.js
│   ├── Requisicion.js
│   ├── Respuesta.js
│   ├── Servicios.js
│   └── ui.js
├── ssl/
│   └── (Certificado SSL)
├── test/
│   └── ...
└── uploads/
```

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/AdrianBL1/user_manager_crud_files.git
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd user_manager_crud_files
    ```

3. Instala las dependencias:
    ```sh
    npm install
    ```

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:
```sh
npm run dev
```

El servidor se ejecutará en `https://127.0.0.1:443`.

## Archivos Principales

- Server.js: Configuración del servidor HTTPS y manejo de rutas.
- index.html: Página de inicio (Login).
- altas.html, bajas.html, cambios.html, consultas.html, dashboard.html: Páginas principales de la aplicación.
- js: Contiene los archivos JavaScript para la lógica de la aplicación.
- css: Contiene los archivos CSS para los estilos de la aplicación.
- ssl: Contiene los archivos de certificado SSL.

## Rutas del Servidor

El servidor maneja las siguientes rutas:

- `/`: Redirige a index.html.
- `/dashboard`: Redirige a dashboard.html.
- `/altas`: Redirige a altas.html.
- `/bajas`: Redirige a bajas.html.
- `/consultas`: Redirige a consultas.html.
- `/cambios`: Redirige a cambios.html.
- uploads: Redirige a la carpeta uploads.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
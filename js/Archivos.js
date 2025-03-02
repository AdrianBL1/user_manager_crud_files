import path from 'path';
import { existsSync, mkdirSync, writeFileSync, unlinkSync, renameSync } from 'fs';
import { fileURLToPath } from 'url';

// Definir __filename y __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MAX_FILE_SIZE = 5 * 1024 * 1024

// Clase que maneja las operaciones relacionadas con archivos
class Archivos {
    constructor() {
        // Definir el directorio donde se subirán los archivos
        this.uploadDir = path.join(__dirname, 'uploads')
        // Crear el directorio si no existe
        if (!existsSync(this.uploadDir)) {
            mkdirSync(this.uploadDir)
        }
    }

    handleUpload(requisicion, respuesta) {
        const contentType = requisicion.headers['content-type']
        const boundary = contentType.split('; ')[1].replace('boundary=', '')
        
        let rawData = Buffer.alloc(0);

        requisicion.on('data', chunk => {
            rawData = Buffer.concat([rawData, chunk])
            if (rawData.length > MAX_FILE_SIZE) {
                respuesta.writeHead(413, { 'Content-Type': 'application/json' })
                respuesta.end(JSON.stringify({ message: 'El archivo es demasiado grande' }))
                requisicion.connection.destroy()
            }
        })

        requisicion.on('end', () => {
            const parts = rawData.toString('binary').split(boundary)
            const filePart = parts.find(part => part.includes('filename='))
            if (!filePart) {
                respuesta.writeHead(400, { 'Content-Type': 'application/json' })
                respuesta.end(JSON.stringify({ message: 'No se ha subido ningún archivo' }))
                return;
            }

            const matches = filePart.match(/filename="(.+?)"/)
            const filename = matches ? matches[1] : null
            if (!filename) {
                respuesta.writeHead(400, { 'Content-Type': 'application/json' })
                respuesta.end(JSON.stringify({ message: 'Carga de archivo no válida' }))
                return
            }

            const contentStart = filePart.indexOf('\r\n\r\n') + 4
            const contentEnd = filePart.lastIndexOf('\r\n')
            const fileContent = filePart.slice(contentStart, contentEnd)

            const fileBuffer = Buffer.from(fileContent, 'binary')

            const validExtensions = ['.pdf', '.doc', '.docx', '.txt']
            const fileExtension = path.extname(filename).toLowerCase()
            if (!validExtensions.includes(fileExtension)) {
                respuesta.writeHead(400, { 'Content-Type': 'application/json' })
                respuesta.end(JSON.stringify({ message: 'Tipo de archivo invalido' }))
                return
            }

            const filePath = path.join(this.uploadDir, filename)
            writeFileSync(filePath, fileBuffer)

            respuesta.writeHead(200, { 'Content-Type': 'application/json' })
            respuesta.end(JSON.stringify({ message: 'El archivo ha subido correctamente', filename: filename }))
        })
    }

    deleteFile(filename, respuesta) {
        const filePath = path.join(this.uploadDir, filename);
        if (existsSync(filePath)) {
            unlinkSync(filePath);
            respuesta.writeHead(200, { 'Content-Type': 'application/json' });
            respuesta.end(JSON.stringify({ message: 'Archivo eliminado exitosamente' }));
        } else {
            respuesta.writeHead(404, { 'Content-Type': 'application/json' });
            respuesta.end(JSON.stringify({ message: 'Archivo no encontrado' }));
        }
    }

    renameFile(currentName, newName, respuesta) {
        const currentPath = path.join(this.uploadDir, currentName);
        const newPath = path.join(this.uploadDir, newName);
        if (existsSync(currentPath)) {
            renameSync(currentPath, newPath);
            respuesta.writeHead(200, { 'Content-Type': 'application/json' });
            respuesta.end(JSON.stringify({ message: 'Archivo renombrado exitosamente' }));
        } else {
            respuesta.writeHead(404, { 'Content-Type': 'application/json' });
            respuesta.end(JSON.stringify({ message: 'Archivo no encontrado' }));
        }
    }
}

export default Archivos;

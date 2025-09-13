# Sistema de Gestión de Parqueadero

Aplicación web  para gestionar la disponibilidad y reservas de un parqueadero en tiempo real.

##  Tecnologías
* **Frontend**: React.js
* **Backend**: Node.js con Express.js
* **Base de Datos**: MongoDB

## Cómo Ponerlo en Marcha

**Requisitos**: Node.js y una cuenta de MongoDB Atlas.

1.  **Repositorio**
    
    https://github.com/andresrojv/proyectoparking.git
    
    

2.  **Configurar Backend**
    * Navega a la carpeta: `cd servidor`
    * Instala las dependencias: `npm install`
    * Crea un archivo `.env` y añade tu `MONGO_URI` y `PORT`.

3.  **Configurar Frontend**
    * Navega a la carpeta: `cd ../cliente`
    * Instala las dependencias: `npm install`

4.  **Ejecutar**
    * **Terminal 1 (Backend)**: En la carpeta `servidor`, ejecuta `node index.js`.
    * **Terminal 2 (Frontend)**: En la carpeta `cliente`, ejecuta `npm start`.
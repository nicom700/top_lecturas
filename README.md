# Top Lecturas

Top Lecturas es un juego desarrollado como proyecto final para el Bootcamps 2.0 - React + Node perteneciente a Devlights.

Al jugar pondrás a prueba tus conocimientos sobre la popularidad de los artículos de Wikipedia.

## Configuración del backend

1. Crea un archivo `.env` en la carpeta del backend `top_lecturas-backend` y copia el contenido del archivo `.env.example` que se encuentra en la misma carpeta.
2. Edita el archivo `.env` con los siguientes valores:
    ```
    SERVER_PORT=puerto
    CLIENT_URL='url cliente'
    MONGO_STRING='url de conexion a MongoDB'
    JWT_SECRET_KEY='una cadena aleatoria'
    ARTICLES_BANNED=['item1', 'item2']
    ```
    ```
    * "puerto" es el número de puerto para el backend, por ejemplo: 3000
    * "url cliente" es la URL del frontend, por ejemplo: 'http://localhost:5173'
    * "url MongoDB" es la URL de conexión a la base de datos MongoDB, por ejemplo: 'mongodb://<usuario>:<contraseña>@127.0.0.1:27017/<database>?authSource=admin'
    * "una cadena aleatoria" es cualquier cadena de caracteres aleatoria que se utilizará para generar las contraseñas usando JWT, por ejemplo: tB5c9z2cv2g5dzq1
    * "item1" e "item2" son los artículos que no quieres que estén disponibles en la aplicación.
    ```

3. Desde la carpeta del backend, instala las dependencias con el siguiente comando:
    ```
    npm install
    ```
4. Para iniciar el servidor usando nodemon ejecuta:
    ```
    npm run dev
    ```
5. Si prefieres usar node, ejecuta:
    ```
    npm run start
    ```

## Configuración del frontend 

1. Crea un archivo `.env` en la carpeta del frontend `top_lecturas-frontend` y copia el contenido del archivo `.env.example` que se encuentra en la misma carpeta.
2. Edita el archivo `.env` con los siguientes valores:
    ```
    VITE_BACKEND_URL='url del backend' 
    ```
    ```
    * "url del backend" es la URL del servidor donde funciona la api, por ejemplo: 'http://localhost:3000/api'
    ```

3. Desde la carpeta del frontend, instala las dependencias con el siguiente comando:
    ```
    npm install
    ```
4. Para ejecutar el frontend, ejecuta:
    ```
    npm run dev
    ```

¡Listo! Con estos pasos deberías poder utilizar localmente este juego.

## Tecnologías 🛠️

* [Express] Backend
* [MongoDB] Base de datos
* [React] Frontend
* [Tailwind] Framework CSS

---
Devlights Bootcamps 2023
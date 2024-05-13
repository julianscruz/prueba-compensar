# Prueba Técnica: Encuesta Compensar

Este repositorio contiene el código desarrollado para la prueba técnica de Compensar. Se trata de una aplicación de encuestas desarrollada con las tecnologías especificadas. A continuación, se detallan los aspectos más relevantes del proyecto:

## Tecnologías Utilizadas

- **Frontend:** El frontend se ha desarrollado utilizando Vite y React, aprovechando las ventajas de estas tecnologías para crear interfaces web dinámicas y eficientes.
  
- **Backend:** Para el backend, se ha empleado Serverless con Node.js, garantizando un desarrollo ágil y escalable para gestionar las operaciones de la aplicación de manera eficiente.

## Instrucciones para Probar el Proyecto

1. **Clonar el Repositorio:**
```bash
git clone https://github.com/julianscruz/prueba-compensar.git
```

2. **Backend:**
- Dirígete a la carpeta `./Back`.
- Ejecuta `npm install` para instalar las dependencias.
- Utiliza `npm start` para ejecutar el servidor local. Ten en cuenta que debes configurar el perfil de AWS con los permisos correspondientes para acceder a la base de datos de DynamoDB.
- Las rutas disponibles son:
  - `POST | http://localhost:3000/login`
  - `POST | http://localhost:3000/register`
  - `POST | http://localhost:3000/survey`
  - `GET  | http://localhost:3000/user/{id}`
  - `GET  | http://localhost:3000/`
- También puedes acceder a un demo en línea en la siguiente URL: [Demo Backend](https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/)

3. **Frontend:**
- Ve a la carpeta `./Front`.
- Ejecuta `npm install` para instalar las dependencias.
- Utiliza `npm run preview` para ejecutar la vista previa del proyecto utilizando Vite. También puedes utilizar `npm run dev` para ejecutar Vite.
- Además, puedes acceder al demo en línea en la siguiente URL: [Demo Frontend](https://develop.d2w6lujnbw7o1r.amplifyapp.com/)

## Base de Datos

La base de datos utilizada es DynamoDB, con una tabla llamada `prueba-compensar`. La clave de partición es `user` (String) y la clave de ordenamiento es `mail` (String). Además, se ha creado un índice global secundario llamado `mail-user-index`, donde la clave de partición es `mail` (String) y la clave de ordenamiento es `user` (String).

## Autor

- **Cesar Julian Solano Cruz**
- Correo electrónico: julianscruz@gmail.com

## Documentación del Proyecto

Se adjunta la documentación del proyecto, que incluye instrucciones detalladas para instalar las dependencias y librerías necesarias, así como una guía para ejecutar, compilar y visualizar el proyecto en un entorno local.

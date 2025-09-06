# 🐾 Backend API - Adopciones, Mocks y Usuarios

Este proyecto es una API RESTful construida con **Node.js**, **Express**, **MongoDB** y documentada con **Swagger**. Incluye rutas para gestionar adopciones, generar datos simulados (mocks) y administrar usuarios.

---

## 🚀 Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/FranNorona/BEND-III-TP
   ```
2. Instalá las dependencias:
   ```bash
   npm install
   ```
3. Configurá las variables de entorno en un archivo .env:
   ```bash
   MONGO_URL=LA URL DE TU DB.
   PORT=EL PUERTO.
   REAL_ID_USER=ID VALIDO DE UN USER DE TU DB.
   REAL_ID_PET=ID VALIDO DE UN PET DE TU DB.
   NODE_ENV=test
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```

## 🧪 Testing

Este proyecto incluye tests funcionales con Mocha, Chai y Supertest.

Para ejecutarlos:

```bash
npm test
```

Asegurate de tener datos válidos en tu base para REAL_ID_USER y REAL_ID_PET.

## 📑 Documentación Swagger

La API está documentada con Swagger y disponible en:

http://localhost:8080/api-docs

- /api/adoptions: gestión de adopciones
- /api/mocks: generación de usuarios y mascotas simuladas
- /api/users: administración de usuarios reales

El módulo `/api/users` está completamente documentado en Swagger, incluyendo parámetros, requestBody y respuestas.

## 📦 Estructura del proyecto

```bash
src/
├── controllers/
├── routes/
├── services/
├── dao/
├── mocks/
├── docs/
│   └── swagger.yaml
├── app.js
└── server.js
```

## 🐳 Docker

Imagen pública en Docker Hub:
🔗 [Ver imagen en DockerHub](https://hub.docker.com/r/frannorona/backend-iii)

Para ejecutarla:

```bash
docker pull frannorona/backend-iii:1.0.0
docker run -d -p 8080:8080 --env-file .env frannorona/backend-iii:1.0.0
```

O construir localmente

```bash
docker build -t frannorona/backend-iii .
docker run -d -p 8080:8080 --env-file .env frannorona/backend-iii
```

⚠️ Importante: el archivo `.env` no se copia al contenedor Docker por seguridad. Usá `--env-file .env` al ejecutar la imagen.

## 👨‍💻 Autor

Franco Noroña  
Backend III - Proyecto Final  
Bella Vista, Buenos Aires, Argentina

## 📬 Contacto

Podés escribirme a: franconorona@outlook.com  
O visitar mi perfil en GitHub: https://github.com/FranNorona

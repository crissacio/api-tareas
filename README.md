# API de Tareas

API REST para la gestión de tareas (crear, leer, actualizar y eliminar), con autenticación de usuarios. Construida como proyecto de práctica y portafolio backend.

## Tecnologías

- **Node.js** — entorno de ejecución
- **Express** — framework para el servidor y las rutas
- **PostgreSQL** — base de datos relacional
- **Prisma** — ORM para la conexión y consultas a la base de datos
- **JWT (jsonwebtoken)** — autenticación basada en tokens
- **bcrypt** — hasheo seguro de contraseñas
- **dotenv** — manejo de variables de entorno
- **nodemon** — reinicio automático del servidor en desarrollo
- **Jest + Supertest** — testing automatizado de los endpoints

## Endpoints

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/registro` | Registra un nuevo usuario (contraseña hasheada con bcrypt) |
| POST | `/login` | Verifica credenciales y devuelve un token JWT |

### Tareas (requieren token en el header `Authorization`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/tareas` | Devuelve todas las tareas |
| POST | `/tareas` | Crea una nueva tarea |
| PUT | `/tareas/:id` | Actualiza el título de una tarea existente |
| DELETE | `/tareas/:id` | Elimina una tarea |

### Ejemplo de body

**Registro / Login:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "miContraseña123"
}
```

**Crear / Actualizar tarea:**
```json
{
  "titulo": "Comprar pan"
}
```

## Autenticación

Las rutas de tareas requieren un token JWT válido, obtenido al hacer login, enviado en el header:

```
Authorization: <token>
```

## Cómo correr el proyecto localmente

1. Cloná el repositorio
2. Instalá las dependencias:
   ```
   npm install
   ```
3. Creá un archivo `.env` en la raíz con las siguientes variables:
   ```
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mis_tareas?schema=public"
   JWT_SECRET="tu_clave_secreta"
   ```
4. Asegurate de tener PostgreSQL corriendo y una base de datos creada con las tablas necesarias:
   ```sql
   CREATE TABLE tareas (
       id SERIAL PRIMARY KEY,
       titulo VARCHAR(255) NOT NULL,
       completada BOOLEAN DEFAULT false
   );

   CREATE TABLE usuarios (
       id SERIAL PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL
   );
   ```
5. Generá el cliente de Prisma:
   ```
   npx prisma generate
   ```
6. Iniciá el servidor:
   ```
   npx nodemon server.js
   ```
7. El servidor queda disponible en `http://localhost:3000`

## Correr los tests

```
npm test
```

Los tests cubren: consulta de tareas, registro de usuarios, y el flujo completo de login + creación de tarea con token.

## API en producción

https://api-tareas-t25g.onrender.com

> Nota: Render puede tardar unos segundos en "despertar" el servicio si no recibió tráfico reciente (plan gratuito).

## Estado del proyecto

CRUD completo, autenticación con JWT y tests automatizados funcionando. Próximo paso: deploy a producción.

## Autor

Cristian Alvarenga
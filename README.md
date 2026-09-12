# API de Tareas

API REST para la gestión de tareas (crear, leer, actualizar y eliminar), construida como proyecto de práctica y portafolio backend.

## Tecnologías

- **Node.js** — entorno de ejecución
- **Express** — framework para el servidor y las rutas
- **PostgreSQL** — base de datos relacional
- **Prisma** — ORM para la conexión y consultas a la base de datos
- **dotenv** — manejo de variables de entorno
- **nodemon** — reinicio automático del servidor en desarrollo

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/tareas` | Devuelve todas las tareas |
| POST | `/tareas` | Crea una nueva tarea |
| PUT | `/tareas/:id` | Actualiza el título de una tarea existente |
| DELETE | `/tareas/:id` | Elimina una tarea |

### Ejemplo de body para POST y PUT

```json
{
  "titulo": "Comprar pan"
}
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
   ```
4. Asegurate de tener PostgreSQL corriendo y una base de datos creada con una tabla `tareas`:
   ```sql
   CREATE TABLE tareas (
       id SERIAL PRIMARY KEY,
       titulo VARCHAR(255) NOT NULL,
       completada BOOLEAN DEFAULT false
   );
   ```
5. Generá el cliente de Prisma:
   ```
   npx prisma generate
   ```
6. Iniciá el servidor:
   ```
   npx nodemon index.js
   ```
7. El servidor queda disponible en `http://localhost:3000`

## Estado del proyecto

Primera versión funcional del CRUD completo. Próximos pasos: autenticación con JWT, tests automatizados y deploy.

## Autor

Cristian Alvarenga
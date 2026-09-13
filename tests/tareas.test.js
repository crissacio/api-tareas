const request = require('supertest');
const app = require('../index.js');

describe('GET /tareas', () => {
    it('debería devolver un array de tareas', async () => {
        const respuesta = await request(app).get('/tareas');
        expect(respuesta.status).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });
});

const emailunico = `test${Date.now()}@example.com`;

describe('POST /registro', () => {
    it('debería registrar un nuevo usuario', async () => {
        const nuevoUsuario = { email: emailunico, password: 'password123' };

        const respuesta = await request(app)
            .post('/registro')
            .send(nuevoUsuario);

        expect(respuesta.status).toBe(201);
        expect(respuesta.body).toHaveProperty('id');
        expect(respuesta.body).toHaveProperty('email', nuevoUsuario.email);
    });

    it('debería iniciar sesión y crear una tarea con el token', async () => {
        const usuario = { email: emailunico, password: 'password123' };

        // Paso 1: login, TODO dentro de este mismo it
        const loginRespuesta = await request(app)
            .post('/login')
            .send(usuario);

        expect(loginRespuesta.status).toBe(200);
        expect(loginRespuesta.body).toHaveProperty('token');

        const token = loginRespuesta.body.token;

        // Paso 2: crear la tarea, usando el token recién conseguido
        const nuevaTarea = { titulo: 'Nueva tarea' };

        const tareaRespuesta = await request(app)
            .post('/tareas')
            .set('Authorization', token)
            .send(nuevaTarea);

        expect(tareaRespuesta.status).toBe(201);
        expect(tareaRespuesta.body).toHaveProperty('id');
        expect(tareaRespuesta.body).toHaveProperty('titulo', nuevaTarea.titulo);
    });
});
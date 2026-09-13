const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.json());
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- Middleware de verificación de token (a nivel general, no dentro de otra ruta) ---
function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = datos;
        next();
    } catch {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

// --- Registro ---
app.post('/registro', async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const nuevoUsuario = await prisma.usuarios.create({
        data: {
            email: req.body.email,
            password: hashPassword,
        }
    });

    res.status(201).json({ id: nuevoUsuario.id, email: nuevoUsuario.email });
});

// --- Login ---
app.post('/login', async (req, res) => {
    const usuario = await prisma.usuarios.findUnique({
        where: { email: req.body.email }
    });

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordCorrecta = await bcrypt.compare(req.body.password, usuario.password);

    if (!passwordCorrecta) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ token });
});

// --- Rutas de tareas ---
app.get('/', (req, res) => {
    res.send('¡Hola, cracks!');
});

app.get('/tareas', async (req, res) => {
    const tareas = await prisma.tareas.findMany();
    res.status(200).json(tareas);
});

// Esta es la ÚNICA ruta POST /tareas, protegida con el middleware
app.post('/tareas', verificarToken, async (req, res) => {
    const nuevaTarea = await prisma.tareas.create({
        data: { titulo: req.body.titulo }
    });
    res.status(201).json(nuevaTarea);
});

app.put('/tareas/:id', verificarToken, async (req, res) => {
    const tareaActualizada = await prisma.tareas.update({
        where: { id: Number(req.params.id) },
        data: { titulo: req.body.titulo }
    });
    res.status(200).json(tareaActualizada);
});

app.delete('/tareas/:id', verificarToken, async (req, res) => {
    await prisma.tareas.delete({
        where: { id: Number(req.params.id) }
    });
    res.status(200).json({ mensaje: 'Tarea eliminada' });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
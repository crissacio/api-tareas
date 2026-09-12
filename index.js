const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.json());
require('dotenv').config();

const { Pool } = require ('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mis_tareas',
    password: process.env.DB_PASSWORD,
    port: 5432,
});

app.get('/', (req, res) => {
    res.send('¡Hola, cracks!');
}); 

app.get('/tareas', async (req, res) => {
    const tareas = await prisma.tareas.findMany ();
    res.status(200).json(tareas);    
});

app.post('/tareas', async (req, res) => {
    const nuevaTarea = await prisma.tareas.create({
        data: { titulo: req.body.titulo }
    });
    res.status(201).json(nuevaTarea);  
});

app.put('/tareas/:id', async (req, res) => {
    const tareaActualizada = await prisma.tareas.update({
        where: { id: Number(req.params.id) }, data: { titulo: req.body.titulo }
    });
    res.status(200).json(tareaActualizada);
});

app.delete('/tareas/:id', async (req, res) => {
    await prisma.tareas.delete({
        where: { id: Number(req.params.id) }
    });
    res.status(200).json({ mensaje: 'Tarea eliminada' });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

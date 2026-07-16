const request = require('supertest');
const express = require('express');

// Creamos un servidor de prueba idéntico al tuyo para no interferir con tu base de datos
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('¡Mi servidor Express está funcionando correctamente! 🚀');
});

describe('Pruebas de la API DevSpark', () => {
  it('Debería responder con un código 200 en la ruta principal (GET /)', async () => {
    const response = await request(app).get('/');
    
    // Le decimos a Jest qué es lo que esperamos que pase
    expect(response.statusCode).toBe(200);
  });
});
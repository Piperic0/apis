const express = require('express');
const client = require('./db');
const cors = require('cors');

const app = express();
const PORT = 3000;
// Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/api/prueba', (req, res) => {
  res.status(200).json({
    message: 'LA API FUNCIONA CORRECTAMENTE',
    port: PORT,
    status: 'success'
  });
});

// Ruta para guardar
app.post('/api/guardar', async (req, res) => {
  const { cedula, nombre, edad, profesion } = req.body;
  const query = `INSERT INTO personas (cedula, nombre, edad, profesion)VALUES ($1, $2, $3, $4)`; 

  try {
    await client.query(query, [cedula, nombre, edad, profesion]);
    res.status(201).json({ cedula, nombre, edad, profesion });
  } catch (error) {
    res.status(500).json({
      message: 'ERROR CREANDO USUARIO',
      error: error.message
    });
  }
});

// Obtener todos los registros
app.get('/api/obtener', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM personas');
    res.status(200).json({
      success: true,
      message: "Datos de la tabla",
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar los datos",
      details: error.message
    });
  }
});

// Eliminar por cédula
app.delete('/api/eliminar/:cedula', async (req, res) => {
  const { cedula } = req.params;
  const query = 'DELETE FROM personas WHERE cedula = $1';

  try {
    const result = await client.query(query, [cedula]);
    
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: No `existe el registro con la cédula ${cedula}`
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Dato eliminado de la tabla",
        data: result
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar registro",
      error: error.message
    });
  }
});

app.put('/api/actualizar/:cedula', async (req, res) => {
  const { cedula } = req.params;
  const { nombre, edad, profesion } = req.body;

  const query = `
    UPDATE personas
    SET nombre = $1, edad = $2, profesion = $3
    WHERE cedula = $4
  `;

  try {
    const result = await client.query(query, [nombre, edad, profesion, cedula]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró persona con la cédula ${cedula}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Datos actualizados correctamente',
      data: { cedula, nombre, edad, profesion }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar',
      error: error.message
    });
  }
});
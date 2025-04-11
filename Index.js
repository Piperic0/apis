const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// -------------------- PERSONAS --------------------

// GET todas las personas
app.get('/personas', (req, res) => {
  pool.query('SELECT * FROM Persona', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result.rows);
    }
  });
});

// GET una persona por id
app.get('/personas/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM Persona WHERE id = $1', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result.rows[0]);
    }
  });
});

// POST crear persona
app.post('/personas', (req, res) => {
  const { id, Nombre, Apellido1, Apellido2, DNI } = req.body;
  pool.query(
    'INSERT INTO Persona (id, Nombre, Apellido1, Apellido2, DNI) VALUES ($1, $2, $3, $4, $5)',
    [id, Nombre, Apellido1, Apellido2, DNI],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.send('Persona creada');
      }
    }
  );
});

// PUT actualizar persona
app.put('/personas/:id', (req, res) => {
  const id = req.params.id;
  const { Nombre, Apellido1, Apellido2, DNI } = req.body;
  pool.query(
    'UPDATE Persona SET Nombre = $1, Apellido1 = $2, Apellido2 = $3, DNI = $4 WHERE id = $5',
    [Nombre, Apellido1, Apellido2, DNI, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.send('Persona actualizada');
      }
    }
  );
});

// DELETE eliminar persona
app.delete('/personas/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM Persona WHERE id = $1', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.send('Persona eliminada');
    }
  });
});

// -------------------- COCHES --------------------

// GET todos los coches
app.get('/coches', (req, res) => {
  pool.query('SELECT * FROM Coche', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result.rows);
    }
  });
});

// GET coche por matrícula
app.get('/coches/:matricula', (req, res) => {
  const matricula = req.params.matricula;
  pool.query('SELECT * FROM Coche WHERE Matricula = $1', [matricula], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result.rows[0]);
    }
  });
});

// POST crear coche
app.post('/coches', (req, res) => {
  const { Matricula, Marca, Modelo, Caballos, Persona_id } = req.body;
  pool.query(
    'INSERT INTO Coche (Matricula, Marca, Modelo, Caballos, Persona_id) VALUES ($1, $2, $3, $4, $5)',
    [Matricula, Marca, Modelo, Caballos, Persona_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.send('Coche creado');
      }
    }
  );
});

// PUT actualizar coche
app.put('/coches/:matricula', (req, res) => {
  const matricula = req.params.matricula;
  const { Marca, Modelo, Caballos, Persona_id } = req.body;
  pool.query(
    'UPDATE Coche SET Marca = $1, Modelo = $2, Caballos = $3, Persona_id = $4 WHERE Matricula = $5',
    [Marca, Modelo, Caballos, Persona_id, matricula],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.send('Coche actualizado');
      }
    }
  );
});

// DELETE eliminar coche
app.delete('/coches/:matricula', (req, res) => {
  const matricula = req.params.matricula;
  pool.query('DELETE FROM Coche WHERE Matricula = $1', [matricula], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.send('Coche eliminado');
    }
  });
});

// -------------------- PRUEBA DE INICIO --------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo `);
});
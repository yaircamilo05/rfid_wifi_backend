const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let CodeRfid = '70bf828';
let lastUser = ''; // Variable para almacenar el último usuario

const app = express();
app.use(bodyParser.json());

// Configura el directorio público para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para recibir RFID
app.post('/api/login', (req, res) => {
  const rfid = req.body.rfid;

  console.log(rfid);
  if (rfid === CodeRfid) {
    lastUser = 'Cristian Sanchez'; // Actualiza el usuario
    res.status(200).json({ message: 'Login exitoso', user: lastUser });
  } else {
    lastUser = 'desconocido'; // Actualiza el usuario
    res.status(401).json({ message: 'RFID no válido' });
  }
});

// Endpoint para obtener el usuario más reciente
app.get('/api/status', (req, res) => {
  res.status(200).json({ user: lastUser });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

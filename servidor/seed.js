// servidor/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Cupo = require('./models/cupo');

const MONGO_URI = process.env.MONGO_URI;

// Datos actualizados con los nuevos cupos y tarifas
const cuposIniciales = [
  { tipoVehiculo: 'vehiculo', total: 50, ocupados: 0, tarifaHora: 4000 },
  { tipoVehiculo: 'moto', total: 30, ocupados: 0, tarifaHora: 2000 },
  { tipoVehiculo: 'bicicleta', total: 20, ocupados: 0, tarifaHora: 1000 }
];

const sembrarDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB para sembrar datos...');
    await Cupo.deleteMany({});
    console.log('Datos antiguos eliminados.');
    await Cupo.insertMany(cuposIniciales);
    console.log('Datos actualizados insertados correctamente.');
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Conexión cerrada.');
  }
};

sembrarDB();
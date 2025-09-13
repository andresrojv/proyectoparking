// servidor/models/cupo.js
const mongoose = require('mongoose');

const CupoSchema = new mongoose.Schema({
  tipoVehiculo: { type: String, required: true, unique: true },
  total: { type: Number, required: true },
  ocupados: { type: Number, default: 0 },
  tarifaHora: { type: Number, required: true } // Nueva línea
});

module.exports = mongoose.model('Cupo', CupoSchema);
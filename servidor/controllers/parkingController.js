const Cupo = require('../models/cupo');

exports.getDisponibilidad = async (req, res) => {
  try {
    const cupos = await Cupo.find();
    res.json(cupos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

exports.reservarCupo = async (req, res) => {
  try {
    const { tipoVehiculo } = req.body;
    const cupo = await Cupo.findOne({ tipoVehiculo });

    if (!cupo) {
      return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
    }

    if (cupo.ocupados < cupo.total) {
      cupo.ocupados++;
      await cupo.save();
      res.status(200).json({ mensaje: 'Reserva exitosa', cupo });
    } else {
      res.status(400).json({ error: 'No hay cupos disponibles' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la reserva' });
  }
};
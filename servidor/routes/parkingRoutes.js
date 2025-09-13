const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

router.get('/disponibilidad', parkingController.getDisponibilidad);
router.post('/reservar', parkingController.reservarCupo);

module.exports = router;
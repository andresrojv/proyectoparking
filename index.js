// 1. Importaciones y configuración inicial
const express = require('express');
const app = express();
const PORT = 3000; // El puerto donde correrá nuestro servidor

// Middleware para que Express entienda JSON
app.use(express.json());

// 2. Base de Datos en Memoria (Estado del Parqueadero)
// En una app real, esto estaría en una base de datos (MongoDB, PostgreSQL, etc.)
const estadoParqueadero = {
    totalCupos: {
        carro: 50,
        moto: 30,
        bicicleta: 20
    },
    cuposOcupados: {
        carro: 0,
        moto: 0,
        bicicleta: 0
    },
    tarifas: {
        carro: 3500, // Tarifa por hora
        moto: 2000,
        bicicleta: 1000
    }
};

// 3. Función Auxiliar para Calcular Disponibilidad
function getDisponibilidad() {
    return {
        carro: estadoParqueadero.totalCupos.carro - estadoParqueadero.cuposOcupados.carro,
        moto: estadoParqueadero.totalCupos.moto - estadoParqueadero.cuposOcupados.moto,
        bicicleta: estadoParqueadero.totalCupos.bicicleta - estadoParqueadero.cuposOcupados.bicicleta
    };
}

// --- 4. Definición de los Endpoints de la API ---

// Endpoint para obtener la disponibilidad de todos los tipos de vehículo
app.get('/api/disponibilidad', (req, res) => {
    const disponibilidad = getDisponibilidad();
    res.status(200).json(disponibilidad);
});

// Endpoint para crear una reserva
app.post('/api/reservar', (req, res) => {
    const { tipoVehiculo } = req.body; // Extraemos el tipo de vehículo del cuerpo de la petición

    // Validación: ¿El tipo de vehículo es válido?
    if (!tipoVehiculo || estadoParqueadero.totalCupos[tipoVehiculo] === undefined) {
        return res.status(400).json({ error: 'Debe proporcionar un tipo de vehículo válido (carro, moto, bicicleta).' });
    }

    const disponibilidadActual = getDisponibilidad();

    // Validación: ¿Hay cupos disponibles?
    if (disponibilidadActual[tipoVehiculo] > 0) {
        estadoParqueadero.cuposOcupados[tipoVehiculo]++; // Ocupamos un cupo
        res.status(201).json({
            mensaje: `Reserva exitosa para el vehículo tipo ${tipoVehiculo}`,
            idReserva: `res-${Date.now()}`, // Generamos un ID de reserva simple
            cuposRestantes: getDisponibilidad()[tipoVehiculo]
        });
    } else {
        // Si no hay cupos, devolvemos un error de conflicto
        res.status(409).json({
            error: `No hay cupos disponibles para ${tipoVehiculo}.`
        });
    }
});

// Endpoint para consultar las tarifas
app.get('/api/tarifas', (req, res) => {
    res.status(200).json(estadoParqueadero.tarifas);
});


// 5. Iniciar el Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor del proyecto 'parking' corriendo en http://localhost:${PORT}`);
});
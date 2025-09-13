// cliente/src/components/MisReservas.js
import React from 'react';

const MisReservas = () => {
  // DATOS DE EJEMPLO - Esto vendrá del backend cuando el usuario inicie sesión
  const reservasDeEjemplo = [
    { id: 1, tipoVehiculo: 'vehiculo', fecha: '2025-09-13 10:00 AM', estado: 'Activa' },
    { id: 2, tipoVehiculo: 'moto', fecha: '2025-09-12 08:30 AM', estado: 'Finalizada' },
  ];

  return (
    <div className="card">
      <h2>Mis Reservas</h2>
      {reservasDeEjemplo.length > 0 ? (
        <ul className="reservas-list">
          {reservasDeEjemplo.map(reserva => (
            <li key={reserva.id}>
              <span>Vehículo: <strong>{reserva.tipoVehiculo}</strong></span>
              <span>Fecha: {reserva.fecha}</span>
              <span>Estado: {reserva.estado}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inicia sesión para ver tus reservas.</p>
      )}
    </div>
  );
};

export default MisReservas;
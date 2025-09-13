// cliente/src/components/ParkingGrid.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MisReservas from './MisReservas'; // Importamos el nuevo componente

const Card = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const ParkingGrid = () => {
  const [cupos, setCupos] = useState([]);
  const [tipoVehiculoReserva, setTipoVehiculoReserva] = useState('vehiculo');

  // ... (el resto de las funciones fetchDisponibilidad, useEffect y handleReservar se mantienen igual que antes)
  const fetchDisponibilidad = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/disponibilidad');
      setCupos(response.data);
    } catch (error) {
      console.error("Error al cargar los datos de la API", error);
    }
  };

  useEffect(() => {
    fetchDisponibilidad();
  }, []);
  
  const handleReservar = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/api/reservar', { tipoVehiculo: tipoVehiculoReserva });
      alert(`¡Reserva para ${tipoVehiculoReserva} exitosa!`);
      fetchDisponibilidad();
    } catch (error) {
      alert('Error: No hay cupos disponibles para este tipo de vehículo.');
    }
  };


  return (
    <div className="grid-container">
      <Card title="Cupos Disponibles">
        <div className="cupos-list">
          {cupos.map(cupo => (
            <div key={cupo.tipoVehiculo} className="cupo-item">
              <h3>{cupo.tipoVehiculo.charAt(0).toUpperCase() + cupo.tipoVehiculo.slice(1)}s</h3>
              <p><span>{cupo.total - cupo.ocupados}</span> / {cupo.total}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Solicitud de Reserva">
        <form onSubmit={handleReservar} className="reserva-form">
          <label htmlFor="vehiculo-select">Tipo de Vehículo:</label>
          <select 
            id="vehiculo-select" 
            value={tipoVehiculoReserva} 
            onChange={e => setTipoVehiculoReserva(e.target.value)}
          >
            <option value="vehiculo">Vehículo (Carro)</option>
            <option value="moto">Moto</option>
            <option value="bicicleta">Bicicleta</option>
          </select>
          <button type="submit">Reservar Cupo</button>
        </form>
      </Card>
      
      {/* Componente de Mis Reservas añadido aquí */}
      <MisReservas />

      <Card title="Tarifas por Hora">
        <ul className="tarifas-list">
          {cupos.map(cupo => (
            <li key={cupo.tipoVehiculo}>
              {cupo.tipoVehiculo.charAt(0).toUpperCase() + cupo.tipoVehiculo.slice(1)}: 
              <strong> ${cupo.tarifaHora.toLocaleString('es-CO')}</strong>
            </li>
          ))}
        </ul>
      </Card>
      
      <Card title="Medios de Pago">
        <div className="medios-pago">
          <span>💳 Tarjetas Débito y Crédito</span>
          <span>🏦 PSE / Transferencia Bancaria</span>
          <span>💵 Efectivo</span>
        </div>
      </Card>
    </div>
  );
};

export default ParkingGrid;
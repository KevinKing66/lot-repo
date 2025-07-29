import React from 'react'
import type { SensorData } from '../types/sensor-data';
import { formatToMMDDHHmm } from '../utils/utils';

interface Props {
  data: SensorData[];
}

export const AlertsList: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h2>Lista de Vehiculos con alerta de combustible bajo activa</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Coordenadas</th>
            <th>Velocidad (km/h)</th>
            <th>Combustible (L)</th>
            <th>fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sensor) => (
            <tr key={sensor.deviceId}>
              <td>{sensor.deviceId}</td>
              <td>{sensor.gps.lat} - {sensor.gps.lng}</td>
              <td>{sensor.gps.speed}</td>
              <td>{sensor.fuel.current}L de {sensor.fuel.capacity}L</td>
              <td>{sensor.createdAt ? formatToMMDDHHmm(sensor.createdAt) : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
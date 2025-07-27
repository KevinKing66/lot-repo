import { FuelChart } from "../component/FuelChart";
import { SpeedChart } from "../component/SpeedChart"
import { SpeedFuelChart } from "../component/SpeedxFuelChart";
import type { SensorData } from '../types/sensor-data';
import { mapToSpeedFuelChartData } from "../utils/utils";

export const Home = () => {
  const data: SensorData[] =  [
  {
    deviceId: 'sensor-001',
    gps: {
      lat: 40.7128,
      lng: -74.0060,
      speed: 50.2,
    },
    temperature: 22.5,
    fuel: {
      current: 30,
      capacity: 60,
    },
  },
  {
    deviceId: 'sensor-002',
    gps: {
      lat: 34.0522,
      lng: -118.2437,
      speed: 65.8,
    },
    temperature: 25.0,
    fuel: {
      current: 15,
    },
  },
  {
    deviceId: 'sensor-003',
    gps: {
      lat: 51.5074,
      lng: -0.1278,
      speed: 0,
    },
    temperature: 19.3,
    fuel: {
      current: 50,
      capacity: 70,
    },
  },
];
const speedXFuel = mapToSpeedFuelChartData(data);
  return (
    <div>
      <div>Home</div>
      <div>
        <SpeedChart data={data}></SpeedChart>
        <FuelChart data={data}></FuelChart>
        <SpeedFuelChart data={speedXFuel}></SpeedFuelChart>
      </div>
    </div>
  )
}

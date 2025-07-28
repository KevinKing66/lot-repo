import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { SensorData } from "../types/sensor-data";

interface Props {
  data: SensorData[];
}

export const SpeedChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map((sensor, index) => ({
    name: `#${index + 1}`,
    speed: sensor?.gps?.speed ?? 0
  }));

  return (
    <>
    <h2>Historial Velocidad</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'km/h', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="speed" stroke="#8884d8" strokeWidth={2} name="Velocidad" />
      </LineChart>
    </ResponsiveContainer>
    </>
  );
};

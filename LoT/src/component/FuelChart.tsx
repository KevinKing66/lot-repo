import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { SensorData } from "../types/sensor-data";
import { formatToMMDD } from "../utils/utils";

interface Props {
  data: SensorData[];
}

export const FuelChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map((sensor) => ({
    name: formatToMMDD(new Date(sensor.createdAt)),
    fuel: sensor!.fuel?.current
  }));

  return (
    <>
      <h2>Historial Combustible</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Litros', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="fuel" fill="#58cc85ff" name="combustible" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

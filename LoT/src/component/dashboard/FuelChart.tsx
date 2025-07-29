import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, type TooltipProps } from "recharts";
import type { SensorData } from "../../types/Sensordata";
import { formatToMMDDHHmm } from "../../utils/date-utils";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface Props {
  data: SensorData[];
}

export const FuelChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map((sensor) => ({
    name: formatToMMDDHHmm(new Date(sensor.createdAt!)),
    fuel: sensor!.fuel?.current,
    createdAt: sensor.createdAt
  }));

  return (
    <>
      <h2>Historial Combustible</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Litros', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="fuel" fill="#58cc85ff" name="combustible" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};


const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const date = new Date(dataPoint.createdAt);
    return (
      <div style={{ background: "#000", padding: 10, border: "1px solid #ccc" }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>{formatToMMDDHHmm(date)}</p>
        <p style={{ margin: 0 }}>{`Combustible: ${dataPoint.fuel} Litros`}</p>
      </div>
    );
  }

  return null;
};
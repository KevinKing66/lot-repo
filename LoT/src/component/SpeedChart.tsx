import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, type TooltipProps } from "recharts";
import type { SensorData } from "../types/Sensordata";
import { formatToMMDDHHmm } from "../utils/utils";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface Props {
  data: SensorData[];
}

export const SpeedChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map((sensor, index) => ({
    name: index + 1,
    speed: sensor?.gps?.speed ?? 0,
    createdAt: sensor.createdAt
  }));

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Historial Velocidad</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'km/h', angle: -90, position: 'insideLeft' }} />
          <CartesianGrid stroke="#ccc" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#8884d8"
            strokeWidth={2}
            name="Velocidad"
          />
        </LineChart>
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
        <p style={{ margin: 0 }}>{`Velocidad: ${dataPoint.speed} km/h`}</p>
      </div>
    );
  }

  return null;
};

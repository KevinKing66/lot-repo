import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import type { SpeedFuelChartEntry } from "../types/speed-fuel-chart";

interface Props {
  data: SpeedFuelChartEntry[];
}

export const SpeedFuelChart: React.FC<Props> = ({ data }) => (
  <>
    <h2>Velocidad/Combustible</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="label" />
        <YAxis yAxisId="left" label={{ value: 'km/h', angle: -90 }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'Combustible', angle: 90 }} />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#8884d8" name="Velocidad" />
        <Line yAxisId="right" type="monotone" dataKey="fuel" stroke="#82ca9d" name="Combustible" />
      </LineChart>
    </ResponsiveContainer>
  </>
);
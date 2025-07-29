import type { SensorData } from "../types/Sensordata";
import type { SpeedFuelChartEntry } from "../types/SpeedFuelChart";

export const mapToSpeedFuelChartData = (data: SensorData[]): SpeedFuelChartEntry[] => {
  return data.map((item, index) => ({
    id: `${index + 1}`,
    speed: item?.gps?.speed ?? 0,
    fuel: item?.fuel?.current ?? 0,
  }));
};


export const formatToMMDD = (date: Date) => date.toLocaleDateString("en-US", {
  month: "2-digit",
  day: "2-digit"
});

export const formatToMMDDHHmm = (value: Date | string | number): string => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return "Invalid date";

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
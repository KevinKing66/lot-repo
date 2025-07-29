import type { SensorData } from "../types/sensor-data";
import type { SpeedFuelChartEntry } from "../types/speed-fuel-chart";

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

export const formatToMMDDHHmm = (date: Date): string => {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sg = String(date.getMinutes()).padStart(2, "0");
  return `${mm}-${dd} ${hh}:${min}:${sg}`;
};
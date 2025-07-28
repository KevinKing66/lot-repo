import type { SensorData } from "../types/sensor-data";
import type { SpeedFuelChartEntry } from "../types/speed-fuel-chart";

export const mapToSpeedFuelChartData = (data: SensorData[]): SpeedFuelChartEntry[] => {
  return data.map((item) => ({
    label: formatToMMDD(new Date(item.createdAt!)),
    speed: item?.gps?.speed ?? 0,
    fuel: item?.fuel?.current ?? 0,
  }));
};


export const formatToMMDD = (date: Date) => date.toLocaleDateString("en-US", {
  month: "2-digit",
  day: "2-digit"
});
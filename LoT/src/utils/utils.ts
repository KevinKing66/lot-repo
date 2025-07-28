import type { SensorData } from "../types/sensor-data";
import type { SpeedFuelChartEntry } from "../types/speed-fuel-chart";

export const mapToSpeedFuelChartData = (data: SensorData[]): SpeedFuelChartEntry[] => {
  return data.map((item, index) => ({
    label: `#${index + 1}`,
    speed: item?.gps?.speed ?? 0,
    fuel: item?.fuel?.current ?? 0,
  }));
};

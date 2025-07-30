import type { SensorData } from "../../sensors/types/Sensordata";
import type { SpeedFuelChartEntry } from "../../sensors/types/SpeedFuelChart";

export const mapToSpeedFuelChartData = (data: SensorData[]): SpeedFuelChartEntry[] => {
  return data.map((item, index) => ({
    id: `${index + 1}`,
    speed: item?.gps?.speed ?? 0,
    fuel: item?.fuel?.current ?? 0,
  }));
};
import { mapToSpeedFuelChartData } from "../../../shared/utils/chart-utils";
import { FuelChart } from "../componets/FuelChart";
import { SpeedChart } from "../componets/SpeedChart"
import { SpeedFuelChart } from "../componets/SpeedxFuelChart";
import { useSensorHistoryData } from "../hooks/useSensorData";

export const Dashboard = () => {
  const {sensors} = useSensorHistoryData();
  console.log("sensors: ", sensors);
  const speedXFuel = mapToSpeedFuelChartData(sensors);
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <SpeedChart data={sensors}></SpeedChart>
        <FuelChart data={sensors}></FuelChart>
        <SpeedFuelChart data={speedXFuel}></SpeedFuelChart>
      </div>
    </div>
  )
}

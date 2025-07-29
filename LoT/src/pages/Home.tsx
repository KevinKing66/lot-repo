import { FuelChart } from "../component/FuelChart";
import { SpeedChart } from "../component/SpeedChart"
import { SpeedFuelChart } from "../component/SpeedxFuelChart";
import { mapToSpeedFuelChartData } from "../utils/chart-utils";
import { useSensorHistoryData } from "../hooks/useSensorData";

export const Home = () => {
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

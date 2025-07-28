import { FuelChart } from "../component/FuelChart";
import { SpeedChart } from "../component/SpeedChart"
import { SpeedFuelChart } from "../component/SpeedxFuelChart";
import { mapToSpeedFuelChartData } from "../utils/utils";
import { useSensorHistoryData } from "../hooks/useSensorData";

export const Home = () => {
  const {sensors: data} = useSensorHistoryData();
  console.log("sensors: ", data);
  const speedXFuel = mapToSpeedFuelChartData(data);
  return (
    <div>
      <div>DashBoard</div>
      <div>
        <SpeedChart data={data}></SpeedChart>
        <FuelChart data={data}></FuelChart>
        <SpeedFuelChart data={speedXFuel}></SpeedFuelChart>
      </div>
    </div>
  )
}

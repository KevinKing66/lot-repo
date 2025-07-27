import { useReducer } from "react";
import { FuelChart } from "../component/FuelChart";
import { SpeedChart } from "../component/SpeedChart"
import { SpeedFuelChart } from "../component/SpeedxFuelChart";
import { mapToSpeedFuelChartData } from "../utils/utils";
import { useSensorData } from "../hooks/useSensorData";

export const Home = () => {
  const [data,  ] = useReducer(useSensorData, null);
  const speedXFuel = mapToSpeedFuelChartData(data?.sensors ?? []);
  return (
    <div>
      <div>DashBoard</div>
      <div>
        <SpeedChart data={data?.sensors ?? []}></SpeedChart>
        <FuelChart data={data?.sensors ?? []}></FuelChart>
        <SpeedFuelChart data={speedXFuel}></SpeedFuelChart>
      </div>
    </div>
  )
}

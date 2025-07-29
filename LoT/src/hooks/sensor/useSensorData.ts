import { useEffect, useReducer } from "react";
import { sensorsReducer, type SensorsState } from "../../reducers/sensorsReducer";
import { useDeviceId } from "./UserDeviceId";
import { useToken } from "../auth/useToken";
import { getSensorHistory } from "../../services/sensorService";

const STORAGE_KEY = "sensors-data";

const init = (): SensorsState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as SensorsState : { sensors: [], loading: false, error: null };
  } catch {
    return { sensors: [], loading: false, error: null };
  }
};

export const useSensorHistoryData = () => {
  const [state, dispatch] = useReducer(sensorsReducer, undefined, init);
  const [token] = useToken();
  const deviceID = useDeviceId();

  useEffect(() => {
    if (!deviceID || !token) return;

    getSensorHistory(deviceID, token)
      .then((data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, sensors: data }));
        dispatch({ type: "SET_DATA", payload: data });
      })
      .catch((error) => dispatch({ type: "FETCH_ERROR", payload: error.message }));
  }, [deviceID, token]);

  return { sensors: state.sensors, dispatch };
};

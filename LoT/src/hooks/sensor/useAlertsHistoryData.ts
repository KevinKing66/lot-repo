import { useEffect, useReducer } from "react";
import { sensorsReducer, type SensorsState } from "../../reducers/sensorsReducer";
import { useToken } from "../auth/useToken";
import { getSensorAlertHistory } from "../../services/sensorService";

const STORAGE_KEY = "history-sensors-data";

const init = (): SensorsState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as SensorsState : { sensors: [], loading: false, error: null };
  } catch {
    return { sensors: [], loading: false, error: null };
  }
};

export const useAlertHistoryData = () => {
  const [state, dispatch] = useReducer(sensorsReducer, undefined, init);
  const [token] = useToken();

  useEffect(() => {
    if (!token) return;
    getSensorAlertHistory(token)
      .then((data) => {
        dispatch({ type: "SET_DATA", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      })
      .finally(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
          console.error("Error saving sensors to localStorage", e);
        }
      });

  }, [token]);

  return { sensors: state.sensors, dispatch };
};

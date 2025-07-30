import { useEffect, useReducer } from "react";
import { sensorsReducer, type SensorsState } from "../reducers/sensorsReducer";
import { getSensorAlertHistory } from "../services/sensorService";
import { useToken } from "../../auth/hooks/useToken";

const STORAGE_KEY = "history-alerts-data";

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
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({...state, sensors: data}));
        } catch (e) {
          console.error("Error saving sensors to localStorage", e);
        }
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      })
      .finally(() => {
      });

  }, [token]);

  return { sensors: state.sensors, dispatch };
};

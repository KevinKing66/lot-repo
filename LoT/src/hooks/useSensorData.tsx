import { useEffect, useReducer } from "react";
import { sensorsReducer, type SensorsState } from "../reducers/sensorsReducer";
import { useDeviceId } from "./UserDeviceId";
import { useToken } from "./useToken";

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
    const [token,] = useToken();
    const deviceID = useDeviceId();
    console.log("-------------hola");

    useEffect(() => {
        console.log("---------------------------------------use sensor history")
        const apiUrl = import.meta.env.VITE_API_URL;
        const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };
        fetch(`${apiUrl}/sensor/history/${deviceID}`, { headers }
        )
            .then((res => res.json()))
            .then((data) => {
                dispatch({ type: "SET_DATA", payload: data });
            })
            .catch((error) => dispatch({ type: "FETCH_ERROR", payload: error.message }));
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error("Error saving sensors to localStorage", e);
        }

        const interval = setInterval(() => {
            const raw = localStorage.getItem(STORAGE_KEY);
            const current = raw ? JSON.parse(raw) as SensorsState : null;
            if (current?.sensors !== state.sensors) {
                dispatch({ type: "SET_DATA", payload: current?.sensors ?? [] });
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [state, deviceID]);

    return { sensors: state.sensors, dispatch };
};

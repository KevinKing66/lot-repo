import { useEffect, useReducer } from "react";
import { sensorsReducer, type SensorsState } from "../reducers/sensorsReducer";

const STORAGE_KEY = "sensors-data";

const init = (): SensorsState => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) as SensorsState : { sensors: [], loading: false, error: null };
    } catch {
        return { sensors: [], loading: false, error: null };
    }
};

export const useUserInfo = () => {
    const [state, dispatch] = useReducer(sensorsReducer, undefined, init);
    const deviceID = "";

    useEffect(() => {    
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/sensor/history/${deviceID}`)
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
            const current =  raw ? JSON.parse(raw) as SensorsState : null;
            if (current !== state) {
                dispatch({ type: "SET_DATA", payload: current?.sensors ?? [] });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [state]);

    return { sensors: state.sensors, dispatch };
};

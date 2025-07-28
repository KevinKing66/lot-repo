import { useEffect, useReducer } from "react";
import { locationReducer, type LocationState } from "../reducers/locationReducer";

const STORAGE_KEY = "sensors-data";

const init = (): LocationState => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) as LocationState : { lat: 0, lng: 0, speed: 0 };
    } catch {
        return { lat: 0, lng: 0, speed: 0 };
    }
};

export const useLocation = () => {
    const [state, dispatch] = useReducer(locationReducer, undefined, init);

    useEffect(() => {

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error("Error saving sensors to localStorage", e);
        }

        const interval = setInterval(() => {
            const raw = localStorage.getItem(STORAGE_KEY);
            const current = raw ? JSON.parse(raw) as LocationState : null;
            const hasChanged: boolean = current?.lat !== state.lat || current?.lng !== state.lng || current?.speed !== state.speed;
            if (current && hasChanged) {
                console.log("hasChanged ", hasChanged);
                dispatch({ type: "SET_POSITION", payload: current });
            }
        }, 500);

        return () => clearInterval(interval);
    }, [state]);

    return state;
};

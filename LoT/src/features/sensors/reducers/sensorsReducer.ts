import type { SensorData } from "../types/Sensordata";

export interface SensorsState {
    sensors: SensorData[];
    loading: boolean;
    error: string | null;
}

type Action =
    | { type: "FETCH_START" }
    | { type: 'SET_DATA'; payload: SensorData[] }
    | { type: "FETCH_ERROR"; payload: string };

export const sensorsReducer = (state: SensorsState, action: Action): SensorsState => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null };
        case 'SET_DATA':
            return { sensors: action.payload, loading: false, error: null };
        case "FETCH_ERROR":
            return { ...state, error: state.error, loading: false }
        default:
            return state!;
    }
};

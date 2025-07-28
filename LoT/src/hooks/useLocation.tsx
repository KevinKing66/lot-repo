import { useEffect, useReducer, useCallback } from "react";
import { locationReducer, type LocationState } from "../reducers/locationReducer";

const STORAGE_KEY = "sensors-data";

const defaultLocation: LocationState = {
  lat: 0,
  lng: 0,
  speed: 0,
};

const init = (initialState: LocationState): LocationState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as LocationState : initialState;
  } catch {
    return initialState;
  }
};

export const useLocation = (initialValue: LocationState = defaultLocation) => {
  const [state, dispatch] = useReducer(
    locationReducer,
    initialValue,
    init
  );

  const setLocation = useCallback((newLocation: LocationState) => {
    dispatch({ type: "SET_POSITION", payload: newLocation });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Error saving sensors to localStorage", e);
    }

    const interval = setInterval(() => {
      const raw = localStorage.getItem(STORAGE_KEY);
      const current = raw ? JSON.parse(raw) as LocationState : null;
      const hasChanged =
        current?.lat !== state.lat ||
        current?.lng !== state.lng ||
        current?.speed !== state.speed;

      if (current && hasChanged) {
        dispatch({ type: "SET_POSITION", payload: current });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [state]);

  return { location: state, setLocation };
};

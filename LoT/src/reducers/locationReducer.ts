export interface LocationState {
  lat: number;
  lng: number;
}

type Action =
  | { type: 'SET_POSITION'; payload: LocationState };

export const locationReducer = (state: LocationState | null, action: Action): LocationState => {
  switch (action.type) {
    case 'SET_POSITION':
      return action.payload;
    default:
      return state!;
  }
};

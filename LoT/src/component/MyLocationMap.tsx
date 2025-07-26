import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useReducer, useRef } from 'react';
import { locationReducer } from '../reducers/locationReducer';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MyLocationMap = () => {
  const [position, dispatch] = useReducer(locationReducer, null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocalización no soportada');
      return;
    }
    const timeRefreshPosition: number = 5000;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        dispatch({ type: 'SET_POSITION', payload: newPosition });

        
        if (mapRef.current) {
          mapRef.current.panTo(newPosition);
        }
      },
      (err) => {
        console.error('Error al obtener la ubicación en tiempo real', err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: timeRefreshPosition,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  if (!isLoaded) return <p>Cargando mapa...</p>;
  if (!position) return <p>Obteniendo ubicación...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={16}
      options={{ clickableIcons: false }}
    >
      <Marker position={position} />
    </GoogleMap>
  );
};

export default MyLocationMap;
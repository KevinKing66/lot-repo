import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useRef } from 'react';
import { useLocation } from '../hooks/useLocation';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MyLocationMap = () => {
  const { location, setLocation } = useLocation();
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
        setLocation(newPosition);

        
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
  }, [setLocation]);

  if (!isLoaded) return <p>Cargando mapa...</p>;
  if (!location) return <p>Obteniendo ubicación...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={16}
      options={{ clickableIcons: false }}
    >
      <Marker position={location} />
    </GoogleMap>
  );
};

export default MyLocationMap;
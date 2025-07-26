// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import { useEffect, useState } from 'react';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const MyLocationMap = () => {
//   const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'TU_API_KEY_AQUI', // reemplaza con tu key
//   });

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         });
//       },
//       (err) => {
//         console.error('Error al obtener la ubicación', err);
//       }
//     );
//   }, []);

//   if (!isLoaded) return <p>Cargando mapa...</p>;
//   if (!position) return <p>Obteniendo ubicación...</p>;

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={position}
//       zoom={15}
//     >
//       <Marker position={position} />
//     </GoogleMap>
//   );
// };

// export default MyLocationMap;



import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useReducer } from 'react';
import { locationReducer } from '../reducers/locationReducer';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const MyLocationMap = () => {
  const [position, dispatch] = useReducer(locationReducer, null);
    const apiKey = import.meta.env.VITE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocalización no soportada');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        dispatch({
          type: 'SET_POSITION',
          payload: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        });
      },
      (err) => {
        console.error('Error al obtener la ubicación en tiempo real', err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
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
      zoom={15}
    >
      <Marker position={position} />
    </GoogleMap>
  );
};

export default MyLocationMap;
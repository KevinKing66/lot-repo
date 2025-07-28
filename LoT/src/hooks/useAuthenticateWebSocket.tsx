import { useEffect, useRef, useState } from 'react';
import { useToken } from './useToken';
import { useDeviceId } from './UserDeviceId';
import type { SensorData } from '../types/sensor-data';
import { useLocation } from './useLocation';

export function useAuthenticatedWebSocket() {
  const [token, setToken] = useToken();
  const deviceId = useDeviceId();
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  const { location: gps } = useLocation();
  const socketRef = useRef<WebSocket | null>(null);
  const sensorDataRef = useRef<SensorData | null>(null);
  const intervalRef = useRef<number | null>(null);

  const hasChanged = (a: SensorData, b: SensorData): boolean => {
    return (
      a.deviceId !== b.deviceId ||
      a.temperature !== b.temperature ||
      a.gps.lat !== b.gps.lat ||
      a.gps.lng !== b.gps.lng ||
      a.gps.speed !== b.gps.speed ||
      a.fuel.current !== b.fuel.current ||
      a.fuel.capacity !== b.fuel.capacity
    );
  };

  const sendMessage = (message: unknown) => {
    if (!message) return;

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('Socket not connected. Message not sent.');
    }
  };

  const closeConnection = () => {
    socketRef.current?.close();
  };

  useEffect(() => {
    if (!token || !deviceId) return;

    const hostname = import.meta.env.VITE_API_HOSTNAME;
    const wsUrl = `ws://${hostname}?token=${token}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    const buildData = (): SensorData => ({
      deviceId,
      gps,
      temperature: 87.5,
      fuel: {
        current: 5,
        capacity: 50
      }
    });

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      setIsConnected(true);

      intervalRef.current = setInterval(() => {
        const data = buildData();
        if (!sensorDataRef.current || hasChanged(sensorDataRef.current, data)) {
          console.log("📤 Enviando data al servidor");
          setSensorData(data);
          sensorDataRef.current = data;
          console.log("sensorDataRef: ", sensorDataRef)
          sendMessage(data)
        }
      }, 2000);
    };

    socket.onmessage = (event) => {
      console.log('📩 Message:', event.data);
      try {
        const data = JSON.parse(event.data);
        if (data?.type === 'error' && data?.reason === 'invalid_token') {
          console.warn('❌ Token inválido, cerrando sesión');
          setToken(null);
          socket.close();
        } else if (data.deviceId === deviceId) {
          // setSensorData(data);
          // sensorDataRef.current = data;
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    socket.onclose = (event) => {
      console.log(`🔌 WebSocket cerrado [${event.code}]: ${event.reason}`);
      setIsConnected(false);
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (event.code === 4001 || event.reason === 'invalid_token') {
        setToken(null);
      }
    };

    socket.onerror = (error) => {
      console.error('⚠️ WebSocket error:', error);
    };

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // socket.close();
    };
  }, [token, deviceId, gps, setToken]);

  useEffect(() => {
    if (sensorData) {
      console.log("✔ sensorData actualizado:", sensorData);
    }
  }, [sensorData]);

  return {
    isConnected,
    sendMessage,
    sensorData,
    closeConnection
  };
}

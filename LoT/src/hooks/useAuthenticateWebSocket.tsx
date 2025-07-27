import { useEffect, useRef, useState } from 'react';
import { useToken } from './useToken';
import { useDeviceId } from './UserDeviceId';
import type { SensorData } from '../types/sensor-data';

export function useAuthenticatedWebSocket() {
  const [token, setToken] = useToken();
  const deviceId = useDeviceId();
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!token || !deviceId) return;

    const hostname = import.meta.env.VITE_API_HOSTNAME;
    const wsUrl = `ws://${hostname}?token=${token}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      console.log('📩 Message:', event.data);
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'error' && data.reason === 'invalid_token') {
          console.warn('❌ Token inválido, cerrando sesión');
          setToken(null);
          socket.close();
        }

        else if (data.deviceId === deviceId) {
          setSensorData(data);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    socket.onclose = (event) => {
      console.log(`🔌 WebSocket closed [${event.code}]: ${event.reason}`);
      setIsConnected(false);

      if (event.code === 4001 || event.reason === 'invalid_token') {
        console.warn('Servidor cerró conexión por token inválido');
        setToken(null);
      } else {
        console.warn('WebSocket cerrado, pero se conserva el token (posible desconexión de red)');
        console.warn("event.code: ", event.code)
      }
    };

    socket.onerror = (error) => {
      console.error('⚠️ WebSocket error:', error);
    };

    return () => {
      // socket.close();
    };
  }, [token, setToken, deviceId, isConnected]);

  const sendMessage = (message: unknown) => {
    console.log("Try to send msg to wss");
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('Socket not connected. Message not sent.');
    }
  };

  const closeConnection = () => {
    socketRef.current?.close();
  };

  return {
    isConnected,
    sendMessage,
    sensorData,
    closeConnection
  };
}

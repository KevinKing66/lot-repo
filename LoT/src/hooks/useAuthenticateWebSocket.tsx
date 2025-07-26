import { useEffect, useRef, useState } from 'react';
import { useToken } from './useToken';

export function useAuthenticatedWebSocket() {
  const [token, setToken] = useToken();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!token) return;

    const wsUrl = `ws://localhost:3000?token=${token}`;
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

        // ⚠️ Solo borrar token si el servidor explícitamente dice que es inválido
        if (data.type === 'error' && data.reason === 'invalid_token') {
          console.warn('❌ Token inválido, cerrando sesión');
          setToken(null);
          socket.close();
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
      }
    };

    socket.onerror = (error) => {
      console.error('⚠️ WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [token, setToken]);

  const sendMessage = (message: unknown) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('Socket not connected. Message not sent.');
    }
  };

  return {
    isConnected,
    sendMessage,
  };
}

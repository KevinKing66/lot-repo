import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export function useToken(): [string | null, (token: string | null) => void] {
  const [token, setTokenState] = useState<string | null>(() => {
    return Cookies.get('token') || null;
  });

  const setToken = (newToken: string | null) => {
    if (newToken) {
      Cookies.set('token', newToken, { expires: 7 });
    } else {
      Cookies.remove('token');
    }
    setTokenState(newToken);
    console.log("El valor del token se ha actualizado")
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const current = Cookies.get('token') || null;
      if (current !== token) {
        setTokenState(current);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [token]);

  return [token, setToken];
}
import './App.css'
import AppRoutes from './core/routes/AppRoutes'
import { AuthProvider } from './features/auth/context/AuthProvider';
import { useAuthenticatedWebSocket } from './features/auth/hooks/useAuthenticateWebSocket';
import { useDeviceId } from './features/sensors/hooks/UserDeviceId';

function App() {
  useDeviceId();
  useAuthenticatedWebSocket();

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App

import './App.css'
import { AuthProvider } from './context/AuthProvider';
import { useAuthenticatedWebSocket } from './hooks/auth/useAuthenticateWebSocket';
import { useDeviceId } from './hooks/sensor/UserDeviceId';
import AppRoutes from './routes/AppRoutes'

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

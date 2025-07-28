import './App.css'
import { AuthProvider } from './context/AuthProvider';
import { useAuthenticatedWebSocket } from './hooks/useAuthenticateWebSocket';
import { useDeviceId } from './hooks/UserDeviceId';
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

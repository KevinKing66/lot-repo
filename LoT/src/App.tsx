import './App.css'
import { AuthProvider } from './context/AuthProvider'
import { useDeviceId } from './hooks/UserDeviceId';
import AppRoutes from './routes/AppRoutes'

function App() {
  useDeviceId();
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App

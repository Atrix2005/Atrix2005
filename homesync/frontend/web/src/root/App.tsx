import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { DevicesPage } from '@/pages/devices/DevicesPage'
import { RoutinesPage } from '@/pages/routines/RoutinesPage'
import { EnergyPage } from '@/pages/energy/EnergyPage'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { useInvalidateOnSocket } from '@/hooks/useInvalidateOnSocket'

export default function App() {
  useInvalidateOnSocket()
  return (
    <AppLayout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/devices" element={<RequireAuth><DevicesPage /></RequireAuth>} />
        <Route path="/routines" element={<RequireAuth><RoutinesPage /></RequireAuth>} />
        <Route path="/energy" element={<RequireAuth><EnergyPage /></RequireAuth>} />
        <Route path="/" element={<Navigate to="/devices" replace />} />
        <Route path="*" element={<Navigate to="/devices" replace />} />
      </Routes>
    </AppLayout>
  )
}
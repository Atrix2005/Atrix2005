import { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { RootState } from '@/store/store'

export function RequireAuth({ children }: PropsWithChildren) {
  const token = useSelector((s: RootState) => s.auth.token)
  const location = useLocation()
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <>{children}</>
}
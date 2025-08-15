import { useEffect, useMemo } from 'react'
import { io, Socket } from 'socket.io-client'

export function useSocket() {
  const socket: Socket | null = useMemo(() => {
    const url = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000'
    const token = localStorage.getItem('token')
    return io(url, {
      autoConnect: true,
      transports: ['websocket'],
      auth: token ? { token } : undefined
    })
  }, [])

  useEffect(() => {
    return () => {
      socket?.disconnect()
    }
  }, [socket])

  return socket
}
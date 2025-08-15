import { useEffect } from 'react'
import { useSocket } from '@/hooks/useSocket'
import { api } from '@/services/api'
import { useDispatch } from 'react-redux'

export function useInvalidateOnSocket() {
  const socket = useSocket()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!socket) return

    const onDeviceUpdate = (payload: any) => {
      const id = payload?.id
      if (id) {
        dispatch(api.util.invalidateTags([{ type: 'Device', id }]))
      }
      dispatch(api.util.invalidateTags([{ type: 'Device', id: 'LIST' }]))
    }

    socket.on('device:update', onDeviceUpdate)

    return () => {
      socket.off('device:update', onDeviceUpdate)
    }
  }, [socket, dispatch])
}
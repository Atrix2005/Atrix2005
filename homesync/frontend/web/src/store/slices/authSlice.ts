import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserProfile {
  id: string
  email: string
  name?: string
}

interface AuthState {
  token: string | null
  user: UserProfile | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; user: UserProfile }>) {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    }
  }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
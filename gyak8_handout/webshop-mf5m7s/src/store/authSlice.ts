import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { AuthUser } from './webshopApi'

// ─── Állapot típusa ───────────────────────────────────────────────────────────

interface AuthState {
  token: string | null
  user: AuthUser | null
}

const initialState: AuthState = {
  token: null,
  user: null,
}

// ─── Slice ────────────────────────────────────────────────────────────────────

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // TODO: setCredentials — tárolja el a tokent és a felhasználó adatait
    setCredentials(state, action: PayloadAction<{ token: string; user: AuthUser }>) {
      state.token = action.payload.token
      state.user = action.payload.user

    },

    // TODO: logout — törölje a tokent és a felhasználó adatait
    logout(state) {
      state.token = null
      state.user = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export const selectToken = (state: RootState) => state.auth.token
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer

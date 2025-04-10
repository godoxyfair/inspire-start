import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
  googleId: string
  name: string
  email: string
}

export type authState = {
  user: User
  isAuth: boolean
  isLoaded: boolean
}

const initialState: authState = {
  user: {
    googleId: '',
    name: '',
    email: '',
  },
  isAuth: false,
  isLoaded: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuth = true
      state.isLoaded = true
    },
    logoutUser: (state) => {
      state.user = { googleId: '', name: '', email: '' }
      state.isAuth = false
      state.isLoaded = true
    },
  },
})

export const { reducer: authSliceReducer, actions: authSliceActions } =
  authSlice

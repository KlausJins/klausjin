import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserStateProps {
  id?: string
  name?: string
  image?: string
  email?: string
  role?: string
}

const initialState: UserStateProps = {
  id: '',
  name: '',
  image: '',
  email: '',
  role: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSession: (state, action: PayloadAction<UserStateProps>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.image = action.payload.image
      state.email = action.payload.email
      state.role = action.payload.role
    },
    clearUserSession: (state) => {
      state.id = ''
      state.name = ''
      state.image = ''
      state.email = ''
      state.role = ''
    }
  }
})

export const { setUserSession, clearUserSession } = userSlice.actions
export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

interface UserStateProps {
  name: string
}

const initialState: UserStateProps = { name: '' }

export const backendNoteSlice = createSlice({
  name: 'backendNote',
  initialState,
  reducers: {}
})

export const {} = backendNoteSlice.actions
export default backendNoteSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

interface UserStateProps {}

const initialState: UserStateProps = {}

export const backendNoteSlice = createSlice({
  name: 'backendNote',
  initialState,
  reducers: {}
})

export const {} = backendNoteSlice.actions
export default backendNoteSlice.reducer

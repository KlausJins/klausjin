import { createSlice } from '@reduxjs/toolkit'

interface TagStateProps {}

const initialState: TagStateProps = {}

export const backendTagSlice = createSlice({
  name: 'backendTag',
  initialState,
  reducers: {}
})

export const {} = backendTagSlice.actions
export default backendTagSlice.reducer

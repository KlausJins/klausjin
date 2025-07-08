import { createSlice } from '@reduxjs/toolkit'

interface TagStateProps {
  name: string
}

const initialState: TagStateProps = { name: '' }

export const backendTagSlice = createSlice({
  name: 'backendTag',
  initialState,
  reducers: {}
})

export const {} = backendTagSlice.actions
export default backendTagSlice.reducer

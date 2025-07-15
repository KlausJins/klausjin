import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserStateProps {
  editId: string
  // 值不重要，主要是为了触发useEffect的触发
  isRefreshTable: boolean
}

const initialState: UserStateProps = { editId: '', isRefreshTable: false }

export const backendNoteSlice = createSlice({
  name: 'backendNote',
  initialState,
  reducers: {
    setEditId(state, action: PayloadAction<string>) {
      state.editId = action.payload
    },
    toggleIsRefreshTable(state) {
      state.isRefreshTable = !state.isRefreshTable
    }
  }
})

export const { setEditId, toggleIsRefreshTable } = backendNoteSlice.actions
export default backendNoteSlice.reducer

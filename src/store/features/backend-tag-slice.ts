import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TagStateProps {
  editId: string
  // 值不重要，主要是为了触发useEffect的触发
  isRefreshTable: boolean
}

const initialState: TagStateProps = { editId: '', isRefreshTable: false }

export const backendTagSlice = createSlice({
  name: 'backendTag',
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

export const { setEditId, toggleIsRefreshTable } = backendTagSlice.actions
export default backendTagSlice.reducer

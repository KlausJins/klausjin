import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserStateProps {
  editId: string
  filterValue?: {
    title?: string
    selectedTags?: string[]
    paging?: { pageIndex: number; limit: number }
  }
  // 值不重要，主要是为了触发useEffect的触发
  isRefreshTable: boolean
}

const initialState: UserStateProps = {
  editId: '',
  isRefreshTable: false,
  filterValue: { title: '', selectedTags: [] }
}

export const backendNoteSlice = createSlice({
  name: 'backendNote',
  initialState,
  reducers: {
    setEditId(state, action: PayloadAction<string>) {
      state.editId = action.payload
    },
    toggleIsRefreshTable(state) {
      state.isRefreshTable = !state.isRefreshTable
    },
    setFilterValue(state, action: PayloadAction<UserStateProps['filterValue']>) {
      state.filterValue = {
        ...state.filterValue,
        ...action.payload
      }
    }
  }
})

export const { setEditId, toggleIsRefreshTable, setFilterValue } = backendNoteSlice.actions
export default backendNoteSlice.reducer

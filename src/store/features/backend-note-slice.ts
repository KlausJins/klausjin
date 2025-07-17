import { Datas } from '@/backend/backend-note/note-table'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserStateProps {
  editId: string
  noteInfos: Datas[]
  // 值不重要，主要是为了触发useEffect的触发
  isRefreshTable: boolean
}

const initialState: UserStateProps = { editId: '', isRefreshTable: false, noteInfos: [] }

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
    setNoteInfos(state, action: PayloadAction<Datas[]>) {
      state.noteInfos = action.payload
    }
  }
})

export const { setEditId, toggleIsRefreshTable, setNoteInfos } = backendNoteSlice.actions
export default backendNoteSlice.reducer

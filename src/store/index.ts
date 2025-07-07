import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user-slice'
import backendTagSlice from './features/backend-tag-slice'
import backendNoteSlice from './features/backend-note-slice'

const isDev = process.env.NODE_ENV === 'development' // 是否是开发环境

export const store = configureStore({
  reducer: {
    user: userReducer,
    backendTag: backendTagSlice,
    backendNote: backendNoteSlice
  },
  devTools: isDev
})

// 类型推导
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

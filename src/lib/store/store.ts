import { configureStore } from '@reduxjs/toolkit'
import canvasReducer from './canvasSlice'
import controlsReducer from './controlsSlice'

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    controls: controlsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
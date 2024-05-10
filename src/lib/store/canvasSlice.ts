import { Ball, Bar } from '../models/CanvasObjects';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface CanvasState {
  currentBar: Bar | null;
  balls: Ball[];
  bars: Bar[];
}

const initialState: CanvasState = {
  currentBar: null,
  balls: [],
  bars: []
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addBall: (state, action: PayloadAction<Ball>) => {
      state.balls.push(action.payload);
    },
    addBar: (state, action: PayloadAction<Bar>) => {
      state.bars.push(action.payload);
    },
    setCurrentBar: (state, action: PayloadAction<Bar | null>) => {
      state.currentBar = action.payload;
    }
  },
})

export const { addBall, addBar,setCurrentBar } = canvasSlice.actions
export const selectBalls = (state: RootState) => state.canvas.balls
export const selectBars = (state: RootState) => state.canvas.bars
export const selectCurrentBar = (state: RootState) => state.canvas.currentBar
export default canvasSlice.reducer
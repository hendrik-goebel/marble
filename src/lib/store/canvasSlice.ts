import {Ball, Bar} from '../models/CanvasObjects';
import {Canvas, EditMode} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {setup} from '../setup'
import type {RootState} from './store'

interface CanvasState {
  canvas: Canvas;
  currentBar: Bar | null;
  balls: Ball[];
  bars: Bar[];
  editMode: EditMode;
}

const initialState: CanvasState = {
  canvas: setup.app.canvas,
  currentBar: null,
  balls: [],
  bars: [],
  editMode: EditMode.none
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addBall: (state, action: PayloadAction<Ball>) => {
      state.balls.push(action.payload);
    },
    setBalls: (state, action: PayloadAction<Ball[]>) => {
      state.balls = action.payload;
    },
    addBar: (state, action: PayloadAction<Bar>) => {
      state.bars.push(action.payload);
    },
    updateBar: (state, action: PayloadAction<Bar>) => {
      state.bars = state.bars.map((bar: Bar) => { if (bar.id == action.payload.id) return action.payload; else return bar;});

    },
    updateBars: (state, action: PayloadAction<Bar[]>) => {
      state.bars = action.payload;
    },
    setCurrentBar: (state, action: PayloadAction<Bar>) => {
      state.currentBar = action.payload;
    },
    setEditMode: (state, action: PayloadAction<EditMode>) => {
      state.editMode = action.payload;
    }
  },
})

export const {
  addBall,
  setBalls,
  addBar,
  setCurrentBar,
  updateBars,
  setEditMode,
  updateBar
} = canvasSlice.actions;
export let selectBalls = (state: RootState) => state.canvas.balls;
export const selectBars = (state: RootState) => state.canvas.bars;
export const selectCanvas = (state: RootState) => state.canvas.canvas;
export const selectCurrentBar = (state: RootState) => state.canvas.currentBar;

export const selectEditMode = (state: RootState) => state.canvas.editMode;

export default canvasSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import setup from '../setup'

interface ControlsState {
  bpm: number
}

const initialState: ControlsState = {
  bpm: setup.app.bpm
}

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    }
  },
})

export const { setBpm} = controlsSlice.actions
export const selectBpm = (state: RootState) => state.controls.bpm
export default controlsSlice.reducer
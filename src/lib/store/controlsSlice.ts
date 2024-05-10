import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import setup from '../setup'
import {Sound} from '../types'

interface ControlsState {
  bpm: number;
  currentSound: Sound;
  sounds: Sound[];
}

const initialState: ControlsState = {
  bpm: setup.app.bpm,
  currentSound: setup.sounds[0],
  sounds: setup.sounds
}

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    },
    setCurrentSound: (state, action: PayloadAction<Sound>) => {
      state.currentSound = action.payload;
    },
    setCurrentSoundById: (state, action: PayloadAction<string>) => {
      state.currentSound = state.sounds.find((sound) => sound.id === action.payload) || state.sounds[0];
    },
  }
})

export const { setBpm, setCurrentSound, setCurrentSoundById} = controlsSlice.actions;
export const selectBpm = (state: RootState) => state.controls.bpm;
export const selectCurrentSound = (state: RootState) => state.controls.currentSound;
export const selectSounds = (state: RootState) => state.controls.sounds;

export default controlsSlice.reducer
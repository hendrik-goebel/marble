import { createSlice } from '@reduxjs/toolkit';
export const controlSlice = createSlice({
  name: 'control',
  initialState: {
    bpm: 120,
    isPulseEnabled: true,
    isPlaying: false,
    quantisation: 16,
    currentSoundId: "1",
    sounds: {
      1: {name: 'A', value: 'C3'},
      2: {name: 'B', value: 'E3'},
      3: {name: 'C', value: 'F3'}
    }
  },
  reducers: {
    setBpm: (state, action) => {
      state.bpm = action.payload;
    },
    setPulseEnabled: (state, action) => {
      state.isPulseEnabled = action.payload;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setQuantisation: (state, action) => {
      state.quantisation = action.payload;
    },
    setCurrentSoundId: (state, action) => {
      state.currentSoundId = action.payload;
    }
  }
});

export const { setBpm, setPulseEnabled, setPlaying, setQuantisation, setCurrentSoundId } = controlSlice.actions;

export default controlSlice.reducer;
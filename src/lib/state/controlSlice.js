import { createSlice } from '@reduxjs/toolkit';
export const controlSlice = createSlice({
  name: 'control',
  initialState: {
    bpm: 120,
    isPulseEnabled: true,
    isPlaying: false
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
    }
  }
});

export const { setBpm, setPulseEnabled, setPlaying } = controlSlice.actions;

export default controlSlice.reducer;
import { configureStore } from '@reduxjs/toolkit'

import controlSlice from './state/controlSlice'

export default configureStore({
  reducer: {
    control: controlSlice,
  },
})
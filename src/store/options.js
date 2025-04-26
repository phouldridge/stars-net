import { createSlice } from '@reduxjs/toolkit'

export const getOptions = state => state.options
export const getMapViewIndex = state => state.options.mapViewIndex

const initialState = {
  mapViewIndex: 0,
  showNames: true,
  showScanners: true
}

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setMapViewIndex: (state, { payload }) => {
      state.mapViewIndex = payload
    },
    toggleOption: (state, { payload }) => {
      state[payload.option] = !state[payload.option]
    }
  }
})

export const { toggleOption, setMapViewIndex } = optionsSlice.actions
export default optionsSlice.reducer

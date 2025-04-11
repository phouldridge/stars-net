import { createSlice } from '@reduxjs/toolkit'

export const getOptions = state => {
  return state.options
}

const initialState = {
  showNames: true,
  showScanners: true
}

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    toggleOption: (state, { payload }) => {
      state[payload.option] = !state[payload.option]
    }
  }
})

export const { toggleOption } = optionsSlice.actions
export default optionsSlice.reducer

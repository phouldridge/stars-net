import { createSlice } from '@reduxjs/toolkit'

export const getStars = state => state.systems.byId
export const getStar = (state, id) => state.systems.byId[id]

const initialState = { byId: {} }
const systemsSlice = createSlice({
  name: 'systems',
  initialState: initialState,
  reducers: {
    setSystemData: (state, payload) => {
      state.byId = payload.payload
    }
  }
})

export const { setSystemData } = systemsSlice.actions
export default systemsSlice.reducer

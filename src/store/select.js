import { createSlice } from '@reduxjs/toolkit'
import { getStars } from './systems'
import _ from 'underscore'

const initialState = {
  active: 'system',
  system: 1,
  fleet: undefined
}

export const getSelectedSystem = state => state.select.system
export const getSelectedFleet = state => state.select.fleet
export const whatsActive = state => state.active

export const nextSystem = state => {
  const total = _.keys(getStars(state)).length
  return state.select.system + 1 < total ? state.select.system + 1 : 0
}

export const prevSystem = state => {
  const total = _.keys(getStars(state)).length
  return state.select.system === 0 ? total - 1 : state.select.system - 1
}

const selectSlice = createSlice({
  name: 'select',
  initialState: initialState,
  reducers: {
    selectSystem: (state, { payload }) => {
      state.system = payload.system
      state.active = 'system'
    },
    selectFleet: (state, { payload }) => {
      state.fleet = payload.fleet
      state.active = 'fleet'
    }
  }
})

export const { selectSystem, selectFleet, incrementSystemSelection } = selectSlice.actions
export default selectSlice.reducer

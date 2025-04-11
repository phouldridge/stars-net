import { createSelector, createSlice } from '@reduxjs/toolkit'
import _ from 'underscore'

const getPlayer = state => state.race.player
export const getTolerances = createSelector([getPlayer], playerRace =>
  _.pick(playerRace, ['gravity', 'temperature', 'radiation'])
)

const initialState = {
  player: {}
}

const raceSlice = createSlice({
  name: 'race',
  initialState: initialState,
  reducers: {
    setRaceData: (state, payload) => {
      state.player = payload.payload
    }
  }
})

export const { setRaceData } = raceSlice.actions
export default raceSlice.reducer

import { createSelector, createSlice } from '@reduxjs/toolkit'
import _ from 'underscore'
import { getSelectedSystem } from './select'

export const getYear = state => {
  console.log(' *** getYear:', state)
  return state.report.report.year
}
export const getSystemReport = (state, id) => _.find(state.report.report.systems, system => system.id === id)
export const getHomeSystem = state => state.report.report.systems[0]
export const getSystems = state => state.report.report.systems
export const getFleets = state => state.report.fleets
export const getFleetsInOrbit = createSelector([getSelectedSystem, getFleets], (systemName, fleets) =>
  _.filter(fleets, fleet => fleet.inOrbit === systemName)
)
export const getReportYear = state => state.report.report.year

const initialState = {
  report: {}
  // year: 2404,
  // designs: [
  //   {
  //     name: 'Starbase',
  //     type: 'starbase',
  //     mass: 115,
  //     fuelCapacity: 0,
  //     armor: 900,
  //     shields: 600,
  //     cloakJam: 0,
  //     scanner: 50,
  //     cargoCapacity: 0,
  //     battleSpeed: 0,
  //     cost: { ironium: 146, boranium: 98, germanium: 259, resources: 642 }
  //   },
  //   {
  //     name: 'Santa Maria',
  //     type: 'ship',
  //     mass: 61,
  //     fuelCapacity: 200,
  //     armor: 20,
  //     shields: 0,
  //     cloakJam: 0,
  //     scanner: 0,
  //     cargoCapacity: 25,
  //     battleSpeed: 0.5,
  //     cost: { ironium: 27, boranium: 10, germanium: 26, resources: 36 }
  //   },
  //   {
  //     name: 'Scout',
  //     type: 'ship',
  //     mass: 19,
  //     fuelCapacity: 50,
  //     armor: 20,
  //     shields: 0,
  //     cloakJam: 0,
  //     scanner: 0,
  //     cargoCapacity: 0,
  //     battleSpeed: 0.5,
  //     cost: { ironium: 10, boranium: 2, germanium: 6, resources: 17 }
  //   }
  // ],
  // fleets: [
  //   {
  //     name: 'Santa Maria #1',
  //     id: '7718adc4-a227-4203-b46b-4afd8f52a546',
  //     type: 'Santa Maria',
  //     position: { x: 117, y: 102 },
  //     inOrbit: 'Hortman',
  //     bearing: '0',
  //     battlePlan: 'default',
  //     fuelOnBoard: '200',
  //     cargo: {
  //       capacity: 0,
  //       ironium: 0,
  //       boranium: 0,
  //       germanium: 0,
  //       colonists: 0
  //     },
  //     waypoints: []
  //   },
  //   {
  //     name: 'Scout #1',
  //     id: '37100251-6f13-4e0a-aa1e-c4cfd331ad1c',
  //     type: 'Scout',
  //     position: { x: 117, y: 102 },
  //     inOrbit: 'Hortman',
  //     bearing: '0',
  //     battlePlan: 'default',
  //     fuelOnBoard: '50',
  //     cargo: {
  //       capacity: 0,
  //       ironium: 0,
  //       boranium: 0,
  //       germanium: 0,
  //       colonists: 0
  //     },
  //     waypoints: []
  //     // {
  //     //   destination: 'Rush',
  //     //   warpFactor: '5',
  //     //   task: 'none'
  //     // }
  //   }
  // ],
}

const reportSlice = createSlice({
  name: 'report',
  initialState: initialState,
  reducers: {
    setReportData: (state, payload) => {
      state.report = payload.payload
    }
  }
})

export const { setReportData } = reportSlice.actions
export default reportSlice.reducer

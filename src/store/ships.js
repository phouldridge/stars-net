import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   current: 1,
//   byId: {
//     1: {
//       name: 'Santa Maria #1',
//       id: 1,
//       ships: [{ design: 'Santa Maria', count: 1 }],
//       position: { x: 117, y: 102 },
//       inOrbit: 'Hortman',
//       bearing: '0',
//       battlePlan: 'default',
//       fuelOnBoard: '200',
//       cargo: {
//         ironium: 0,
//         boranium: 0,
//         germanium: 0,
//         colonists: 0
//       },
//       waypoints: []
//     },
//     2: {
//       name: 'Scout #1',
//       id: 2,
//       ships: [{ design: 'Scout', count: 1 }],
//       position: { x: 117, y: 102 },
//       inOrbit: 'Hortman',
//       bearing: '0',
//       battlePlan: 'default',
//       fuelOnBoard: '50',
//       cargo: {
//         ironium: 0,
//         boranium: 0,
//         germanium: 0,
//         colonists: 0
//       },
//       waypoints: []
//       // {
//       //   destination: 'Rush',
//       //   warpFactor: '5',
//       //   task: 'none'
//       // }
//     }
//   }
// }

const initialState = {
  tech: {},
  fleets: { id: 1, name: 'fleet 1' },
  ships: { id: 1 },
  design: { id: 1, name: 'large freighter' },
  components: {
    id: 1,
    name: 'daddy long legs',
    type: 'engine',
    cost: { resources: 5, ironium: 5, boranium: 5, germanium: 5 },
    mass: 100,
    tech: { propulsion: 5 }
  }
}

const fleetsSlice = createSlice({
  name: 'fleets',
  initialState: initialState,
  reducers: {}
})

// export const {} = starsSlice.actions
export default fleetsSlice.reducer

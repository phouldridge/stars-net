import { createSelector, createSlice } from '@reduxjs/toolkit'
import _ from 'underscore'

export const hullTileTypes = ['single', 'multi', 'cargo', 'dock', 'general', 'circle']
const [SINGLE, MULTI, CARGO, DOCK, GENERAL, CIRCLE] = hullTileTypes

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

export const getHullNames = createSelector([state => state.ships.hulls.byName], hullsByName => _.keys(hullsByName))
export const getHullData = (state, name) =>
  state.ships.hulls.availableByName[name] || state.ships.hulls.enemyByName[name]
export const getAvailableHulls = state => state.ships.hulls.availableByName
export const getEnemyHulls = state => state.ships.hullsenemyByName
export const getHullsByName = (state, forShips = true, forEnemy = false) => {
  const hulls = forEnemy ? state.ships.hulls.enemyByName : state.ships.hulls.availableByName
  return _.pick(hulls, hull => hull.type === (forShips ? 'Ships' : 'Starbases'))
}
export const getComponents = state => state.ships.components

const initialState = {
  tech: {},
  fleets: { id: 1, name: 'fleet 1' },
  ships: { id: 1 },
  design: { id: 1, name: 'large freighter' },
  components: [
    { name: 'Quick Jump 5', type: 'Engines', index: 0 },
    { name: 'Long Hump 6', type: 'Engines', index: 1 },
    { name: 'Daddy Long Legs 7', type: 'Engines', index: 2 },
    { name: 'Alpha Drive 8', type: 'Engines', index: 3 },
    { name: 'Trans-Galactic Drive', type: 'Engines', index: 4 },
    { name: 'Trans-Star 10', type: 'Engines', index: 5 },
    { name: 'Radiating Hydro-Ram Scoop', type: 'Engines', index: 6 },
    { name: 'Sub-Galactic Fuel Scoop', type: 'Engines', index: 7 },
    { name: 'Trans-Galactic Fuel Scoop', type: 'Engines', index: 8 },
    { name: 'Trans-Galactic Super Scoop', type: 'Engines', index: 9 },
    { name: 'Trans-Galactic Mizer Scoop', type: 'Engines', index: 10 },
    { name: 'Bat Scanner', type: 'Scanners', index: 0 },
    { name: 'Rhino Scanner', type: 'Scanners', index: 1 },
    { name: 'Mole Scanner', type: 'Scanners', index: 2 },
    { name: 'DNS Scanner', type: 'Scanners', index: 3 },
    { name: 'Possum Scanner', type: 'Scanners', index: 4 },
    { name: 'Ferret Scanner', type: 'Scanners', index: 5 },
    { name: 'Dolphin Scanner', type: 'Scanners', index: 6 },
    { name: 'Gazelle Scanner', type: 'Scanners', index: 7 },
    { name: 'RNA Scanner', type: 'Scanners', index: 8 },
    { name: 'Cheetah Scanner', type: 'Scanners', index: 9 },
    { name: 'Elephant Scanner', type: 'Scanners', index: 10 },
    { name: 'Eagle Eye Scanner', type: 'Scanners', index: 11 },
    { name: 'Peerless Scanner', type: 'Scanners', index: 12 },
    { name: 'Mole-skin Shield', type: 'Shields', index: 0 },
    { name: 'Cow-hide Shield', type: 'Shields', index: 1 },
    { name: 'Wolverine Diffuse Shield', type: 'Shields', index: 2 },
    { name: 'Bear Neutrino Barrier', type: 'Shields', index: 3 },
    { name: 'Gorilla Delegator', type: 'Shields', index: 4 },
    { name: 'Elephant Hide Fortress', type: 'Shields', index: 5 },
    { name: 'Complete Phase Shield', type: 'Shields', index: 6 },
    { name: 'Tritanium', type: 'Armor', index: 0 },
    { name: 'Crobmnium', type: 'Armor', index: 1 },
    { name: 'Carbonic Armor', type: 'Armor', index: 2 },
    { name: 'Strobnium', type: 'Armor', index: 3 },
    { name: 'Organic Armor', type: 'Armor', index: 4 },
    { name: 'Kelarium', type: 'Armor', index: 5 },
    { name: 'Neutronium', type: 'Armor', index: 6 },
    { name: 'Valanium', type: 'Armor', index: 7 },
    { name: 'Superlatanium', type: 'Armor', index: 8 },
    { name: 'Laser', type: 'Beam Weapons', index: 0 },
    { name: 'X-Ray Laser', type: 'Beam Weapons', index: 1 },
    { name: 'Yakimora Light Phaser', type: 'Beam Weapons', index: 2 },
    { name: 'Blackjack', type: 'Beam Weapons', index: 3 },
    { name: 'Phaser Bazooka', type: 'Beam Weapons', index: 4 },
    { name: 'Pulsed Sapper', type: 'Beam Weapons', index: 5 },
    { name: 'Colloidal Phaser', type: 'Beam Weapons', index: 6 },
    { name: 'Gatling Gun', type: 'Beam Weapons', index: 7 },
    { name: 'Mini Blaster', type: 'Beam Weapons', index: 8 },
    { name: 'Bludgeon', type: 'Beam Weapons', index: 9 },
    { name: 'Mark IV Blaster', type: 'Beam Weapons', index: 10 },
    { name: 'Phased Sapper', type: 'Beam Weapons', index: 11 },
    { name: 'Heavy Blaster', type: 'Beam Weapons', index: 12 },
    { name: 'Myopic Disrupter', type: 'Beam Weapons', index: 13 },
    { name: 'Disrupter', type: 'Beam Weapons', index: 14 },
    { name: 'Syncro Sapper', type: 'Beam Weapons', index: 15 },
    { name: 'Mega Disrupter', type: 'Beam Weapons', index: 16 },
    { name: 'Big Mutha Cannon', type: 'Beam Weapons', index: 17 },
    { name: 'Streaming Pulverizer', type: 'Beam Weapons', index: 18 },
    { name: 'Anit-Matter Pulverizer', type: 'Beam Weapons', index: 19 },
    { name: 'Alpha Torpedo', type: 'Torpedoes', index: 0 },
    { name: 'Beta Torpedo', type: 'Torpedoes', index: 1 },
    { name: 'Delta Torpedo', type: 'Torpedoes', index: 2 },
    { name: 'Epsilon Torpedo', type: 'Torpedoes', index: 3 },
    { name: 'Rho Torpedo', type: 'Torpedoes', index: 4 },
    { name: 'Upsilon Torpedo', type: 'Torpedoes', index: 5 },
    { name: 'Omega Torpedo', type: 'Torpedoes', index: 6 },
    { name: 'Jihad Missle', type: 'Torpedoes', index: 7 },
    { name: 'Juggernaut Missle', type: 'Torpedoes', index: 8 },
    { name: 'Doomsday Missle', type: 'Torpedoes', index: 9 },
    { name: 'Armageddon Missle', type: 'Torpedoes', index: 10 },
    { name: 'Lady Finger Bomb', type: 'Bombs', index: 0 },
    { name: 'Black Cat Bomb', type: 'Bombs', index: 1 },
    { name: 'M-70 Bomb', type: 'Bombs', index: 2 },
    { name: 'M-80 Bomb', type: 'Bombs', index: 3 },
    { name: 'Cherry Bomb', type: 'Bombs', index: 4 },
    { name: 'LBU-17 Bomb', type: 'Bombs', index: 5 },
    { name: 'LBU-32 Bomb', type: 'Bombs', index: 6 },
    { name: 'LBU-74 Bomb', type: 'Bombs', index: 7 },
    { name: 'Smart Bomb', type: 'Bombs', index: 8 },
    { name: 'Neutron Bomb', type: 'Bombs', index: 9 },
    { name: 'Enriched Neutron Bomb', type: 'Bombs', index: 10 },
    { name: 'Peerless Bomb', type: 'Bombs', index: 11 },
    { name: 'Annihilator Bomb', type: 'Bombs', index: 12 },
    { name: 'Robo-Mini-Miner', type: 'Mining Robots', index: 0 },
    { name: 'Robo-Miner', type: 'Mining Robots', index: 1 },
    { name: 'Robo-Maxi-Miner', type: 'Mining Robots', index: 2 },
    { name: 'Robo-Super-Miner', type: 'Mining Robots', index: 3 },
    { name: 'Mine Dispencer 50', type: 'Mine Layers', index: 0 },
    { name: 'Stealth Cloak', type: 'Electrical', index: 0 },
    { name: 'Super-Stealth Cloak', type: 'Electrical', index: 1 },
    { name: 'Battle Computer', type: 'Electrical', index: 2 },
    { name: 'Battle Super Computer', type: 'Electrical', index: 3 },
    { name: 'Battle Nexus', type: 'Electrical', index: 4 },
    { name: 'Jammer 20', type: 'Electrical', index: 5 },
    { name: 'Jammer 23', type: 'Electrical', index: 6 },
    { name: 'Energy Capacitor', type: 'Electrical', index: 7 },
    { name: 'Colonization Module', type: 'Mechanical', index: 0 },
    { name: 'Cargo Pod', type: 'Mechanical', index: 1 },
    { name: 'Super Cargo Pod', type: 'Mechanical', index: 2 },
    { name: 'Fuel Tank', type: 'Mechanical', index: 3 },
    { name: 'Super Fuel Tank', type: 'Mechanical', index: 4 },
    { name: 'Maneuvering Jet', type: 'Mechanical', index: 5 },
    { name: 'Overthruster', type: 'Mechanical', index: 6 },
    { name: 'Bean Deflector', type: 'Mechanical', index: 7 },
    { name: 'Stargate 100/250', type: 'Orbital', index: 0 },
    { name: 'Stargate 150/600', type: 'Orbital', index: 1 },
    { name: 'Stargate 300/500', type: 'Orbital', index: 2 },
    { name: 'Mass Driver 7', type: 'Orbital', index: 3 },
    { name: 'Mass Driver 10', type: 'Orbital', index: 4 }
  ],
  hulls: {
    availableByName: {
      'Colony Ship': {
        name: 'Colony Ship',
        type: 'Ships',
        fuel: 200,
        armor: 20,
        initiative: 0,
        mass: 20,
        resoures: 20,
        layout: [
          { type: SINGLE, component: 'Engine', needs: 1, placement: { x: 0, y: 0 } },
          { type: CARGO, capacity: 25, placement: { x: 2, y: 0 } },
          { type: SINGLE, component: 'Mech', upto: 1, placement: { x: 4, y: 0 } }
        ]
      },
      Destroyer: {
        name: 'Destroyer',
        type: 'Ships',
        fuel: 280,
        armor: 200,
        initiative: 3,
        mass: 30,
        resoures: 35,
        tech: { con: 3 },
        layout: [
          { type: SINGLE, component: 'Engine', needs: 1, placement: { x: 0, y: 3 } },
          { type: SINGLE, component: 'Armor', upto: 2, placement: { x: 2, y: 3 } },
          { type: GENERAL, upto: 1, placement: { x: 4, y: 3 } },
          { type: SINGLE, component: 'Mech', upto: 1, placement: { x: 1, y: 1 } },
          { type: SINGLE, component: 'Elect', upto: 1, placement: { x: 1, y: 5 } },
          { type: SINGLE, component: 'Weapon', upto: 1, placement: { x: 3, y: 0 } },
          { type: SINGLE, component: 'Weapon', upto: 1, placement: { x: 3, y: 6 } }
        ]
      },
      Frigate: {
        name: 'Frigate',
        type: 'Ships',
        fuel: 125,
        armor: 45,
        initiative: 4,
        mass: 8,
        resoures: 12,
        tech: { con: 6 },
        layout: [
          { type: SINGLE, component: 'Engine', needs: 1, placement: { x: 0, y: 0 } },
          { type: MULTI, components: ['Shield', 'Armor'], upto: 2, placement: { x: 2, y: 0 } },
          { type: GENERAL, upto: 3, placement: { x: 4, y: 0 } },
          { type: SINGLE, component: 'Scanner', upto: 2, placement: { x: 6, y: 0 } }
        ]
      },
      'Super Freighter': {
        name: 'Super Freighter',
        type: 'Ships',
        fuel: 8000,
        armor: 400,
        initiative: 0,
        mass: 175,
        resoures: 125,
        tech: { con: 13 },
        layout: [
          { type: SINGLE, component: 'Engine', needs: 3, placement: { x: 0, y: 2 } },
          { type: CARGO, capacity: 3000, placement: { x: 2, y: 0 }, width: 6, height: 6 },
          { type: MULTI, components: ['Scanner', 'Elect', 'Mech'], upto: 3, placement: { x: 8, y: 0 } },
          { type: MULTI, components: ['Shield', 'Armor'], upto: 5, placement: { x: 8, y: 2 } },
          { type: SINGLE, component: 'Elect', upto: 2, placement: { x: 8, y: 4 } }
        ]
      },
      'Orbital Fort': {
        name: 'Orbital Fort',
        type: 'Starbases',
        layout: [
          { type: SINGLE, component: 'Weapon', upto: 12, placement: { x: 2, y: 0 } },
          { type: MULTI, components: ['Shield', 'Armor'], upto: 12, placement: { x: 0, y: 2 } },
          { type: MULTI, components: ['Orbital', 'Elect'], upto: 1, placement: { x: 2, y: 2 } },
          { type: MULTI, components: ['Shield', 'Armor'], upto: 12, placement: { x: 4, y: 2 } },
          { type: SINGLE, component: 'Weapon', upto: 12, placement: { x: 2, y: 4 } }
        ]
      },
      'Space Dock': {
        name: 'Space Dock',
        type: 'Starbases',
        layout: [
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 3, y: 0 } },
          { type: SINGLE, component: 'Elect', upto: 2, placement: { x: 5, y: 1 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 6, y: 3 } },
          { type: SINGLE, component: 'Elect', upto: 2, placement: { x: 5, y: 5 } },
          { type: SINGLE, component: 'Shield', upto: 24, placement: { x: 3, y: 6 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 1, y: 5 } },
          { type: MULTI, components: ['Shield', 'Armor'], upto: 24, placement: { x: 0, y: 3 } },
          { type: MULTI, components: ['Orbital', 'Elect'], upto: 1, placement: { x: 1, y: 1 } },
          { type: CIRCLE, capacity: 200, placement: { x: 2, y: 2 }, width: 4, height: 4 }
        ]
      },
      'Space Station': {
        name: 'Space Station',
        type: 'Starbases',
        armor: 1000,
        resoures: 600,
        layout: [
          { type: SINGLE, component: 'Shield', upto: 16, placement: { x: 3, y: 0 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 5, y: 0 } },
          { type: SINGLE, component: 'Elect', upto: 3, placement: { x: 4, y: 2 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 0, y: 3 } },
          { type: MULTI, components: ['Shield', 'Armor'], upto: 16, placement: { x: 8, y: 3 } },
          { type: MULTI, components: ['Orbital', 'Elect'], upto: 1, placement: { x: 2, y: 4 } },
          { type: DOCK, capacity: 'unlimited', placement: { x: 4, y: 4 } },
          { type: MULTI, components: ['Orbital', 'Elect'], upto: 1, placement: { x: 6, y: 4 } },
          { type: MULTI, components: ['Shield', 'Armor'], upto: 16, placement: { x: 0, y: 5 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 8, y: 5 } },
          { type: SINGLE, component: 'Elect', upto: 3, placement: { x: 4, y: 6 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 3, y: 8 } },
          { type: SINGLE, component: 'Shield', upto: 16, placement: { x: 5, y: 8 } }
        ]
      },
      'Ultra Station': {
        name: 'Ultra Station',
        type: 'Starbases',
        armor: 1000,
        resoures: 600,
        layout: [
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 3, y: 0 } },
          { type: SINGLE, component: 'Elect', upto: 3, placement: { x: 5, y: 0 } },
          { type: MULTI, components: ['Shield', 'Armor'], upto: 20, placement: { x: 2, y: 2 } },
          { type: MULTI, components: ['Orbital', 'Elect'], upto: 1, placement: { x: 4, y: 2 } },
          { type: SINGLE, component: 'Shield', upto: 20, placement: { x: 6, y: 2 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 0, y: 3 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 8, y: 3 } },
          { type: SINGLE, component: 'Elect', upto: 3, placement: { x: 2, y: 4 } },
          { type: DOCK, capacity: 'unlimited', placement: { x: 4, y: 4 } },
          { type: SINGLE, component: 'Elect', upto: 3, placement: { x: 6, y: 4 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 0, y: 5 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 8, y: 5 } },
          { type: SINGLE, component: 'Shield', upto: 20, placement: { x: 2, y: 6 } },
          { type: MULTI, components: ['Orbital', 'Elect'], upto: 1, placement: { x: 4, y: 6 } },
          { type: MULTI, components: ['Shield', 'Armor'], upto: 20, placement: { x: 6, y: 6 } },
          { type: SINGLE, component: 'Elect', upto: 3, placement: { x: 3, y: 8 } },
          { type: SINGLE, component: 'Weapon', upto: 16, placement: { x: 5, y: 8 } }
        ]
      }
    },
    enemyByName: {}
  }
}

const fleetsSlice = createSlice({
  name: 'fleets',
  initialState: initialState,
  reducers: {}
})

// export const {} = starsSlice.actions
export default fleetsSlice.reducer

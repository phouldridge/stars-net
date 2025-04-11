import { createSlice } from '@reduxjs/toolkit'
import random from 'random'
import _ from 'underscore'

export const getTolerances = state => _.pick(state.race, ['gravity', 'temperature', 'radiation'])
export const getPlayerNames = state => _.keys(state.server.players)
export const getPlayer = (state, player) => state.server.players[player]
export const getReport = (state, player) => state.server.reports[player]
export const getSystems = state =>
  _.reduce(
    state.server.systemsById,
    (result, system) => ({
      ...result,
      [system.id]: _.pick(system, ['id', 'name', 'planet', 'location'])
    }),
    {}
  )

const getValue = (x, range) => {
  const mid = (range.max + range.min) / 2
  const m = x <= mid ? 1 / (range.min - mid) : 1 / (range.max - mid)
  return m * (mid - x) + 1
}

export const getHabitatValue = (tolerances, values) => {
  const g = getValue(values.gravity / 100, { max: tolerances.gravity.max / 100, min: tolerances.gravity.min / 100 })
  const t = getValue(values.temperature / 100, {
    max: tolerances.temperature.max / 100,
    min: tolerances.temperature.min / 100
  })
  const r = getValue(values.radiation / 100, {
    max: tolerances.radiation.max / 100,
    min: tolerances.radiation.min / 100
  })
  const anyNegative = g < 0 || t < 0 || r < 0
  const finalValues = anyNegative ? [g, t, r].filter(v => v < 0) : [g, t, r]
  return (finalValues.reduce((sum, v) => sum + v, 0) / finalValues.length) * 100
}

export const printSystems = () => {
  const tolerances = _.pick(initialState.players.Humanoid, ['gravity', 'temperature', 'radiation'])
  console.log(
    _.map(initialState.systemsById, s => ({
      system: s.name,
      value: getHabitatValue(tolerances, _.pick(s, ['gravity', 'temperature', 'radiation'])).toFixed(2)
    }))
  )
}

const initialState = {
  year: 2400,
  systemsById: {
    0: {
      id: 0,
      name: 'Almighty',
      planet: '9rvpjwoj.png',
      location: {
        x: 352,
        y: 339
      },
      gravity: 47,
      temperature: 15,
      radiation: 0,
      ironium: {
        max: 3574,
        surface: 0
      },
      boranium: {
        max: 572,
        surface: 0
      },
      germanium: {
        max: 710,
        surface: 0
      }
    },
    1: {
      id: 1,
      name: 'Iceball',
      planet: 'at41td4j.png',
      location: {
        x: 535,
        y: 119
      },
      gravity: 96,
      temperature: 16,
      radiation: 83,
      ironium: {
        max: 1983,
        surface: 0
      },
      boranium: {
        max: 435,
        surface: 0
      },
      germanium: {
        max: 4934,
        surface: 0
      }
    },
    2: {
      id: 2,
      name: 'Pyxidis',
      planet: 'n8dyfe9i.png',
      location: {
        x: 498,
        y: 446
      },
      gravity: 3,
      temperature: 40,
      radiation: 46,
      ironium: {
        max: 1911,
        surface: 0
      },
      boranium: {
        max: 4832,
        surface: 0
      },
      germanium: {
        max: 240,
        surface: 0
      }
    },
    3: {
      id: 3,
      name: 'Wilcox',
      planet: 'wjehz2lz.png',
      location: {
        x: 163,
        y: 370
      },
      gravity: 47,
      temperature: 80,
      radiation: 33,
      ironium: {
        max: 3789,
        surface: 0
      },
      boranium: {
        max: 3164,
        surface: 0
      },
      germanium: {
        max: 3629,
        surface: 0
      }
    },
    4: {
      id: 4,
      name: 'Perlich',
      planet: 'x5i1u2rd.png',
      location: {
        x: 96,
        y: 222
      },
      gravity: 11,
      temperature: 56,
      radiation: 17,
      ironium: {
        max: 3581,
        surface: 0
      },
      boranium: {
        max: 1736,
        surface: 0
      },
      germanium: {
        max: 290,
        surface: 0
      }
    },
    5: {
      id: 5,
      name: 'Hayes',
      planet: '9rvpjwoj.png',
      location: {
        x: 326,
        y: 484
      },
      gravity: 100,
      temperature: 10,
      radiation: 98,
      ironium: {
        max: 1645,
        surface: 0
      },
      boranium: {
        max: 4471,
        surface: 0
      },
      germanium: {
        max: 819,
        surface: 0
      }
    },
    6: {
      id: 6,
      name: 'Wichrowski',
      planet: 'n8dyfe9i.png',
      location: {
        x: 460,
        y: 550
      },
      gravity: 66,
      temperature: 90,
      radiation: 16,
      ironium: {
        max: 2949,
        surface: 0
      },
      boranium: {
        max: 1050,
        surface: 0
      },
      germanium: {
        max: 4510,
        surface: 0
      }
    },
    7: {
      id: 7,
      name: 'Schaefer',
      planet: 'n8dyfe9i.png',
      location: {
        x: 245,
        y: 226
      },
      gravity: 16,
      temperature: 29,
      radiation: 74,
      ironium: {
        max: 3019,
        surface: 0
      },
      boranium: {
        max: 3280,
        surface: 0
      },
      germanium: {
        max: 428,
        surface: 0
      }
    },
    8: {
      id: 8,
      name: 'Dingly Dell',
      planet: 'x5i1u2rd.png',
      location: {
        x: 498,
        y: 202
      },
      gravity: 13,
      temperature: 48,
      radiation: 87,
      ironium: {
        max: 2873,
        surface: 0
      },
      boranium: {
        max: 984,
        surface: 0
      },
      germanium: {
        max: 3551,
        surface: 0
      }
    },
    9: {
      id: 9,
      name: 'Stilton',
      planet: 'at41td4j.png',
      location: {
        x: 195,
        y: 195
      },
      gravity: 73,
      temperature: 82,
      radiation: 47,
      ironium: {
        max: 289,
        surface: 0
      },
      boranium: {
        max: 1307,
        surface: 0
      },
      germanium: {
        max: 4132,
        surface: 0
      }
    },
    10: {
      id: 10,
      name: 'Covenant',
      planet: 'n8dyfe9i.png',
      location: {
        x: 160,
        y: 78
      },
      gravity: 49,
      temperature: 98,
      radiation: 23,
      ironium: {
        max: 3652,
        surface: 0
      },
      boranium: {
        max: 2563,
        surface: 0
      },
      germanium: {
        max: 3721,
        surface: 0
      }
    },
    11: {
      id: 11,
      name: 'Patton',
      planet: 'x5i1u2rd.png',
      location: {
        x: 330,
        y: 264
      },
      gravity: 73,
      temperature: 98,
      radiation: 10,
      ironium: {
        max: 4571,
        surface: 0
      },
      boranium: {
        max: 3437,
        surface: 0
      },
      germanium: {
        max: 4806,
        surface: 0
      }
    },
    12: {
      id: 12,
      name: 'Skloot',
      planet: 'at41td4j.png',
      location: {
        x: 313,
        y: 108
      },
      gravity: 50,
      temperature: 50,
      radiation: 50,
      ironium: {
        max: 259,
        surface: 305
      },
      boranium: {
        max: 4275,
        surface: 332
      },
      germanium: {
        max: 2511,
        surface: 363
      }
    },
    13: {
      id: 13,
      name: 'Cicatello',
      planet: '9rvpjwoj.png',
      location: {
        x: 81,
        y: 520
      },
      gravity: 8,
      temperature: 50,
      radiation: 98,
      ironium: {
        max: 2887,
        surface: 0
      },
      boranium: {
        max: 1973,
        surface: 0
      },
      germanium: {
        max: 3634,
        surface: 0
      }
    },
    14: {
      id: 14,
      name: 'Wolden',
      planet: 'at41td4j.png',
      location: {
        x: 198,
        y: 448
      },
      gravity: 11,
      temperature: 84,
      radiation: 8,
      ironium: {
        max: 1876,
        surface: 0
      },
      boranium: {
        max: 4982,
        surface: 0
      },
      germanium: {
        max: 2217,
        surface: 0
      }
    },
    15: {
      id: 15,
      name: 'Data',
      planet: 'x5i1u2rd.png',
      location: {
        x: 540,
        y: 42
      },
      gravity: 43,
      temperature: 47,
      radiation: 80,
      ironium: {
        max: 3393,
        surface: 0
      },
      boranium: {
        max: 1382,
        surface: 0
      },
      germanium: {
        max: 4419,
        surface: 0
      }
    },
    16: {
      id: 16,
      name: 'Fluffy',
      planet: 'n8dyfe9i.png',
      location: {
        x: 193,
        y: 280
      },
      gravity: 16,
      temperature: 36,
      radiation: 27,
      ironium: {
        max: 2978,
        surface: 0
      },
      boranium: {
        max: 4345,
        surface: 0
      },
      germanium: {
        max: 1257,
        surface: 0
      }
    },
    17: {
      id: 17,
      name: 'Goutremout',
      planet: 'wjehz2lz.png',
      location: {
        x: 357,
        y: 64
      },
      gravity: 50,
      temperature: 60,
      radiation: 62,
      ironium: {
        max: 3219,
        surface: 0
      },
      boranium: {
        max: 2501,
        surface: 0
      },
      germanium: {
        max: 2931,
        surface: 0
      }
    },
    18: {
      id: 18,
      name: 'Parsley',
      planet: 'at41td4j.png',
      location: {
        x: 111,
        y: 274
      },
      gravity: 50,
      temperature: 80,
      radiation: 35,
      ironium: {
        max: 2211,
        surface: 421
      },
      boranium: {
        max: 3797,
        surface: 345
      },
      germanium: {
        max: 2896,
        surface: 234
      }
    },
    19: {
      id: 19,
      name: 'Stove Top',
      planet: 'n8dyfe9i.png',
      location: {
        x: 237,
        y: 325
      },
      gravity: 86,
      temperature: 2,
      radiation: 63,
      ironium: {
        max: 4716,
        surface: 0
      },
      boranium: {
        max: 2966,
        surface: 0
      },
      germanium: {
        max: 4602,
        surface: 0
      }
    },
    20: {
      id: 20,
      name: 'Purgatory',
      planet: 'x5i1u2rd.png',
      location: {
        x: 434,
        y: 57
      },
      gravity: 9,
      temperature: 65,
      radiation: 68,
      ironium: {
        max: 4218,
        surface: 0
      },
      boranium: {
        max: 238,
        surface: 0
      },
      germanium: {
        max: 3189,
        surface: 0
      }
    },
    21: {
      id: 21,
      name: 'Dewey',
      planet: 'n8dyfe9i.png',
      location: {
        x: 221,
        y: 513
      },
      gravity: 8,
      temperature: 81,
      radiation: 25,
      ironium: {
        max: 559,
        surface: 0
      },
      boranium: {
        max: 2138,
        surface: 0
      },
      germanium: {
        max: 3213,
        surface: 0
      }
    },
    22: {
      id: 22,
      name: 'Gaia 2',
      planet: 'n8dyfe9i.png',
      location: {
        x: 324,
        y: 428
      },
      gravity: 30,
      temperature: 83,
      radiation: 40,
      ironium: {
        max: 771,
        surface: 0
      },
      boranium: {
        max: 1202,
        surface: 0
      },
      germanium: {
        max: 1264,
        surface: 0
      }
    },
    23: {
      id: 23,
      name: 'Manikas',
      planet: 'at41td4j.png',
      location: {
        x: 219,
        y: 160
      },
      gravity: 7,
      temperature: 94,
      radiation: 97,
      ironium: {
        max: 4558,
        surface: 0
      },
      boranium: {
        max: 1649,
        surface: 0
      },
      germanium: {
        max: 3038,
        surface: 0
      }
    },
    24: {
      id: 24,
      name: 'Harman',
      planet: 'n8dyfe9i.png',
      location: {
        x: 253,
        y: 121
      },
      gravity: 37,
      temperature: 98,
      radiation: 23,
      ironium: {
        max: 2713,
        surface: 0
      },
      boranium: {
        max: 4505,
        surface: 0
      },
      germanium: {
        max: 4411,
        surface: 0
      }
    },
    25: {
      id: 25,
      name: 'Dowding',
      planet: 'n8dyfe9i.png',
      location: {
        x: 477,
        y: 275
      },
      gravity: 45,
      temperature: 61,
      radiation: 72,
      ironium: {
        max: 956,
        surface: 0
      },
      boranium: {
        max: 405,
        surface: 0
      },
      germanium: {
        max: 2803,
        surface: 0
      }
    },
    26: {
      id: 26,
      name: 'Chubs',
      planet: 'at41td4j.png',
      location: {
        x: 442,
        y: 94
      },
      gravity: 88,
      temperature: 100,
      radiation: 21,
      ironium: {
        max: 585,
        surface: 0
      },
      boranium: {
        max: 3935,
        surface: 0
      },
      germanium: {
        max: 4555,
        surface: 0
      }
    },
    27: {
      id: 27,
      name: 'Phicol',
      planet: '9rvpjwoj.png',
      location: {
        x: 346,
        y: 140
      },
      gravity: 6,
      temperature: 4,
      radiation: 78,
      ironium: {
        max: 4305,
        surface: 0
      },
      boranium: {
        max: 1697,
        surface: 0
      },
      germanium: {
        max: 4313,
        surface: 0
      }
    },
    28: {
      id: 28,
      name: 'Willa',
      planet: 'x5i1u2rd.png',
      location: {
        x: 436,
        y: 409
      },
      gravity: 50,
      temperature: 50,
      radiation: 50,
      ironium: {
        max: 3022,
        surface: 223
      },
      boranium: {
        max: 3178,
        surface: 312
      },
      germanium: {
        max: 2800,
        surface: 465
      }
    },
    29: {
      id: 29,
      name: 'Rukavina',
      planet: 'n8dyfe9i.png',
      location: {
        x: 271,
        y: 445
      },
      gravity: 34,
      temperature: 61,
      radiation: 85,
      ironium: {
        max: 4305,
        surface: 0
      },
      boranium: {
        max: 4172,
        surface: 0
      },
      germanium: {
        max: 2346,
        surface: 0
      }
    },
    30: {
      id: 30,
      name: 'Novak',
      planet: 'wjehz2lz.png',
      location: {
        x: 436,
        y: 368
      },
      gravity: 77,
      temperature: 17,
      radiation: 1,
      ironium: {
        max: 3371,
        surface: 0
      },
      boranium: {
        max: 4532,
        surface: 0
      },
      germanium: {
        max: 1766,
        surface: 0
      }
    },
    31: {
      id: 31,
      name: 'Mamie',
      planet: 'wjehz2lz.png',
      location: {
        x: 47,
        y: 237
      },
      gravity: 86,
      temperature: 53,
      radiation: 69,
      ironium: {
        max: 684,
        surface: 0
      },
      boranium: {
        max: 786,
        surface: 0
      },
      germanium: {
        max: 4396,
        surface: 0
      }
    },
    32: {
      id: 32,
      name: 'Mirror',
      planet: '9rvpjwoj.png',
      location: {
        x: 93,
        y: 172
      },
      gravity: 81,
      temperature: 5,
      radiation: 85,
      ironium: {
        max: 2567,
        surface: 0
      },
      boranium: {
        max: 1295,
        surface: 0
      },
      germanium: {
        max: 4694,
        surface: 0
      }
    },
    33: {
      id: 33,
      name: 'Galbraith',
      planet: 'wjehz2lz.png',
      location: {
        x: 424,
        y: 169
      },
      gravity: 39,
      temperature: 93,
      radiation: 60,
      ironium: {
        max: 4952,
        surface: 0
      },
      boranium: {
        max: 3115,
        surface: 0
      },
      germanium: {
        max: 1824,
        surface: 0
      }
    },
    34: {
      id: 34,
      name: 'Clopton',
      planet: 'x5i1u2rd.png',
      location: {
        x: 555,
        y: 408
      },
      gravity: 3,
      temperature: 54,
      radiation: 59,
      ironium: {
        max: 790,
        surface: 0
      },
      boranium: {
        max: 3049,
        surface: 0
      },
      germanium: {
        max: 1827,
        surface: 0
      }
    },
    35: {
      id: 35,
      name: 'Emperium Gate',
      planet: '9rvpjwoj.png',
      location: {
        x: 78,
        y: 465
      },
      gravity: 81,
      temperature: 96,
      radiation: 4,
      ironium: {
        max: 3008,
        surface: 0
      },
      boranium: {
        max: 2636,
        surface: 0
      },
      germanium: {
        max: 1962,
        surface: 0
      }
    },
    36: {
      id: 36,
      name: 'Old',
      planet: '9rvpjwoj.png',
      location: {
        x: 308,
        y: 540
      },
      gravity: 41,
      temperature: 95,
      radiation: 81,
      ironium: {
        max: 4037,
        surface: 0
      },
      boranium: {
        max: 3600,
        surface: 0
      },
      germanium: {
        max: 3665,
        surface: 0
      }
    },
    37: {
      id: 37,
      name: 'Hiho',
      planet: 'wjehz2lz.png',
      location: {
        x: 46,
        y: 336
      },
      gravity: 99,
      temperature: 38,
      radiation: 6,
      ironium: {
        max: 230,
        surface: 0
      },
      boranium: {
        max: 1594,
        surface: 0
      },
      germanium: {
        max: 1157,
        surface: 0
      }
    },
    38: {
      id: 38,
      name: 'Axelrod',
      planet: 'at41td4j.png',
      location: {
        x: 120,
        y: 439
      },
      gravity: 73,
      temperature: 93,
      radiation: 16,
      ironium: {
        max: 748,
        surface: 0
      },
      boranium: {
        max: 4485,
        surface: 0
      },
      germanium: {
        max: 2121,
        surface: 0
      }
    },
    39: {
      id: 39,
      name: 'Spitfire',
      planet: 'at41td4j.png',
      location: {
        x: 400,
        y: 515
      },
      gravity: 7,
      temperature: 48,
      radiation: 17,
      ironium: {
        max: 323,
        surface: 0
      },
      boranium: {
        max: 4894,
        surface: 0
      },
      germanium: {
        max: 3143,
        surface: 0
      }
    },
    40: {
      id: 40,
      name: 'Hollis',
      planet: 'n8dyfe9i.png',
      location: {
        x: 527,
        y: 502
      },
      gravity: 78,
      temperature: 92,
      radiation: 49,
      ironium: {
        max: 602,
        surface: 0
      },
      boranium: {
        max: 4084,
        surface: 0
      },
      germanium: {
        max: 4317,
        surface: 0
      }
    },
    41: {
      id: 41,
      name: 'Lebedeff',
      planet: 'wjehz2lz.png',
      location: {
        x: 318,
        y: 185
      },
      gravity: 93,
      temperature: 86,
      radiation: 85,
      ironium: {
        max: 1938,
        surface: 0
      },
      boranium: {
        max: 856,
        surface: 0
      },
      germanium: {
        max: 3026,
        surface: 0
      }
    },
    42: {
      id: 42,
      name: 'Braddock',
      planet: 'x5i1u2rd.png',
      location: {
        x: 100,
        y: 113
      },
      gravity: 73,
      temperature: 15,
      radiation: 34,
      ironium: {
        max: 3071,
        surface: 0
      },
      boranium: {
        max: 463,
        surface: 0
      },
      germanium: {
        max: 4457,
        surface: 0
      }
    },
    43: {
      id: 43,
      name: "Foucault's World",
      planet: 'x5i1u2rd.png',
      location: {
        x: 261,
        y: 60
      },
      gravity: 49,
      temperature: 6,
      radiation: 56,
      ironium: {
        max: 4884,
        surface: 0
      },
      boranium: {
        max: 2456,
        surface: 0
      },
      germanium: {
        max: 4419,
        surface: 0
      }
    },
    44: {
      id: 44,
      name: 'Worm',
      planet: 'at41td4j.png',
      location: {
        x: 372,
        y: 296
      },
      gravity: 84,
      temperature: 99,
      radiation: 73,
      ironium: {
        max: 3323,
        surface: 0
      },
      boranium: {
        max: 4560,
        surface: 0
      },
      germanium: {
        max: 3719,
        surface: 0
      }
    },
    45: {
      id: 45,
      name: 'Croce',
      planet: '9rvpjwoj.png',
      location: {
        x: 536,
        y: 545
      },
      gravity: 88,
      temperature: 25,
      radiation: 67,
      ironium: {
        max: 252,
        surface: 0
      },
      boranium: {
        max: 2327,
        surface: 0
      },
      germanium: {
        max: 2486,
        surface: 0
      }
    },
    46: {
      id: 46,
      name: 'Oh Ho Ho',
      planet: 'at41td4j.png',
      location: {
        x: 141,
        y: 557
      },
      gravity: 41,
      temperature: 11,
      radiation: 78,
      ironium: {
        max: 2476,
        surface: 0
      },
      boranium: {
        max: 963,
        surface: 0
      },
      germanium: {
        max: 1559,
        surface: 0
      }
    },
    47: {
      id: 47,
      name: 'Chunk',
      planet: 'wjehz2lz.png',
      location: {
        x: 74,
        y: 61
      },
      gravity: 20,
      temperature: 38,
      radiation: 89,
      ironium: {
        max: 1254,
        surface: 0
      },
      boranium: {
        max: 1818,
        surface: 0
      },
      germanium: {
        max: 2398,
        surface: 0
      }
    },
    48: {
      id: 48,
      name: 'Woozle',
      planet: 'n8dyfe9i.png',
      location: {
        x: 554,
        y: 82
      },
      gravity: 82,
      temperature: 84,
      radiation: 58,
      ironium: {
        max: 3547,
        surface: 0
      },
      boranium: {
        max: 2296,
        surface: 0
      },
      germanium: {
        max: 4475,
        surface: 0
      }
    },
    49: {
      id: 49,
      name: 'Hortman',
      planet: '9rvpjwoj.png',
      location: {
        x: 44,
        y: 168
      },
      gravity: 21,
      temperature: 99,
      radiation: 35,
      ironium: {
        max: 3360,
        surface: 0
      },
      boranium: {
        max: 925,
        surface: 0
      },
      germanium: {
        max: 4897,
        surface: 0
      }
    }
  },
  players: {
    Humanoid: {
      name: 'Humanoid',
      pluralName: 'Humanoids',
      icon: 1,
      gravity: { min: 15, max: 85 },
      radiation: { min: 15, max: 85 },
      temperature: { min: 15, max: 85 },
      tech: {
        biotechnology: 100,
        electronics: 100,
        energy: 100,
        propulsion: 100,
        weapons: 100,
        construction: 100
      },
      primaryTrait: 'JOAT',
      mineCost: 5,
      factoryCost: 10,
      colonistsPerResource: 1000,
      factoryProduction: 10,
      operableFactories: 10,
      mineProduction: 10,
      operableMines: 10,
      maxPopulation: 1200000,
      growthRate: 15
    },
    Rabbitoid: {
      name: 'Rabbitoid',
      pluralName: 'Rabbitoids',
      icon: 1,
      gravity: { min: 0, max: 100 },
      radiation: { min: 0, max: 100 },
      temperature: { min: 0, max: 100 },
      tech: {
        biotechnology: 0,
        electronics: 0,
        energy: 0,
        propulsion: 0,
        weapons: 0,
        construction: 0
      },
      primaryTrait: 'HE',
      lesserTraits: ['UR', 'IFE', 'BET', 'OBRM'],
      mineCost: 9,
      factoryCost: 12,
      colonistsPerResource: 800,
      factoryProduction: 12,
      operableFactories: 15,
      mineProduction: 10,
      operableMines: 10,
      maxPopulation: 550000,
      growthRate: 6
    },
    Insectoid: {
      name: 'Insectoid',
      pluralName: 'Insectoids',
      icon: '28.jpg',
      gravity: { min: 5, max: 95 },
      radiation: { min: 60, max: 90 },
      temperature: { min: 10, max: 70 },
      tech: {
        biotechnology: 0,
        electronics: 0,
        energy: 1,
        propulsion: 1,
        weapons: 6,
        construction: 0
      },
      primaryTrait: 'WM',
      lesserTraits: ['CE', 'RS', 'ISB'],
      mineCost: 10,
      factoryCost: 10,
      colonistsPerResource: 1000,
      factoryProduction: 10,
      operableFactories: 10,
      mineProduction: 9,
      operableMines: 6,
      maxPopulation: 1000000,
      growthRate: 10
    }
  },
  reports: {
    Humanoid: {
      year: 2400,
      systems: [
        {
          id: 28,
          name: 'Willa',
          population: 25000,
          owner: 'Humanoid',
          reportDate: 2400,
          value: 100,
          gravity: 50,
          temperature: 50,
          radiation: 50,
          ironium: { max: 3022, surface: 223 },
          boranium: { max: 3178, surface: 312 },
          germanium: { max: 2800, surface: 465 },
          resources: { built: 30, max: 35 },
          defenses: { built: 10, max: 10, type: 'SDI', coverage: 9.56 },
          factories: { built: 11, max: 25 },
          mines: { built: 10, max: 25 },
          scanner: { type: 'Scoper 90', range: 90 },
          starbase: { dock: -1, armor: 500, shields: 800, damage: 0, driver: 0, destination: undefined }
        },
        {
          id: 30,
          name: 'Novak',
          reportDate: 2400,
          value: -34,
          gravity: 77,
          temperature: 17,
          radiation: 1,
          ironium: { max: 3371, surface: 0 },
          boranium: { max: 4532, surface: 0 },
          germanium: { max: 1766, surface: 0 }
        },
        {
          id: 2,
          name: 'Pyxidis',
          reportDate: 2400,
          value: -49,
          gravity: 3,
          temperature: 40,
          radiation: 46,
          ironium: { max: 1911, surface: 0 },
          boranium: { max: 4832, surface: 0 },
          germanium: { max: 240, surface: 0 }
        }
      ],
      fleets: [
        {
          name: 'Santa Maria #1',
          id: 0,
          location: {
            x: 436,
            y: 409
          }
        },
        {
          name: 'Scout #1',
          id: 1,
          location: {
            x: 436,
            y: 409
          }
        }
      ]
    },
    Rabbitoid: {
      year: 2400,
      systems: [
        {
          id: 12,
          name: 'Skloot',
          population: 25000,
          owner: 'Rabbitoid',
          reportDate: 2400,
          value: 100,
          gravity: 50,
          temperature: 50,
          radiation: 50,
          ironium: { max: 259, surface: 305 },
          boranium: { max: 4275, surface: 332 },
          germanium: { max: 2511, surface: 363 },
          resources: { built: 30, max: 35 },
          defenses: { built: 10, max: 10, type: 'SDI', coverage: 9.56 },
          factories: { built: 11, max: 25 },
          mines: { built: 10, max: 25 },
          scanner: { type: 'Scoper 50', range: 50 },
          starbase: { dock: -1, armor: 500, shields: 800, damage: 0, driver: 0, destination: undefined }
        },
        {
          id: 27,
          name: 'Phicol',
          reportDate: 2400,
          value: 100,
          gravity: 6,
          temperature: 4,
          radiation: 78,
          ironium: { max: 4305, surface: 0 },
          boranium: { max: 1697, surface: 0 },
          germanium: { max: 4313, surface: 0 }
        }
      ]
    },
    Insectoid: {
      year: 2400,
      systems: [
        {
          id: 18,
          name: 'Parsley',
          population: 25000,
          owner: 'Insectoid',
          reportDate: 2400,
          value: 100,
          gravity: 50,
          temperature: 40,
          radiation: 75,
          ironium: { max: 2211, surface: 421 },
          boranium: { max: 3797, surface: 345 },
          germanium: { max: 2896, surface: 234 },
          resources: { built: 30, max: 35 },
          defenses: { built: 10, max: 10, type: 'SDI', coverage: 9.56 },
          factories: { built: 11, max: 25 },
          mines: { built: 10, max: 25 },
          scanner: { type: 'Scoper 50', range: 50 },
          starbase: { dock: -1, armor: 500, shields: 800, damage: 0, driver: 0, destination: undefined }
        }
      ]
    }
  }
}

const serverSlice = createSlice({
  name: 'server',
  initialState: initialState,
  reducers: {
    // createGame: (state, { payload }) => {
    //   const { gameId, name, size, density } = payload
    // },
    // getGameData: (state, { payload }) => {
    //   const { gameId } = payload
    // },
    // startGame: (state, { payload }) => {
    //   const { gameId } = payload
    // },
    processTurn: (state, { payload }) => {
      // const { gameId } = payload
    },
    // joinGame: (state, { payload }) => {
    //   const { playerId, race } = payload
    // },
    loadTurnData: (state, { payload }) => {
      // const { playerId } = payload
    },
    submitOrders: (state, { payload }) => {
      // const { playerId, orders } = payload
    }
  }
})

export default serverSlice.reducer

const distance = (p1, p2) => {
  const dx = p1.x - p2.x
  const dy = p1.y - p2.y
  const d = Math.sqrt(dx * dx + dy * dy)
  return d
}
export const generateStars = (count, size) => {
  var cachedLocations = []
  const isValid = point => _.reduce(cachedLocations, (valid, location) => valid && distance(point, location) > 40, true)
  const getNewLocation = size => {
    const MAP_BUFFER = 40

    var tryAgain = true
    var point
    while (tryAgain) {
      point = {
        x: random.int(MAP_BUFFER, size - MAP_BUFFER),
        y: random.int(MAP_BUFFER, size - MAP_BUFFER)
      }
      tryAgain = !isValid(point)
    }

    cachedLocations = [...cachedLocations, point]
    return point
  }

  const samples = _.sample(names, count)
  const planets = _.sample(planetFiles, count)
  return _.range(count).reduce(
    (acc, id) => ({
      ...acc,
      [id]: {
        id: id,
        name: samples[id],
        planet: planets[id],
        location: getNewLocation(size),
        gravity: random.int(0, 100),
        temperature: random.int(0, 100),
        radiation: random.int(0, 100),
        ironium: { max: random.int(200, 5000), surface: 0 },
        boranium: { max: random.int(200, 5000), surface: 0 },
        germanium: { max: random.int(200, 5000), surface: 0 }
      }
    }),
    {}
  )
}

export const testCreateGame = () => {
  // const systemsById = generateStars(50, 600)
  // const stars = _.reduce(systemsById, (acc, system) => ({ ...acc, [system.name]: system }), {})
}

const planetFiles = ['9rvpjwoj.png', 'x5i1u2rd.png', 'at41td4j.png', 'n8dyfe9i.png', 'wjehz2lz.png']

const names = [
  'Harper',
  'Tobolski',
  'Hollis',
  'Baxter',
  'Crockett',
  'Wiggins',
  'Wolden',
  'Carmain',
  'Perlich',
  'Clopton',
  'Lyons',
  'Willa',
  'Hortman',
  'Wichrowski',
  'Cicatello',
  'Reynolds',
  'Novak',
  'Hampton',
  'Rukavina',
  'Oganesian',
  'Mireles',
  'Huor',
  'Goutremout',
  'Groetsch',
  'Chabaud',
  'Fyffe',
  'Habermann',
  'Manikas',
  'Lebedeff',
  'Scharnberg',
  'Weeks',
  'Creed',
  'Clayton',
  'Hayes',
  'Schaefer',
  'Rush',
  'Harman',
  'Hudson',
  'Wilcox',
  '14 Coli',
  'Ajar',
  'Albemuth',
  'Allenby',
  'Almagest',
  'Almighty',
  'Applegate',
  'April',
  'Arcade',
  'Awk',
  'Axelrod',
  'Baker',
  'Bakwele',
  'Balder',
  'Berry',
  'Birthmark',
  'Blue Giant',
  'Bob',
  'Bonaparte',
  'Bones',
  'Bonus',
  'Braddock',
  'Burgoyne',
  'Calcium',
  'Cambridge',
  'Cancer',
  'Carter',
  'Chennault',
  'Chubs',
  'Chunk',
  'Cinnamon',
  'Coda',
  'Continental',
  'Cootie',
  'County Seat',
  'Covenant',
  'Crazy Horse',
  'Croce',
  'Crow',
  'Data',
  'Dayan',
  'Delta Delta Delta',
  'Devon IV',
  'Dewey',
  'Dingly Dell',
  'Dive',
  'Dowding',
  'Dwarte',
  'Dyson',
  'Elron',
  'Elsinore',
  'Emperium Gate',
  'Empty',
  'Flint Stone',
  'Floyd',
  'Fluffy',
  'Foamytap',
  'Forest',
  "Foucault's World",
  'Fox Trot',
  'Gaia 2',
  'Galbraith',
  'Gangtok',
  'Geronimo',
  'Greene',
  'Hammer',
  'Harding',
  'Heaven',
  'Hexnut',
  'Hiho',
  'Hollywood',
  'Hope',
  'Hunt',
  'Iceball',
  'Inferno',
  'Iodine',
  'Kaa',
  'Kirkland',
  'Kludge',
  'La Te Da',
  'Lafayette',
  'Lambda',
  'Lee',
  'Lever',
  'Linq',
  'Luscious',
  'Lyra',
  'Mamie',
  'Marion',
  'Mayberry',
  'Meade',
  'Medusa',
  'Melthorne',
  'Mirror',
  'Molybdenum',
  'Montgomery',
  'Myopus',
  'Nebulae',
  'Nirvana',
  'Notorious',
  'Oh Ho Ho',
  'Old',
  'Parsley',
  'Patton',
  'Penance',
  'Pershing',
  'Phi',
  'Phicol',
  'Pirate',
  'Planet 10',
  'PreVious',
  'Prune',
  'Purgatory',
  'Pyxidis',
  'Recalc',
  'Right',
  'Rommel',
  'Rubber',
  'Saada',
  'Sagittarius',
  'Salamander',
  'Shanty',
  'Sigma',
  'Skloot',
  'Slime',
  'Slinky',
  'Smorgasbord',
  'Spaatz',
  'Spay',
  'Spitfire',
  'Sputnik',
  'Status',
  'Stilton',
  'Stilwell',
  'Stove Top',
  'Taurus',
  'Tongue',
  'Trial',
  'Trismegistus',
  'Tull',
  'Underdog',
  'Uranium',
  'Valhalla',
  'Vanilla',
  'Veritas',
  'Vista',
  "Whistler's Mother",
  'Who',
  'Winken',
  'Winkle',
  'Woozle',
  'Worm',
  'Xenon',
  'X-Ray',
  'Y-Has',
  'Zero'
]

import { getHabitatValue, printSystems } from './server'

describe('server', () => {
  it('getHabitatValue', () => {
    printSystems()
    const tolerances = {
      gravity: { min: 0.15, max: 0.85 },
      radiation: { min: 0.15, max: 0.85 },
      temperature: { min: 0.15, max: 0.85 }
    }
    const values = { gravity: 0.5, temperature: 0.5, radiation: 0.5 }
    expect(getHabitatValue(tolerances, values)).toEqual(100)
  })
})

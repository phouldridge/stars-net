import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs'
import { resolve, basename, join } from 'path'
import _, { random } from 'underscore'
import { density, names, planetFiles } from './data.mjs'

const [, , inputDir] = process.argv

if (!inputDir) {
  console.error('Usage: npm run new-game <folder>')
  process.exit(1)
}

const inputPath = resolve(inputDir)
const outputPath = resolve('public/__testdata__')

// Ensure output directory exists
if (!existsSync(outputPath)) {
  mkdirSync(outputPath, { recursive: true })
}

const host = { year: 2400, systemsById: {}, players: {} }

const loadFiles = async (inputPath, host) => {
  const files = readdirSync(inputPath).filter(file => file.endsWith('.mjs'))

  for (const file of files) {
    const path = 'file://' + join(inputPath, file).replaceAll('\\', '/')
    const baseName = basename(file, '.mjs')
    const data = await import(path)
    if (baseName === 'options') {
      host.options = data.options
    } else {
      host.players[baseName] = data.race
    }
  }
}

const distance = (p1, p2) => {
  const dx = p1.x - p2.x
  const dy = p1.y - p2.y
  const d = Math.sqrt(dx * dx + dy * dy)
  return d
}

const generateStars = (count, size) => {
  var cachedLocations = []
  const isValid = point => _.reduce(cachedLocations, (valid, location) => valid && distance(point, location) > 40, true)
  const getNewLocation = size => {
    const MAP_BUFFER = 40

    var tryAgain = true
    var point
    while (tryAgain) {
      point = {
        x: random(MAP_BUFFER, size - MAP_BUFFER),
        y: random(MAP_BUFFER, size - MAP_BUFFER)
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
        planet: planets[id % planets.length],
        location: getNewLocation(size),
        gravity: random(0, 100),
        temperature: random(0, 100),
        radiation: random(0, 100),
        ironium: { max: random(200, 5000), surface: 0 },
        boranium: { max: random(200, 5000), surface: 0 },
        germanium: { max: random(200, 5000), surface: 0 }
      }
    }),
    {}
  )
}

await loadFiles(inputPath, host)
const count = density[host.options.size][host.options.density]
const size = density[host.options.size].size
host.systemsById = generateStars(count, size)

console.log(' *** host:', host)
const jsContent = `const host = ${JSON.stringify(host, null, 2)}
export default host`

writeFileSync(join(outputPath, `host.js`), jsContent)
console.log(`Generated host.js`)

import Dropdown from 'components/Dropdown'
import IndexedImage from 'components/IndexedImage'
import slotImages from 'images/slots.png'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAvailableHulls, getEnemyHulls, hullTileTypes } from 'store/ships'
import _ from 'underscore'

const [SINGLE, MULTI, CARGO, DOCK, GENERAL, CIRCLE] = hullTileTypes
const cellSize = 32
const spacing = 0

const slotTypes = ['Weapon', 'Mech', 'Engine', 'Elect', 'Armor', 'Bomb', 'Shield', 'Mines', 'Scanner']
const getSlotIndex = type => _.indexOf(slotTypes, type)

const SingleTile = ({ component, count }) => {
  return (
    <>
      <IndexedImage src={slotImages} index={getSlotIndex(component)} width={60} height={35} />
      <div style={{ textAlign: 'center' }}>{component}</div>
      <div style={{ textAlign: 'center' }}>{count}</div>
    </>
  )
}

const MultiTile = ({ components, count }) => {
  const { length } = components
  return (
    <>
      <div style={{ textAlign: 'center', alignContent: 'end', height: 21 }}>{components[0]}</div>
      <div style={{ textAlign: 'center' }}>{length === 2 ? 'or' : components[1]}</div>
      <div style={{ textAlign: 'center' }}>{length === 2 ? components[1] : components[2]}</div>
      <div style={{ textAlign: 'center' }}>{count}</div>
    </>
  )
}
const CargoTile = ({ capacity }) => {
  return (
    <div className="cargo-tile">
      <div style={{ textAlign: 'center' }}>Cargo</div>
      <div style={{ textAlign: 'center' }}>{`${capacity}kT`}</div>
      <div style={{ textAlign: 'center' }}>max</div>
    </div>
  )
}

const DockTile = ({ capacity }) => {
  const text = isNaN(capacity) ? capacity : `${capacity}kT`
  return (
    <div className="dock-tile">
      <div style={{ textAlign: 'center' }}>{text}</div>
      <div style={{ textAlign: 'center' }}>Space</div>
      <div style={{ textAlign: 'center' }}>Dock</div>
    </div>
  )
}

const CircularTile = ({ capacity }) => {
  const text = isNaN(capacity) ? capacity : `${capacity}kT`
  return (
    <div className="circle-tile">
      <div style={{ textAlign: 'center', zIndex: 10 }}>{text}</div>
      <div style={{ textAlign: 'center', zIndex: 10 }}>Space</div>
      <div style={{ textAlign: 'center', zIndex: 10 }}>Dock</div>
    </div>
  )
}

const GeneralTile = ({ count }) => {
  return (
    <>
      <div style={{ textAlign: 'center', alignContent: 'end', height: 35 }}>General</div>
      <div style={{ textAlign: 'center' }}>Purpose</div>
      <div style={{ textAlign: 'center' }}>{count}</div>
    </>
  )
}

const ComponentTile = ({ slot }) => {
  const { type, placement, component, components, capacity, width = 2, height = 2 } = slot
  const count = slot.needs ? `needs ${slot.needs}` : `up to ${slot.upto}`

  const getTileType = type => {
    switch (type) {
      case SINGLE:
        return <SingleTile component={component} count={count} />
      case MULTI:
        return <MultiTile components={components} count={count} />
      case CARGO:
        return <CargoTile capacity={capacity} />
      case GENERAL:
        return <GeneralTile count={count} />
      case DOCK:
        return <DockTile capacity={capacity} />
      case CIRCLE:
        return <CircularTile capacity={capacity} />
      default:
        return null
    }
  }
  const extraStyle =
    type === CIRCLE
      ? {}
      : { boxSizing: 'border-box', backgroundColor: 'grey', border: '1px solid black', borderRadius: '1.5px' }

  const style = {
    position: 'absolute',
    left: placement.x * cellSize,
    top: placement.y * cellSize,
    width: width * cellSize - spacing,
    height: height * cellSize - spacing,
    ...extraStyle
  }

  return <div style={style}>{getTileType(type)}</div>
}

const HullLayout = ({ forShips, forEnemy }) => {
  const availableHulls = useSelector(getAvailableHulls)
  const enemyHulls = useSelector(getEnemyHulls)
  const hulls = useMemo(() => {
    const allHulls = forEnemy ? enemyHulls : availableHulls
    return _.pick(allHulls, hull => (forShips ? hull.type === 'Ships' : hull.type === 'Starbases'))
  }, [forEnemy, forShips, enemyHulls, availableHulls])
  const items = useMemo(() => _.keys(hulls), [hulls])
  const [selectedHull, setSelectedHull] = useState(items[0])
  const hulldata = hulls[selectedHull]

  const tiles = hulldata ? hulldata.layout : []
  const minX = hulldata ? Math.min(...tiles.map(t => t.placement.x)) : 0
  const minY = hulldata ? Math.min(...tiles.map(t => t.placement.y)) : 0
  const maxX = hulldata ? Math.max(...tiles.map(t => t.placement.x + (t.placement.width || 2))) : 0
  const maxY = hulldata ? Math.max(...tiles.map(t => t.placement.y + (t.placement.height || 2))) : 0
  const gridWidth = (maxX - minX) * cellSize
  const gridHeight = (maxY - minY) * cellSize

  useEffect(() => {
    setSelectedHull(_.isEmpty(items) ? '' : items[0])
  }, [items])

  return (
    <>
      <Dropdown items={items} selected={selectedHull} onSelect={setSelectedHull} width={240} />
      <div className="hull-layout">
        <div style={{ position: 'relative', width: gridWidth, height: gridHeight }}>
          {tiles.map((slot, key) => (
            <ComponentTile key={key} slot={slot} />
          ))}
        </div>
      </div>
    </>
  )
}

export default HullLayout

import { useDispatch, useSelector } from 'react-redux'
import { getOptions } from 'store/options'
import { getSystems } from 'store/report'
import { getStars } from 'store/systems'
import { StarSvg } from './MapTools'
import { getFleetsInOrbit } from 'store/report'
import { getSelectedSystem, selectSystem } from 'store/select'
import _ from 'underscore'
// import { testCreateGame } from 'store/server'

const SelectedPointer = () => {
  const system = useSelector(getSelectedSystem)
  const { x, y } = useSelector(
    state => state.systems.byId[system].location // todo: make this support selecting fleets
  )
  return (
    <svg key="starPointer">
      <path
        d={`M${x} ${y + 3}L${x - 5} ${y + 13}L${x} ${y + 10}L${x + 5} ${y + 13}z`}
        stroke="#FFEF00"
        fill="#FFEF00"
      />
    </svg>
  )
}

const SystemScanners = () => {
  const stars = useSelector(getStars)
  const systems = useSelector(getSystems)

  const withScanners = _.filter(systems, s => s.scanner)
  return withScanners.map(system => {
    const star = stars[system.id]
    return (
      <circle
        key={star.name}
        cx={star.location.x}
        cy={star.location.y}
        r={system.scanner.range}
        fill={'var(--scanner-color)'}
      />
    )
  })
}

const StarField = () => {
  const dispatch = useDispatch()

  const stars = useSelector(getStars)
  const options = useSelector(getOptions)
  const starClick = (event, star) => {
    dispatch(selectSystem({ system: star.id }))
  }

  return _.map(stars, star => {
    return <StarSvg key={star.name} star={star} options={options} onClick={event => starClick(event, star)} />
  })
}

const SelectOptions = () => {
  const system = useSelector(getSelectedSystem)
  const { x, y } = useSelector(state => state.systems.byId[system].location)
  const fleets = useSelector(getFleetsInOrbit)
  return _.isEmpty(fleets) ? null : (
    <div
      style={{
        location: 'absolute',
        background: 'silver',
        border: 'outset 2px',
        padding: '2px 6px',
        cursor: 'arrow',
        userSelect: 'none',
        left: x,
        top: y
      }}
    >
      <div key={system}>{system}</div>
      <hr />
      {fleets.map(f => (
        <div key={f.name}>{f.name}</div>
      ))}
    </div>
  )
}

const StarMap = () => {
  const options = useSelector(getOptions)
  // testCreateGame()

  return (
    <div className="panel">
      <div className="map-container">
        <svg viewBox="0 0 600 600" width="600" height="600" strokeWidth={1}>
          {options.showScanners && <SystemScanners />}
          <StarField />
          <SelectedPointer />
        </svg>
        <SelectOptions />
      </div>
    </div>
  )
}

export default StarMap

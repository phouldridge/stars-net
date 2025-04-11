import Panel from 'components/Panel'
import { useSelector } from 'react-redux'
import { getFleetsInOrbit } from 'store/report'
import LevelIndicator from '../LevelIndicator/LevelIndicator'
import _ from 'underscore'

const FleetsPanel = () => {
  const fleets = useSelector(getFleetsInOrbit)
  const changeFleet = event => console.log(' *** onChange:', event.target.value)

  return (
    <Panel title="Fleets in Orbit">
      <select onChange={changeFleet}>
        {_.map(fleets, fleet => (
          <option value={fleet.id} key={fleet.name}>
            {fleet.name}
          </option>
        ))}
      </select>
      <LevelIndicator title="Fuel" values={[50]} total={50} colors={['red']} units="mg" />
      <LevelIndicator
        title="Cargo"
        values={[10, 25, 20, 30]}
        total={100}
        colors={['blue', 'green', 'yellow', 'brown']}
        units="kT"
      />
      <div className="row-container space-between">
        <button>Goto</button>
        <button>Cargo</button>
      </div>
    </Panel>
  )
}

export default FleetsPanel

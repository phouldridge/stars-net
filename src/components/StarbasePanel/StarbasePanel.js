import Panel from 'components/Panel'
import { LineItem } from 'components/Panel/Panel'
import { useSelector } from 'react-redux'
import { getSystemReport } from 'store/report'
import { getSelectedSystem } from 'store/select'

const StarbasePanel = () => {
  const system = useSelector(state => getSystemReport(state, getSelectedSystem(state)))
  const disabled = !system

  const damage = system?.starbase?.damage || 'None'
  return (
    <Panel title="Starbase">
      <LineItem
        text="Dock Capacity"
        value={system?.starbase?.dock === -1 ? 'unlimited' : system?.starbase?.dock ?? 0}
        disabled={disabled}
      />
      <LineItem text="Armor" value={system?.starbase?.armor ?? 0} units="dp" disabled={disabled} />
      <LineItem text="Shields" value={system?.starbase?.shields ?? 0} units="dp" disabled={disabled} />
      <LineItem text="Dock Damage" value={damage} units={damage === 'None' ? '' : '%'} disabled={disabled} />
      <hr />
      <LineItem text="Mass Driver" value={system?.starbase?.driver || 'None'} disabled={disabled} />
      <LineItem text="Destination" value={system?.starbase?.destination || 'None'} disabled={disabled} />
    </Panel>
  )
}

export default StarbasePanel

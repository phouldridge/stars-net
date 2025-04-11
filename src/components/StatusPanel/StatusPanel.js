import Panel from 'components/Panel'
import { LineItem } from 'components/Panel/Panel'
import { useSelector } from 'react-redux'
import { getSystemReport } from 'store/report'
import { getSelectedSystem } from 'store/select'

const StatusPanel = () => {
  const system = useSelector(state => getSystemReport(state, getSelectedSystem(state)))
  const disabled = !system
  return (
    <Panel title="Status">
      <LineItem
        text="Population"
        value={system?.population ? system.population.toLocaleString() : 0}
        disabled={disabled}
      />
      <LineItem
        text="Resources/Year"
        value={`${system?.resources?.built ?? 0} of ${system?.resources?.max ?? 0}`}
        disabled={disabled}
      />
      <hr />
      <LineItem text="Scanner Type" value={system?.scanner?.type ?? '-'} disabled={disabled} />
      <LineItem text="Scanner Range" value={system?.scanner?.range ?? 0} units="l.y." disabled={disabled} />
      <hr />
      <LineItem
        text="Defenses"
        value={`${system?.defenses?.built ?? 0} of ${system?.defenses?.max ?? 0}`}
        disabled={disabled}
      />
      <LineItem text="Defense Type" value={system?.defenses?.type ?? '-'} disabled={disabled} />
      <LineItem text="Defense Coverage" value={system?.defenses?.coverage ?? 0} units="%" disabled={disabled} />
    </Panel>
  )
}

export default StatusPanel

import Panel from 'components/Panel'
import { LineItem } from 'components/Panel/Panel'
import { useSelector } from 'react-redux'
import { getSystemReport } from 'store/report'
import { getSelectedSystem } from 'store/select'

const OnHandPanel = () => {
  const system = useSelector(state => getSystemReport(state, getSelectedSystem(state)))
  const disabled = !system
  return (
    <Panel title="Minerals on Hand">
      <LineItem text="Ironium" value={system?.ironium?.surface ?? 0} units="kT" disabled={disabled} />
      <LineItem text="Boranium" value={system?.boranium?.surface ?? 0} units="kT" disabled={disabled} />
      <LineItem text="Germanium" value={system?.germanium?.surface ?? 0} units="kT" disabled={disabled} />
      <hr />
      <LineItem text="Mines" value={`${system?.mines?.built ?? 0} of ${system?.mines?.max ?? 0}`} disabled={disabled} />
      <LineItem
        text="Factories"
        value={`${system?.factories?.built ?? 0} of ${system?.factories?.max ?? 0}`}
        disabled={disabled}
      />
    </Panel>
  )
}

export default OnHandPanel

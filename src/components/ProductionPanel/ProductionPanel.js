import Panel from 'components/Panel'
import { List, LineItem } from 'components/Panel/Panel'

export const ProductionPanel = () => {
  return (
    <Panel title="Production">
      <List></List>
      <LineItem text="Completion:" value="-" />
      <LineItem text="Route to" value="none" />
      <div className="row-container space-between">
        <button>Change</button>
        <button disabled={true}>Clear</button>
        <button>Route</button>
      </div>
    </Panel>
  )
}

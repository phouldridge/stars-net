import Panel from 'components/Panel'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedSystem } from 'store/select'
import { getStar } from 'store/systems'
import { nextSystem, prevSystem, selectSystem } from 'store/select'

export const PrevButton = () => {
  const dispatch = useDispatch()
  const prev = useSelector(prevSystem)
  return <button onClick={() => dispatch(selectSystem({ system: prev }))}>Prev</button>
}
export const NextButton = () => {
  const dispatch = useDispatch()
  const next = useSelector(nextSystem)
  return <button onClick={() => dispatch(selectSystem({ system: next }))}>Next</button>
}

const SystemsPanel = () => {
  const selected = useSelector(getSelectedSystem)
  const system = useSelector(state => getStar(state, selected))

  return (
    <Panel title={system.name}>
      <div className="row-container">
        <div className="contained-item">
          <img className="img-system" src={`./images/${system.planet}`} alt="system" />
        </div>
        <div className="column-container right">
          <PrevButton />
          <NextButton />
        </div>
      </div>
    </Panel>
  )
}

export default SystemsPanel

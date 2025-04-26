import Panel from 'components/Panel'
import { useSelector } from 'react-redux'
import _ from 'underscore'

import './summary.css'
import { getTolerances } from 'store/race'
import useDims from 'hooks/useDims'
import { useRef } from 'react'
import { getSystemReport, getYear } from 'store/report'
import { LineItem } from 'components/Panel/Panel'
import { getSelectedSystem } from 'store/select'
import { getStar } from 'store/systems'

const START = 75
const GAP = 5
const END = 45

const SummaryPanel = () => {
  const selected = useSelector(getSelectedSystem)
  const system = useSelector(state => getSystemReport(state, selected))
  const star = useSelector(state => getStar(state, selected))
  return (
    <Panel title={`${star.name} Summary`}>
      <SystemSummary system={system} />
    </Panel>
  )
}

const GraphValue = ({ data, x, y, fill }) => {
  return (
    <>
      <path
        className="graph-value"
        d={`M${x + data} ${y + 4}L${x - 4 + data} ${y}L${x + data} ${y - 4}L${x + 4 + data} ${y}z`}
        stroke={fill}
        fill={fill}
      />
      <circle cx={x + data} cy={y} r={1} fill="#ccc" />
    </>
  )
}

const HabitatLine = ({ data, fill, x, y, width, disabled }) => {
  const factor = width / 100
  return (
    <>
      <text className="summary-text" x={x} y={y} {...(disabled ? { fill: 'grey' } : {})}>
        {data.name}
      </text>
      <rect x={x + GAP + data.min * factor} y={y - 8} width={(data.max - data.min) * factor} height={10} fill={fill} />
      {disabled || <GraphValue data={data.value * factor} x={x + GAP} y={y - 3} fill={fill} />}
      <text className="summary-units" x={width + START + GAP + GAP} y={y} {...(disabled ? { fill: 'grey' } : {})}>
        {`${data.value}${data.units}`}
      </text>
    </>
  )
}

const HabitatGraph = ({ system, habitat, width, disabled }) => {
  const habitatData = {
    gravity: { name: 'gravity', value: disabled ? 0 : system.gravity, ...habitat.gravity, units: ' g' },
    temperature: {
      name: 'temperature',
      value: disabled ? 0 : system.temperature,
      ...habitat.temperature,
      units: '° C'
    },
    radiation: { name: 'radiation', value: disabled ? 0 : system.radiation, ...habitat.radiation, units: ' mR' }
  }

  const graphWidth = width - (START + GAP) - (END + GAP)
  return (
    <svg className="graph" viewBox={`0 0 ${width} 40`} width={width} height={40}>
      <rect x={START + GAP} y={0} width={graphWidth} height={40} {...(disabled ? { fill: '#ccc' } : {})} />
      <HabitatLine
        data={habitatData.gravity}
        fill={disabled ? '#888' : 'var(--gravity-color)'}
        x={START}
        y={10}
        width={graphWidth}
        disabled={disabled}
      />
      <HabitatLine
        data={habitatData.temperature}
        fill={disabled ? '#999' : 'var(--temperature-color)'}
        x={START}
        y={23}
        width={graphWidth}
        disabled={disabled}
      />
      <HabitatLine
        data={habitatData.radiation}
        fill={disabled ? '#aaa' : 'var(--radiation-color)'}
        x={START}
        y={36}
        width={graphWidth}
        disabled={disabled}
      />
    </svg>
  )
}

const ResourceLine = ({ data, fill, x, y, width, disabled }) => {
  const factor = 5000 / width
  return (
    <>
      <text className="summary-text" fill={fill} x={x} y={y}>
        {data.name}
      </text>
      {disabled ? null : (
        <>
          <rect x={x + 6} y={y - 8} width={data.surface / factor} height={10} fill={fill} />
          <GraphValue data={data.max / factor} x={x + 6} y={y - 3} fill={fill} />)
        </>
      )}
    </>
  )
}

const GraphLines = ({ width, disabled }) => {
  const factor = 5000 / width
  return _.map(_.range(750, 5000, 750), n => (
    <div key={`line-${n}`}>
      <path d={`M${n / factor + START + GAP} 0L${n / factor + START + GAP} 40`} stroke="white" />
      <text
        key={`text-${n}`}
        className="graph-text"
        x={n / factor + START + GAP}
        y={50}
        {...(disabled ? { fill: 'grey' } : {})}
      >
        {n}
      </text>
    </div>
  ))
}

const ResourceGraph = ({ system, width, disabled }) => {
  const data = {
    ironium: { name: 'Ironium', ...system?.ironium },
    boranium: { name: 'Boranium', ...system?.boranium },
    germanium: { name: 'Germanium', ...system?.germanium }
  }
  const graphWidth = width - (START + GAP) - (END + GAP)
  return (
    <svg className="graph" viewBox={`0 0 ${width} 50`} width={width} height={50}>
      <rect x={START + GAP} y={0} width={graphWidth} height={40} {...(disabled ? { fill: '#ccc' } : {})} />
      <GraphLines width={graphWidth} disabled={disabled} />
      <ResourceLine
        data={data.ironium}
        fill={disabled ? 'grey' : 'var(--ironium-color)'}
        x={START}
        y={10}
        width={graphWidth}
        disabled={disabled}
      />
      <ResourceLine
        data={data.boranium}
        fill={disabled ? 'grey' : 'var(--boranium-color)'}
        x={START}
        y={23}
        width={graphWidth}
        disabled={disabled}
      />
      <ResourceLine
        data={data.germanium}
        fill={disabled ? 'grey' : 'var(--germanium-color)'}
        x={START}
        y={36}
        width={graphWidth}
        disabled={disabled}
      />
      <text className="graph-text" fill={disabled ? 'grey' : 'black'} x={START} y={50}>
        kT 0
      </text>
    </svg>
  )
}

const SystemHeader = ({ system, disabled }) => {
  const year = useSelector(getYear)
  const age = year - system?.reportDate
  return (
    <div className="system-header">
      <LineItem
        text={`Value: ${system?.value ?? '-'}%`}
        value={`Population: ${system?.population?.toLocaleString() ?? 0}`}
        disabled={disabled}
      />
      <LineItem
        text={disabled ? 'Unexplored' : `Report is ${age === 0 ? 'current' : `${age} years old`}`}
        value={disabled ? '' : system?.owner ?? 'uninhabited'}
        disabled={disabled}
      />
    </div>
  )
}

const SystemSummary = ({ system }) => {
  const ref = useRef(null)
  const { width } = useDims(ref)
  const tolerances = useSelector(getTolerances)
  const disabled = !system

  return (
    <div className="summary" ref={ref}>
      <SystemHeader system={system} disabled={disabled} />
      {width > 0 && <HabitatGraph system={system} habitat={tolerances} width={width} disabled={disabled} />}
      {width > 0 && <ResourceGraph system={system} width={width} disabled={disabled} />}
    </div>
  )
}

export default SummaryPanel

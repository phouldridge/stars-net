import ToggleButton from 'components/ToggleButton'
import ToggleButtonGroup from 'components/ToggleButtonGroup'
import TurnSimulator from 'components/TurnSimulator'
const { useDispatch, useSelector } = require('react-redux')
const { getOptions, toggleOption } = require('store/options')

const buttonBox = { viewBox: '0 0 22 22', width: 22, height: 22 }

export const StarSvg = ({ star, options, isButton, onClick }) => {
  const buttonStyle = isButton ? buttonBox : {}
  const { x, y } = star.location
  return (
    <svg className="star-svg" key={star.name} {...buttonStyle} onClick={event => onClick && onClick(event, star)}>
      {isButton || <circle cx={x} cy={y} r={10} fillOpacity={0} />}
      <rect x={x - 1} y={y - 1} width="3" height="3" fill="#ffffff" />
      <rect x={x - 1} y={y - 1} width="1" height="1" fill="#c3c3c3" />
      <rect x={x - 1} y={y + 1} width="1" height="1" fill="#c3c3c3" />
      <rect x={x + 1} y={y - 1} width="1" height="1" fill="#c3c3c3" />
      <rect x={x + 1} y={y + 1} width="1" height="1" fill="#c3c3c3" />
      {options.showNames && (
        <text x={x} y={y + 15} className="star-text">
          {star.name}
        </text>
      )}
    </svg>
  )
}

const ScannerIcon = () => {
  return (
    <svg {...buttonBox}>
      <circle cx={11} cy={11} r={8} fill={'var(--scanner-color)'} />
    </svg>
  )
}

const ToggleOption = ({ option, icon }) => {
  const dispatch = useDispatch()
  const options = useSelector(getOptions)
  return (
    <div
      className={options[option] ? 'button-toggle on' : 'button-toggle off'}
      onClick={() => dispatch(toggleOption({ option }))}
    >
      {icon}
    </div>
  )
}

const overlayButtons = [
  { index: 7, tooltip: 'Scanner Coverage Overlay' },
  { index: 8, tooltip: 'Mine Fields Overlay' },
  { index: 9, tooltip: 'Fleet Paths Overlay' },
  { index: 10, tooltip: 'Planet Names Overlay' },
  { index: 11, tooltip: 'Ship Counts Overlay' }
]

const MapTools = () => {
  return (
    <div className="panel">
      <div className="map-tools">
        <ToggleButtonGroup />
        <ToggleButton index={6} />
        {overlayButtons.map(({ index, tooltip }) => (
          <ToggleButton key={index} index={index} tooltip={tooltip} />
        ))}
        <ToggleButton index={12} />
        <ToggleButton index={13} />
        <ToggleButton index={14} />
        <ToggleButton index={15} />
        {/* <ToggleOption option="showNames" icon={<StarSvg star={icon} options={{ showNames: true }} isButton={true} />} />
        <ToggleOption option="showScanners" icon={<ScannerIcon />} /> */}
        {/* <TurnSimulator /> */}
      </div>
    </div>
  )
}

export default MapTools

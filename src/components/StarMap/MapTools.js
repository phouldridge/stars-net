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

const MapTools = () => {
  const icon = { name: 'Abc', location: { x: 10, y: 5 } }
  return (
    <div className="panel">
      <div className="map-tools">
        <ToggleOption option="showNames" icon={<StarSvg star={icon} options={{ showNames: true }} isButton={true} />} />
        <ToggleOption option="showScanners" icon={<ScannerIcon />} />
        <TurnSimulator />
      </div>
    </div>
  )
}

export default MapTools

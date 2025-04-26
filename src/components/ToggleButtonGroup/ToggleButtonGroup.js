import ToggleButton from 'components/ToggleButton/ToggleButton'
import './ToggleButtonGroup.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMapViewIndex, setMapViewIndex } from 'store/options'

const buttons = [
  { index: 0, tooltip: 'Normal View' },
  { index: 1, tooltip: 'Surface Mineral View' },
  { index: 2, tooltip: 'Mineral Concentration View' },
  { index: 3, tooltip: 'Planet Value View' },
  { index: 4, tooltip: 'Population View' },
  { index: 5, tooltip: 'No Player Info View' }
]

const ToggleButtonGroup = () => {
  const dispatch = useDispatch()
  const mapViewIndex = useSelector(getMapViewIndex)

  return (
    <div className="button-group">
      {buttons.map(({ index, tooltip }) => (
        <div key={index} onClick={() => dispatch(setMapViewIndex(index))}>
          <ToggleButton index={index} tooltip={tooltip} selected={mapViewIndex === index} />
        </div>
      ))}
    </div>
  )
}

export default ToggleButtonGroup

import IndexedImage from 'components/IndexedImage'
import buttonImages from 'images/buttons.png'
import buttonBacks from 'images/button-back.png'
import Tooltip from 'components/Tooltip'

const ToggleButton = ({ index, tooltip, selected = false }) => {
  return (
    <Tooltip text={tooltip}>
      <IndexedImage src={buttonBacks} index={selected ? 1 : 0} width={29} height={28}>
        <IndexedImage src={buttonImages} index={index} width={24} height={24} style={{ margin: selected ? 3 : 2 }} />
      </IndexedImage>
    </Tooltip>
  )
}

export default ToggleButton

import './Groupbox.css'

const Groupbox = ({ title, items, selected, onSelect = () => {}, style = {} }) => {
  const handleClick = item => {
    onSelect(item)
  }

  const CheckboxItem = ({ item, selected }) => {
    return (
      <div className="checkbox-item" onClick={() => handleClick(item)}>
        <div className={selected ? 'radio-checked' : 'radio-unchecked'} />
        {item}
      </div>
    )
  }

  return (
    <div className="group-box" style={style}>
      <div className="group-box-title">{title}</div>
      <div className="group-box-content">
        {items.map((item, key) => (
          <CheckboxItem key={key} item={item} selected={selected === item} />
        ))}
      </div>
    </div>
  )
}

export default Groupbox

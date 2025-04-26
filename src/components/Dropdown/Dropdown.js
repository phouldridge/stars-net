import { useCallback, useEffect, useState } from 'react'

import './Dropdown.css'
import _ from 'underscore'

const Dropdown = ({ items, selected, onSelect, width = 150 }) => {
  const [isActive, setActive] = useState(false)

  const handleClick = item => {
    onSelect(item)
    setActive(false)
  }

  const handleKeyDown = useCallback(
    event => {
      const selectedIndex = _.indexOf(items, selected)
      switch (event.key) {
        case 'ArrowUp':
          if (selectedIndex > 0) {
            onSelect(items[selectedIndex - 1])
          }
          break
        case 'ArrowDown':
          if (selectedIndex < items.length - 1) {
            onSelect(items[selectedIndex + 1])
          }
          break
        case 'Enter':
          setActive(false)
          break
        default:
          break
      }
    },
    [items, onSelect, selected]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const DropdownItems = () => {
    return (
      <div className="dropdown-items">
        <div>
          {items.map((item, key) => (
            <div
              key={key}
              className={`dropdown-item ${item === selected && 'item-selected'}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="dropdown" style={{ width }}>
      <div className="dropdown-select" onClick={() => setActive(!isActive)}>
        <div className="dropdown-selected">{selected}</div>
        <div className={isActive ? 'dropped-button' : 'drop-button'} />
      </div>
      {isActive && <DropdownItems />}
    </div>
  )
}

export default Dropdown

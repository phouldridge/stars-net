import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveModal } from 'store/app'

import './MainMenu.css'

export const MainMenu = () => {
  const dispatch = useDispatch()
  const [activeDropdown, setActiveDropdown] = useState(undefined)

  const DropdownMenu = ({ id, actions }) => {
    return (
      <div className="dropdown-menu">
        {actions.map((item, index) => (
          <div
            key={`${id}-${index}`}
            onClick={() => {
              setActiveDropdown(undefined)
              item.action()
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    )
  }

  const DropdownItem = ({ id, text, actions = [] }) => {
    const isActive = activeDropdown === id

    const handleClick = () => {
      isActive ? setActiveDropdown(undefined) : setActiveDropdown(id)
    }

    return (
      <div className="main-menu-item">
        <div className={isActive ? 'active-menu-item' : 'inactive-menu-item'} onClick={handleClick}>
          {text}
        </div>
        {isActive && <DropdownMenu id={id} actions={actions} />}
      </div>
    )
  }

  const commandsActions = [
    { text: 'Ship Design', action: () => dispatch(setActiveModal('ship-design')) },
    { text: 'Research', action: () => dispatch(setActiveModal('research')) },
    { text: 'Battle Plans', action: () => dispatch(setActiveModal('battle-plans')) }
  ]
  return (
    <div className="main-menu">
      <DropdownItem id="file" text="File" />
      <DropdownItem id="view" text="View" />
      <DropdownItem id="turn" text="Turn" />
      <DropdownItem id="commands" text="Commands" actions={commandsActions} />
      <DropdownItem id="reports" text="Report" />
      <DropdownItem id="help" text="Help" />
    </div>
  )
}

export default MainMenu

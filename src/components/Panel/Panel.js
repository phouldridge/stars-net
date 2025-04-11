import { useState } from 'react'
import _ from 'underscore'

export const Panel = ({ children, title, canClose = true }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="panel">
      <PanelTitle text={title} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && children}
    </div>
  )
}

const Collapse = () => (
  <svg viewBox="0 0 19 19" width="19" height="19" strokeWidth={2}>
    <path d="M10 8L5 15L15 15Z" />
    <path d="M5 6L15 6L15 7L5 7Z" />
  </svg>
)

const Expand = () => (
  <svg viewBox="0 0 19 19" width="19" height="19" strokeWidth={2}>
    <path d="M10 15L5 8L15 8Z" />
  </svg>
)

export const PanelTitle = ({ text, isOpen, onClick, canClose = true }) => {
  return (
    <div className="panel-title">
      <div className="panel-title-text" aria-label={text}>
        {text}
      </div>
      {canClose && (
        <div aria-label="collapse" onClick={onClick}>
          {isOpen ? <Collapse /> : <Expand />}
        </div>
      )}
    </div>
  )
}

export const LineItem = ({ text, value, units, disabled }) => {
  const style = disabled ? { color: 'grey' } : {}
  return (
    <div className="item-line">
      <div className="item-text" style={style} aria-label={text}>
        {text}
      </div>
      <div className="item-value" style={style}>
        {units ? `${value} ${units}` : `${value}`}
      </div>
    </div>
  )
}

export const List = ({ items }) => {
  return <div className="list-container">{_.isEmpty(items) ? '--- Queue is Empty ---' : items}</div>
}

export default Panel

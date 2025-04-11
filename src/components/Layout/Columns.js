import useDims from 'hooks/useDims'
import { useRef } from 'react'

import './Columns.css'

export const Column = ({ width, children }) => {
  return <div>{children}</div>
}
const RowItem = ({ width, children }) => {
  const style = { width }
  return <div style={style}>{children}</div>
}

export const Row = ({ children, minWidth }) => {
  const ref = useRef(null)
  const { width } = useDims(ref)
  const columns = Array.isArray(children) ? children.length : 1
  const asColumn = width / columns < minWidth
  const items =
    columns === 1 || width === 0
      ? [children]
      : asColumn
      ? children.reduce((acc, item) => [...acc, ...(item.props?.children ?? [item])], [])
      : children
  return (
    <div ref={ref} className={asColumn ? 'col-container' : 'row-container'}>
      {items.map((item, key) => {
        if (asColumn) {
          return <Column key={key}>{item}</Column>
        } else {
          return (
            <RowItem width={width / columns} key={key}>
              {item}
            </RowItem>
          )
        }
      })}
    </div>
  )
}

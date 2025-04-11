import Panel from 'components/Panel'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrent, getCurrentMessage, getMessageCount, selectNext, selectPrevious } from 'store/messages'
import { getYear } from 'store/report'

export const MessagesPanel = () => {
  const dispatch = useDispatch()
  const year = useSelector(getYear)
  const count = useSelector(getMessageCount)
  const current = useSelector(getCurrent)
  const message = useSelector(getCurrentMessage)
  const title = `Year: ${year} Messages: ${current} of ${count}`

  const atStart = current === 1
  const atEnd = current === count
  const canGoto = message.type !== 'info'

  const getNext = () => dispatch(selectNext())
  const getPrev = () => dispatch(selectPrevious())

  return (
    <Panel title={title}>
      <div className="row-container">
        <div className="message-text">{message.text}</div>
        <div className="column-container" style={{ width: 74 }}>
          <button onClick={getPrev} disabled={atStart}>
            Prev
          </button>
          <button onClick={() => {}} disabled={!canGoto}>
            Goto
          </button>
          <button onClick={getNext} disabled={atEnd}>
            Next
          </button>
        </div>
      </div>
    </Panel>
  )
}

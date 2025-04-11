import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadTurn } from 'store/app'

const TurnSimulator = () => {
  const dispatch = useDispatch()
  const [playerIndex, setPlayerIndex] = useState(0)
  const players = ['Humanoid', 'Insectoid', 'Rabbitoid']

  const loadPlayerTurn = () => {
    const nextPlayer = (playerIndex + 1) % players.length
    dispatch(loadTurn(players[nextPlayer]))
    setPlayerIndex(nextPlayer)
  }

  return (
    <div
      className="button-toggle off"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: 22,
        width: 80,
        cursor: 'arrow',
        userSelect: 'none'
      }}
    >
      <div onClick={loadPlayerTurn}>{players[playerIndex]}</div>
    </div>
  )
}

export default TurnSimulator

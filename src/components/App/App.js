import GameContainer from 'components/GameContainer'

import '../../css-lib.css'
import { useSelector } from 'react-redux'
import { getActiveModal } from 'store/app'
import ShipDesign from 'components/ShipDesign/ShipDesign'
import MainMenu from 'components/MainMenu'

const modals = {
  'ship-design': <ShipDesign />
}

const App = () => {
  const activeModal = useSelector(getActiveModal)

  return (
    <div className="">
      <MainMenu />
      <GameContainer />
      {activeModal && modals[activeModal]}
    </div>
  )
}

export default App

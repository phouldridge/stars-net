import StarMap from 'components/StarMap'

import '../../css-lib.css'
import SummaryPanel from 'components/SummaryPanel'
import { Column, Row } from 'components/Layout/Columns'
import OnHandPanel from 'components/OnHandPanel'
import StatusPanel from 'components/StatusPanel'
import StarbasePanel from 'components/StarbasePanel'
import MapTools from 'components/StarMap/MapTools'
import SystemsPanel from '../SystemsPanel/SystemsPanel'
import { MessagesPanel } from '../MessagesPanel/MessagesPanel'
import { ProductionPanel } from '../ProductionPanel/ProductionPanel'
import FleetsPanel from '../FleetsPanel/FleetsPanel'

const GameContainer = () => {
  return (
    <div className="game-container">
      <MapTools />
      <Row minWidth={400}>
        <Column>
          <Row minWidth={200}>
            <Column>
              <SystemsPanel />
              <OnHandPanel />
              <StatusPanel />
            </Column>
            <Column>
              <FleetsPanel />
              <ProductionPanel />
              <StarbasePanel />
            </Column>
          </Row>
          <MessagesPanel />
        </Column>
        <Column>
          <StarMap />
          <SummaryPanel />
        </Column>
      </Row>
    </div>
  )
}

export default GameContainer

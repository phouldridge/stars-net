import Modal from 'components/Modal'
import { useState } from 'react'
import Groupbox from 'components/Groupbox'
import HullLayout from './HullLayout'
import ExistingDesigns from './ExistingDesigns'
import { ComponentsDisplay } from './ComponentsList'

import './ShipDesign.css'

const designs = ['Ships', 'Starbases']
const views = ['Existing Designs', 'Available Hull Types', 'Enemy Hulls', 'Components']

export const ShipDesign = () => {
  const [designType, setDesignType] = useState(designs[0])
  const [viewType, setViewType] = useState(views[0])

  const getDesigner = (designType, viewType) => {
    switch (viewType) {
      case views[0]:
        return <ExistingDesigns forShips={designType === 'Ships'} />
      case views[1]:
        return <HullLayout forShips={designType === 'Ships'} forEnemy={false} />
      case views[2]:
        return <HullLayout forShips={designType === 'Ships'} forEnemy={true} />
      case views[3]:
        return <ComponentsDisplay forShips={designType === 'Ships'} />
      default:
        return null
    }
  }

  const CopyDesignButton = () => {
    return (
      <button onClick={() => {}} style={{ width: 140 }}>
        Copy Selected Design
      </button>
    )
  }
  const DeleteDesignButton = () => {
    return (
      <button onClick={() => {}} style={{ width: 140 }}>
        Delete Selected Design
      </button>
    )
  }
  const EditDesignButton = () => {
    return (
      <button onClick={() => {}} style={{ width: 140 }}>
        Edit Selected Design
      </button>
    )
  }

  return (
    <Modal title="Ship & Starbase Design" isOpen={true}>
      <div className="row-container ship-designer">
        <div className="designer-options">
          <Groupbox
            title="Design"
            items={designs}
            selected={designType}
            onSelect={setDesignType}
            style={{ width: 150 }}
          />
          <Groupbox title="View" items={views} onSelect={setViewType} selected={viewType} style={{ width: 150 }} />
          <CopyDesignButton />
          <DeleteDesignButton />
          <EditDesignButton />
        </div>
        <div className="designer-column">
          {/* <Dropdown items={items} selected={selectedHull} onSelect={setSelectedHull} width={240} /> */}
          {getDesigner(designType, viewType)}
          {/* <HullLayout hullType={hulldata} /> */}
        </div>
      </div>
    </Modal>
  )
}

export default ShipDesign

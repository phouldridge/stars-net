import IndexedImage from 'components/IndexedImage'
import armorImages from 'images/armor.png'
import beamsImages from 'images/beams.png'
import bombsImages from 'images/bombs.png'
import elelctricalImages from 'images/electrical.png'
import enginesImages from 'images/engines.png'
import mechanicalImages from 'images/mechanical.png'
import mineLayersImages from 'images/mineLayers.png'
import miningImages from 'images/mining.png'
import scannersImages from 'images/scanners.png'
import shieldsImages from 'images/shields.png'
import torpedoesImages from 'images/torpedoes.png'
import orbitalImages from 'images/orbital.png'
import { useEffect, useState } from 'react'
import Dropdown from 'components/Dropdown'
import { getComponents } from 'store/ships'
import { useSelector } from 'react-redux'
import _ from 'underscore'

import './ShipDesign.css'

const srcByType = {
  Armor: armorImages,
  'Beam Weapons': beamsImages,
  Bombs: bombsImages,
  Electrical: elelctricalImages,
  Engines: enginesImages,
  Mechanical: mechanicalImages,
  'Mine Layers': mineLayersImages,
  'Mining Robots': miningImages,
  Scanners: scannersImages,
  Shields: shieldsImages,
  Torpedoes: torpedoesImages,
  Orbital: orbitalImages
}

const shipTypes = [
  'All',
  'Armor',
  'Beam Weapons',
  'Bombs',
  'Electrical',
  'Engines',
  'Mechanical',
  'Mine Layers',
  'Mining Robots',
  'Scanners',
  'Shields',
  'Torpedoes',
  'Weapons'
]
const stationTypes = ['All', 'Armor', 'Beam Weapons', 'Electrical', 'Orbital', 'Shields', 'Torpedoes', 'Weapons']
const weaponsTypes = ['Beam Weapons', 'Torpedoes']

export const ComponentItem = ({ name, type, index }) => {
  return (
    <div className="component-item">
      <div className="component-image-border">
        <div className="component-image">
          <IndexedImage src={srcByType[type]} index={index} width={60} height={60} />
        </div>
      </div>
      <div className="component-name">{name}</div>
    </div>
  )
}

const ComponentsList = ({ components, width }) => {
  return (
    <div className="component-list" style={{ width }}>
      {_.map(components, (component, key) => (
        <ComponentItem key={key} name={component.name} type={component.type} index={component.index} />
      ))}
    </div>
  )
}

export const ComponentsDisplay = ({ forShips }) => {
  const items = forShips ? shipTypes : stationTypes
  const components = useSelector(getComponents)
  const [selected, setSelected] = useState(items[0])
  const effectiveComponents =
    selected === 'All'
      ? forShips
        ? _.pick(components, component => _.contains(shipTypes, component.type))
        : _.pick(components, component => _.contains(stationTypes, component.type))
      : selected === 'Weapons'
      ? _.pick(components, component => _.contains(weaponsTypes, component.type))
      : _.pick(components, component => component.type === selected)

  useEffect(() => {
    setSelected(items[0])
  }, [items])

  return (
    <>
      <Dropdown items={items} selected={selected} onSelect={setSelected} width={240} />
      <ComponentsList components={effectiveComponents} width={240} />
    </>
  )
}

export default ComponentsList

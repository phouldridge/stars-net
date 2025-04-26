import Dropdown from 'components/Dropdown'
import { useState } from 'react'

const ExistingDesigns = ({ forShips }) => {
  const items = []
  const [selected, setSelected] = useState('')
  return (
    <>
      <Dropdown items={items} selected={selected} onSelect={setSelected} width={240} />
    </>
  )
}

export default ExistingDesigns

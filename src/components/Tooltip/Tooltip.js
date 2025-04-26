// CustomTooltip.js
import React, { useState } from 'react'
import './Tooltip.css' // Import the CSS file

const CustomTooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="tooltip-container" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && text && <span className="tooltip-text">{text}</span>}
    </div>
  )
}

export default CustomTooltip
// import useDims from 'hooks/useDims'
// import { useEffect, useRef, useState } from 'react'
// import { createPortal } from 'react-dom'

// const Tooltip = ({ tooltip, children }) => {
//   const ref = useRef(null)
//   const [showTooltip, setShowTooltip] = useState(false)
//   const [location, setLocation] = useState({ top: 0, left: 0 })
//   const { top, left, width, height } = useDims(ref)

//   const handleMouseOver = () => setShowTooltip(true)
//   const handleMouseOut = () => setShowTooltip(false)

//   useEffect(() => {
//     const tooltipTop = top + height + window.scrollY
//     const tooltipLeft = left + width / 2 + window.scrollX
//     setLocation({ top: tooltipTop, left: tooltipLeft })
//   }, [top, left, width, height])

//   const TooltipText = (
//     <div style={{ top: `${location.top}`, left: `${location.left}`, transform: 'translateX(-50%)' }}>{tooltip}</div>
//   )

//   return (
//     <div>
//       {showTooltip ? createPortal(TooltipText, document) : null}
//       <div ref={ref} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
//         {children}
//       </div>
//     </div>
//   )
// }

// export default Tooltip

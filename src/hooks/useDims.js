import { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const initialState = { width: 0, height: 0 }
//  ref is the reference to the element whose height and width is required
//  const divRef = useRef(null);
//  const { height, width } = useDimension(divRef);
//  <div ref={divRef}>
const useDims = ref => {
  const [dimensions, setDimensions] = useState(initialState)
  const resizeObserverRef = useRef(null)

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries = []) => {
      entries.forEach(entry => setDimensions(entry.contentRect))
    })
    if (ref.current) resizeObserverRef.current.observe(ref.current)
    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect()
    }
  }, [ref])
  return dimensions
}

export default useDims

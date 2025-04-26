const IndexedImage = ({ src, index, width, height, style = {}, children }) => {
  const scaleX = style.width ? style.width / width : 1
  const scaleY = style.height ? style.height / height : 1

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0px -${index * height}px`,
        backgroundSize: 'auto',
        transform: `scale(${scaleX}, ${scaleY})`,
        transformOrigin: 'top left',
        overflow: 'hidden',
        ...style,
        width,
        height
      }}
    >
      {children}
    </div>
  )
}

export default IndexedImage

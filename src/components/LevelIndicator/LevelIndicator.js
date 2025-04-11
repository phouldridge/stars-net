const LevelIndicator = ({ title, values, total, units, colors }) => {
  const sum = values.reduce((sum, v) => (sum += v), 0)
  const label = units ? `${sum} of ${total} ${units}` : `${sum} of ${total}`
  return (
    <div className="level-indicator">
      {title}
      <div className="level-indicator-item">
        {values.map((v, i) => {
          return (
            <div
              key={`${title}-${colors[i]}`}
              style={{ background: colors[i], width: `${(v / total) * 100}%`, height: '100%' }}
            ></div>
          )
        })}
        <div className="level-indicator-label">{label}</div>
      </div>
    </div>
  )
}

export default LevelIndicator

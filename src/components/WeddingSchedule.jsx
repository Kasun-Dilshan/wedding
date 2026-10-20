export default function WeddingSchedule({ wedding }) {
  const items = wedding.schedule || []
  if (items.length === 0) return null

  return (
    <section id="schedule" className="section">
      <div className="section-narrow">
        <p className="script kicker">The day</p>
        <h2>Wedding schedule</h2>
        <div className="schedule-card">
          <ol className="timeline">
            {items.map((item) => (
              <li key={`${item.time}-${item.title}`}>
                <p className="when">{item.time}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

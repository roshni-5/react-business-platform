import { Link } from 'react-router-dom';
import { CLASSES } from '../data/classes.js';
import ClassCard from '../components/ClassCard.jsx';

const FEATURED_IDS = ['sunrise-power-yoga', 'hiit-circuit-blast', 'spin-ride-45', 'boxing-fundamentals'];

export default function HomePage() {
  const featured = FEATURED_IDS.map((id) => CLASSES.find((c) => c.id === id)).filter(Boolean);

  return (
    <div>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="hero__eyebrow">Boutique group fitness · F-7 Markaz, Islamabad</p>
            <h1>Move with people who show up for you.</h1>
            <p className="hero__lead">
              Nova Movement Studio runs small, coached classes across yoga, strength, HIIT,
              cycling, dance, and boxing — book a spot in minutes and see exactly who's teaching,
              what it costs, and how many spots are left before you commit.
            </p>
            <div className="hero__actions">
              <Link to="/classes" className="btn btn--primary btn--large">
                Browse the schedule
              </Link>
              <Link to="/about" className="btn btn--secondary btn--large">
                About the studio
              </Link>
            </div>
          </div>
          <dl className="hero__stats">
            <div>
              <dt>13</dt>
              <dd>classes across 8 formats</dd>
            </div>
            <div>
              <dt>7</dt>
              <dd>coaches on staff</dd>
            </div>
            <div>
              <dt>≤20</dt>
              <dd>people per class</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container section">
        <header className="page-header">
          <h2>Popular this week</h2>
          <p>A mix of levels and formats — see full pricing and availability before you choose.</p>
        </header>
        <div className="class-grid">
          {featured.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
        <div className="section__footer">
          <Link to="/classes" className="btn btn--secondary">
            View the full schedule
          </Link>
        </div>
      </section>

      <section className="container section section--bands">
        <div className="info-band">
          <h3>Clear pricing, every time</h3>
          <p>
            Price, level, and remaining spots are shown on every class card — not just after you
            click in — so you can compare options at a glance.
          </p>
        </div>
        <div className="info-band">
          <h3>Filters that stick</h3>
          <p>
            Your search and filters stay put when you open a class and come back, so you never
            lose your place while comparing sessions.
          </p>
        </div>
        <div className="info-band">
          <h3>No surprise cutoffs</h3>
          <p>
            Availability, experience requirements, and our 2-hour booking cutoff are all shown
            before you add a class to your bookings — never after.
          </p>
        </div>
      </section>
    </div>
  );
}

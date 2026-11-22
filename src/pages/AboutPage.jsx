import { MAX_SPOTS_PER_BOOKING } from '../rules/capacityRule.js';
import { BOOKING_CUTOFF_HOURS } from '../rules/cutoffRule.js';

export default function AboutPage() {
  return (
    <div className="container page-about">
      <header className="page-header">
        <h1>About Nova Movement Studio</h1>
        <p>
          Nova Movement Studio is a boutique group-fitness studio in F-7 Markaz, Islamabad,
          built for working professionals and university students who want structured,
          coached classes that fit around a busy week.
        </p>
      </header>

      <section className="about-section">
        <h2>Who we serve</h2>
        <p>
          Most of our members are students and early-career professionals in Islamabad looking
          for a consistent class schedule rather than an unstructured gym floor. Classes run from
          6am to 10pm daily across three studio rooms, with early-morning and after-work slots
          built around typical university and office hours.
        </p>
      </section>

      <section className="about-section">
        <h2>How booking works</h2>
        <ol className="about-steps">
          <li>Browse the schedule and filter by category, level, or search for an instructor.</li>
          <li>Open a class to see full details and choose an upcoming session.</li>
          <li>Add one or more sessions to your bookings, adjusting spots as needed.</li>
          <li>Enter your details and confirm — you'll get a booking reference immediately.</li>
        </ol>
      </section>

      <section className="about-section">
        <h2>Our studio policies</h2>
        <div className="policy-grid">
          <article className="policy-card">
            <h3>Spots per booking</h3>
            <p>
              Each booking covers 1–{MAX_SPOTS_PER_BOOKING} people, and never more than the spots
              remaining in that session. Booking for a larger group? Make a separate booking per
              group of {MAX_SPOTS_PER_BOOKING}.
            </p>
          </article>
          <article className="policy-card">
            <h3>Experience levels</h3>
            <p>
              Classes are labelled Beginner, Intermediate, or Advanced. You'll select your own
              experience level at checkout, and we'll flag it if it doesn't meet a class's
              requirement before you can confirm.
            </p>
          </article>
          <article className="policy-card">
            <h3>Booking cutoff</h3>
            <p>
              Bookings close {BOOKING_CUTOFF_HOURS} hours before a session starts, so our coaches
              can confirm headcount and prepare equipment in advance.
            </p>
          </article>
        </div>
      </section>

      <section className="about-section">
        <h2>Simulated for coursework</h2>
        <p>
          This site is a university coursework project (CS4032, Web Programming). All classes,
          instructors, availability, and bookings are fictional and simulated in the browser — no
          payment is processed and no personal data leaves your device beyond local browser
          storage.
        </p>
      </section>
    </div>
  );
}

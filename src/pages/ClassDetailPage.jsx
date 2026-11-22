import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClassById } from '../data/classes.js';
import { useBooking } from '../context/BookingContext.jsx';
import Badge from '../components/Badge.jsx';
import ClassImage from '../components/ClassImage.jsx';
import SessionPicker from '../components/SessionPicker.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { formatCurrency, formatDuration, remainingSpots } from '../utils/formatters.js';
import { validateBookingQuantity } from '../rules/capacityRule.js';
import { checkBookingCutoff } from '../rules/cutoffRule.js';

const LEVEL_TONE = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' };

export default function ClassDetailPage() {
  const { id } = useParams();
  const classItem = getClassById(id);
  const { addItem } = useBooking();

  // Hooks must run unconditionally, so the "not found" branch is handled
  // after all hook calls, not with an early return above them.
  const firstBookable = classItem?.sessions.find(
    (s) => remainingSpots(s) > 0 && checkBookingCutoff(s.startsAt).valid,
  );
  const [sessionId, setSessionId] = useState(
    (firstBookable || classItem?.sessions[0])?.id ?? null,
  );
  const [spots, setSpots] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const session = classItem?.sessions.find((s) => s.id === sessionId);

  const capacityCheck = session
    ? validateBookingQuantity(spots, remainingSpots(session))
    : { valid: false, reason: 'Select a session.' };

  const cutoffCheck = session ? checkBookingCutoff(session.startsAt) : { valid: false };

  if (!classItem) {
    return (
      <div className="container">
        <EmptyState
          title="We couldn't find that class"
          description={`There's no class with the ID "${id}". It may have been renamed or removed from the schedule.`}
          action={
            <Link to="/classes" className="btn btn--primary">
              Browse all classes
            </Link>
          }
        />
      </div>
    );
  }

  const canAdd = capacityCheck.valid && cutoffCheck.valid;

  function handleAdd() {
    if (!canAdd || !session) return;
    addItem(classItem.id, session.id, spots);
    setJustAdded(true);
  }

  return (
    <div className="container page-detail">
      <Link to="/classes" className="back-link">
        ← Back to all classes
      </Link>

      <div className="page-detail__grid">
        <div>
          <ClassImage
            src={classItem.image}
            alt={`${classItem.name} class`}
            category={classItem.category}
            className="page-detail__media"
          />
        </div>

        <div className="page-detail__content">
          <div className="class-card__badges">
            <Badge tone="neutral">{classItem.category}</Badge>
            <Badge tone={LEVEL_TONE[classItem.level]}>{classItem.level} level</Badge>
            {classItem.requiresExperience && (
              <Badge tone="info">Requires prior experience</Badge>
            )}
          </div>

          <h1>{classItem.name}</h1>
          <p className="page-detail__tagline">{classItem.tagline}</p>
          <p>{classItem.description}</p>

          <dl className="detail-facts">
            <div>
              <dt>Instructor</dt>
              <dd>{classItem.instructor}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{formatDuration(classItem.durationMinutes)}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>{formatCurrency(classItem.price)} per spot</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{classItem.location}</dd>
            </div>
          </dl>

          <div>
            <h2 className="detail-subheading">What to bring</h2>
            <ul className="detail-equipment">
              {classItem.equipment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {classItem.requiresExperience && (
            <p className="notice notice--info">
              This class requires <strong>{classItem.level}</strong> experience. You'll confirm
              your experience level at checkout — if it doesn't match, we'll let you know before
              you can complete the booking.
            </p>
          )}
        </div>
      </div>

      <section className="booking-panel" aria-labelledby="booking-heading">
        <h2 id="booking-heading">Book this class</h2>

        <SessionPicker
          sessions={classItem.sessions}
          selectedSessionId={sessionId}
          onSelect={(id) => {
            setSessionId(id);
            setJustAdded(false);
          }}
        />

        {session && (
          <div className="booking-panel__controls">
            <QuantityStepper
              value={spots}
              onChange={(v) => {
                setSpots(v);
                setJustAdded(false);
              }}
              max={remainingSpots(session)}
            />

            <div className="booking-panel__price">
              <span>Total for this session</span>
              <strong>{formatCurrency(spots * classItem.price)}</strong>
            </div>
          </div>
        )}

        {!capacityCheck.valid && (
          <p className="form-field__error" role="alert">
            {capacityCheck.reason}
          </p>
        )}
        {capacityCheck.valid && !cutoffCheck.valid && (
          <p className="form-field__error" role="alert">
            {cutoffCheck.reason}
          </p>
        )}

        <button type="button" className="btn btn--primary" onClick={handleAdd} disabled={!canAdd}>
          Add to my bookings
        </button>

        {justAdded && (
          <p className="notice notice--success" role="status">
            Added to your bookings. <Link to="/cart">Review your bookings →</Link>
          </p>
        )}
      </section>
    </div>
  );
}

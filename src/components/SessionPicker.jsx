import Badge from './Badge.jsx';
import { formatSessionDateTime, remainingSpots } from '../utils/formatters.js';
import { checkBookingCutoff } from '../rules/cutoffRule.js';

// Shows availability and the booking-cutoff state for every session up
// front, before the user commits to a choice — part of decision #3: making
// capacity and eligibility visible early rather than after the user has
// already invested time in the flow.
export default function SessionPicker({ sessions, selectedSessionId, onSelect }) {
  return (
    <fieldset className="session-picker">
      <legend>Choose a session</legend>
      <div className="session-picker__list">
        {sessions.map((session) => {
          const spotsLeft = remainingSpots(session);
          const soldOut = spotsLeft === 0;
          const cutoff = checkBookingCutoff(session.startsAt);
          const disabled = soldOut || !cutoff.valid;

          return (
            <label
              key={session.id}
              className={`session-option ${selectedSessionId === session.id ? 'is-selected' : ''} ${
                disabled ? 'is-disabled' : ''
              }`}
            >
              <input
                type="radio"
                name="session"
                value={session.id}
                checked={selectedSessionId === session.id}
                disabled={disabled}
                onChange={() => onSelect(session.id)}
              />
              <span className="session-option__main">
                <span className="session-option__time">{formatSessionDateTime(session.startsAt)}</span>
                <span className="session-option__status">
                  {soldOut ? (
                    <Badge tone="danger">Fully booked</Badge>
                  ) : !cutoff.valid ? (
                    <Badge tone="neutral">Booking closed</Badge>
                  ) : (
                    <Badge tone={spotsLeft <= 3 ? 'warning' : 'success'}>
                      {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left
                    </Badge>
                  )}
                </span>
              </span>
              {!cutoff.valid && !soldOut && (
                <span className="session-option__note">{cutoff.reason}</span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

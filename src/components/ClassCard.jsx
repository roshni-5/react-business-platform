import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';
import ClassImage from './ClassImage.jsx';
import { formatCurrency, formatDuration, formatSessionDateTime, remainingSpots } from '../utils/formatters.js';

const LEVEL_TONE = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' };

// Decision #1 (see DECISIONS.md): price, level, duration, and the next
// session's live remaining-spots are all shown directly on the card, instead
// of only on the detail page — this is the fix for "listings leave out
// information needed to compare options".
export default function ClassCard({ classItem }) {
  const nextSession = classItem.sessions[0];
  const spotsLeft = remainingSpots(nextSession);
  const soldOut = spotsLeft === 0;

  return (
    <article className="class-card">
      <Link to={`/classes/${classItem.id}`} className="class-card__media-link" tabIndex={-1}>
        <ClassImage
          src={classItem.image}
          alt=""
          category={classItem.category}
          className="class-card__media"
        />
      </Link>

      <div className="class-card__body">
        <div className="class-card__badges">
          <Badge tone="neutral">{classItem.category}</Badge>
          <Badge tone={LEVEL_TONE[classItem.level]}>{classItem.level}</Badge>
          {classItem.requiresExperience && <Badge tone="info">Experience required</Badge>}
        </div>

        <h3 className="class-card__title">
          <Link to={`/classes/${classItem.id}`}>{classItem.name}</Link>
        </h3>
        <p className="class-card__tagline">{classItem.tagline}</p>

        <dl className="class-card__meta">
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
            <dd>{formatCurrency(classItem.price)} / spot</dd>
          </div>
        </dl>

        <div className="class-card__availability">
          <span>Next: {formatSessionDateTime(nextSession.startsAt)}</span>
          <Badge tone={soldOut ? 'danger' : spotsLeft <= 3 ? 'warning' : 'success'}>
            {soldOut ? 'Fully booked' : `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left`}
          </Badge>
        </div>

        <Link to={`/classes/${classItem.id}`} className="btn btn--primary btn--block">
          View &amp; book
        </Link>
      </div>
    </article>
  );
}

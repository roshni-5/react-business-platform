import { Link, useLocation } from 'react-router-dom';
import { formatCurrency, formatSessionDateTime } from '../utils/formatters.js';
import EmptyState from '../components/EmptyState.jsx';

export default function ConfirmationPage() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="container">
        <EmptyState
          title="No recent booking found"
          description="This page only shows a summary right after you complete checkout. If you were expecting a confirmation, please check your bookings list."
          action={
            <Link to="/classes" className="btn btn--primary">
              Browse classes
            </Link>
          }
        />
      </div>
    );
  }

  const { reference, customer, items, subtotal, serviceFee, total } = state;

  return (
    <div className="container page-confirmation">
      <div className="confirmation-card">
        <span className="confirmation-card__icon" aria-hidden="true">
          ✓
        </span>
        <h1>Booking confirmed</h1>
        <p className="notice notice--info">
          This is a simulated confirmation for a coursework project. No real payment was taken and
          no email was sent.
        </p>

        <dl className="confirmation-meta">
          <div>
            <dt>Booking reference</dt>
            <dd>{reference}</dd>
          </div>
          <div>
            <dt>Name</dt>
            <dd>{customer.fullName}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{customer.email}</dd>
          </div>
          <div>
            <dt>Experience level</dt>
            <dd>{customer.experienceLevel}</dd>
          </div>
        </dl>

        <h2>Your sessions</h2>
        <ul className="summary-items">
          {items.map((item) => (
            <li key={`${item.className}-${item.startsAt}`}>
              <span>
                {item.className} × {item.spots}
                <br />
                <small>{formatSessionDateTime(item.startsAt)}</small>
              </span>
              <span>{formatCurrency(item.spots * item.price)}</span>
            </li>
          ))}
        </ul>

        <dl className="summary-totals">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatCurrency(subtotal)}</dd>
          </div>
          <div>
            <dt>Service fee</dt>
            <dd>{formatCurrency(serviceFee)}</dd>
          </div>
          <div className="summary-totals__grand">
            <dt>Total paid (simulated)</dt>
            <dd>{formatCurrency(total)}</dd>
          </div>
        </dl>

        <Link to="/classes" className="btn btn--primary">
          Book another class
        </Link>
      </div>
    </div>
  );
}

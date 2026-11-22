import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Badge from '../components/Badge.jsx';
import { formatCurrency, formatSessionDateTime, remainingSpots } from '../utils/formatters.js';

export default function CartPage() {
  const { items, validItems, invalidItems, totalSpots, subtotal, updateSpots, removeItem } =
    useBooking();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="Your bookings list is empty"
          description="Browse the schedule and add a class to get started."
          action={
            <Link to="/classes" className="btn btn--primary">
              Browse classes
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container page-cart">
      <header className="page-header">
        <h1>My bookings</h1>
        <p>Review your selected sessions before checking out.</p>
      </header>

      {invalidItems.length > 0 && (
        <div className="notice notice--warning" role="alert">
          <p>
            <strong>
              {invalidItems.length} {invalidItems.length === 1 ? 'item needs' : 'items need'} your
              attention
            </strong>{' '}
            before you can check out. This can happen if a saved booking's session filled up,
            passed its booking cutoff, or was removed since you last visited.
          </p>
        </div>
      )}

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.key} className={`cart-item ${item.issues.length > 0 ? 'cart-item--invalid' : ''}`}>
            {item.classRecord ? (
              <>
                <div className="cart-item__info">
                  <h3>
                    <Link to={`/classes/${item.classRecord.id}`}>{item.classRecord.name}</Link>
                  </h3>
                  <p>
                    {item.session
                      ? formatSessionDateTime(item.session.startsAt)
                      : 'Session no longer available'}
                  </p>
                  <p>{formatCurrency(item.classRecord.price)} / spot</p>
                </div>

                <div className="cart-item__controls">
                  {item.session && (
                    <QuantityStepper
                      value={item.spots}
                      onChange={(v) => updateSpots(item.classId, item.sessionId, v)}
                      max={remainingSpots(item.session) + item.spots}
                      label="Spots"
                    />
                  )}
                  <p className="cart-item__line-total">
                    {item.classRecord && formatCurrency(item.spots * item.classRecord.price)}
                  </p>
                </div>
              </>
            ) : (
              <div className="cart-item__info">
                <h3>Unknown class</h3>
              </div>
            )}

            {item.issues.length > 0 && (
              <div className="cart-item__issues">
                <Badge tone="danger">Needs attention</Badge>
                <ul>
                  {item.issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              className="btn btn--ghost btn--small"
              onClick={() => removeItem(item.classId, item.sessionId)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <aside className="summary-card" aria-labelledby="summary-heading">
        <h2 id="summary-heading">Summary</h2>
        <dl>
          <div>
            <dt>Valid bookings</dt>
            <dd>{validItems.length}</dd>
          </div>
          <div>
            <dt>Total spots</dt>
            <dd>{totalSpots}</dd>
          </div>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatCurrency(subtotal)}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="btn btn--primary btn--block"
          disabled={validItems.length === 0}
          onClick={() => navigate('/checkout')}
        >
          Continue to checkout
        </button>
        {validItems.length === 0 && (
          <p className="form-field__error">Resolve the items above before checking out.</p>
        )}
      </aside>
    </div>
  );
}

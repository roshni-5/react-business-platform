import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext.jsx';
import FormField from '../components/FormField.jsx';
import { LEVELS } from '../data/classes.js';
import { formatCurrency, formatSessionDateTime } from '../utils/formatters.js';
import { validateName, validateEmail, validatePhone, validateNotes } from '../utils/validators.js';
import { checkEligibility } from '../rules/eligibilityRule.js';
import { BOOKING_SERVICE_FEE, computeGrandTotal } from '../utils/pricing.js';

const INITIAL_FORM = { fullName: '', email: '', phone: '', experienceLevel: '', notes: '' };

export default function CheckoutPage() {
  const { validItems, invalidItems, subtotal, clearCart, removeItem } = useBooking();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const fieldValidators = {
    fullName: validateName,
    email: validateEmail,
    phone: validatePhone,
    notes: validateNotes,
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldValidators[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldValidators[name](value) }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  const levelErrors = validItems
    .map((item) => ({
      item,
      check: form.experienceLevel
        ? checkEligibility(form.experienceLevel, item.classRecord.level)
        : { valid: true, reason: null },
    }))
    .filter(({ check }) => !check.valid);

  function validateAll() {
    const nextErrors = {
      fullName: validateName(form.fullName),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      notes: validateNotes(form.notes),
      experienceLevel: form.experienceLevel ? '' : 'Select your experience level.',
    };
    setErrors(nextErrors);
    setTouched({ fullName: true, email: true, phone: true, notes: true, experienceLevel: true });
    return Object.values(nextErrors).every((msg) => !msg);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitAttempted(true);
    const formOk = validateAll();
    if (!formOk || levelErrors.length > 0 || validItems.length === 0) return;

    const reference = `NMS-${Date.now().toString(36).toUpperCase()}`;
    const confirmation = {
      reference,
      customer: { ...form },
      items: validItems.map((item) => ({
        className: item.classRecord.name,
        startsAt: item.session.startsAt,
        spots: item.spots,
        price: item.classRecord.price,
      })),
      subtotal,
      serviceFee: BOOKING_SERVICE_FEE,
      total: computeGrandTotal(subtotal),
      placedAt: new Date().toISOString(),
    };

    clearCart();
    navigate('/confirmation', { state: confirmation });
  }

  if (validItems.length === 0) {
    return (
      <div className="container">
        <div className="notice notice--warning">
          <p>You don't have any valid bookings to check out yet.</p>
          <Link to="/cart" className="btn btn--primary">
            Go to my bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-checkout">
      <header className="page-header">
        <h1>Checkout</h1>
        <p>
          This is a simulated checkout for a coursework project — no real payment is collected.
        </p>
      </header>

      {invalidItems.length > 0 && (
        <p className="notice notice--warning">
          {invalidItems.length} item(s) in your bookings list have issues and won't be included.{' '}
          <Link to="/cart">Review them</Link>.
        </p>
      )}

      <div className="page-checkout__grid">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Your details</h2>

          <FormField
            label="Full name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName ? errors.fullName : ''}
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
            required
          />
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone ? errors.phone : ''}
            required
            placeholder="03001234567"
          />

          <div className="form-field">
            <label htmlFor="experienceLevel">
              Your experience level <span aria-hidden="true"> *</span>
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={form.experienceLevel}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.experienceLevel && errors.experienceLevel)}
            >
              <option value="">Select a level…</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            {touched.experienceLevel && errors.experienceLevel && (
              <p className="form-field__error" role="alert">
                {errors.experienceLevel}
              </p>
            )}
          </div>

          <FormField
            label="Notes for the studio (optional)"
            name="notes"
            as="textarea"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.notes ? errors.notes : ''}
            maxLength={280}
            helpText={`${form.notes.length}/280`}
          />

          {submitAttempted && levelErrors.length > 0 && (
            <div className="notice notice--error" role="alert">
              <p>
                <strong>Your experience level doesn't match every class you've selected:</strong>
              </p>
              <ul>
                {levelErrors.map(({ item, check }) => (
                  <li key={item.key}>
                    {item.classRecord.name}: {check.reason}{' '}
                    <button
                      type="button"
                      className="btn btn--ghost btn--small"
                      onClick={() => removeItem(item.classId, item.sessionId)}
                    >
                      Remove from booking
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="btn btn--primary btn--block">
            Confirm booking
          </button>
        </form>

        <aside className="summary-card" aria-labelledby="checkout-summary-heading">
          <h2 id="checkout-summary-heading">Order summary</h2>
          <ul className="summary-items">
            {validItems.map((item) => (
              <li key={item.key}>
                <span>
                  {item.classRecord.name} × {item.spots}
                  <br />
                  <small>{formatSessionDateTime(item.session.startsAt)}</small>
                </span>
                <span>{formatCurrency(item.spots * item.classRecord.price)}</span>
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
              <dd>{formatCurrency(BOOKING_SERVICE_FEE)}</dd>
            </div>
            <div className="summary-totals__grand">
              <dt>Total</dt>
              <dd>{formatCurrency(computeGrandTotal(subtotal))}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

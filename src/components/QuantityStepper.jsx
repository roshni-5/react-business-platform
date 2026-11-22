import { MIN_SPOTS_PER_BOOKING, MAX_SPOTS_PER_BOOKING } from '../rules/capacityRule.js';

export default function QuantityStepper({ value, onChange, max, label = 'Spots' }) {
  const effectiveMax = Math.min(MAX_SPOTS_PER_BOOKING, max ?? MAX_SPOTS_PER_BOOKING);

  function clamp(next) {
    return Math.max(MIN_SPOTS_PER_BOOKING, Math.min(effectiveMax, next));
  }

  return (
    <div className="quantity-stepper">
      <span className="quantity-stepper__label" id="qty-label">
        {label}
      </span>
      <div className="quantity-stepper__controls" role="group" aria-labelledby="qty-label">
        <button
          type="button"
          className="quantity-stepper__btn"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= MIN_SPOTS_PER_BOOKING}
          aria-label="Decrease spots"
        >
          −
        </button>
        <span className="quantity-stepper__value" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          className="quantity-stepper__btn"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= effectiveMax}
          aria-label="Increase spots"
        >
          +
        </button>
      </div>
      <span className="quantity-stepper__hint">Max {MAX_SPOTS_PER_BOOKING} per booking</span>
    </div>
  );
}

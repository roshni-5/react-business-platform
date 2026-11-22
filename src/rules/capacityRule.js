// Operating rule 1 — Availability / capacity.
// A single booking may reserve between 1 and 4 spots, and never more spots
// than remain in the chosen session. This module is deliberately framework-free
// so it can be unit tested with node:test (see tests/capacityRule.test.js) and
// reused as-is inside the React app (see src/context/BookingContext.jsx).

export const MIN_SPOTS_PER_BOOKING = 1;
export const MAX_SPOTS_PER_BOOKING = 4;

/**
 * @param {number} quantity - spots requested in this booking
 * @param {number} remainingCapacity - spots currently free in the session
 * @returns {{ valid: boolean, reason: string | null }}
 */
export function validateBookingQuantity(quantity, remainingCapacity) {
  if (!Number.isInteger(quantity)) {
    return { valid: false, reason: 'Enter a whole number of spots.' };
  }

  if (quantity < MIN_SPOTS_PER_BOOKING) {
    return { valid: false, reason: 'Select at least 1 spot.' };
  }

  if (quantity > MAX_SPOTS_PER_BOOKING) {
    return {
      valid: false,
      reason: `You can book at most ${MAX_SPOTS_PER_BOOKING} spots per booking. Please make a separate booking for additional people.`,
    };
  }

  if (typeof remainingCapacity === 'number' && quantity > remainingCapacity) {
    return {
      valid: false,
      reason:
        remainingCapacity <= 0
          ? 'This session is fully booked.'
          : `Only ${remainingCapacity} spot${remainingCapacity === 1 ? '' : 's'} left in this session.`,
    };
  }

  return { valid: true, reason: null };
}

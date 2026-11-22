// Operating rule 3 — Pricing / fulfilment.
// Bookings close 2 hours before a session starts, so instructors have time to
// confirm headcount and prepare equipment.

export const BOOKING_CUTOFF_HOURS = 2;

/**
 * @param {string | Date} sessionStartsAt - ISO datetime (or Date) the session starts
 * @param {Date} [now] - override for testing
 * @returns {{ valid: boolean, reason: string | null, hoursUntilStart: number }}
 */
export function checkBookingCutoff(sessionStartsAt, now = new Date()) {
  const start = new Date(sessionStartsAt);
  const hoursUntilStart = (start.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilStart < BOOKING_CUTOFF_HOURS) {
    if (hoursUntilStart <= 0) {
      return {
        valid: false,
        reason: 'This session has already started or finished.',
        hoursUntilStart,
      };
    }
    const minutesLeft = Math.max(0, Math.round(hoursUntilStart * 60));
    return {
      valid: false,
      reason: `Bookings close ${BOOKING_CUTOFF_HOURS} hours before a session starts. This session begins in about ${minutesLeft} minutes — please choose a later session.`,
      hoursUntilStart,
    };
  }

  return { valid: true, reason: null, hoursUntilStart };
}

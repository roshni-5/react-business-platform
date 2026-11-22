export const BOOKING_SERVICE_FEE = 100; // flat PKR fee per completed booking, not per class

export function computeGrandTotal(subtotal) {
  return subtotal + BOOKING_SERVICE_FEE;
}

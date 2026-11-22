export function formatCurrency(amount) {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function formatSessionDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
}

export function remainingSpots(session) {
  return Math.max(0, session.capacity - session.booked);
}

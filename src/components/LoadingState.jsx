export default function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="state-block state-block--loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

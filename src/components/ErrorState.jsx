export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-block state-block--error" role="alert">
      <h2>We couldn't load the schedule</h2>
      <p>{message || 'Something went wrong while loading classes.'}</p>
      {onRetry && (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default function EmptyState({ title, description, action }) {
  return (
    <div className="state-block state-block--empty">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}

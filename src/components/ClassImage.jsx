import { useState } from 'react';
import CategoryIcon from './CategoryIcon.jsx';

// Handles the "missing image" edge case: our sample data intentionally
// references class photos we don't ship, so this always exercises the
// fallback path — a branded placeholder instead of a broken-image icon.
export default function ClassImage({ src, alt, category, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`class-image class-image--fallback class-image--${category?.toLowerCase()} ${className}`}
        role="img"
        aria-label={alt}
      >
        <CategoryIcon category={category} size={40} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`class-image ${className}`}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

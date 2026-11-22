// Small original icon set (not a third-party icon library) used as a visual
// anchor for each class category and as the fallback when a class photo is
// missing or fails to load.
const PATHS = {
  Yoga: 'M12 3a2 2 0 110 4 2 2 0 010-4zm0 5c-3 0-5 2-5 5v2h2l1 6h4l1-6h2v-2c0-3-2-5-5-5z',
  HIIT: 'M4 12h3l2-5 4 10 2-5h5',
  Strength: 'M3 9h2v6H3zM19 9h2v6h-2zM6 11h2v2H6zM16 11h2v2h-2zM8 10h8v4H8z',
  Cycling: 'M5 18a3 3 0 100-6 3 3 0 000 6zM19 18a3 3 0 100-6 3 3 0 000 6zM5 15l4-7h4l2 4h4M9 8h3',
  Dance: 'M12 2a2 2 0 110 4 2 2 0 010-4zm-3 6l3 2 3-2 3 4-2 1-1 7h-6l-1-7-2-1z',
  Boxing: 'M5 12a3 3 0 013-3h2a3 3 0 013 3v3a3 3 0 01-3 3H8a3 3 0 01-3-3zM13 10h3a3 3 0 013 3v1a3 3 0 01-3 3h-2',
  Recovery: 'M12 21s-7-4.35-9.5-8.5C.5 8.5 3 4 7 4c2 0 4 1.5 5 3 1-1.5 3-3 5-3 4 0 6.5 4.5 4.5 8.5C19 16.65 12 21 12 21z',
  Pilates: 'M4 12a8 8 0 1116 0 8 8 0 01-16 0zm4 0a4 4 0 118 0 4 4 0 01-8 0z',
};

const FALLBACK_PATH = 'M12 2L2 7v10l10 5 10-5V7l-10-5z';

export default function CategoryIcon({ category, size = 32 }) {
  const d = PATHS[category] || FALLBACK_PATH;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

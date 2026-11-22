import { CATEGORIES, LEVELS } from '../data/classes.js';

// Reads its values from the URL (via props) and writes back through
// onChange, instead of owning local state. Decision #2 (DECISIONS.md):
// because search/filter/sort live in the URL, navigating to a class detail
// page and back with the browser Back button restores the exact same
// results — the fix for "navigation resets filters or selections".
export default function SearchFilterBar({ q, category, level, sort, resultCount, onChange }) {
  return (
    <div className="filter-bar" role="search">
      <div className="filter-bar__field filter-bar__field--search">
        <label htmlFor="class-search">Search classes</label>
        <input
          id="class-search"
          type="search"
          value={q}
          placeholder="Try “yoga”, “Bilal”, or “cycling”…"
          onChange={(e) => onChange({ q: e.target.value })}
        />
      </div>

      <div className="filter-bar__field">
        <label htmlFor="class-category">Category</label>
        <select
          id="class-category"
          value={category}
          onChange={(e) => onChange({ category: e.target.value })}
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__field">
        <label htmlFor="class-level">Level</label>
        <select id="class-level" value={level} onChange={(e) => onChange({ level: e.target.value })}>
          <option value="All">All levels</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__field">
        <label htmlFor="class-sort">Sort by</label>
        <select id="class-sort" value={sort} onChange={(e) => onChange({ sort: e.target.value })}>
          <option value="name-asc">Name (A–Z)</option>
          <option value="price-asc">Price (low to high)</option>
          <option value="price-desc">Price (high to low)</option>
          <option value="soonest">Soonest available</option>
        </select>
      </div>

      <p className="filter-bar__count" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'class' : 'classes'} found
      </p>
    </div>
  );
}

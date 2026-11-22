import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useClasses } from '../hooks/useClasses.js';
import ClassCard from '../components/ClassCard.jsx';
import SearchFilterBar from '../components/SearchFilterBar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { remainingSpots } from '../utils/formatters.js';
import { checkBookingCutoff } from '../rules/cutoffRule.js';

function matchesSearch(classItem, query) {
  if (!query.trim()) return true;
  const haystack = `${classItem.name} ${classItem.category} ${classItem.instructor} ${classItem.tagline}`.toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

function earliestBookableStart(classItem) {
  const bookable = classItem.sessions.filter(
    (s) => remainingSpots(s) > 0 && checkBookingCutoff(s.startsAt).valid,
  );
  const pool = bookable.length > 0 ? bookable : classItem.sessions;
  return Math.min(...pool.map((s) => new Date(s.startsAt).getTime()));
}

function sortClasses(classes, sort) {
  const copy = [...classes];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'soonest':
      return copy.sort((a, b) => earliestBookableStart(a) - earliestBookableStart(b));
    case 'name-asc':
    default:
      return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export default function ClassesPage() {
  const { classes, status, error, retry } = useClasses();
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'All';
  const level = searchParams.get('level') || 'All';
  const sort = searchParams.get('sort') || 'name-asc';

  function handleFilterChange(partial) {
    const next = new URLSearchParams(searchParams);
    Object.entries(partial).forEach(([key, val]) => {
      if (!val || val === 'All' || (key === 'sort' && val === 'name-asc')) {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });
    setSearchParams(next, { replace: false });
  }

  const filtered = useMemo(() => {
    const byFilters = classes.filter(
      (c) =>
        matchesSearch(c, q) &&
        (category === 'All' || c.category === category) &&
        (level === 'All' || c.level === level),
    );
    return sortClasses(byFilters, sort);
  }, [classes, q, category, level, sort]);

  function clearFilters() {
    setSearchParams({});
  }

  return (
    <div className="container page-classes">
      <header className="page-header">
        <h1>Class schedule</h1>
        <p>Browse upcoming sessions across every studio and find the right fit for your level.</p>
      </header>

      {status === 'loading' && <LoadingState label="Loading the class schedule…" />}
      {status === 'error' && <ErrorState message={error} onRetry={retry} />}

      {status === 'success' && classes.length === 0 && (
        <EmptyState
          title="No classes are scheduled right now"
          description="Please check back soon — our studio schedule is updated weekly."
        />
      )}

      {status === 'success' && classes.length > 0 && (
        <>
          <SearchFilterBar
            q={q}
            category={category}
            level={level}
            sort={sort}
            resultCount={filtered.length}
            onChange={handleFilterChange}
          />

          {filtered.length === 0 ? (
            <EmptyState
              title="No classes match your search"
              description="Try a different keyword, or clear your filters to see the full schedule."
              action={
                <button type="button" className="btn btn--secondary" onClick={clearFilters}>
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="class-grid">
              {filtered.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </div>
          )}
        </>
      )}

      <p className="page-classes__footnote">
        Don't see what you're looking for? <Link to="/about">Read about our studio</Link>.
      </p>
    </div>
  );
}

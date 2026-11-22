import { useEffect, useRef, useState } from 'react';

/**
 * Reads/writes a JSON value in localStorage. Falls back to `initialValue`
 * when the stored value is missing, unparsable, or fails a validator —
 * this is what keeps outdated/corrupted saved data from crashing the app.
 *
 * @param {string} key
 * @param {*} initialValue
 * @param {(parsed: any) => boolean} [isValid]
 */
export function useLocalStorage(key, initialValue, isValid) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initialValue;
      const parsed = JSON.parse(raw);
      if (isValid && !isValid(parsed)) return initialValue;
      return parsed;
    } catch {
      return initialValue;
    }
  });

  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable (private browsing, quota exceeded); the
      // app still works, it just won't persist this change.
    }
  }, [key, value]);

  return [value, setValue];
}

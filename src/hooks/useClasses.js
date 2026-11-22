import { useEffect, useState, useCallback } from 'react';
import { fetchClasses } from '../services/classService.js';
import { useDemo } from '../context/DemoContext.jsx';

/**
 * Loads the class catalogue through the mock async service and exposes
 * loading / error / retry state (FR14). `retryKey` lets the caller force a
 * reload (used by the "Retry" button after a failure).
 */
export function useClasses() {
  const { forceFail, overrides } = useDemo();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    fetchClasses({ forceFail, overrides })
      .then((data) => {
        if (cancelled) return;
        setClasses(data);
        setStatus('success');
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Something went wrong.');
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [forceFail, overrides, retryKey]);

  const retry = useCallback(() => setRetryKey((k) => k + 1), []);

  return { classes, status, error, retry };
}

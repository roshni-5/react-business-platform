import { CLASSES } from '../data/classes.js';

const SIMULATED_DELAY_MS = 650;

/**
 * Mock asynchronous loader (FR14). In a real deployment this would be a
 * fetch() to a backend; here it simulates network latency and, when asked by
 * the demo controls, a failed request — so the UI's loading/error/retry
 * states are genuinely exercised.
 *
 * @param {{ forceFail?: boolean, overrides?: Record<string, Record<string, number>> }} options
 * @returns {Promise<typeof CLASSES>}
 */
export function fetchClasses({ forceFail = false, overrides = {} } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceFail) {
        reject(new Error('Could not reach the Nova Movement Studio schedule service.'));
        return;
      }

      const withOverrides = CLASSES.map((classItem) => {
        const sessionOverrides = overrides[classItem.id];
        if (!sessionOverrides) return classItem;
        return {
          ...classItem,
          sessions: classItem.sessions.map((session) =>
            sessionOverrides[session.id] !== undefined
              ? { ...session, booked: sessionOverrides[session.id] }
              : session,
          ),
        };
      });

      resolve(withOverrides);
    }, SIMULATED_DELAY_MS);
  });
}

import { createContext, useContext, useMemo, useState } from 'react';

// Demonstration controls required by the assignment brief: a clearly labelled
// way to simulate a failed data load, and a way to change a session's
// availability, without touching browser devtools.
const DemoContext = createContext(null);

export function DemoProvider({ children }) {
  const [forceFail, setForceFail] = useState(false);
  const [overrides, setOverrides] = useState({}); // { [classId]: { [sessionId]: bookedCount } }

  const value = useMemo(
    () => ({
      forceFail,
      setForceFail,
      overrides,
      setSessionBooked(classId, sessionId, booked) {
        setOverrides((prev) => ({
          ...prev,
          [classId]: { ...prev[classId], [sessionId]: booked },
        }));
      },
      resetOverrides() {
        setOverrides({});
      },
    }),
    [forceFail, overrides],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within DemoProvider');
  return ctx;
}

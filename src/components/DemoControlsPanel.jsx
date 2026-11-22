import { useState } from 'react';
import { CLASSES } from '../data/classes.js';
import { useDemo } from '../context/DemoContext.jsx';
import { formatSessionDateTime } from '../utils/formatters.js';

// Clearly labelled demonstration control required by the brief: lets a
// reviewer simulate a failed schedule load, and change a session's booked
// count (e.g. to make it sold out), without opening devtools.
export default function DemoControlsPanel() {
  const { forceFail, setForceFail, setSessionBooked, resetOverrides, overrides } = useDemo();
  const [open, setOpen] = useState(false);
  const [classId, setClassId] = useState(CLASSES[0].id);
  const selectedClass = CLASSES.find((c) => c.id === classId);
  const [sessionId, setSessionId] = useState(selectedClass.sessions[0].id);
  const session = selectedClass.sessions.find((s) => s.id === sessionId) || selectedClass.sessions[0];

  function handleClassChange(e) {
    const nextClass = CLASSES.find((c) => c.id === e.target.value);
    setClassId(nextClass.id);
    setSessionId(nextClass.sessions[0].id);
  }

  return (
    <div className={`demo-panel ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="demo-panel__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? 'Close demo controls' : 'Demo controls'}
      </button>

      {open && (
        <div className="demo-panel__body" role="region" aria-label="Demonstration controls">
          <p className="demo-panel__intro">
            For evaluation only — these simulate real-world conditions (not visible to real
            customers).
          </p>

          <label className="demo-panel__checkbox">
            <input
              type="checkbox"
              checked={forceFail}
              onChange={(e) => setForceFail(e.target.checked)}
            />
            Simulate schedule load failure
          </label>

          <div className="demo-panel__field">
            <label htmlFor="demo-class">Class</label>
            <select id="demo-class" value={classId} onChange={handleClassChange}>
              {CLASSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="demo-panel__field">
            <label htmlFor="demo-session">Session</label>
            <select id="demo-session" value={sessionId} onChange={(e) => setSessionId(e.target.value)}>
              {selectedClass.sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {formatSessionDateTime(s.startsAt)}
                </option>
              ))}
            </select>
          </div>

          <div className="demo-panel__actions">
            <button
              type="button"
              className="btn btn--secondary btn--small"
              onClick={() => setSessionBooked(classId, sessionId, session.capacity)}
            >
              Mark sold out
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--small"
              onClick={() => setSessionBooked(classId, sessionId, Math.max(0, session.capacity - 2))}
            >
              Open up 2 spots
            </button>
          </div>

          {Object.keys(overrides).length > 0 && (
            <button type="button" className="btn btn--ghost btn--small" onClick={resetOverrides}>
              Reset availability overrides
            </button>
          )}
        </div>
      )}
    </div>
  );
}

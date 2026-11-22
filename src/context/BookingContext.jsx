import { createContext, useContext, useMemo } from 'react';
import { getClassById } from '../data/classes.js';
import { remainingSpots } from '../utils/formatters.js';
import { validateBookingQuantity } from '../rules/capacityRule.js';
import { checkBookingCutoff } from '../rules/cutoffRule.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

// Shared booking-selection state (FR07/FR08/FR13): a cart entry only stores
// {classId, sessionId, spots} — everything else (price, name, capacity) is
// looked up live from the current class data, so the cart can never go
// stale on its own and we can always re-check it against the two session
// rules (capacity, cutoff) whenever it is read.

const BookingContext = createContext(null);

const STORAGE_KEY = 'nova.cart.v1';

function isValidStoredCart(parsed) {
  return (
    Array.isArray(parsed) &&
    parsed.every(
      (item) =>
        item &&
        typeof item.classId === 'string' &&
        typeof item.sessionId === 'string' &&
        Number.isFinite(item.spots),
    )
  );
}

export function BookingProvider({ children }) {
  const [rawItems, setRawItems] = useLocalStorage(STORAGE_KEY, [], isValidStoredCart);

  function keyOf(classId, sessionId) {
    return `${classId}__${sessionId}`;
  }

  function addItem(classId, sessionId, spots) {
    setRawItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.classId === classId && i.sessionId === sessionId,
      );
      if (existingIndex === -1) {
        return [...prev, { classId, sessionId, spots }];
      }
      const next = [...prev];
      next[existingIndex] = { ...next[existingIndex], spots };
      return next;
    });
  }

  function updateSpots(classId, sessionId, spots) {
    setRawItems((prev) =>
      prev.map((item) =>
        item.classId === classId && item.sessionId === sessionId ? { ...item, spots } : item,
      ),
    );
  }

  function removeItem(classId, sessionId) {
    setRawItems((prev) =>
      prev.filter((item) => !(item.classId === classId && item.sessionId === sessionId)),
    );
  }

  function clearCart() {
    setRawItems([]);
  }

  const validatedItems = useMemo(() => {
    return rawItems.map((item) => {
      const key = keyOf(item.classId, item.sessionId);
      const classRecord = getClassById(item.classId);

      if (!classRecord) {
        return {
          ...item,
          key,
          classRecord: null,
          session: null,
          issues: ['This class is no longer offered.'],
        };
      }

      const session = classRecord.sessions.find((s) => s.id === item.sessionId);
      if (!session) {
        return {
          ...item,
          key,
          classRecord,
          session: null,
          issues: ['This session is no longer on the schedule.'],
        };
      }

      const issues = [];
      const capacityResult = validateBookingQuantity(item.spots, remainingSpots(session));
      if (!capacityResult.valid) issues.push(capacityResult.reason);

      const cutoffResult = checkBookingCutoff(session.startsAt);
      if (!cutoffResult.valid) issues.push(cutoffResult.reason);

      return { ...item, key, classRecord, session, issues };
    });
  }, [rawItems]);

  const validItems = validatedItems.filter((i) => i.issues.length === 0);
  const invalidItems = validatedItems.filter((i) => i.issues.length > 0);

  const totalSpots = validItems.reduce((sum, i) => sum + i.spots, 0);
  const subtotal = validItems.reduce((sum, i) => sum + i.spots * i.classRecord.price, 0);

  const value = {
    items: validatedItems,
    validItems,
    invalidItems,
    totalSpots,
    subtotal,
    addItem,
    updateSpots,
    removeItem,
    clearCart,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

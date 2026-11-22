// Automated test for the capacity operating rule (Task 6.2).
// Run with: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateBookingQuantity,
  MIN_SPOTS_PER_BOOKING,
  MAX_SPOTS_PER_BOOKING,
} from '../src/rules/capacityRule.js';

test('accepts an ordinary valid quantity within capacity', () => {
  const result = validateBookingQuantity(2, 10);
  assert.equal(result.valid, true);
  assert.equal(result.reason, null);
});

test('accepts a quantity exactly at the per-booking limit', () => {
  const result = validateBookingQuantity(MAX_SPOTS_PER_BOOKING, 10);
  assert.equal(MAX_SPOTS_PER_BOOKING, 4);
  assert.equal(result.valid, true);
  assert.equal(result.reason, null);
});

test('rejects a quantity one above the per-booking limit', () => {
  const result = validateBookingQuantity(MAX_SPOTS_PER_BOOKING + 1, 10);
  assert.equal(result.valid, false);
  assert.match(result.reason, /at most 4 spots/i);
});

test('rejects a quantity below the minimum', () => {
  const result = validateBookingQuantity(MIN_SPOTS_PER_BOOKING - 1, 10);
  assert.equal(result.valid, false);
  assert.match(result.reason, /at least 1 spot/i);
});

test('rejects a quantity that exceeds remaining session capacity, even within the 1-4 range', () => {
  const result = validateBookingQuantity(3, 2);
  assert.equal(result.valid, false);
  assert.match(result.reason, /2 spots left/i);
});

test('reports a fully booked session distinctly from a low-capacity session', () => {
  const result = validateBookingQuantity(1, 0);
  assert.equal(result.valid, false);
  assert.match(result.reason, /fully booked/i);
});

test('rejects non-integer input', () => {
  const result = validateBookingQuantity(1.5, 10);
  assert.equal(result.valid, false);
  assert.match(result.reason, /whole number/i);
});

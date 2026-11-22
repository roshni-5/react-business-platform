// Operating rule 2 — Eligibility / compatibility.
// A customer may only book a class whose required level is at or below their
// own declared experience level (Beginner < Intermediate < Advanced).

import { LEVEL_RANK } from '../data/classes.js';

/**
 * @param {string} customerLevel - level selected by the customer in the booking form
 * @param {string} classLevel - minimum level required by the class
 * @returns {{ valid: boolean, reason: string | null }}
 */
export function checkEligibility(customerLevel, classLevel) {
  const customerRank = LEVEL_RANK[customerLevel];
  const classRank = LEVEL_RANK[classLevel];

  if (!customerRank || !classRank) {
    return { valid: false, reason: 'Select your experience level to continue.' };
  }

  if (customerRank < classRank) {
    return {
      valid: false,
      reason: `This class requires ${classLevel} level. Choose a class suited to your current level, or update your experience level above if it's out of date.`,
    };
  }

  return { valid: true, reason: null };
}

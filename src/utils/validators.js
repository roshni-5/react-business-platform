// Controlled-form validation used by the checkout form (FR09/FR10).
// Each validator returns an error string, or '' when the field is valid, so
// the form can show specific, field-level feedback and keep valid input.

export function validateName(value) {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter your full name.';
  if (trimmed.length < 3) return 'Name must be at least 3 characters.';
  if (!/^[a-zA-Z\s'.-]+$/.test(trimmed)) {
    return 'Name can only contain letters, spaces, and basic punctuation.';
  }
  return '';
}

export function validateEmail(value) {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter your email address.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return 'Enter a valid email address, e.g. name@example.com.';
  }
  return '';
}

export function validatePhone(value) {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter a phone number we can reach you on.';
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 12) {
    return 'Enter a valid phone number (10–12 digits), e.g. 03001234567.';
  }
  return '';
}

export function validateNotes(value) {
  if (value.length > 280) {
    return 'Notes must be 280 characters or fewer.';
  }
  return '';
}

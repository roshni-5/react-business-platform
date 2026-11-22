import { useId } from 'react';

// A controlled text/textarea field with an associated <label>, error text,
// and aria-invalid/aria-describedby wiring so assistive tech announces the
// specific problem (FR10 + accessibility requirement).
export default function FormField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  as = 'input',
  required = false,
  placeholder,
  maxLength,
  helpText,
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const Field = as;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <Field
        id={id}
        name={name}
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={[error ? errorId : null, helpText ? helpId : null]
          .filter(Boolean)
          .join(' ') || undefined}
        className={error ? 'has-error' : ''}
      />
      {helpText && (
        <p id={helpId} className="form-field__help">
          {helpText}
        </p>
      )}
      {error && (
        <p id={errorId} className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

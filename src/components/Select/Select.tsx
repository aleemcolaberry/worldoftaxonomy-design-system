import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes, ReactNode } from 'react';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helper?: string;
  error?: string;
  size?: SelectSize;
  /** Render options from an array; alternatively pass <option> children. */
  options?: SelectOption[];
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  optional?: boolean;
}

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    helper,
    error,
    size = 'md',
    options,
    placeholder,
    optional,
    className,
    id,
    disabled,
    children,
    ...rest
  },
  ref
) {
  const reactId = useId();
  const fieldId = id ?? `wot-sel-${reactId}`;
  const helperId = helper ? `${fieldId}-help` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = errorId ?? helperId;

  return (
    <div className={cx(styles.wrap, disabled && styles.wrapDisabled, className)}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          <span>{label}</span>
          {optional && <em className={styles.optional}>optional</em>}
        </label>
      )}
      <div
        className={cx(
          styles.field,
          styles[`s-${size}`],
          error && styles.fieldError,
          disabled && styles.fieldDisabled
        )}
      >
        <select
          {...rest}
          id={fieldId}
          ref={ref}
          disabled={disabled}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={styles.select}
        >
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span className={styles.chev} aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {error ? (
        <p id={errorId} className={styles.error}>{error}</p>
      ) : helper ? (
        <p id={helperId} className={styles.helper}>{helper}</p>
      ) : null}
    </div>
  );
});

export default Select;

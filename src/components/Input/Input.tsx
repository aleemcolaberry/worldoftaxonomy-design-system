import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  /** Helper text rendered below the field; hidden when an error is present. */
  helper?: string;
  /** Error message; promotes the field to error state. */
  error?: string;
  size?: InputSize;
  /** Content rendered inside the field on the left (icon / label / prefix). */
  prefix?: ReactNode;
  /** Content rendered inside the field on the right (icon / suffix). */
  suffix?: ReactNode;
  /** Mark the field as optional in the label. */
  optional?: boolean;
}

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helper,
    error,
    size = 'md',
    prefix,
    suffix,
    optional,
    className,
    id,
    disabled,
    ...rest
  },
  ref
) {
  const reactId = useId();
  const fieldId = id ?? `wot-input-${reactId}`;
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
        {prefix && <span className={styles.affix}>{prefix}</span>}
        <input
          {...rest}
          id={fieldId}
          ref={ref}
          disabled={disabled}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={styles.input}
        />
        {suffix && <span className={styles.affix}>{suffix}</span>}
      </div>
      {error ? (
        <p id={errorId} className={styles.error}>{error}</p>
      ) : helper ? (
        <p id={helperId} className={styles.helper}>{helper}</p>
      ) : null}
    </div>
  );
});

export default Input;

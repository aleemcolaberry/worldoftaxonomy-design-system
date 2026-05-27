import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
}

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, className, id, disabled, ...rest },
  ref
) {
  const reactId = useId();
  const fieldId = id ?? `wot-cb-${reactId}`;
  return (
    <label
      htmlFor={fieldId}
      className={cx(styles.row, disabled && styles.disabled, className)}
    >
      <span className={styles.boxWrap}>
        <input
          {...rest}
          ref={ref}
          id={fieldId}
          type="checkbox"
          disabled={disabled}
          className={styles.input}
        />
        <span className={styles.box} aria-hidden>
          <svg
            className={styles.check}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </span>
      {(label || description) && (
        <span className={styles.text}>
          {label && <span className={styles.label}>{label}</span>}
          {description && <span className={styles.desc}>{description}</span>}
        </span>
      )}
    </label>
  );
});

export default Checkbox;

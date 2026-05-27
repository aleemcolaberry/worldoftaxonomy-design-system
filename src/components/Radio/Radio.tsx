import { forwardRef, useId, createContext, useContext } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Radio.module.css';

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  /** Form field name. */
  name?: string;
  /** Controlled value. */
  value?: string;
  /** Default value for uncontrolled use. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  /** Stack direction. Default 'vertical'. */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  children,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  // For uncontrolled use we just pass the name; the radios use their own state.
  const ctx: RadioGroupContextValue = { name, value, onChange };
  return (
    <RadioGroupContext.Provider value={ctx}>
      <div
        role="radiogroup"
        className={`${styles.group} ${styles[`group-${orientation}`]} ${className ?? ''}`}
        data-default-value={defaultValue}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
  value: string;
}

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, className, id, disabled, value, name, checked, onChange, ...rest },
  ref
) {
  const reactId = useId();
  const fieldId = id ?? `wot-r-${reactId}`;
  const ctx = useContext(RadioGroupContext);

  const resolvedName = name ?? ctx?.name;
  const resolvedChecked = ctx?.value !== undefined ? ctx.value === value : checked;
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e);
    if (ctx?.onChange) ctx.onChange(value);
  };

  return (
    <label
      htmlFor={fieldId}
      className={cx(styles.row, disabled && styles.disabled, className)}
    >
      <span className={styles.dotWrap}>
        <input
          {...rest}
          ref={ref}
          id={fieldId}
          name={resolvedName}
          type="radio"
          value={value}
          disabled={disabled}
          checked={resolvedChecked}
          onChange={handleChange}
          className={styles.input}
        />
        <span className={styles.dot} aria-hidden />
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

export default Radio;

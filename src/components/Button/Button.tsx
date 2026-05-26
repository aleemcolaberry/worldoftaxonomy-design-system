import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'default'
  | 'dashed'
  | 'text'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonShape = 'default' | 'round' | 'circle';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Apply the danger (red) palette on top of the variant. */
  danger?: boolean;
  /** Full-width within its container. */
  block?: boolean;
  /** Show a loading spinner; disables the button. */
  loading?: boolean;
  /** Render an icon-only square; pass the icon as children. */
  iconOnly?: boolean;
  shape?: ButtonShape;
  children?: ReactNode;
}

const cx = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'default',
    size = 'md',
    danger = false,
    block = false,
    loading = false,
    iconOnly = false,
    shape = 'default',
    disabled,
    className,
    children,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;
  return (
    <button
      {...rest}
      ref={ref}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cx(
        styles.btn,
        styles[`v-${variant}`],
        styles[`s-${size}`],
        danger && styles.danger,
        block && styles.block,
        loading && styles.loading,
        iconOnly && styles.iconOnly,
        shape !== 'default' && styles[`shape-${shape}`],
        className
      )}
    >
      {loading && <span className={styles.spinner} aria-hidden />}
      <span className={styles.label}>{children}</span>
    </button>
  );
});

export default Button;

import type { ReactNode } from 'react';
import styles from './ButtonGroup.module.css';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps {
  /** Stack children left-to-right or top-to-bottom. */
  orientation?: ButtonGroupOrientation;
  /** Compact mode merges adjacent borders into a single hairline. */
  compact?: boolean;
  children: ReactNode;
  className?: string;
}

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

export default function ButtonGroup({
  orientation = 'horizontal',
  compact = false,
  children,
  className,
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cx(
        styles.group,
        styles[orientation],
        compact && styles.compact,
        className
      )}
    >
      {children}
    </div>
  );
}

import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'elevated' | 'outline';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Adds hover/focus affordances; pair with onClick or wrap in a Link. */
  interactive?: boolean;
  /** Optional cyan top-border accent. */
  accent?: boolean;
}

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', interactive = false, accent = false, className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx(
        styles.card,
        styles[`v-${variant}`],
        interactive && styles.interactive,
        accent && styles.accent,
        className
      )}
    >
      {children}
    </div>
  );
});

export default Card;

export function CardHeader({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <header {...rest} className={cx(styles.head, className)}>{children}</header>;
}

export function CardTitle({ children, className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...rest} className={cx(styles.title, className)}>{children}</h3>;
}

export function CardDescription({ children, className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...rest} className={cx(styles.desc, className)}>{children}</p>;
}

export function CardBody({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={cx(styles.body, className)}>{children}</div>;
}

export function CardFooter({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <footer {...rest} className={cx(styles.foot, className)}>{children}</footer>;
}

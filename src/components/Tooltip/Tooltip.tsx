import { Children, cloneElement, isValidElement, useId } from 'react';
import type { ReactElement, ReactNode } from 'react';
import styles from './Tooltip.module.css';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip content. */
  content: ReactNode;
  /** Single child element that anchors the tooltip. */
  children: ReactElement;
  side?: TooltipSide;
  /** Show even when disabled / non-interactive children (wraps in span). */
  forceWrapper?: boolean;
}

/**
 * CSS-driven tooltip: appears on hover and focus of the anchor element.
 * Uses :hover and :focus-within on a wrapper around the child.
 */
export default function Tooltip({
  content,
  children,
  side = 'top',
  forceWrapper = false,
}: TooltipProps) {
  const id = useId();
  const tooltipId = `wot-tip-${id}`;

  if (!forceWrapper && Children.count(children) === 1 && isValidElement(children)) {
    const enhanced = cloneElement(
      children as ReactElement<{ 'aria-describedby'?: string }>,
      { 'aria-describedby': tooltipId }
    );
    return (
      <span className={`${styles.anchor} ${styles[`side-${side}`]}`}>
        {enhanced}
        <span role="tooltip" id={tooltipId} className={styles.bubble}>
          {content}
        </span>
      </span>
    );
  }

  return (
    <span className={`${styles.anchor} ${styles[`side-${side}`]}`} tabIndex={0} aria-describedby={tooltipId}>
      {children}
      <span role="tooltip" id={tooltipId} className={styles.bubble}>
        {content}
      </span>
    </span>
  );
}

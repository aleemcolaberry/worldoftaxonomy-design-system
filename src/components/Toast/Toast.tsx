import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import styles from './Toast.module.css';

export type ToastTone = 'success' | 'info' | 'warning' | 'error';

export interface ToastInput {
  title: string;
  body?: string;
  tone?: ToastTone;
  /** Auto-dismiss after this many ms. Set to 0 for sticky. Default 4000. */
  duration?: number;
}

export interface Toast extends Required<Omit<ToastInput, 'body'>> {
  id: string;
  body?: string;
}

interface ToastContextValue {
  toasts: Toast[];
  push: (input: ToastInput) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be called inside a <ToastProvider>.');
  return ctx;
}

let counter = 0;
const nextId = () => `t-${++counter}-${Date.now().toString(36)}`;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((ts) => ts.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((input: ToastInput) => {
    const id = nextId();
    const toast: Toast = {
      id,
      title: input.title,
      body: input.body,
      tone: input.tone ?? 'info',
      duration: input.duration ?? 4000,
    };
    setToasts((ts) => [...ts, toast]);
    return id;
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, push, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastViewport({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;
  return createPortal(
    <div className={styles.viewport} role="region" aria-label="Notifications">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>,
    document.body
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    if (toast.duration <= 0) return;
    const t = window.setTimeout(onDismiss, toast.duration);
    return () => window.clearTimeout(t);
  }, [toast.duration, onDismiss]);

  return (
    <div className={`${styles.toast} ${styles[`tone-${toast.tone}`]}`} role="status">
      <span className={styles.dot} aria-hidden />
      <div className={styles.body}>
        <strong>{toast.title}</strong>
        {toast.body && <p>{toast.body}</p>}
      </div>
      <button
        type="button"
        className={styles.close}
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}

/** Inline Notice — same visual as Toast but rendered in normal flow. */
export interface NoticeProps {
  tone?: ToastTone;
  title: string;
  body?: ReactNode;
  onDismiss?: () => void;
}

export function Notice({ tone = 'info', title, body, onDismiss }: NoticeProps) {
  return (
    <div className={`${styles.toast} ${styles.noticeInline} ${styles[`tone-${tone}`]}`} role="status">
      <span className={styles.dot} aria-hidden />
      <div className={styles.body}>
        <strong>{title}</strong>
        {body && <p>{body}</p>}
      </div>
      {onDismiss && (
        <button type="button" className={styles.close} onClick={onDismiss} aria-label="Dismiss">×</button>
      )}
    </div>
  );
}

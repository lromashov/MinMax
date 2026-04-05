import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../../app/store';
import type { Toast } from '../../types';

const ToastCard = ({ toast }: { toast: Toast }) => {
  const dismissToast = useAppStore((state) => state.dismissToast);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => dismissToast(toast.id), toast.duration ?? 2800);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [dismissToast, toast.duration, toast.id]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      className={`toast toast--${toast.tone}`}
    >
      <div className="toast__title">{toast.title}</div>
      <div className="toast__description">{toast.description}</div>
    </motion.div>
  );
};

export const ToastCenter = () => {
  const toasts = useAppStore((state) => state.toasts);

  return (
    <div className="toast-center" aria-live="polite">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

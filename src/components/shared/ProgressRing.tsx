import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number;
  label: string;
  subtitle: string;
  tone?: 'default' | 'success' | 'danger';
  size?: number;
  centerExtra?: ReactNode;
}

export const ProgressRing = ({
  centerExtra,
  label,
  progress,
  size = 280,
  subtitle,
  tone = 'default',
}: ProgressRingProps) => {
  const radius = 108;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className={`progress-ring progress-ring--${tone}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 260 260" className="progress-ring__svg">
        <circle cx="130" cy="130" r={radius} className="progress-ring__track" />
        <motion.circle
          cx="130"
          cy="130"
          r={radius}
          className="progress-ring__value"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          strokeLinecap="round"
        />
      </svg>
      <div className="progress-ring__center">
        <strong>{label}</strong>
        <span>{subtitle}</span>
        {centerExtra}
      </div>
    </div>
  );
};

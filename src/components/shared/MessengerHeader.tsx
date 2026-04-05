import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MessengerHeaderProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  variant: 'min' | 'telega' | 'hybrid';
}

export const MessengerHeader = ({
  eyebrow,
  leading,
  subtitle,
  title,
  trailing,
  variant,
}: MessengerHeaderProps) => (
  <motion.div layout className={`messenger-header messenger-header--${variant}`}>
    <div className="messenger-header__content">
      {leading ? <div className="messenger-header__leading">{leading}</div> : null}
      <div>
        {eyebrow ? <div className="messenger-header__eyebrow">{eyebrow}</div> : null}
        <h2 className="messenger-header__title">{title}</h2>
        <p className="messenger-header__subtitle">{subtitle}</p>
      </div>
    </div>
    {trailing ? <div className="messenger-header__trailing">{trailing}</div> : null}
  </motion.div>
);

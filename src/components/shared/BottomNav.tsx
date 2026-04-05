import { motion } from 'framer-motion';
import type { BottomNavItem } from '../../types';

interface BottomNavProps {
  items: BottomNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant: 'min' | 'telega' | 'hybrid';
}

export const BottomNav = ({ activeId, items, onChange, variant }: BottomNavProps) => (
  <nav className={`bottom-nav bottom-nav--${variant}`}>
    {items.map((item) => {
      const active = item.id === activeId;
      return (
        <motion.button
          key={item.id}
          type="button"
          whileTap={{ scale: 0.98 }}
          className={`bottom-nav__item ${active ? 'is-active' : ''}`}
          onClick={() => onChange(item.id)}
        >
          {active ? <motion.div layoutId={`nav-pill-${variant}`} className="bottom-nav__pill" /> : null}
          <span className="bottom-nav__icon">{item.icon}</span>
          <span className="bottom-nav__label">{item.label}</span>
          {item.badge ? <span className="bottom-nav__badge">{item.badge}</span> : null}
        </motion.button>
      );
    })}
  </nav>
);

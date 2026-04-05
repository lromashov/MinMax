import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AppShellProps {
  variant: 'min' | 'telega' | 'hybrid';
  brand: ReactNode;
  meta?: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
  nav: ReactNode;
  overlay?: ReactNode;
}

export const AppShell = ({ brand, content, meta, nav, overlay, sidebar, variant }: AppShellProps) => (
  <motion.div layout className={`demo-stage demo-stage--${variant}`}>
    <div className={`surface surface--${variant}`}>
      <div className="surface__chrome">
        <div className="surface__brand">{brand}</div>
        <div className="surface__meta">{meta}</div>
      </div>
      <div className="surface__grid">
        <aside className="surface__sidebar">{sidebar}</aside>
        <section className="surface__main">{content}</section>
      </div>
      <div className="surface__nav">{nav}</div>
      {overlay}
    </div>
  </motion.div>
);

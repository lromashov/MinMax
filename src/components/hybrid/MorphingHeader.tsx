import { motion } from 'framer-motion';
import type { MorphDirection } from '../../app/phases';
import { getMorphStageMeta } from '../../utils/morph';
import { SparklesIcon } from '../shared/icons';

interface MorphingHeaderProps {
  progress: number;
  direction: MorphDirection;
}

export const MorphingHeader = ({ direction, progress }: MorphingHeaderProps) => {
  const meta = getMorphStageMeta(progress, direction);

  return (
    <motion.div layout className="messenger-header messenger-header--hybrid">
      <div className="messenger-header__content">
        <div className="header-orb header-orb--accent">
          <SparklesIcon size={18} />
        </div>
        <div>
          <div className="messenger-header__eyebrow">MORPH ENGINE</div>
          <h2 className="messenger-header__title">{meta.title}</h2>
          <p className="messenger-header__subtitle">{meta.description}</p>
        </div>
      </div>
      <div className="header-chip-stack">
        <span className="stat-pill stat-pill--blue">{Math.round(progress * 100)}%</span>
        <span className="stat-pill">гибрид</span>
      </div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import type { MorphDirection } from '../../app/phases';
import { getMorphStageMeta } from '../../utils/morph';

interface MorphOverlayProps {
  direction: MorphDirection;
  progress: number;
}

export const MorphOverlay = ({ direction, progress }: MorphOverlayProps) => {
  const stageMeta = getMorphStageMeta(progress, direction);
  const returnCountdown = Math.max(1, Math.ceil((1 - progress) * 3));

  return (
    <motion.div
      className="morph-overlay"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
    >
      <div className="morph-overlay__capsule">{direction === 'toTelega' ? 'MIN → TELEGA' : 'TELEGA → MIN'}</div>
      <h3>{stageMeta.title}</h3>
      <p>{stageMeta.description}</p>
      <div className="morph-overlay__bar">
        <div className="morph-overlay__bar-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="morph-overlay__footer">
        <span>Stage {stageMeta.stage} / 3</span>
        <span>
          {direction === 'toTelega'
            ? `${Math.round(progress * 100)}% свободы интерфейса`
            : `Возврат в Мин через ${returnCountdown}…`}
        </span>
      </div>
    </motion.div>
  );
};

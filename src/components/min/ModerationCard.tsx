import { motion } from 'framer-motion';
import type { ModerationDecision } from '../../app/phases';
import type { ModerationMessage } from '../../types';
import { KeepIcon, TrashIcon } from '../shared/icons';

interface ModerationCardProps {
  message: ModerationMessage;
  queuePosition: number;
  total: number;
  pendingDecision: ModerationDecision | null;
  onDecision: (decision: ModerationDecision) => void;
}

const cardVariants = {
  initial: { opacity: 0, y: 26, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: (decision: ModerationDecision | null) => ({
    opacity: 0,
    x: decision === 'delete' ? -180 : 180,
    y: -12,
    rotate: decision === 'delete' ? -7 : 7,
    scale: 0.94,
  }),
};

export const ModerationCard = ({
  message,
  onDecision,
  pendingDecision,
  queuePosition,
  total,
}: ModerationCardProps) => (
  <motion.article
    className="moderation-card"
    variants={cardVariants}
    custom={pendingDecision}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ type: 'spring', stiffness: 240, damping: 24 }}
  >
    <div className="moderation-card__top">
      <div>
        <div className="moderation-card__overline">Карточка {queuePosition} / {total}</div>
        <h3>{message.author}</h3>
      </div>
      <div className={`moderation-card__risk ${message.shouldDelete ? 'is-risky' : 'is-safe'}`}>
        {message.shouldDelete ? 'сомнительно' : 'скорее мирно'}
      </div>
    </div>

    <p className="moderation-card__text">{message.text}</p>

    <div className="moderation-card__footer">
      <motion.button
        type="button"
        className="decision-button decision-button--danger"
        whileTap={{ scale: 0.98 }}
        onClick={() => onDecision('delete')}
        disabled={pendingDecision !== null}
      >
        <TrashIcon size={18} />
        Удалить
      </motion.button>
      <motion.button
        type="button"
        className="decision-button decision-button--safe"
        whileTap={{ scale: 0.98 }}
        onClick={() => onDecision('keep')}
        disabled={pendingDecision !== null}
      >
        <KeepIcon size={18} />
        Оставить
      </motion.button>
    </div>
  </motion.article>
);

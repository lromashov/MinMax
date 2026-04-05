import { motion } from 'framer-motion';
import { MenuDotsIcon, PlaneIcon } from '../shared/icons';

interface MorphingComposerProps {
  progress: number;
}

export const MorphingComposer = ({ progress }: MorphingComposerProps) => (
  <motion.div layout className="composer composer--hybrid">
    <button type="button" className="composer__icon-button" aria-label="Прикрепить переходное состояние">
      <MenuDotsIcon size={18} />
    </button>
    <div className="composer__input">
      {progress < 0.4
        ? 'Мин ещё держится…'
        : progress < 0.7
          ? 'Гибрид думает, куда ему принадлежать…'
          : 'Телега почти набрала форму…'}
    </div>
    <button type="button" className="composer__send" aria-label="Отправить переходное сообщение">
      <PlaneIcon size={18} />
    </button>
  </motion.div>
);

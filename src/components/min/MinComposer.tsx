import { motion } from 'framer-motion';
import { MenuDotsIcon, SparklesIcon } from '../shared/icons';

export const MinComposer = () => (
  <motion.div layout className="composer composer--min">
    <button type="button" className="composer__icon-button" aria-label="Прикрепить что-то тревожное">
      <SparklesIcon size={18} />
    </button>
    <div className="composer__input">Написать в Мин… желательно без критики команды</div>
    <button type="button" className="composer__send" aria-label="Открыть меню отправки">
      <MenuDotsIcon size={18} />
    </button>
  </motion.div>
);

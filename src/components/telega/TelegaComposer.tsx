import { motion } from 'framer-motion';
import { PlaneIcon, SparklesIcon } from '../shared/icons';

export const TelegaComposer = () => (
  <motion.div layout className="composer composer--telega">
    <button type="button" className="composer__icon-button" aria-label="Прикрепить что-то свободное">
      <SparklesIcon size={18} />
    </button>
    <div className="composer__input">Написать в Телегу… здесь даже воздух полегче</div>
    <button type="button" className="composer__send" aria-label="Отправить в подозрительно свободный интернет">
      <PlaneIcon size={18} />
    </button>
  </motion.div>
);

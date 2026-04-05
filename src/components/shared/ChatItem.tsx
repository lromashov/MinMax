import { motion } from 'framer-motion';
import type { ChatMeta } from '../../types';

interface ChatItemProps {
  chat: ChatMeta;
  selected: boolean;
  variant: 'min' | 'telega' | 'hybrid';
  onClick: () => void;
}

export const ChatItem = ({ chat, onClick, selected, variant }: ChatItemProps) => (
  <motion.button
    type="button"
    layout
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className={`chat-item chat-item--${variant} ${selected ? 'is-selected' : ''}`}
  >
    <div className={`chat-item__avatar chat-item__avatar--${chat.kind ?? 'normal'}`}>{chat.avatar}</div>
    <div className="chat-item__body">
      <div className="chat-item__row">
        <strong>{chat.title}</strong>
        {chat.tag ? <span className="chat-item__tag">{chat.tag}</span> : null}
      </div>
      <div className="chat-item__row chat-item__row--sub">
        <span>{chat.subtitle}</span>
        {chat.unread ? <span className="chat-item__badge">{chat.unread}</span> : null}
      </div>
    </div>
  </motion.button>
);

import { motion } from 'framer-motion';
import type { ChatMessage } from '../../types';

interface MessageBubbleProps {
  message: ChatMessage;
  variant: 'min' | 'telega' | 'hybrid';
}

export const MessageBubble = ({ message, variant }: MessageBubbleProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    className={`message-row ${message.mine ? 'is-mine' : ''}`}
  >
    <div className={`message-bubble message-bubble--${variant} ${message.mine ? 'is-mine' : ''}`}>
      {!message.mine ? <div className="message-bubble__author">{message.author}</div> : null}
      <div className="message-bubble__text">{message.text}</div>
      <div className="message-bubble__meta">
        <span>{message.time}</span>
        {message.reaction ? <span>{message.reaction}</span> : null}
        {message.mine ? <span>{message.status === 'read' ? '••' : '•'}</span> : null}
      </div>
    </div>
  </motion.div>
);

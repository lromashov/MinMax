import type { ReactNode } from 'react';
import { MessengerHeader } from './MessengerHeader';
import { MessageBubble } from './MessageBubble';
import type { ChatMessage } from '../../types';

interface ChatWindowProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  hero?: ReactNode;
  composer: ReactNode;
  messages: ChatMessage[];
  variant: 'min' | 'telega' | 'hybrid';
}

export const ChatWindow = ({
  composer,
  eyebrow,
  hero,
  leading,
  messages,
  subtitle,
  title,
  trailing,
  variant,
}: ChatWindowProps) => (
  <div className={`chat-window chat-window--${variant}`}>
    <MessengerHeader
      variant={variant}
      title={title}
      subtitle={subtitle}
      eyebrow={eyebrow}
      leading={leading}
      trailing={trailing}
    />
    {hero ? <div className="chat-window__hero">{hero}</div> : null}
    <div className="chat-window__messages">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} variant={variant} />
      ))}
    </div>
    <div className="chat-window__composer">{composer}</div>
  </div>
);

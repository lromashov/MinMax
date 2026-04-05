import type { ChatMeta } from '../../types';
import { ChatItem } from '../shared/ChatItem';

interface MorphingChatItemProps {
  chat: ChatMeta;
  selected: boolean;
  onClick?: () => void;
}

export const MorphingChatItem = ({ chat, onClick, selected }: MorphingChatItemProps) => (
  <ChatItem chat={chat} selected={selected} variant="hybrid" onClick={onClick ?? (() => undefined)} />
);

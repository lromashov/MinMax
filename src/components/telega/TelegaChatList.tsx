import { telegaChats } from '../../data/chats';
import { ChatList } from '../shared/ChatList';
import { ChatItem } from '../shared/ChatItem';
import { PlaneIcon } from '../shared/icons';

interface TelegaChatListProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const TelegaChatList = ({ onSelect, selectedId }: TelegaChatListProps) => (
  <ChatList
    variant="telega"
    title="Диалоги"
    subtitle="Легче, чище, опасно комфортно"
    searchPlaceholder="Поиск в Телеге"
    folders={['Все', 'Личные', 'Тоннели']}
    activeFolder="Все"
    headerAside={<span className="soft-badge soft-badge--blue">mini app vibe</span>}
    footer={
      <div className="chat-list-note chat-list-note--telega">
        <PlaneIcon size={16} />
        Вкладка VPN требует регулярного кардио для пальцев.
      </div>
    }
  >
    {telegaChats.map((chat) => (
      <ChatItem
        key={chat.id}
        chat={chat}
        selected={chat.id === selectedId}
        variant="telega"
        onClick={() => onSelect(chat.id)}
      />
    ))}
  </ChatList>
);

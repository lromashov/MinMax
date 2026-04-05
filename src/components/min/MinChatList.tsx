import { ChatList } from '../shared/ChatList';
import { ChatItem } from '../shared/ChatItem';
import { SparklesIcon } from '../shared/icons';
import { minChats } from '../../data/chats';

interface MinChatListProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const MinChatList = ({ onSelect, selectedId }: MinChatListProps) => (
  <ChatList
    variant="min"
    title="Чаты"
    subtitle="Плотный MAX-like shell, но надписи уже честно говорят «Мин»"
    searchPlaceholder="Поиск по Мину"
    folders={['Все', 'Новые', 'Семья', 'Тревожные']}
    activeFolder="Все"
    headerAside={<span className="soft-badge">MIN shell</span>}
    footer={
      <div className="chat-list-note">
        <SparklesIcon size={16} />
        Открой «Жалобы на команду», чтобы размягчить интерфейс.
      </div>
    }
  >
    {minChats.map((chat) => (
      <ChatItem
        key={chat.id}
        chat={chat}
        selected={chat.id === selectedId}
        variant="min"
        onClick={() => onSelect(chat.id)}
      />
    ))}
  </ChatList>
);

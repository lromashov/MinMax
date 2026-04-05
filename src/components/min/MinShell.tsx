import { motion } from 'framer-motion';
import { useAppStore } from '../../app/store';
import { ChatWindow } from '../shared/ChatWindow';
import { AppShell } from '../shared/AppShell';
import { BottomNav } from '../shared/BottomNav';
import { ChatIcon, FolderIcon, RotateCcwIcon, ShieldIcon } from '../shared/icons';
import { MinChatList } from './MinChatList';
import { MinComposer } from './MinComposer';
import { MinModerationPanel } from './MinModerationPanel';
import { chatMessages, minChats, MIN_HOME_CHAT_ID } from '../../data/chats';

const Brand = () => (
  <div className="brand brand--min">
    <span className="brand__logo">MIN</span>
    <span className="brand__subtitle">плотный режим</span>
  </div>
);

export const MinShell = () => {
  const phase = useAppStore((state) => state.phase);
  const selectedMinChatId = useAppStore((state) => state.selectedMinChatId);
  const funnyReputation = useAppStore((state) => state.funnyReputation);
  const suspiciousFreedom = useAppStore((state) => state.suspiciousFreedom);
  const score = useAppStore((state) => state.score);
  const selectMinChat = useAppStore((state) => state.selectMinChat);
  const enterModeration = useAppStore((state) => state.enterModeration);
  const resetDemo = useAppStore((state) => state.resetDemo);

  const activeChat = minChats.find((chat) => chat.id === selectedMinChatId) ?? minChats[0];
  const activeMessages = chatMessages[activeChat.id] ?? chatMessages[MIN_HOME_CHAT_ID] ?? [];
  const isModeration = phase === 'min_moderation';

  return (
    <AppShell
      variant="min"
      brand={<Brand />}
      meta={
        <div className="meta-strip">
          <span className="stat-pill">очки {score}</span>
          <span className="stat-pill">лояльность {funnyReputation}</span>
          <span className="stat-pill stat-pill--danger">свобода {suspiciousFreedom}</span>
        </div>
      }
      sidebar={<MinChatList selectedId={selectedMinChatId} onSelect={selectMinChat} />}
      content={
        isModeration ? (
          <MinModerationPanel />
        ) : (
          <ChatWindow
            variant="min"
            title={activeChat.title}
            subtitle={activeChat.subtitle}
            eyebrow="МИН / ВНУТРЕННИЙ КОНТУР"
            leading={
              <div className="header-orb">
                <ShieldIcon size={20} />
              </div>
            }
            trailing={<span className="soft-badge">внутри безопасно-ish</span>}
            hero={
              <motion.div layout className="hero-banner hero-banner--min">
                <div>
                  <div className="hero-banner__eyebrow">ЭВОЛЮЦИЯ ПРОДУКТА</div>
                  <strong>Чтобы выбраться в Телегу, нужна серия точных модераций.</strong>
                  <p>
                    Чем аккуратнее удаляешь критику команды, тем меньше Мин сопротивляется изменениям.
                  </p>
                </div>
                <motion.button
                  type="button"
                  className="hero-button hero-button--danger"
                  whileTap={{ scale: 0.98 }}
                  onClick={enterModeration}
                >
                  Открыть пакет жалоб
                </motion.button>
              </motion.div>
            }
            messages={activeMessages}
            composer={<MinComposer />}
          />
        )
      }
      nav={
        <BottomNav
          variant="min"
          activeId={isModeration ? 'moderation' : 'chats'}
          onChange={(id) => {
            if (id === 'moderation') {
              enterModeration();
              return;
            }
            if (id === 'reset') {
              resetDemo();
              return;
            }
            selectMinChat(MIN_HOME_CHAT_ID);
          }}
          items={[
            { id: 'chats', label: 'Чаты', icon: <ChatIcon size={18} /> },
            { id: 'moderation', label: 'Цензура', icon: <ShieldIcon size={18} />, badge: '!' },
            { id: 'folders', label: 'Папки', icon: <FolderIcon size={18} /> },
            { id: 'reset', label: 'Сброс', icon: <RotateCcwIcon size={18} /> },
          ]}
        />
      }
    />
  );
};

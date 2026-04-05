import { useMemo } from 'react';
import { useAppStore } from '../../app/store';
import { chatMessages, telegaChats, TELEGA_HOME_CHAT_ID } from '../../data/chats';
import { AppShell } from '../shared/AppShell';
import { BottomNav } from '../shared/BottomNav';
import { ChatWindow } from '../shared/ChatWindow';
import { BoltIcon, ChatIcon, HomeIcon, RotateCcwIcon } from '../shared/icons';
import { TelegaChatList } from './TelegaChatList';
import { TelegaComposer } from './TelegaComposer';
import { TelegaLogo } from './TelegaLogo';
import { VpnPanel } from './VpnPanel';

const Brand = () => (
  <div className="brand brand--telega">
    <span className="brand__logo brand__logo--telega">
      <TelegaLogo />
      Телега
    </span>
    <span className="brand__subtitle">подозрительно свободный режим</span>
  </div>
);

export const TelegaShell = () => {
  const phase = useAppStore((state) => state.phase);
  const selectedTelegaChatId = useAppStore((state) => state.selectedTelegaChatId);
  const funnyReputation = useAppStore((state) => state.funnyReputation);
  const suspiciousFreedom = useAppStore((state) => state.suspiciousFreedom);
  const score = useAppStore((state) => state.score);
  const selectTelegaChat = useAppStore((state) => state.selectTelegaChat);
  const openTelegaChats = useAppStore((state) => state.openTelegaChats);
  const openVpn = useAppStore((state) => state.openVpn);
  const resetDemo = useAppStore((state) => state.resetDemo);

  const activeChat = useMemo(
    () => telegaChats.find((chat) => chat.id === selectedTelegaChatId) ?? telegaChats[0],
    [selectedTelegaChatId],
  );

  const messages = chatMessages[activeChat.id] ?? chatMessages[TELEGA_HOME_CHAT_ID] ?? [];
  const isVpn = phase === 'telega_vpn';

  return (
    <AppShell
      variant="telega"
      brand={<Brand />}
      meta={
        <div className="meta-strip">
          <span className="stat-pill stat-pill--blue">очки {score}</span>
          <span className="stat-pill">репутация {funnyReputation}</span>
          <span className="stat-pill stat-pill--success">свобода {Math.round(suspiciousFreedom)}</span>
        </div>
      }
      sidebar={<TelegaChatList selectedId={selectedTelegaChatId} onSelect={selectTelegaChat} />}
      content={
        isVpn ? (
          <VpnPanel />
        ) : (
          <ChatWindow
            variant="telega"
            title={activeChat.title}
            subtitle={activeChat.subtitle}
            eyebrow="TELEGA / MINI APP FEEL"
            leading={<div className="header-orb header-orb--accent"><TelegaLogo /></div>}
            trailing={<span className="soft-badge soft-badge--blue">наружу вышли</span>}
            hero={
              <div className="hero-banner hero-banner--telega">
                <div>
                  <div className="hero-banner__eyebrow">УРА, ВОЗДУХ</div>
                  <strong>Теперь главное — не проспать вкладку VPN.</strong>
                  <p>
                    Пока канал жив, интерфейс остаётся лёгким. Стоит расслабиться — начнётся обратный морфинг.
                  </p>
                </div>
                <button type="button" className="hero-button hero-button--telega" onClick={openVpn}>
                  Открыть VPN
                </button>
              </div>
            }
            messages={messages}
            composer={<TelegaComposer />}
          />
        )
      }
      nav={
        <BottomNav
          variant="telega"
          activeId={isVpn ? 'vpn' : 'chats'}
          onChange={(id) => {
            if (id === 'vpn') {
              openVpn();
              return;
            }
            if (id === 'reset') {
              resetDemo();
              return;
            }
            openTelegaChats();
          }}
          items={[
            { id: 'chats', label: 'Чаты', icon: <ChatIcon size={18} /> },
            { id: 'vpn', label: 'VPN', icon: <BoltIcon size={18} />, badge: isVpn ? undefined : '!' },
            { id: 'home', label: 'Домой', icon: <HomeIcon size={18} /> },
            { id: 'reset', label: 'Сброс', icon: <RotateCcwIcon size={18} /> },
          ]}
        />
      }
    />
  );
};

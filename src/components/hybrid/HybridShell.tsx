import { AppShell } from '../shared/AppShell';
import { ChatList } from '../shared/ChatList';
import { MessageBubble } from '../shared/MessageBubble';
import { MorphOverlay } from '../shared/MorphOverlay';
import { MorphingChatItem } from './MorphingChatItem';
import { MorphingComposer } from './MorphingComposer';
import { MorphingHeader } from './MorphingHeader';
import { MorphingNav } from './MorphingNav';
import { useAppStore } from '../../app/store';
import { ChatIcon, SparklesIcon } from '../shared/icons';
import type { ChatMessage, ChatMeta } from '../../types';

const hybridChats = (progress: number): ChatMeta[] => [
  {
    id: 'hy-1',
    title: progress < 0.34 ? 'Командный штаб' : progress < 0.67 ? 'Штаб свободы' : 'Свободный канал',
    subtitle:
      progress < 0.34
        ? 'Карточки ещё тяжёлые'
        : progress < 0.67
          ? 'Панели уже спорят между собой'
          : 'Похоже, дышать стало легче',
    unread: 2,
    avatar: progress < 0.5 ? 'М' : 'Т',
    tag: progress < 0.5 ? 'плывём' : 'почти',
  },
  {
    id: 'hy-2',
    title: progress < 0.4 ? 'Жалобы на команду' : 'Жалобы на прошлую плотность',
    subtitle: progress < 0.5 ? 'Цензура отпускает неохотно' : 'Критика тает вместе с тенями',
    unread: 1,
    avatar: '!',
    tag: 'мутант',
  },
  {
    id: 'hy-3',
    title: progress < 0.6 ? 'Градиентная' : 'VPN?',
    subtitle: progress < 0.6 ? 'Цвета спорят за право жить' : 'Скоро появится кликер',
    unread: 0,
    avatar: '◎',
    tag: 'hybrid',
  },
];

const hybridMessages = (progress: number): ChatMessage[] => [
  {
    id: 'h-1',
    author: 'Morph Engine',
    text:
      progress < 0.34
        ? 'Мин снимает тяжёлые панели слой за слоем.'
        : progress < 0.67
          ? 'Получился гибрид: словно MAX UI спорит с чистой телеграмной сеткой.'
          : 'Телега уже почти победила, но остатки плотности ещё цепляются.',
    time: 'сейчас',
  },
  {
    id: 'h-2',
    author: 'Ты',
    text:
      progress < 0.5
        ? 'Кажется, скругления становятся гуманнее.'
        : 'Ого, даже отступы перестали обижать глаза.',
    time: 'сейчас',
    mine: true,
    status: 'read',
  },
  {
    id: 'h-3',
    author: 'Система',
    text:
      progress < 0.5
        ? 'Стадия гибридизации запущена. Пожалуйста, не кормите интерфейс старыми паттернами.'
        : 'Внутренние перегородки почти растворились. Следующая остановка — Телега.',
    time: 'сейчас',
  },
];

export const HybridShell = () => {
  const progress = useAppStore((state) => state.morphProgress);
  const direction = useAppStore((state) => state.morphDirection);
  const score = useAppStore((state) => state.score);
  const funnyReputation = useAppStore((state) => state.funnyReputation);
  const freedom = useAppStore((state) => state.suspiciousFreedom);
  const chats = hybridChats(progress);
  const messages = hybridMessages(progress);

  return (
    <AppShell
      variant="hybrid"
      brand={
        <div className="brand brand--hybrid">
          <span className="brand__logo">MIN ⟷ TELEGA</span>
          <span className="brand__subtitle">странный, но честный мутант</span>
        </div>
      }
      meta={
        <div className="meta-strip">
          <span className="stat-pill">очки {score}</span>
          <span className="stat-pill">репутация {funnyReputation}</span>
          <span className="stat-pill stat-pill--blue">свобода {Math.round(freedom)}</span>
        </div>
      }
      sidebar={
        <ChatList
          variant="hybrid"
          title="Гибридные чаты"
          subtitle="Промежуточное состояние между плотностью и лёгкостью"
          searchPlaceholder="Поиск по нестабильному интерфейсу"
          folders={['Stage 1', 'Stage 2', 'Stage 3']}
          activeFolder={progress < 0.34 ? 'Stage 1' : progress < 0.67 ? 'Stage 2' : 'Stage 3'}
          headerAside={<span className="soft-badge">morphing</span>}
          footer={
            <div className="chat-list-note">
              <SparklesIcon size={16} />
              Всё вокруг управляется одним числом — morphProgress.
            </div>
          }
        >
          {chats.map((chat, index) => (
            <MorphingChatItem key={chat.id} chat={chat} selected={index === 0} />
          ))}
        </ChatList>
      }
      content={
        <div className="chat-window chat-window--hybrid">
          <MorphingHeader direction={direction} progress={progress} />
          <div className="chat-window__hero">
            <div className="hero-banner hero-banner--hybrid">
              <div>
                <div className="hero-banner__eyebrow">ЕДИНЫЙ PROGRESS</div>
                <strong>
                  Цвета, отступы, поля ввода, карточки и навигация постепенно интерполируются между двумя мирами.
                </strong>
                <p>
                  Именно это делает морфинг не просто fade, а настоящей мутацией дизайн-токенов и поведения shell-компонентов.
                </p>
              </div>
              <div className="soft-badge soft-badge--blue">
                <ChatIcon size={16} />
                stage aware
              </div>
            </div>
          </div>
          <div className="chat-window__messages">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} variant="hybrid" />
            ))}
          </div>
          <div className="chat-window__composer">
            <MorphingComposer progress={progress} />
          </div>
        </div>
      }
      nav={<MorphingNav progress={progress} />}
      overlay={<MorphOverlay direction={direction} progress={progress} />}
    />
  );
};

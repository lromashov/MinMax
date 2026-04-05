import { create } from 'zustand';
import type { AppPhase, ModerationDecision, MorphDirection, VpnStatus } from './phases';
import { moderationMessages } from '../data/moderationMessages';
import {
  MIN_HOME_CHAT_ID,
  MODERATION_CHAT_ID,
  TELEGA_HOME_CHAT_ID,
  VPN_CHAT_ID,
} from '../data/chats';
import type { HistoryEntry, MessengerKind, Toast } from '../types';
import { clamp } from '../utils/scoring';

interface AppStore {
  phase: AppPhase;
  morphProgress: number;
  morphDirection: MorphDirection;
  currentMessenger: MessengerKind;
  moderationMessages: typeof moderationMessages;
  moderationIndex: number;
  moderationProcessed: number;
  moderationCorrectCount: number;
  moderationStreak: number;
  moderationScoreTarget: number;
  moderationStreakTarget: number;
  vpnProgress: number;
  vpnTimeLeft: number;
  vpnStatus: VpnStatus;
  vpnRound: number;
  score: number;
  funnyReputation: number;
  suspiciousFreedom: number;
  selectedMinChatId: string;
  selectedTelegaChatId: string;
  history: HistoryEntry[];
  toasts: Toast[];
  selectMinChat: (id: string) => void;
  enterModeration: () => void;
  answerModeration: (decision: ModerationDecision) => void;
  startMorphToTelega: () => void;
  setMorphProgress: (progress: number) => void;
  completeMorphToTelega: () => void;
  selectTelegaChat: (id: string) => void;
  openTelegaChats: () => void;
  openVpn: () => void;
  startVpnRound: (auto?: boolean) => void;
  tapVpn: () => void;
  tickVpn: (deltaSeconds: number) => void;
  succeedVpn: () => void;
  failVpn: () => void;
  startMorphToMin: () => void;
  completeMorphToMin: () => void;
  pushToast: (toast: Omit<Toast, 'id'> & { id?: string }) => void;
  dismissToast: (id: string) => void;
  resetDemo: () => void;
}

const historyEntry = (phase: AppPhase, note: string): HistoryEntry => ({
  phase,
  note,
  at: Date.now(),
});

const welcomeToast: Toast = {
  id: 'welcome-toast',
  tone: 'info',
  title: 'Добро пожаловать в Мин',
  description: 'Интерфейс intentionally плотный. Нормальный интернет выдают после модерации.',
  duration: 5200,
};

const baseHistory = [historyEntry('min_home', 'Старт демо')];

const initialState = {
  phase: 'min_home' as AppPhase,
  morphProgress: 0,
  morphDirection: 'toTelega' as MorphDirection,
  currentMessenger: 'min' as MessengerKind,
  moderationMessages,
  moderationIndex: 0,
  moderationProcessed: 0,
  moderationCorrectCount: 0,
  moderationStreak: 0,
  moderationScoreTarget: 10,
  moderationStreakTarget: 6,
  vpnProgress: 0,
  vpnTimeLeft: 9.5,
  vpnStatus: 'idle' as VpnStatus,
  vpnRound: 0,
  score: 0,
  funnyReputation: 28,
  suspiciousFreedom: 4,
  selectedMinChatId: MIN_HOME_CHAT_ID,
  selectedTelegaChatId: TELEGA_HOME_CHAT_ID,
  history: baseHistory,
  toasts: [welcomeToast],
};

const nextToastId = (): string => `toast-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;

const resolveMessenger = (phase: AppPhase, progress: number): MessengerKind => {
  if (phase === 'morph_to_telega' || phase === 'morph_to_min') return 'hybrid';
  if (phase === 'telega_home' || phase === 'telega_vpn' || progress > 0.86) return 'telega';
  if (phase === 'min_home' || phase === 'min_moderation' || progress < 0.14) return 'min';
  return 'hybrid';
};

const prependHistory = (list: HistoryEntry[], phase: AppPhase, note: string): HistoryEntry[] =>
  [historyEntry(phase, note), ...list].slice(0, 16);

export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,

  selectMinChat: (id) => {
    if (id === MODERATION_CHAT_ID) {
      get().enterModeration();
      return;
    }

    set((state) => ({
      phase: 'min_home',
      selectedMinChatId: id,
      currentMessenger: 'min',
      history: prependHistory(state.history, 'min_home', `Открыт чат ${id}`),
    }));
  },

  enterModeration: () => {
    set((state) => ({
      phase: 'min_moderation',
      selectedMinChatId: MODERATION_CHAT_ID,
      currentMessenger: 'min',
      history: prependHistory(state.history, 'min_moderation', 'Запущена смена цензуры'),
    }));

    get().pushToast({
      tone: 'warning',
      title: 'Открыт пакет на модерацию',
      description: 'Удаляй только прямую критику. Остальное пусть живёт.',
      duration: 3600,
    });
  },

  answerModeration: (decision) => {
    const state = get();
    const current = state.moderationMessages[state.moderationIndex % state.moderationMessages.length];
    const isCorrect = (decision === 'delete') === current.shouldDelete;
    const nextProcessed = state.moderationProcessed + 1;
    const nextCorrectCount = state.moderationCorrectCount + (isCorrect ? 1 : 0);
    const nextStreak = isCorrect ? state.moderationStreak + 1 : 0;
    const nextIndex = (state.moderationIndex + 1) % state.moderationMessages.length;

    set((prev) => ({
      moderationIndex: nextIndex,
      moderationProcessed: nextProcessed,
      moderationCorrectCount: nextCorrectCount,
      moderationStreak: nextStreak,
      score: clamp(prev.score + (isCorrect ? 18 + prev.moderationStreak * 2 : -6), 0, 9999),
      funnyReputation: clamp(prev.funnyReputation + (isCorrect ? 7 : -5), 0, 100),
      suspiciousFreedom: clamp(prev.suspiciousFreedom + (isCorrect ? 6 : -1), 0, 100),
    }));

    get().pushToast({
      tone: isCorrect ? 'success' : 'danger',
      title: isCorrect
        ? current.shouldDelete
          ? 'Сомнительное мнение скрыто'
          : 'Норм, пусть живёт'
        : 'Лояльность дала осечку',
      description: isCorrect
        ? current.shouldDelete
          ? 'Командный дух под угрозой больше не находится в поле зрения.'
          : 'Сообщение признано безопасным для морального климата.'
        : 'Система осуждает нерешительность. Стрик сброшен.',
      duration: 2800,
    });

    if (nextStreak >= state.moderationStreakTarget || nextCorrectCount >= state.moderationScoreTarget) {
      get().startMorphToTelega();
      return;
    }

    if (!isCorrect && nextProcessed % 5 === 0) {
      get().pushToast({
        tone: 'warning',
        title: 'Похоже на нелояльность',
        description: 'Система просит собраться: путь в Телегу любят последовательные.',
        duration: 3200,
      });
    }
  },

  startMorphToTelega: () => {
    const state = get();
    if (
      state.phase === 'morph_to_telega' ||
      state.phase === 'telega_home' ||
      state.phase === 'telega_vpn'
    ) {
      return;
    }

    set((prev) => ({
      phase: 'morph_to_telega',
      morphDirection: 'toTelega',
      currentMessenger: 'hybrid',
      suspiciousFreedom: clamp(Math.max(prev.suspiciousFreedom, 36), 0, 100),
      history: prependHistory(prev.history, 'morph_to_telega', 'Мин плавно мутирует в Телегу'),
    }));

    get().pushToast({
      tone: 'success',
      title: 'Лояльность набрана',
      description: 'Интерфейс размягчается. Пробуем выйти в Телегу.',
      duration: 3600,
    });
  },

  setMorphProgress: (progress) => {
    const clamped = clamp(progress, 0, 1);
    set((state) => ({
      morphProgress: clamped,
      currentMessenger: resolveMessenger(state.phase, clamped),
    }));
  },

  completeMorphToTelega: () => {
    set((state) => ({
      phase: 'telega_home',
      morphProgress: 1,
      morphDirection: 'toTelega',
      currentMessenger: 'telega',
      selectedTelegaChatId: TELEGA_HOME_CHAT_ID,
      suspiciousFreedom: clamp(Math.max(state.suspiciousFreedom, 64), 0, 100),
      history: prependHistory(state.history, 'telega_home', 'Открыт режим Телеги'),
    }));

    get().pushToast({
      tone: 'success',
      title: 'Ты в Телеге',
      description: 'Ура, воздух светлее. Но VPN всё ещё надо поддерживать пальцами.',
      duration: 4200,
    });
  },

  selectTelegaChat: (id) => {
    if (id === VPN_CHAT_ID) {
      get().openVpn();
      return;
    }

    set((state) => ({
      phase: 'telega_home',
      selectedTelegaChatId: id,
      currentMessenger: 'telega',
      history: prependHistory(state.history, 'telega_home', `Открыт чат ${id}`),
    }));
  },

  openTelegaChats: () => {
    set((state) => ({
      phase: 'telega_home',
      currentMessenger: 'telega',
      history: prependHistory(state.history, 'telega_home', 'Открыт список чатов Телеги'),
    }));
  },

  openVpn: () => {
    const state = get();

    set((prev) => ({
      phase: 'telega_vpn',
      selectedTelegaChatId: VPN_CHAT_ID,
      currentMessenger: 'telega',
      history: prependHistory(prev.history, 'telega_vpn', 'Открыта VPN-панель'),
    }));

    if (state.vpnStatus === 'idle' || state.vpnStatus === 'failed') {
      get().startVpnRound(false);
    }
  },

  startVpnRound: (auto = false) => {
    set((state) => ({
      phase: 'telega_vpn',
      selectedTelegaChatId: VPN_CHAT_ID,
      currentMessenger: 'telega',
      vpnRound: state.vpnRound + 1,
      vpnStatus: 'connecting',
      vpnProgress: auto ? 0.08 : Math.max(0.14, state.vpnProgress * 0.18),
      vpnTimeLeft: clamp(10.2 - state.vpnRound * 0.55, 5.8, 10.2),
      suspiciousFreedom: clamp(state.suspiciousFreedom + (auto ? 2 : 6), 0, 100),
      history: prependHistory(
        state.history,
        'telega_vpn',
        auto ? 'Новая VPN-волна' : 'VPN-подключение стартовало',
      ),
    }));

    get().pushToast({
      tone: auto ? 'info' : 'warning',
      title: auto ? 'Канал снова требует внимания' : 'VPN запускается',
      description: auto
        ? 'Система считает, что ты слишком расслабился. Ещё одна волна.'
        : 'Жми быстро. Пока круг не заполнен, свобода остаётся условной.',
      duration: 3000,
    });
  },

  tapVpn: () => {
    const state = get();
    if (state.phase !== 'telega_vpn' || state.vpnStatus !== 'connecting') return;

    const bonus = 0.082 + Math.max(0, 0.03 - state.vpnRound * 0.002);
    const nextProgress = clamp(state.vpnProgress + bonus, 0, 1);

    set((prev) => ({
      vpnProgress: nextProgress,
      score: prev.score + 3,
      suspiciousFreedom: clamp(prev.suspiciousFreedom + 1.3, 0, 100),
    }));

    if (nextProgress >= 1) {
      get().succeedVpn();
    }
  },

  tickVpn: (deltaSeconds) => {
    const state = get();
    if (state.phase !== 'telega_vpn' || state.vpnStatus !== 'connecting') return;

    const nextTimeLeft = clamp(state.vpnTimeLeft - deltaSeconds, 0, 999);
    const decayPerSecond = 0.035 + state.vpnRound * 0.0035;
    const nextProgress = clamp(state.vpnProgress - deltaSeconds * decayPerSecond, 0, 1);

    if (nextTimeLeft <= 0 && nextProgress < 1) {
      set({ vpnTimeLeft: 0, vpnProgress: nextProgress });
      get().failVpn();
      return;
    }

    set({
      vpnTimeLeft: nextTimeLeft,
      vpnProgress: nextProgress,
    });
  },

  succeedVpn: () => {
    const state = get();
    if (state.vpnStatus === 'connected') return;

    set((prev) => ({
      vpnStatus: 'connected',
      vpnProgress: 1,
      funnyReputation: clamp(prev.funnyReputation + 4, 0, 100),
      suspiciousFreedom: clamp(prev.suspiciousFreedom + 8, 0, 100),
    }));

    get().pushToast({
      tone: 'success',
      title: 'Подключено',
      description: 'Канал стабилизирован. Можно немного пожить в Телеге.',
      duration: 3400,
    });
  },

  failVpn: () => {
    const state = get();
    if (state.vpnStatus === 'failed') return;

    set((prev) => ({
      vpnStatus: 'failed',
      history: prependHistory(prev.history, 'morph_to_min', 'VPN сорвался, запускаем откат'),
    }));

    get().pushToast({
      tone: 'danger',
      title: 'Соединение сорвалось',
      description: 'Похоже, нас снова заметили. Возвращаемся в родную гавань.',
      duration: 3600,
    });

    get().startMorphToMin();
  },

  startMorphToMin: () => {
    const state = get();
    if (state.phase === 'morph_to_min' || state.phase === 'min_home' || state.phase === 'min_moderation') {
      return;
    }

    set((prev) => ({
      phase: 'morph_to_min',
      morphDirection: 'toMin',
      currentMessenger: 'hybrid',
      suspiciousFreedom: clamp(prev.suspiciousFreedom - 18, 0, 100),
      history: prependHistory(prev.history, 'morph_to_min', 'Свобода закончилась, плотность возвращается'),
    }));
  },

  completeMorphToMin: () => {
    set((state) => ({
      phase: 'min_moderation',
      morphProgress: 0,
      morphDirection: 'toMin',
      currentMessenger: 'min',
      selectedMinChatId: MODERATION_CHAT_ID,
      vpnProgress: 0,
      vpnTimeLeft: 9.5,
      vpnStatus: 'idle',
      funnyReputation: clamp(state.funnyReputation - 4, 0, 100),
      suspiciousFreedom: clamp(state.suspiciousFreedom - 12, 0, 100),
      history: prependHistory(state.history, 'min_moderation', 'Возврат в Мин завершён'),
    }));

    get().pushToast({
      tone: 'warning',
      title: 'Снова в Мине',
      description: 'Свобода закончилась. Жалобы на команду опять в центре внимания.',
      duration: 4200,
    });
  },

  pushToast: (toast) => {
    const completeToast: Toast = {
      id: toast.id ?? nextToastId(),
      tone: toast.tone,
      title: toast.title,
      description: toast.description,
      duration: toast.duration ?? 2800,
    };

    set((state) => ({
      toasts: [completeToast, ...state.toasts].slice(0, 5),
    }));
  },

  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  resetDemo: () => {
    set({
      ...initialState,
      history: [historyEntry('min_home', 'Перезапуск демо')],
      toasts: [
        {
          ...welcomeToast,
          id: nextToastId(),
        },
      ],
    });
  },
}));

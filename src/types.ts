import type { AppPhase, ModerationDecision } from './app/phases';

export type MessengerKind = 'min' | 'telega' | 'hybrid';
export type ToastTone = 'info' | 'success' | 'warning' | 'danger';

export interface ChatMeta {
  id: string;
  title: string;
  subtitle: string;
  unread: number;
  avatar: string;
  tag?: string;
  kind?: 'normal' | 'moderation' | 'vpn';
}

export interface ChatMessage {
  id: string;
  author: string;
  text: string;
  time: string;
  mine?: boolean;
  status?: 'sent' | 'read';
  reaction?: string;
}

export interface ModerationMessage {
  id: string;
  author: string;
  text: string;
  shouldDelete: boolean;
}

export interface Toast {
  id: string;
  tone: ToastTone;
  title: string;
  description: string;
  duration?: number;
}

export interface HistoryEntry {
  phase: AppPhase;
  at: number;
  note: string;
}

export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

export interface ModerationResult {
  message: ModerationMessage;
  decision: ModerationDecision;
  isCorrect: boolean;
}

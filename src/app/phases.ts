export type AppPhase =
  | 'min_home'
  | 'min_moderation'
  | 'morph_to_telega'
  | 'telega_home'
  | 'telega_vpn'
  | 'morph_to_min';

export type MorphDirection = 'toTelega' | 'toMin';
export type ModerationDecision = 'delete' | 'keep';
export type VpnStatus = 'idle' | 'connecting' | 'connected' | 'failed';

export const MORPH_PHASES: AppPhase[] = ['morph_to_telega', 'morph_to_min'];

export const isMorphPhase = (phase: AppPhase): boolean => MORPH_PHASES.includes(phase);
export const isMinPhase = (phase: AppPhase): boolean => phase === 'min_home' || phase === 'min_moderation';
export const isTelegaPhase = (phase: AppPhase): boolean =>
  phase === 'telega_home' || phase === 'telega_vpn';

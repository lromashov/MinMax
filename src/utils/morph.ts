import type { MorphDirection } from '../app/phases';
import type { MessengerKind } from '../types';
import { clamp } from './scoring';

interface ThemePalette {
  bg: string;
  bgSecondary: string;
  panel: string;
  panelAlt: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
  success: string;
  danger: string;
  bubbleMe: string;
  bubbleOther: string;
  border: string;
  badge: string;
}

interface ThemeNumbers {
  radiusLg: number;
  radiusXl: number;
  density: number;
  navHeight: number;
  sidebarWidth: number;
  headerBlur: number;
  noiseOpacity: number;
  bubbleMaxWidth: number;
  composerHeight: number;
  layoutGap: number;
  layoutPadding: number;
  avatarRadius: number;
  iconScale: number;
}

const minPalette: ThemePalette = {
  bg: '#090e17',
  bgSecondary: '#101826',
  panel: '#101725',
  panelAlt: '#171f31',
  text: '#edf4ff',
  muted: '#8fa0bf',
  accent: '#ff7849',
  accentSoft: '#9f5bff',
  success: '#38d39f',
  danger: '#ff6d7d',
  bubbleMe: '#24314b',
  bubbleOther: '#151d2b',
  border: '#25324b',
  badge: '#ff7849',
};

const telegaPalette: ThemePalette = {
  bg: '#eef6ff',
  bgSecondary: '#ddecff',
  panel: '#ffffff',
  panelAlt: '#f5fbff',
  text: '#152b44',
  muted: '#6e86a1',
  accent: '#2ea6ff',
  accentSoft: '#58d5b5',
  success: '#2ecc71',
  danger: '#ff5a72',
  bubbleMe: '#dbf1ff',
  bubbleOther: '#f2f6fb',
  border: '#d8e4f1',
  badge: '#2ea6ff',
};

const minNumbers: ThemeNumbers = {
  radiusLg: 24,
  radiusXl: 34,
  density: 0.9,
  navHeight: 86,
  sidebarWidth: 356,
  headerBlur: 14,
  noiseOpacity: 0.28,
  bubbleMaxWidth: 580,
  composerHeight: 68,
  layoutGap: 18,
  layoutPadding: 20,
  avatarRadius: 20,
  iconScale: 1.08,
};

const telegaNumbers: ThemeNumbers = {
  radiusLg: 18,
  radiusXl: 26,
  density: 1.18,
  navHeight: 74,
  sidebarWidth: 320,
  headerBlur: 22,
  noiseOpacity: 0.08,
  bubbleMaxWidth: 510,
  composerHeight: 62,
  layoutGap: 24,
  layoutPadding: 24,
  avatarRadius: 18,
  iconScale: 0.95,
};

const hexToRgb = (hex: string): [number, number, number] => {
  const normalized = hex.replace('#', '');
  const bigint = Number.parseInt(normalized, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const mixColor = (from: string, to: string, progress: number): string => {
  const t = clamp(progress, 0, 1);
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
};

const alpha = (hex: string, opacity: number): string => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const lerp = (from: number, to: number, progress: number): number => from + (to - from) * progress;

const mixPalette = (progress: number): ThemePalette => ({
  bg: mixColor(minPalette.bg, telegaPalette.bg, progress),
  bgSecondary: mixColor(minPalette.bgSecondary, telegaPalette.bgSecondary, progress),
  panel: mixColor(minPalette.panel, telegaPalette.panel, progress),
  panelAlt: mixColor(minPalette.panelAlt, telegaPalette.panelAlt, progress),
  text: mixColor(minPalette.text, telegaPalette.text, progress),
  muted: mixColor(minPalette.muted, telegaPalette.muted, progress),
  accent: mixColor(minPalette.accent, telegaPalette.accent, progress),
  accentSoft: mixColor(minPalette.accentSoft, telegaPalette.accentSoft, progress),
  success: mixColor(minPalette.success, telegaPalette.success, progress),
  danger: mixColor(minPalette.danger, telegaPalette.danger, progress),
  bubbleMe: mixColor(minPalette.bubbleMe, telegaPalette.bubbleMe, progress),
  bubbleOther: mixColor(minPalette.bubbleOther, telegaPalette.bubbleOther, progress),
  border: mixColor(minPalette.border, telegaPalette.border, progress),
  badge: mixColor(minPalette.badge, telegaPalette.badge, progress),
});

const mixNumbers = (progress: number): ThemeNumbers => ({
  radiusLg: lerp(minNumbers.radiusLg, telegaNumbers.radiusLg, progress),
  radiusXl: lerp(minNumbers.radiusXl, telegaNumbers.radiusXl, progress),
  density: lerp(minNumbers.density, telegaNumbers.density, progress),
  navHeight: lerp(minNumbers.navHeight, telegaNumbers.navHeight, progress),
  sidebarWidth: lerp(minNumbers.sidebarWidth, telegaNumbers.sidebarWidth, progress),
  headerBlur: lerp(minNumbers.headerBlur, telegaNumbers.headerBlur, progress),
  noiseOpacity: lerp(minNumbers.noiseOpacity, telegaNumbers.noiseOpacity, progress),
  bubbleMaxWidth: lerp(minNumbers.bubbleMaxWidth, telegaNumbers.bubbleMaxWidth, progress),
  composerHeight: lerp(minNumbers.composerHeight, telegaNumbers.composerHeight, progress),
  layoutGap: lerp(minNumbers.layoutGap, telegaNumbers.layoutGap, progress),
  layoutPadding: lerp(minNumbers.layoutPadding, telegaNumbers.layoutPadding, progress),
  avatarRadius: lerp(minNumbers.avatarRadius, telegaNumbers.avatarRadius, progress),
  iconScale: lerp(minNumbers.iconScale, telegaNumbers.iconScale, progress),
});

export interface MorphTheme {
  progress: number;
  stage: 1 | 2 | 3;
  messenger: MessengerKind;
  cssVars: Record<string, string | number>;
}

export const getMorphTheme = (progress: number, direction: MorphDirection): MorphTheme => {
  const normalized = clamp(progress, 0, 1);
  const palette = mixPalette(normalized);
  const numbers = mixNumbers(normalized);
  const stage = normalized < 0.34 ? 1 : normalized < 0.67 ? 2 : 3;
  const messenger: MessengerKind = normalized < 0.14 ? 'min' : normalized > 0.86 ? 'telega' : 'hybrid';
  const sweep = direction === 'toTelega' ? normalized : 1 - normalized;

  return {
    progress: normalized,
    stage,
    messenger,
    cssVars: {
      '--bg': palette.bg,
      '--bg-secondary': palette.bgSecondary,
      '--panel': palette.panel,
      '--panel-alt': palette.panelAlt,
      '--text': palette.text,
      '--muted': palette.muted,
      '--accent': palette.accent,
      '--accent-soft': palette.accentSoft,
      '--success': palette.success,
      '--danger': palette.danger,
      '--bubble-me': palette.bubbleMe,
      '--bubble-other': palette.bubbleOther,
      '--border': palette.border,
      '--border-strong': palette.border,
      '--badge': palette.badge,
      '--radius-lg': `${numbers.radiusLg}px`,
      '--radius-xl': `${numbers.radiusXl}px`,
      '--density': numbers.density.toFixed(3),
      '--nav-height': `${numbers.navHeight}px`,
      '--sidebar-width': `${numbers.sidebarWidth}px`,
      '--header-blur': `${numbers.headerBlur}px`,
      '--noise-opacity': numbers.noiseOpacity.toFixed(3),
      '--bubble-max-width': `${numbers.bubbleMaxWidth}px`,
      '--composer-height': `${numbers.composerHeight}px`,
      '--layout-gap': `${numbers.layoutGap}px`,
      '--layout-padding': `${numbers.layoutPadding}px`,
      '--avatar-radius': `${numbers.avatarRadius}px`,
      '--icon-scale': numbers.iconScale.toFixed(3),
      '--surface-shadow': `0 ${Math.round(lerp(24, 16, normalized))}px ${Math.round(
        lerp(72, 40, normalized),
      )}px ${alpha('#07101d', lerp(0.42, 0.16, normalized))}`,
      '--surface-shadow-strong': `0 ${Math.round(lerp(34, 20, normalized))}px ${Math.round(
        lerp(120, 64, normalized),
      )}px ${alpha('#07101d', lerp(0.34, 0.1, normalized))}`,
      '--shell-gradient': `linear-gradient(180deg, ${alpha('#ffffff', lerp(0.04, 0.78, normalized))}, ${alpha(
        '#ffffff',
        lerp(0.02, 0.44, normalized),
      )})`,
      '--topbar-fill': `linear-gradient(135deg, ${alpha('#ffffff', lerp(0.04, 0.84, normalized))}, ${alpha(
        '#ffffff',
        lerp(0.02, 0.56, normalized),
      )})`,
      '--nav-fill': `linear-gradient(135deg, ${alpha('#ffffff', lerp(0.05, 0.94, normalized))}, ${alpha(
        '#ffffff',
        lerp(0.02, 0.7, normalized),
      )})`,
      '--input-fill': `linear-gradient(135deg, ${alpha('#ffffff', lerp(0.04, 0.97, normalized))}, ${alpha(
        '#ffffff',
        lerp(0.02, 0.9, normalized),
      )})`,
      '--bg-gradient': `radial-gradient(circle at ${Math.round(18 + sweep * 42)}% ${Math.round(
        12 + sweep * 8,
      )}%, ${alpha('#4f8cff', lerp(0.14, 0.22, normalized))}, transparent 40%), radial-gradient(circle at ${Math.round(
        84 - sweep * 26,
      )}% ${Math.round(88 - sweep * 24)}%, ${alpha('#8b5cf6', lerp(0.18, 0.08, normalized))}, transparent 44%), linear-gradient(180deg, ${palette.bg} 0%, ${palette.bgSecondary} 100%)`,
      '--decor-opacity': lerp(0.35, 0.08, normalized).toFixed(3),
      '--morph-progress': normalized.toFixed(3),
      '--scrollbar': alpha('#9fb4cc', 0.35),
    },
  };
};

export const getMorphStageMeta = (progress: number, direction: MorphDirection) => {
  const stage = progress < 0.34 ? 1 : progress < 0.67 ? 2 : 3;

  if (direction === 'toTelega') {
    return {
      stage,
      title:
        stage === 1
          ? 'Переуплотнение снимается'
          : stage === 2
            ? 'Гибрид «Минега» нестабилен'
            : 'Телега почти доступна',
      description:
        stage === 1
          ? 'Тяжёлые панели смягчаются, но дух контроля ещё силён.'
          : stage === 2
            ? 'Мы уже не в Мине, но ещё не совсем в свободе.'
            : 'Интерфейс дышит. Осталось не спугнуть интернет.',
    };
  }

  return {
    stage,
    title:
      stage === 3
        ? 'Свобода заканчивается'
        : stage === 2
          ? 'Канал схлопывается'
          : 'Возвращение в родную плотность',
    description:
      stage === 3
        ? 'Пока ещё Телега, но система уже затягивает гайки.'
        : stage === 2
          ? 'Гибрид распадается, тяжёлые карточки возвращаются.'
          : 'Мин снова готов обнять тебя плотным интерфейсом.',
  };
};

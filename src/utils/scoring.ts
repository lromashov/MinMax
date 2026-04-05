export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const formatCountdown = (seconds: number): string => `${seconds.toFixed(1)}с`;

export const getLoyaltyLevel = (value: number): string => {
  if (value >= 85) return 'Священная преданность';
  if (value >= 65) return 'Почётный внутренний круг';
  if (value >= 45) return 'Стабильная лояльность';
  if (value >= 25) return 'Испытательный энтузиаст';
  return 'Под наблюдением';
};

export const getFreedomIndexCopy = (value: number): string => {
  if (value >= 85) return 'Свобода подозрительно велика';
  if (value >= 60) return 'Канал стабилизирован';
  if (value >= 35) return 'Туннель почти готов';
  if (value >= 15) return 'Шифруем очень законную активность';
  return 'Внешний мир пока далеко';
};

export const getModerationHint = (shouldDelete: boolean, streak: number): string => {
  if (shouldDelete && streak >= 3) return 'Командный дух под угрозой';
  if (shouldDelete) return 'Сомнительное мнение обнаружено';
  if (streak >= 4) return 'Норм, пусть живёт';
  return 'Похоже, нелояльности нет';
};

export const getVpnStatusCopy = (
  status: 'idle' | 'connecting' | 'connected' | 'failed',
  progress: number,
): string => {
  if (status === 'connected') return 'Подключено';
  if (status === 'failed') return 'Соединение сорвалось';
  if (progress >= 0.75) return 'Туннель почти готов';
  if (progress >= 0.35) return 'Шифруем очень законную активность';
  return 'Подключается';
};

export const getMorphCopy = (progress: number): string => {
  if (progress < 0.34) return 'Stage 1 · mostly Min';
  if (progress < 0.67) return 'Stage 2 · hybrid';
  return 'Stage 3 · mostly Telega';
};

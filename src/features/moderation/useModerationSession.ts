import { useMemo } from 'react';
import { useAppStore } from '../../app/store';
import { getLoyaltyLevel, getModerationHint } from '../../utils/scoring';

export const useModerationSession = () => {
  const moderationMessages = useAppStore((state) => state.moderationMessages);
  const moderationIndex = useAppStore((state) => state.moderationIndex);
  const moderationProcessed = useAppStore((state) => state.moderationProcessed);
  const moderationCorrectCount = useAppStore((state) => state.moderationCorrectCount);
  const moderationStreak = useAppStore((state) => state.moderationStreak);
  const moderationScoreTarget = useAppStore((state) => state.moderationScoreTarget);
  const moderationStreakTarget = useAppStore((state) => state.moderationStreakTarget);
  const funnyReputation = useAppStore((state) => state.funnyReputation);
  const answerModeration = useAppStore((state) => state.answerModeration);

  const currentMessage = moderationMessages[moderationIndex % moderationMessages.length];
  const nextMessage = moderationMessages[(moderationIndex + 1) % moderationMessages.length];
  const laterMessage = moderationMessages[(moderationIndex + 2) % moderationMessages.length];

  const meta = useMemo(
    () => ({
      hint: getModerationHint(currentMessage.shouldDelete, moderationStreak),
      loyaltyLabel: getLoyaltyLevel(funnyReputation),
      queuePosition: (moderationIndex % moderationMessages.length) + 1,
      total: moderationMessages.length,
      processedRatio: Math.min(moderationProcessed / moderationScoreTarget, 1),
      streakRatio: Math.min(moderationStreak / moderationStreakTarget, 1),
      accuracyRatio: Math.min(moderationCorrectCount / moderationScoreTarget, 1),
    }),
    [
      currentMessage.shouldDelete,
      funnyReputation,
      moderationCorrectCount,
      moderationIndex,
      moderationMessages.length,
      moderationProcessed,
      moderationScoreTarget,
      moderationStreak,
      moderationStreakTarget,
    ],
  );

  return {
    currentMessage,
    nextMessage,
    laterMessage,
    moderationProcessed,
    moderationCorrectCount,
    moderationStreak,
    moderationScoreTarget,
    moderationStreakTarget,
    answerModeration,
    ...meta,
  };
};

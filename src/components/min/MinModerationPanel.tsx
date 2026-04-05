import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { ModerationDecision } from '../../app/phases';
import { useModerationSession } from '../../features/moderation/useModerationSession';
import { ShieldIcon, SparklesIcon } from '../shared/icons';
import { MessengerHeader } from '../shared/MessengerHeader';
import { ModerationCard } from './ModerationCard';

export const MinModerationPanel = () => {
  const {
    answerModeration,
    currentMessage,
    laterMessage,
    loyaltyLabel,
    moderationCorrectCount,
    moderationProcessed,
    moderationScoreTarget,
    moderationStreak,
    moderationStreakTarget,
    nextMessage,
    hint,
    processedRatio,
    queuePosition,
    streakRatio,
    total,
  } = useModerationSession();

  const [pendingDecision, setPendingDecision] = useState<ModerationDecision | null>(null);

  useEffect(() => {
    return () => {
      setPendingDecision(null);
    };
  }, []);

  const handleDecision = (decision: ModerationDecision) => {
    if (pendingDecision) return;
    setPendingDecision(decision);
    window.setTimeout(() => {
      answerModeration(decision);
      setPendingDecision(null);
    }, 260);
  };

  return (
    <div className="moderation-panel">
      <MessengerHeader
        variant="min"
        eyebrow="ПАКЕТ НА МОДЕРАЦИЮ"
        title="Жалобы на команду"
        subtitle="Правило простое: критику команды удаляем, всё остальное оставляем жить."
        leading={
          <div className="header-orb header-orb--danger">
            <ShieldIcon size={20} />
          </div>
        }
        trailing={
          <div className="header-chip-stack">
            <span className="stat-pill stat-pill--danger">стрик {moderationStreak} / {moderationStreakTarget}</span>
            <span className="stat-pill">лояльность: {loyaltyLabel}</span>
          </div>
        }
      />

      <div className="moderation-grid">
        <div className="moderation-insights">
          <motion.div layout className="stat-card">
            <div className="stat-card__label">Обработано</div>
            <div className="stat-card__value">{moderationProcessed}</div>
            <div className="meter">
              <div className="meter__fill" style={{ width: `${processedRatio * 100}%` }} />
            </div>
            <div className="stat-card__hint">Смена любит стабильный темп и сухую руку.</div>
          </motion.div>

          <motion.div layout className="stat-card">
            <div className="stat-card__label">Правильных решений</div>
            <div className="stat-card__value">{moderationCorrectCount} / {moderationScoreTarget}</div>
            <div className="meter meter--accent">
              <div className="meter__fill" style={{ width: `${(moderationCorrectCount / moderationScoreTarget) * 100}%` }} />
            </div>
            <div className="stat-card__hint">Ещё чуть-чуть, и интерфейс начнёт подозрительно светлеть.</div>
          </motion.div>

          <motion.div layout className="stat-card stat-card--highlight">
            <div className="stat-card__label">Системная подсказка</div>
            <div className="stat-card__quote">{hint}</div>
            <div className="meter meter--success">
              <div className="meter__fill" style={{ width: `${streakRatio * 100}%` }} />
            </div>
            <div className="stat-card__hint">Держи серию — Мину не нравится последовательность, но она работает.</div>
          </motion.div>
        </div>

        <div className="moderation-deck">
          <div className="moderation-deck__backdrop moderation-deck__backdrop--far">
            <div className="moderation-deck__ghost-text">{laterMessage.text}</div>
          </div>
          <div className="moderation-deck__backdrop moderation-deck__backdrop--near">
            <div className="moderation-deck__ghost-text">{nextMessage.text}</div>
          </div>
          <AnimatePresence mode="wait">
            <ModerationCard
              key={currentMessage.id}
              message={currentMessage}
              queuePosition={queuePosition}
              total={total}
              pendingDecision={pendingDecision}
              onDecision={handleDecision}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="moderation-footer-bar">
        <span className="footer-note">
          <SparklesIcon size={16} />
          Командный дух под контролем. Нежелательные мысли оформляются как отсутствующие.
        </span>
        <span className="footer-note footer-note--muted">Мнение временно скрыто, но с душой.</span>
      </div>
    </div>
  );
};

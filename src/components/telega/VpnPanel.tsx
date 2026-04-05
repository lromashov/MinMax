import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../app/store';
import { formatCountdown, getFreedomIndexCopy, getVpnStatusCopy } from '../../utils/scoring';
import { ProgressRing } from '../shared/ProgressRing';
import { BoltIcon, CheckCircleIcon, ShieldIcon, SparklesIcon } from '../shared/icons';
import { MessengerHeader } from '../shared/MessengerHeader';

interface Ripple {
  id: string;
  x: number;
  y: number;
}

export const VpnPanel = () => {
  const vpnProgress = useAppStore((state) => state.vpnProgress);
  const vpnStatus = useAppStore((state) => state.vpnStatus);
  const vpnTimeLeft = useAppStore((state) => state.vpnTimeLeft);
  const vpnRound = useAppStore((state) => state.vpnRound);
  const suspiciousFreedom = useAppStore((state) => state.suspiciousFreedom);
  const tapVpn = useAppStore((state) => state.tapVpn);
  const startVpnRound = useAppStore((state) => state.startVpnRound);

  const [ripples, setRipples] = useState<Ripple[]>([]);

  const statusLabel = getVpnStatusCopy(vpnStatus, vpnProgress);
  const freedomCopy = getFreedomIndexCopy(suspiciousFreedom);
  const isConnected = vpnStatus === 'connected';

  const tone = useMemo<'default' | 'success' | 'danger'>(() => {
    if (vpnStatus === 'failed') return 'danger';
    if (vpnStatus === 'connected') return 'success';
    return 'default';
  }, [vpnStatus]);

  const spawnRipple = () => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2, 5)}`;
    const angle = Math.random() * Math.PI * 2;
    const distance = 12 + Math.random() * 50;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    setRipples((prev) => [...prev, { id, x, y }].slice(-18));
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== id));
    }, 650);
  };

  const handleTap = () => {
    if (vpnStatus === 'connected') {
      startVpnRound(true);
      return;
    }

    tapVpn();
    spawnRipple();
  };

  useEffect(() => {
    if (vpnStatus === 'connecting') return;
    setRipples([]);
  }, [vpnStatus]);

  return (
    <div className="vpn-panel">
      <MessengerHeader
        variant="telega"
        eyebrow="VPN / TELEGA"
        title="Соединение с внешним миром"
        subtitle="Если не нажимать, тебя вернут обратно. Система считает, что ты слишком расслабился."
        leading={
          <div className="header-orb header-orb--accent">
            <ShieldIcon size={20} />
          </div>
        }
        trailing={
          <div className="header-chip-stack">
            <span className="stat-pill stat-pill--blue">волна {vpnRound}</span>
            <span className="stat-pill">{freedomCopy}</span>
          </div>
        }
      />

      <div className="vpn-layout">
        <div className="vpn-layout__main">
          <motion.button
            type="button"
            className={`vpn-tap-zone ${isConnected ? 'is-connected' : ''}`}
            onClick={handleTap}
            whileTap={{ scale: 0.985 }}
          >
            <ProgressRing
              progress={vpnProgress}
              label={statusLabel}
              subtitle={isConnected ? 'Канал держится' : formatCountdown(vpnTimeLeft)}
              tone={tone}
              centerExtra={
                <span className="vpn-progress-caption">
                  {isConnected ? 'Можно расслабиться на пару секунд' : 'Жми быстро и много'}
                </span>
              }
            />

            <AnimatePresence>
              {ripples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  className="vpn-ripple"
                  initial={{ opacity: 0.8, scale: 0.2, x: ripple.x, y: ripple.y }}
                  animate={{ opacity: 0, scale: 2.4, x: ripple.x * 1.5, y: ripple.y * 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.58, ease: 'easeOut' }}
                />
              ))}
            </AnimatePresence>
          </motion.button>

          <div className="vpn-cta-line">
            <span className="footer-note">
              <BoltIcon size={16} />
              {isConnected
                ? 'Канал стабилизирован. Через пару секунд система снова попросит доказать серьёзность намерений.'
                : 'Шифруем очень законную активность. Пальцы — наш дата-центр.'}
            </span>
          </div>
        </div>

        <div className="vpn-layout__side">
          <div className="stat-card stat-card--highlight">
            <div className="stat-card__label">Статус</div>
            <div className="stat-card__quote">{statusLabel}</div>
            <div className="stat-card__hint">Пока круг не заполнен, туннель считается художественным вымыслом.</div>
          </div>

          <div className="stat-card">
            <div className="stat-card__label">Таймер</div>
            <div className="stat-card__value">{formatCountdown(vpnTimeLeft)}</div>
            <div className="stat-card__hint">Если не успеешь — свобода кончится без предупреждения.</div>
          </div>

          <div className="stat-card">
            <div className="stat-card__label">Индекс подозрительной свободы</div>
            <div className="stat-card__value">{Math.round(suspiciousFreedom)}</div>
            <div className="stat-card__hint">{freedomCopy}</div>
          </div>

          {isConnected ? (
            <motion.button
              type="button"
              className="hero-button hero-button--telega"
              whileTap={{ scale: 0.98 }}
              onClick={() => startVpnRound(true)}
            >
              <CheckCircleIcon size={18} />
              Запустить новую волну
            </motion.button>
          ) : (
            <div className="chat-list-note chat-list-note--telega">
              <SparklesIcon size={16} />
              Похоже, нас снова заметят, если перестанешь кликать.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

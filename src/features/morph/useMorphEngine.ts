import { useEffect } from 'react';
import { useAppStore } from '../../app/store';

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const useMorphEngine = () => {
  const phase = useAppStore((state) => state.phase);
  const direction = useAppStore((state) => state.morphDirection);
  const setMorphProgress = useAppStore((state) => state.setMorphProgress);
  const completeMorphToTelega = useAppStore((state) => state.completeMorphToTelega);
  const completeMorphToMin = useAppStore((state) => state.completeMorphToMin);

  useEffect(() => {
    if (phase !== 'morph_to_telega' && phase !== 'morph_to_min') return;

    const startProgress = useAppStore.getState().morphProgress;
    const target = direction === 'toTelega' ? 1 : 0;
    const duration = direction === 'toTelega' ? 2400 : 2200;
    let frameId = 0;
    let startedAt = 0;

    const loop = (timestamp: number) => {
      if (startedAt === 0) startedAt = timestamp;
      const elapsed = Math.min(1, (timestamp - startedAt) / duration);
      const eased = easeInOutCubic(elapsed);
      const nextProgress = startProgress + (target - startProgress) * eased;
      setMorphProgress(nextProgress);

      if (elapsed < 1) {
        frameId = window.requestAnimationFrame(loop);
        return;
      }

      if (direction === 'toTelega') {
        completeMorphToTelega();
      } else {
        completeMorphToMin();
      }
    };

    frameId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [completeMorphToMin, completeMorphToTelega, direction, phase, setMorphProgress]);
};

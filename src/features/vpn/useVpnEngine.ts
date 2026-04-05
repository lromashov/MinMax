import { useEffect } from 'react';
import { useAppStore } from '../../app/store';

export const useVpnEngine = () => {
  const phase = useAppStore((state) => state.phase);
  const vpnStatus = useAppStore((state) => state.vpnStatus);
  const tickVpn = useAppStore((state) => state.tickVpn);
  const startVpnRound = useAppStore((state) => state.startVpnRound);

  useEffect(() => {
    if (phase !== 'telega_vpn' || vpnStatus !== 'connecting') return;

    let frameId = 0;
    let last = performance.now();

    const loop = (time: number) => {
      const delta = (time - last) / 1000;
      last = time;
      tickVpn(delta);
      frameId = window.requestAnimationFrame(loop);
    };

    frameId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [phase, tickVpn, vpnStatus]);

  useEffect(() => {
    if (phase !== 'telega_vpn' || vpnStatus !== 'connected') return;

    const timeoutId = window.setTimeout(() => {
      startVpnRound(true);
    }, 4200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [phase, startVpnRound, vpnStatus]);
};

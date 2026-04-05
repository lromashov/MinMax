import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { MinShell } from './components/min/MinShell';
import { TelegaShell } from './components/telega/TelegaShell';
import { HybridShell } from './components/hybrid/HybridShell';
import { ToastCenter } from './components/shared/ToastCenter';
import { useMorphEngine } from './features/morph/useMorphEngine';
import { useVpnEngine } from './features/vpn/useVpnEngine';
import { useAppStore } from './app/store';
import { getMorphTheme } from './utils/morph';

const App = () => {
  const phase = useAppStore((state) => state.phase);
  const morphDirection = useAppStore((state) => state.morphDirection);
  const morphProgress = useAppStore((state) => state.morphProgress);
  const currentMessenger = useAppStore((state) => state.currentMessenger);

  useMorphEngine();
  useVpnEngine();

  const theme = useMemo(
    () => getMorphTheme(morphProgress, morphDirection),
    [morphDirection, morphProgress],
  );

  return (
    <div
      className="app-root"
      data-phase={phase}
      data-messenger={currentMessenger}
      data-stage={theme.stage}
      style={theme.cssVars as CSSProperties}
    >
      <ToastCenter />
      {phase === 'min_home' || phase === 'min_moderation' ? (
        <MinShell />
      ) : phase === 'telega_home' || phase === 'telega_vpn' ? (
        <TelegaShell />
      ) : (
        <HybridShell />
      )}
    </div>
  );
};

export default App;

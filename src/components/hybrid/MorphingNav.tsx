import { BottomNav } from '../shared/BottomNav';
import { BoltIcon, ChatIcon, ShieldIcon } from '../shared/icons';

interface MorphingNavProps {
  progress: number;
}

export const MorphingNav = ({ progress }: MorphingNavProps) => (
  <BottomNav
    variant="hybrid"
    activeId={progress < 0.5 ? 'shield' : 'vpn'}
    onChange={() => undefined}
    items={[
      { id: 'chat', label: progress < 0.5 ? 'Чаты' : 'Диалоги', icon: <ChatIcon size={18} /> },
      { id: 'shield', label: 'Мин', icon: <ShieldIcon size={18} /> },
      { id: 'vpn', label: 'Телега', icon: <BoltIcon size={18} /> },
    ]}
  />
);

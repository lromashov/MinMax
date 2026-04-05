import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const baseProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const ChatIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M6 18.5L3.5 20l.7-2.9A7.5 7.5 0 1119.5 8.5" />
    <path d="M8 9.5h8" />
    <path d="M8 13h5" />
  </svg>
);

export const ShieldIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3z" />
    <path d="M9.7 11.7l1.8 1.8 3.2-3.6" />
  </svg>
);

export const SearchIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4 4" />
  </svg>
);

export const SparklesIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M12 3l1.2 3.2L16.5 7.5l-3.3 1.3L12 12l-1.2-3.2L7.5 7.5l3.3-1.3L12 3z" />
    <path d="M18 14l.7 1.8L20.5 17l-1.8.7L18 19.5l-.7-1.8L15.5 17l1.8-.7L18 14z" />
    <path d="M6 14l.7 1.8L8.5 17l-1.8.7L6 19.5l-.7-1.8L3.5 17l1.8-.7L6 14z" />
  </svg>
);

export const FolderIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M3.5 7.5A2.5 2.5 0 016 5h3.2l1.4 1.5H18A2.5 2.5 0 0120.5 9v8A2.5 2.5 0 0118 19.5H6A2.5 2.5 0 013.5 17v-9.5z" />
  </svg>
);

export const HomeIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M4.5 10.5L12 4l7.5 6.5" />
    <path d="M6.5 9.2V19h11V9.2" />
  </svg>
);

export const PlaneIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M4 11.5l15.5-7-4.8 15.3-3.6-5.2-5.5-3.1z" />
    <path d="M19.5 4.5L11 14.6" />
  </svg>
);

export const BoltIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M13.5 2.8L6.2 12h4.5l-1.2 9.2L17.8 12h-4.6l.3-9.2z" />
  </svg>
);

export const TrashIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M4.5 7h15" />
    <path d="M9 7V4.8A1.8 1.8 0 0110.8 3h2.4A1.8 1.8 0 0115 4.8V7" />
    <path d="M6.5 7l.8 11a2 2 0 002 1.8h4.4a2 2 0 002-1.8l.8-11" />
    <path d="M10 10.2v5.6" />
    <path d="M14 10.2v5.6" />
  </svg>
);

export const KeepIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M6 12.5l3.5 3.5L18 7.5" />
    <path d="M20 12a8 8 0 11-2.3-5.7" />
  </svg>
);

export const RotateCcwIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M3.5 4.5v5H8.5" />
    <path d="M4 9.5a8 8 0 111.5 7.8" />
  </svg>
);

export const CheckCircleIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 12.2l2.2 2.2 4.8-5.1" />
  </svg>
);

export const ArrowRightIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M5 12h14" />
    <path d="M13 7l6 5-6 5" />
  </svg>
);

export const MenuDotsIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

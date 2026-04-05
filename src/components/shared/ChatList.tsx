import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon } from './icons';

interface ChatListProps {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  variant: 'min' | 'telega' | 'hybrid';
  folders?: string[];
  activeFolder?: string;
  headerAside?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export const ChatList = ({
  activeFolder,
  children,
  folders = [],
  footer,
  headerAside,
  searchPlaceholder,
  subtitle,
  title,
  variant,
}: ChatListProps) => (
  <div className={`chat-list-shell chat-list-shell--${variant}`}>
    <div className="chat-list-shell__header">
      <div>
        <div className="chat-list-shell__title">{title}</div>
        <div className="chat-list-shell__subtitle">{subtitle}</div>
      </div>
      {headerAside ? <div>{headerAside}</div> : null}
    </div>

    <div className={`search-fake search-fake--${variant}`}>
      <SearchIcon size={18} />
      <span>{searchPlaceholder}</span>
    </div>

    {folders.length ? (
      <div className="folder-strip">
        {folders.map((folder) => (
          <motion.button
            key={folder}
            type="button"
            className={`folder-chip ${folder === activeFolder ? 'is-active' : ''}`}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            {folder}
          </motion.button>
        ))}
      </div>
    ) : null}

    <div className="chat-list-shell__items">{children}</div>
    {footer ? <div className="chat-list-shell__footer">{footer}</div> : null}
  </div>
);

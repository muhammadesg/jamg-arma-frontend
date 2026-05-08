import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Brain,
  Phone,
  UserCog,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Sidebar.module.scss';

const navItems = [
  { key: 'dashboard', path: '/', icon: LayoutDashboard },
  { key: 'citizens', path: '/citizens', icon: Users },
  { key: 'ai', path: '/ai-analysis', icon: Brain },
  { key: 'callcenter', path: '/call-center', icon: Phone },
  { key: 'users', path: '/users', icon: UserCog },
  { key: 'reports', path: '/reports', icon: FileText },
];

export default function Sidebar() {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <FileText size={20} color="#22c55e" />
        </div>
        <div>
          <div className={styles.brandName}>{t.brand}</div>
          <div className={styles.brandSub}>{t.brandSub}</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ key, path, icon: Icon }) => {
          const isActive =
            path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(path);

          return (
            <NavLink
              key={key}
              to={path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={18} className={styles.navIcon} />
              <span>{t.nav[key]}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className={styles.footer}>{t.copyright}</div>
    </aside>
  );
}

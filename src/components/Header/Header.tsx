import { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import { Select } from 'antd';
import { useLanguage } from '../../contexts/useLanguage';
import { useAuth } from '../../contexts/useAuth';
import { useLogout } from '../../features/auth/auth.hooks';
import { styles } from './Header.styles';

const langOptions = [
  { value: 'uz', label: 'UZ' },
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
];

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const { user } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user?.name ?? 'Aziz Xasanov';
  const displayRole = user?.role ?? 'Administrator';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    setDropdownOpen(false);
    logout();
  }

  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder={t.search}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <Select
          value={lang}
          onChange={setLang}
          options={langOptions}
          size="small"
          className={styles.langSelect}
          popupMatchSelectWidth={false}
        />

        <button className={styles.notifBtn}>
          <Bell size={18} />
          <span className={styles.badge}>3</span>
        </button>

        <div className={styles.userWrapper} ref={dropdownRef}>
          <div
            className={`${styles.userInfo} ${dropdownOpen ? styles.userInfoActive : ''}`}
            onClick={() => setDropdownOpen((v) => !v)}
          >
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{displayName}</div>
              <div className={styles.userRole}>{displayRole}</div>
            </div>
          </div>

          {dropdownOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <div className={styles.dropdownAvatar}>{initials}</div>
                <div>
                  <div className={styles.dropdownName}>{displayName}</div>
                  <div className={styles.dropdownRole}>{displayRole}</div>
                </div>
              </div>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                <User size={15} />
                Profile
              </button>
              <button
                className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut size={15} />
                {isLoggingOut ? 'Chiqilmoqda...' : 'Logout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


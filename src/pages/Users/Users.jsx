import { useState } from 'react';
import { UserPlus, Users as UsersIcon, Phone, Settings, Eye, File as FileEdit, PhoneCall, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Users.module.scss';

// ── Data ──────────────────────────────────────────────────────
const USERS = [
  {
    id: 1,
    name: 'Aziz Xasanov',
    email: 'aziz.xasanov@example.uz',
    role: 'Administrator',
    region: null,
    active: true,
    perms: ['reports', 'edit', 'call', 'admin'],
  },
  {
    id: 2,
    name: 'Dilshod Rahmonov',
    email: 'dilshod.rahmonov@example.uz',
    role: 'Mintaqaviy menejer',
    region: 'Toshkent',
    active: true,
    perms: ['reports', 'edit', 'call'],
  },
  {
    id: 3,
    name: 'Malika Yusupova',
    email: 'malika.yusupova@example.uz',
    role: 'Operator',
    region: 'Samarqand',
    active: true,
    perms: ['call'],
  },
  {
    id: 4,
    name: 'Jahongir Tursunov',
    email: 'jahongir.tursunov@example.uz',
    role: 'Tahlilchi',
    region: null,
    active: true,
    perms: ['reports'],
  },
  {
    id: 5,
    name: 'Nodira Karimova',
    email: 'nodira.karimova@example.uz',
    role: 'Operator',
    region: 'Buxoro',
    active: false,
    perms: ['call'],
  },
];

// All possible permissions
const ALL_PERMS = [
  { key: 'reports',  label: 'Hisobotlar', icon: Eye },
  { key: 'edit',     label: 'Tahrirlash', icon: FileEdit },
  { key: 'call',     label: "Qo'ng'iroq", icon: PhoneCall },
  { key: 'admin',    label: 'Admin',       icon: ShieldCheck },
];

const ROLE_META = {
  'Administrator':       { cls: 'roleAdmin',   color: '#7c3aed' },
  'Mintaqaviy menejer':  { cls: 'roleManager', color: '#2563eb' },
  'Operator':            { cls: 'roleOperator',color: '#16a34a' },
  'Tahlilchi':           { cls: 'roleAnalyst', color: '#d97706' },
};

// ── Toggle component ──────────────────────────────────────────
function Toggle({ on }) {
  return (
    <div className={`${styles.toggle} ${on ? styles.toggleOn : styles.toggleOff}`}>
      <div className={styles.toggleThumb} />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────
export default function Users() {
  const { t } = useLanguage();
  const [users, setUsers] = useState(USERS);

  const toggleActive = (id) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));

  const kpi = [
    { label: 'Jami foydalanuvchilar', value: users.length,                          icon: UsersIcon, iconBg: '#1e293b', iconColor: 'white' },
    { label: 'Faol foydalanuvchilar',  value: users.filter(u => u.active).length,   icon: UsersIcon, iconBg: '#22c55e', iconColor: 'white' },
    { label: 'Operatorlar',            value: users.filter(u => u.role === 'Operator').length, icon: Phone, iconBg: '#dcfce7', iconColor: '#16a34a' },
    { label: 'Menejerlar',             value: users.filter(u => u.role === 'Mintaqaviy menejer').length, icon: Settings, iconBg: '#dbeafe', iconColor: '#2563eb' },
  ];

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{t.users?.title ?? 'Foydalanuvchilar boshqaruvi'}</h1>
          <p className={styles.pageSubtitle}>{t.users?.subtitle ?? 'Rolga asoslangan kirish nazorati (RBAC) tizimi'}</p>
        </div>
      </div>

      {/* KPI row */}
      <div className={styles.kpiGrid}>
        {kpi.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className={styles.kpiCard}>
            <div className={styles.kpiLeft}>
              <div className={styles.kpiLabel}>{label}</div>
              <div className={styles.kpiValue}>{value}</div>
            </div>
            <div className={styles.kpiIcon} style={{ background: iconBg, color: iconColor }}>
              <Icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>Barcha foydalanuvchilar</h3>
          <button className={styles.addBtn}>
            <UserPlus size={15} />
            Yangi foydalanuvchi
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Foydalanuvchi</th>
                <th>Rol</th>
                <th>Mintaqa</th>
                <th>Holat</th>
                <th>Ruxsatlar</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const role = ROLE_META[u.role] ?? { cls: 'roleOperator', color: '#16a34a' };
                return (
                  <tr key={u.id} className={styles.row}>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}>
                          {u.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className={styles.userName}>{u.name}</div>
                          <div className={styles.userEmail}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.roleBadge} ${styles[role.cls]}`}>{u.role}</span>
                    </td>
                    <td className={styles.regionCell}>{u.region ?? '—'}</td>
                    <td>
                      <button
                        className={styles.statusToggleBtn}
                        onClick={() => toggleActive(u.id)}
                        title="Holatni o'zgartirish"
                      >
                        <Toggle on={u.active} />
                        <span className={u.active ? styles.activeLabel : styles.inactiveLabel}>
                          {u.active ? 'Faol' : 'Nofaol'}
                        </span>
                      </button>
                    </td>
                    <td>
                      <div className={styles.permsRow}>
                        {ALL_PERMS.filter(p => u.perms.includes(p.key)).map(({ key, label, icon: PIcon }) => (
                          <span key={key} className={styles.permChip}>
                            <PIcon size={11} />
                            {label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <button className={styles.editBtn}>Tahrirlash</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions matrix */}
      <div className={styles.matrixCard}>
        <div className={styles.matrixHeader}>
          <ShieldCheck size={17} color="#475569" />
          <div>
            <h3 className={styles.tableTitle}>Ruxsatlar matritsasi</h3>
            <p className={styles.matrixSub}>Har bir rol uchun ruxsatlarni boshqarish</p>
          </div>
        </div>

        <div className={styles.matrixWrap}>
          <table className={styles.matrixTable}>
            <thead>
              <tr>
                <th className={styles.matrixUserCol}>Foydalanuvchi</th>
                {ALL_PERMS.map(({ key, label, icon: PIcon }) => (
                  <th key={key} className={styles.matrixPermCol}>
                    <PIcon size={16} color="#94a3b8" />
                    <span>{label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const role = ROLE_META[u.role] ?? { cls: 'roleOperator' };
                return (
                  <tr key={u.id} className={styles.matrixRow}>
                    <td className={styles.matrixNameCell}>
                      <div className={styles.mName}>{u.name}</div>
                      <span className={`${styles.roleBadge} ${styles[role.cls]}`}>{u.role}</span>
                    </td>
                    {ALL_PERMS.map(({ key }) => (
                      <td key={key} className={styles.matrixToggleCell}>
                        <Toggle on={u.perms.includes(key)} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

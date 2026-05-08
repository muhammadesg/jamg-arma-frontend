import { useState, useMemo } from 'react';
import {
  Search, SlidersHorizontal, ArrowUpDown,
  Eye, ChevronLeft, ChevronRight, Users,
  AlertTriangle, CheckCircle2, Clock3,
} from 'lucide-react';
import { Select } from 'antd';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Citizens.module.scss';

// ── Mock data matching screenshots ───────────────────────────
const ALL_CITIZENS = [
  { id: '30000000000', name: 'Ahmadjon Karimov',   category: 'Ayollar daftari', region: 'Toshkent',     phone: '+998 90 3751408', debt: 40010027, balance: 39783387, status: 'Muammoli',      risk: 'high' },
  { id: '30000000001', name: 'Bobur Rahmanov',      category: 'Temir daftar',    region: 'Samarqand',    phone: '+998 91 7686936', debt: 39530197, balance: 29096305, status: 'Faol',           risk: 'low' },
  { id: '30000000002', name: 'Dilshod Tursunov',    category: "Yoshlar daftari", region: 'Buxoro',       phone: '+998 92 2104670', debt: 37515297, balance: 34834193, status: 'Faol',           risk: 'medium' },
  { id: '30000000003', name: 'Eldor Abdullayev',    category: 'Keksa fuqarolar', region: 'Andijon',      phone: '+998 93 7211822', debt: 7785544,  balance: 0,        status: "To'langan",     risk: 'high' },
  { id: '30000000004', name: 'Farrux Sharipov',     category: 'Ayollar daftari', region: "Farg'ona",     phone: '+998 94 1053440', debt: 27012695, balance: 17269118, status: "Muddati o'tgan", risk: 'medium' },
  { id: '30000000005', name: 'Gulnora Madaminov',   category: 'Temir daftar',    region: 'Namangan',     phone: '+998 95 6015923', debt: 9032011,  balance: 3664109,  status: 'Muammoli',      risk: 'low' },
  { id: '30000000006', name: 'Hadicha Yusupov',     category: "Yoshlar daftari", region: 'Qashqadaryo',  phone: '+998 96 7286403', debt: 28735926, balance: 0,        status: "To'langan",     risk: 'high' },
  { id: '30000000007', name: 'Ikrom Ismoilov',      category: 'Keksa fuqarolar', region: 'Surxondaryo',  phone: '+998 97 6271466', debt: 54842855, balance: 19002031, status: 'Faol',           risk: 'low' },
  { id: '30000000008', name: 'Jahongir Ergashev',   category: 'Ayollar daftari', region: 'Navoiy',       phone: '+998 98 6422860', debt: 48588032, balance: 33313276, status: "Muddati o'tgan", risk: 'medium' },
  { id: '30000000009', name: 'Kamola Haydarov',     category: 'Temir daftar',    region: 'Jizzax',       phone: '+998 90 7656257', debt: 23929646, balance: 0,        status: "To'langan",     risk: 'high' },
  { id: '30000000010', name: 'Laziz Nazarov',       category: "Yoshlar daftari", region: 'Sirdaryo',     phone: '+998 91 3421890', debt: 31200000, balance: 12500000, status: 'Faol',           risk: 'low' },
  { id: '30000000011', name: 'Malika Xoliqova',     category: 'Keksa fuqarolar', region: 'Xorazm',       phone: '+998 92 9087654', debt: 19450000, balance: 8340000,  status: 'Muammoli',      risk: 'medium' },
  { id: '30000000012', name: 'Nodir Toshpulatov',   category: 'Ayollar daftari', region: 'Toshkent',     phone: '+998 93 5678901', debt: 62100000, balance: 44200000, status: "Muddati o'tgan", risk: 'high' },
  { id: '30000000013', name: 'Oydin Raximova',      category: 'Temir daftar',    region: 'Samarqand',    phone: '+998 94 2345670', debt: 15670000, balance: 0,        status: "To'langan",     risk: 'low' },
  { id: '30000000014', name: 'Pulat Qodirov',       category: "Yoshlar daftari", region: 'Andijon',      phone: '+998 95 8765004', debt: 29800000, balance: 21000000, status: 'Faol',           risk: 'medium' },
];

const PAGE_SIZE = 10;

const STATUS_META = {
  'Muammoli':       { cls: 'statusProblem',  icon: AlertTriangle },
  'Faol':           { cls: 'statusActive',   icon: CheckCircle2 },
  "To'langan":      { cls: 'statusPaid',     icon: CheckCircle2 },
  "Muddati o'tgan": { cls: 'statusOverdue',  icon: Clock3 },
};

const RISK_META = {
  high:   { cls: 'riskHigh',   label: 'Yuqori' },
  medium: { cls: 'riskMedium', label: "O'rta" },
  low:    { cls: 'riskLow',    label: 'Past' },
};

function fmt(n) {
  if (n === 0) return <span style={{ color: '#22c55e', fontWeight: 700 }}>0 so'm</span>;
  return `${n.toLocaleString('ru-RU')} so'm`;
}

export default function Citizens() {
  const { t } = useLanguage();
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatus] = useState('all');
  const [riskFilter, setRisk]   = useState('all');
  const [sortDir, setSortDir]   = useState('desc');
  const [page, setPage]         = useState(1);

  const filtered = useMemo(() => {
    let list = ALL_CITIZENS.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.id.includes(q) ||
        c.phone.includes(q) ||
        c.region.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchRisk   = riskFilter   === 'all' || c.risk   === riskFilter;
      return matchSearch && matchStatus && matchRisk;
    });
    list = [...list].sort((a, b) =>
      sortDir === 'desc' ? b.debt - a.debt : a.debt - b.debt
    );
    return list;
  }, [search, statusFilter, riskFilter, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const statusOptions = [
    { value: 'all', label: 'Barcha holatlar' },
    { value: 'Faol', label: 'Faol' },
    { value: 'Muammoli', label: 'Muammoli' },
    { value: "Muddati o'tgan", label: "Muddati o'tgan" },
    { value: "To'langan", label: "To'langan" },
  ];
  const riskOptions = [
    { value: 'all',    label: 'Barcha darajalar' },
    { value: 'high',   label: 'Yuqori' },
    { value: 'medium', label: "O'rta" },
    { value: 'low',    label: 'Past' },
  ];

  return (
    <div className={styles.page}>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{t.citizens?.title ?? 'Fuqarolar bazasi'}</h1>
          <p className={styles.pageSubtitle}>{t.citizens?.subtitle ?? "Barcha qarzdorlar va ularning moliyaviy ma'lumotlari"}</p>
        </div>
        <div className={styles.headerKpi}>
          <div className={styles.kpiPill}>
            <Users size={14} />
            <span>Jami: <strong>{ALL_CITIZENS.length.toLocaleString()}</strong></span>
          </div>
          <div className={`${styles.kpiPill} ${styles.kpiRed}`}>
            <AlertTriangle size={14} />
            <span>Yuqori xavf: <strong>{ALL_CITIZENS.filter(c => c.risk === 'high').length}</strong></span>
          </div>
        </div>
      </div>

      {/* Filter panel */}
      <div className={styles.filterPanel}>
        <div className={styles.filterTitle}>
          <SlidersHorizontal size={16} />
          Filtrlar va qidiruv
        </div>
        <div className={styles.filterRow}>
          <div className={styles.searchBox}>
            <Search size={15} color="#94a3b8" />
            <input
              type="text"
              placeholder="JSHSHIR, ism yoki telefon raqami..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className={styles.searchInput}
            />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch('')}>×</button>
            )}
          </div>
          <Select
            value={statusFilter}
            onChange={(v) => { setStatus(v); setPage(1); }}
            options={statusOptions}
            className={styles.filterSelect}
            popupMatchSelectWidth={false}
          />
          <Select
            value={riskFilter}
            onChange={(v) => { setRisk(v); setPage(1); }}
            options={riskOptions}
            className={styles.filterSelect}
            popupMatchSelectWidth={false}
          />
        </div>
        <div className={styles.filterMeta}>
          <span>
            Jami <strong>{filtered.length}</strong> ta natija topildi
          </span>
          <button
            className={styles.sortBtn}
            onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
          >
            <ArrowUpDown size={14} />
            Saralash ({sortDir === 'desc' ? 'kamayish' : "o'sish"})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thJshshir}>JSHSHIR</th>
              <th>F.I.O.</th>
              <th>Hudud</th>
              <th>Telefon</th>
              <th className={styles.thRight}>Qarz summasi</th>
              <th className={styles.thRight}>Qoldiq</th>
              <th>Holat</th>
              <th>Xavf</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((c) => {
              const risk   = RISK_META[c.risk];
              const status = STATUS_META[c.status] ?? { cls: 'statusActive', icon: CheckCircle2 };
              return (
                <tr key={c.id} className={styles.row}>
                  <td className={styles.jshshir}>{c.id}</td>
                  <td>
                    <div className={styles.nameCell}>
                      <div className={styles.fullName}>{c.name}</div>
                      <span className={styles.categoryTag}>{c.category}</span>
                    </div>
                  </td>
                  <td className={styles.regionCell}>{c.region}</td>
                  <td className={styles.phoneCell}>{c.phone}</td>
                  <td className={styles.debtCell}>{c.debt.toLocaleString('ru-RU')} so'm</td>
                  <td className={styles.balanceCell}>
                    {c.balance === 0
                      ? <span className={styles.zeroBal}>0 so'm</span>
                      : <span className={styles.redBal}>{c.balance.toLocaleString('ru-RU')} so'm</span>
                    }
                  </td>
                  <td>
                    <span className={`${styles.statusTag} ${styles[status.cls]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.riskTag} ${styles[risk.cls]}`}>
                      {risk.label}
                    </span>
                  </td>
                  <td>
                    <button className={styles.viewBtn}>
                      <Eye size={14} />
                      Ko'rish
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {pageData.length === 0 && (
          <div className={styles.empty}>
            <Search size={32} color="#cbd5e1" />
            <p>Natija topilmadi</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}
          </span>
          <div className={styles.pageButtons}>
            <button
              className={styles.pageBtn}
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

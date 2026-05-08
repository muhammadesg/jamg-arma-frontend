import { useState } from 'react';
import { Download, Calendar, ChevronDown, TrendingUp, TrendingDown, DollarSign, Target, Users as Users2, MapPin, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Reports.module.scss';

// ── KPI data ──────────────────────────────────────────────────
const KPI = [
  {
    icon: DollarSign,
    label: 'Jami berilgan kredit',
    value: '6.2 mlrd',
    delta: "+8.2% o'sish",
    up: true,
    iconBg: '#dbeafe',
    iconColor: '#2563eb',
  },
  {
    icon: Target,
    label: 'Qaytarilgan summa',
    value: '2.9 mlrd',
    delta: "+12.4% o'sish",
    up: true,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
  {
    icon: TrendingUp,
    label: 'Qaytarish foizi',
    value: '47.1%',
    delta: '+3.7% yaxshilandi',
    up: true,
    iconBg: '#22c55e',
    iconColor: 'white',
  },
  {
    icon: Users2,
    label: 'Faol qarzdorlar',
    value: '160',
    delta: '-4.3% kamaydi',
    up: false,
    iconBg: '#fee2e2',
    iconColor: '#ef4444',
  },
];

// ── Status distribution ───────────────────────────────────────
const STATUS_DIST = [
  { label: 'Faol',          count: 80,  pct: 40.0, color: '#3b82f6', border: '#bfdbfe' },
  { label: "To'langan",     count: 40,  pct: 20.0, color: '#22c55e', border: '#bbf7d0' },
  { label: "Muddati o'tgan",count: 40,  pct: 20.0, color: '#f97316', border: '#fed7aa' },
  { label: 'Muammoli',      count: 40,  pct: 20.0, color: '#ef4444', border: '#fecaca' },
];

// ── Line chart data ───────────────────────────────────────────
const MONTHLY = [
  { label: 'Yan', given: 32, returned: 29 },
  { label: 'Fev', given: 40, returned: 31 },
  { label: 'Mar', given: 35, returned: 34 },
  { label: 'Apr', given: 45, returned: 35 },
  { label: 'May', given: 33, returned: 32 },
  { label: 'Iyun',given: 47, returned: 40 },
];

// ── Region bar chart ──────────────────────────────────────────
const REGIONS_BAR = [
  { label: 'Andijon',     value: 66 },
  { label: 'Namangan',    value: 62 },
  { label: 'Surxondaryo', value: 56 },
  { label: 'Navoiy',      value: 54 },
  { label: 'Xorazm',      value: 50 },
  { label: 'Qashqadaryo', value: 49 },
  { label: 'Jizzax',      value: 46 },
  { label: 'Sirdaryo',    value: 43 },
];

// ── Region table ──────────────────────────────────────────────
const REGIONS_TABLE = [
  { name: 'Toshkent',        debtors: 45230, debt: 85, rate: 0.0,  status: 'Yuqori xavf' },
  { name: "Farg'ona",        debtors: 31680, debt: 88, rate: 0.0,  status: 'Yuqori xavf' },
  { name: 'Namangan',        debtors: 22430, debt: 65, rate: 60.7, status: "O'rta" },
  { name: 'Qashqadaryo',     debtors: 19870, debt: 70, rate: 49.8, status: "O'rta" },
  { name: 'Surxondaryo',     debtors: 14560, debt: 58, rate: 53.0, status: 'Yaxshi' },
  { name: 'Navoiy',          debtors: 12340, debt: 62, rate: 52.7, status: "O'rta" },
  { name: 'Jizzax',          debtors: 11230, debt: 54, rate: 46.4, status: 'Yaxshi' },
  { name: 'Sirdaryo',        debtors:  8920, debt: 48, rate: 43.1, status: 'Yaxshi' },
  { name: 'Xorazm',          debtors: 16780, debt: 76, rate: 50.3, status: "O'rta" },
  { name: "Qoraqalpog'iston",debtors:  9450, debt: 52, rate: 0.0,  status: 'Yaxshi' },
];

// ── SVG line chart ────────────────────────────────────────────
function LineChart({ data }) {
  const W = 520, H = 200, PL = 40, PB = 36, PT = 16, PR = 16;
  const cW = W - PL - PR;
  const cH = H - PT - PB;
  const maxVal = 60;
  const ticks = [0, 15, 30, 45, 60];

  const toX = (i) => PL + (i / (data.length - 1)) * cW;
  const toY = (v) => PT + cH - (v / maxVal) * cH;

  const linePath = (key) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d[key])}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.linesvg}>
      {/* Grid */}
      {ticks.map((t) => {
        const y = toY(t);
        return (
          <g key={t}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={PL - 6} y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end">{t}</text>
          </g>
        );
      })}
      {/* X labels */}
      {data.map((d, i) => (
        <text key={i} x={toX(i)} y={H - 4} fontSize="10" fill="#94a3b8" textAnchor="middle">{d.label}</text>
      ))}
      {/* Lines */}
      <path d={linePath('given')}    fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={linePath('returned')} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Dots */}
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={toX(i)} cy={toY(d.given)}    r="4" fill="#1e293b" />
          <circle cx={toX(i)} cy={toY(d.returned)} r="4" fill="#22c55e" />
        </g>
      ))}
    </svg>
  );
}

// ── SVG horizontal bar chart ──────────────────────────────────
function HBarChart({ data }) {
  const W = 460, rowH = 28, padL = 100, padR = 40, padT = 10;
  const H = padT + data.length * rowH + 20;
  const maxVal = 80;
  const ticks = [0, 20, 40, 60, 80];
  const cW = W - padL - padR;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.hbarsvg}>
      {/* Vertical grid lines */}
      {ticks.map((t) => {
        const x = padL + (t / maxVal) * cW;
        return (
          <g key={t}>
            <line x1={x} y1={padT} x2={x} y2={H - 16} stroke="#e2e8f0" strokeWidth="1" />
            <text x={x} y={H - 2} fontSize="9.5" fill="#94a3b8" textAnchor="middle">{t}</text>
          </g>
        );
      })}
      {/* Bars */}
      {data.map((d, i) => {
        const y = padT + i * rowH + 4;
        const bW = (d.value / maxVal) * cW;
        return (
          <g key={d.label}>
            <text x={padL - 8} y={y + 11} fontSize="10.5" fill="#475569" textAnchor="end">{d.label}</text>
            <rect x={padL} y={y} width={bW} height={16} rx="4" fill="#22c55e" opacity="0.85" />
          </g>
        );
      })}
    </svg>
  );
}

const STATUS_META = {
  'Yuqori xavf': { cls: 'sHigh',   text: 'Yuqori xavf' },
  "O'rta":       { cls: 'sMid',    text: "O'rta" },
  'Yaxshi':      { cls: 'sGood',   text: 'Yaxshi' },
};

// ── Component ─────────────────────────────────────────────────
export default function Reports() {
  const { t } = useLanguage();
  const [period, setPeriod] = useState('Oxirgi oy');

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{t.reports?.title ?? 'Hisobotlar va tahlil'}</h1>
          <p className={styles.pageSubtitle}>{t.reports?.subtitle ?? 'Keng qamrovli moliyaviy va operatsion hisobotlar'}</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.dateBtn}>
            <Calendar size={14} />
            {period}
            <ChevronDown size={13} />
          </button>
          <button className={styles.exportBtn}>
            <Download size={14} />
            Yuklab olish
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className={styles.kpiGrid}>
        {KPI.map(({ icon: Icon, label, value, delta, up, iconBg, iconColor }) => (
          <div key={label} className={styles.kpiCard}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiIcon} style={{ background: iconBg, color: iconColor }}>
                <Icon size={20} />
              </div>
              {up
                ? <TrendingUp size={16} color="#22c55e" />
                : <TrendingDown size={16} color="#ef4444" />
              }
            </div>
            <div className={styles.kpiLabel}>{label}</div>
            <div className={styles.kpiValue}>{value}</div>
            <div className={`${styles.kpiDelta} ${up ? styles.deltaUp : styles.deltaDown}`}>{delta}</div>
          </div>
        ))}
      </div>

      {/* Status distribution */}
      <div className={styles.statusCard}>
        <h3 className={styles.cardTitle}>Holat bo'yicha taqsimot</h3>
        <p className={styles.cardSub}>Qarzdorlarning joriy holati</p>
        <div className={styles.statusGrid}>
          {STATUS_DIST.map((s) => (
            <div key={s.label} className={styles.statusItem} style={{ borderColor: s.border }}>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>{s.label}</span>
                <span className={styles.statusBadge} style={{ background: s.color, color: 'white' }}>
                  {s.count}
                </span>
              </div>
              <div className={styles.statusFoiz}>
                <span>Foiz</span>
                <span style={{ color: s.color, fontWeight: 700 }}>{s.pct.toFixed(1)}%</span>
              </div>
              <div className={styles.statusTrack}>
                <div className={styles.statusFill} style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className={styles.chartsRow}>

        {/* Line chart */}
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Oylik tendensiya</h3>
          <p className={styles.cardSub}>Berilgan va qaytarilgan kreditlar (mlrd so'm)</p>
          <LineChart data={MONTHLY} />
          <div className={styles.lineLegend}>
            <span className={styles.legendItem}>
              <span className={styles.legendLine} style={{ background: '#1e293b' }} />
              Berilgan (mlrd)
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendLine} style={{ background: '#22c55e' }} />
              Qaytarilgan (mlrd)
            </span>
          </div>
        </div>

        {/* Horizontal bar chart */}
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Mintaqaviy ko'rsatkichlar</h3>
          <p className={styles.cardSub}>Qaytarish foizi bo'yicha eng yaxshi hududlar</p>
          <HBarChart data={REGIONS_BAR} />
        </div>
      </div>

      {/* Region table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <MapPin size={17} color="#475569" />
          <h3 className={styles.cardTitle}>Batafsil mintaqaviy hisobot</h3>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mintaqa</th>
                <th className={styles.thRight}>Qarzdorlar soni</th>
                <th className={styles.thRight}>Qarz darajasi</th>
                <th className={styles.thRight}>Qaytarish foizi</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {REGIONS_TABLE.map((r) => {
                const sm = STATUS_META[r.status] ?? { cls: 'sGood', text: r.status };
                return (
                  <tr key={r.name} className={styles.row}>
                    <td className={styles.regionName}>{r.name}</td>
                    <td className={styles.tdRight}>{r.debtors.toLocaleString('ru-RU')}</td>
                    <td className={`${styles.tdRight} ${styles.debtPct}`}>{r.debt}%</td>
                    <td className={`${styles.tdRight} ${styles.ratePct}`}>
                      {r.rate === 0.0 ? '0.0%' : r.rate.toFixed(1) + '%'}
                    </td>
                    <td>
                      <span className={`${styles.statusBadgeTable} ${styles[sm.cls]}`}>{sm.text}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export */}
      <div className={styles.exportCard}>
        <div className={styles.exportHeader}>
          <FileText size={17} color="#475569" />
          <h3 className={styles.cardTitle}>Hisobotni eksport qilish</h3>
        </div>
        <div className={styles.exportBtns}>
          {['PDF formatda', 'Excel formatda', 'CSV formatda', "To'liq hisobot"].map((label) => (
            <button key={label} className={styles.exportFormatBtn}>
              <Download size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

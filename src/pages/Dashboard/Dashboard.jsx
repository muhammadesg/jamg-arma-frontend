import {
  TrendingUp, Users, Target, Activity,
  ArrowUpRight, ArrowDownRight, DollarSign,
  MapPin, Clock, CheckCircle2, XCircle, PhoneMissed,
  AlertTriangle, BarChart3, Zap,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Dashboard.module.scss';

// ── KPI cards ──────────────────────────────────────────────
const kpiCards = [
  {
    label: "Jami to'langan",
    value: "450.0 mlrd so'm",
    change: '+12.5%',
    up: true,
    icon: DollarSign,
    color: 'green',
    sub: "o'tgan oyga nisbatan",
  },
  {
    label: 'Qaytarish foizi',
    value: '73.5%',
    change: '+3.2%',
    up: true,
    icon: Target,
    color: 'blue',
    sub: "o'tgan oyga nisbatan",
  },
  {
    label: 'Faol qarzdorlar',
    value: '156,320',
    change: '-5.1%',
    up: false,
    icon: Users,
    color: 'orange',
    sub: "o'tgan oyga nisbatan",
  },
  {
    label: 'Operator samaradorligi',
    value: '87.2%',
    change: '+8.3%',
    up: true,
    icon: Activity,
    color: 'teal',
    sub: "o'tgan oyga nisbatan",
  },
];

// ── Monthly chart data ──────────────────────────────────────
const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
const aiData =     [72, 80, 62, 65, 79, 72, 73, 74, 60, 67, 76, 64];
const actualData = [70, 74, 59, 63, 62, 62, 63, 61, 58, 59, 77, 60];

// ── Region data ─────────────────────────────────────────────
const regions = [
  { name: 'Toshkent',       debt: 85, debtors: '45,230' },
  { name: 'Samarqand',      debt: 72, debtors: '32,150' },
  { name: 'Buxoro',         debt: 68, debtors: '18,920' },
  { name: 'Andijon',        debt: 91, debtors: '28,340' },
  { name: "Farg'ona",       debt: 88, debtors: '31,680' },
  { name: 'Namangan',       debt: 65, debtors: '22,430' },
  { name: 'Qashqadaryo',    debt: 70, debtors: '19,870' },
  { name: 'Surxondaryo',    debt: 58, debtors: '14,560' },
];

// ── Recent activity ─────────────────────────────────────────
const activity = [
  { name: 'Ahmadjon Madaminov',  action: "Qo'ng'iroq qilindi",        time: '2 daq oldin',  status: 'call' },
  { name: 'Nilufar Karimova',    action: "To'lov amalga oshirildi",    time: '15 daq oldin', status: 'paid' },
  { name: 'Eldor Ergashev',      action: 'Javob bermadi',              time: '32 daq oldin', status: 'miss' },
  { name: 'Hadicha Yusupova',    action: 'Muammoli holat',             time: '1 soat oldin', status: 'problem' },
  { name: 'Sardor Toshmatov',    action: "To'lov amalga oshirildi",    time: '2 soat oldin', status: 'paid' },
  { name: 'Komiljon Raximov',    action: "Qo'ng'iroq qilindi",        time: '3 soat oldin', status: 'call' },
];

const statusMeta = {
  call:    { icon: CheckCircle2,  label: "Qo'ng'iroq",  cls: 'statusCall' },
  paid:    { icon: DollarSign,    label: "To'lov",      cls: 'statusPaid' },
  miss:    { icon: PhoneMissed,   label: 'Javobsiz',    cls: 'statusMiss' },
  problem: { icon: AlertTriangle, label: 'Muammo',      cls: 'statusProblem' },
};

// ── Bar chart helper ────────────────────────────────────────
function getZoneColor(debt) {
  if (debt >= 80) return '#ef4444';
  if (debt >= 65) return '#f97316';
  return '#22c55e';
}

// ── Sparkline SVG ───────────────────────────────────────────
function Sparkline({ data, color, width = 200, height = 56 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });
  const polyline = pts.join(' ');
  const area = `0,${height} ${polyline} ${width},${height}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} fill="none" className={styles.sparkline}>
      <defs>
        <linearGradient id={`g${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#g${color})`} />
      <polyline points={polyline} stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ── Line chart for AI vs actual ─────────────────────────────
function LineChart() {
  const W = 520, H = 200, PAD = { top: 16, right: 16, bottom: 40, left: 36 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;
  const allVals = [...aiData, ...actualData];
  const max = Math.ceil(Math.max(...allVals) / 20) * 20;
  const min = 0;
  const range = max - min;
  const yTicks = [0, 20, 40, 60, 80];

  function toCoord(val, i) {
    const x = PAD.left + (i / (months.length - 1)) * cW;
    const y = PAD.top + cH - ((val - min) / range) * cH;
    return [x, y];
  }

  function buildPath(data) {
    return data.map((v, i) => {
      const [x, y] = toCoord(v, i);
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    }).join(' ');
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.lineChart}>
      {/* grid lines */}
      {yTicks.map((t) => {
        const y = PAD.top + cH - ((t - min) / range) * cH;
        return (
          <g key={t}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={PAD.left - 6} y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end">{t}</text>
          </g>
        );
      })}
      {/* x labels */}
      {months.map((m, i) => {
        const x = PAD.left + (i / (months.length - 1)) * cW;
        return <text key={m} x={x} y={H - 6} fontSize="10" fill="#94a3b8" textAnchor="middle">{m}</text>;
      })}
      {/* AI line */}
      <path d={buildPath(aiData)} fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Actual line */}
      <path d={buildPath(actualData)} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="0" />
      {/* dots */}
      {aiData.map((v, i) => {
        const [x, y] = toCoord(v, i);
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#1e293b" />;
      })}
      {actualData.map((v, i) => {
        const [x, y] = toCoord(v, i);
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#22c55e" />;
      })}
    </svg>
  );
}

// ── Bar chart ───────────────────────────────────────────────
function BarChart() {
  const W = 440, H = 200, PAD = { top: 16, right: 16, bottom: 48, left: 36 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;
  const barW = (cW / regions.length) * 0.55;
  const gap = cW / regions.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.barChart}>
      {[0, 25, 50, 75, 100].map((t) => {
        const y = PAD.top + cH - (t / 100) * cH;
        return (
          <g key={t}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={PAD.left - 6} y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end">{t}</text>
          </g>
        );
      })}
      {regions.map((r, i) => {
        const x = PAD.left + i * gap + (gap - barW) / 2;
        const barH = (r.debt / 100) * cH;
        const y = PAD.top + cH - barH;
        const color = getZoneColor(r.debt);
        return (
          <g key={r.name}>
            <rect x={x} y={y} width={barW} height={barH} rx="4" fill={color} opacity="0.85" />
            <text
              x={x + barW / 2}
              y={H - 8}
              fontSize="9"
              fill="#64748b"
              textAnchor="middle"
              transform={`rotate(-40, ${x + barW / 2}, ${H - 8})`}
            >
              {r.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Main component ──────────────────────────────────────────
export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{t.dashboard?.title ?? 'Boshqaruv paneli'}</h1>
          <p className={styles.pageSubtitle}>{t.dashboard?.subtitle ?? "Ijtimoiy monitoring va qarz boshqaruvi umumiy ma'lumotlari"}</p>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.liveTag}><span className={styles.liveDot} />Jonli ma'lumot</span>
          <span className={styles.dateBadge}>{new Date().toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className={styles.kpiGrid}>
        {kpiCards.map(({ label, value, change, up, icon: Icon, color, sub }) => (
          <div key={label} className={`${styles.kpiCard} ${styles[`kpi_${color}`]}`}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiIconWrap}>
                <Icon size={18} />
              </div>
              <span className={`${styles.kpiBadge} ${up ? styles.badgeUp : styles.badgeDown}`}>
                {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {change}
              </span>
            </div>
            <div className={styles.kpiValue}>{value}</div>
            <div className={styles.kpiLabel}>{label}</div>
            <div className={styles.kpiSub}>{sub}</div>
            <Sparkline data={Array.from({ length: 12 }, () => 40 + Math.random() * 40)} color={up ? '#22c55e' : '#ef4444'} />
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className={styles.chartsRow}>
        {/* Line chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.cardTitle}>AI prognoz va haqiqiy qaytarish</h3>
              <p className={styles.cardSub}>Oylik statistika (2025–2026)</p>
            </div>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}><span className={styles.legendDotDark} />AI prognoz</span>
              <span className={styles.legendItem}><span className={styles.legendDotGreen} />Haqiqiy</span>
            </div>
          </div>
          <LineChart />
        </div>

        {/* Bar chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.cardTitle}>Hududlar bo'yicha qarz taqsimoti</h3>
              <p className={styles.cardSub}>Qizil zona tahlili</p>
            </div>
            <div className={styles.zoneLegend}>
              <span className={styles.zoneItem}><span className={styles.zoneDot} style={{ background: '#ef4444' }} />80%+</span>
              <span className={styles.zoneItem}><span className={styles.zoneDot} style={{ background: '#f97316' }} />65–79%</span>
              <span className={styles.zoneItem}><span className={styles.zoneDot} style={{ background: '#22c55e' }} />{'<65%'}</span>
            </div>
          </div>
          <BarChart />
        </div>
      </div>

      {/* Bottom row: activity + goal + region cards */}
      <div className={styles.bottomRow}>

        {/* Recent activity */}
        <div className={styles.activityCard}>
          <div className={styles.cardHeaderRow}>
            <h3 className={styles.cardTitle}>So'nggi faoliyat</h3>
            <button className={styles.viewAll}>Barchasini ko'rish</button>
          </div>
          <div className={styles.activityList}>
            {activity.map((item, i) => {
              const meta = statusMeta[item.status];
              const StatusIcon = meta.icon;
              return (
                <div key={i} className={styles.activityItem}>
                  <div className={`${styles.activityAvatar} ${styles[meta.cls]}`}>
                    <StatusIcon size={14} />
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityName}>{item.name}</div>
                    <div className={styles.activityAction}>{item.action}</div>
                  </div>
                  <div className={styles.activityTimePill}>
                    <Clock size={10} />
                    {item.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Goal panel */}
        <div className={styles.goalCard}>
          <div className={styles.cardHeaderRow}>
            <h3 className={styles.cardTitle}>Oylik maqsad</h3>
            <span className={styles.goalPctBadge}>71%</span>
          </div>

          <div className={styles.goalNumbers}>
            <span className={styles.goalCurrent}>284.6M</span>
            <span className={styles.goalSep}>/</span>
            <span className={styles.goalTarget}>400M so'm</span>
          </div>

          <div className={styles.goalTrack}>
            <div className={styles.goalFill} style={{ width: '71%' }} />
          </div>
          <div className={styles.goalSubLine}>
            <Zap size={12} style={{ color: '#22c55e' }} />
            <span>Maqsadga yetish uchun 115.4M so'm qoldi</span>
          </div>

          <div className={styles.goalStats}>
            {[
              { value: '89', label: 'Muvaffaqiyatli', icon: CheckCircle2, cls: 'gsGreen' },
              { value: '34', label: 'Muammoli',       icon: XCircle,      cls: 'gsRed' },
              { value: '33', label: 'Javobsiz',       icon: PhoneMissed,  cls: 'gsGray' },
            ].map(({ value, label, icon: Icon, cls }) => (
              <div key={label} className={styles.gsStat}>
                <div className={`${styles.gsIcon} ${styles[cls]}`}><Icon size={14} /></div>
                <div className={styles.gsValue}>{value}</div>
                <div className={styles.gsLabel}>{label}</div>
              </div>
            ))}
          </div>

          <div className={styles.operatorSection}>
            <div className={styles.cardHeaderRow} style={{ marginBottom: 10 }}>
              <h4 className={styles.cardTitle} style={{ fontSize: 13 }}>Top operatorlar</h4>
              <BarChart3 size={14} style={{ color: '#94a3b8' }} />
            </div>
            {[
              { name: 'Dilnoza Hamidova', pct: 94, calls: 48 },
              { name: 'Jasur Mirzayev',   pct: 88, calls: 41 },
              { name: 'Mohira Sultanova', pct: 82, calls: 37 },
            ].map((op) => (
              <div key={op.name} className={styles.opRow}>
                <div className={styles.opAvatar}>{op.name.split(' ').map(n => n[0]).join('')}</div>
                <div className={styles.opInfo}>
                  <div className={styles.opName}>{op.name}</div>
                  <div className={styles.opBar}>
                    <div className={styles.opFill} style={{ width: `${op.pct}%` }} />
                  </div>
                </div>
                <div className={styles.opPct}>{op.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Region map cards */}
      <div className={styles.regionSection}>
        <div className={styles.cardHeaderRow}>
          <div>
            <h3 className={styles.cardTitle}>O'zbekiston xaritasi — qarz zonalari</h3>
            <p className={styles.cardSub}>Qizil zonalar — yuqori qarz darajasi, yashil zonalar — past qarz darajasi</p>
          </div>
          <div className={styles.zoneLegend}>
            <span className={styles.zoneItem}><span className={styles.zoneDot} style={{ background: '#ef4444' }} />Yuqori (80%+)</span>
            <span className={styles.zoneItem}><span className={styles.zoneDot} style={{ background: '#f97316' }} />O'rta (65–79%)</span>
            <span className={styles.zoneItem}><span className={styles.zoneDot} style={{ background: '#22c55e' }} />Past ({'<65%'})</span>
          </div>
        </div>
        <div className={styles.regionGrid}>
          {[
            { name: 'Toshkent',           debt: 85, debtors: '45,230' },
            { name: 'Samarqand',          debt: 72, debtors: '32,150' },
            { name: 'Buxoro',             debt: 68, debtors: '18,920' },
            { name: 'Andijon',            debt: 91, debtors: '28,340' },
            { name: "Farg'ona",           debt: 88, debtors: '31,680' },
            { name: 'Namangan',           debt: 65, debtors: '22,430' },
            { name: 'Qashqadaryo',        debt: 70, debtors: '19,870' },
            { name: 'Surxondaryo',        debt: 58, debtors: '14,560' },
            { name: 'Navoiy',             debt: 62, debtors: '12,340' },
            { name: 'Jizzax',             debt: 54, debtors: '11,230' },
            { name: 'Sirdaryo',           debt: 48, debtors: '8,920' },
            { name: 'Xorazm',             debt: 76, debtors: '16,780' },
            { name: "Qoraqalpog'iston",   debt: 52, debtors: '9,450' },
          ].map((r) => {
            const color = getZoneColor(r.debt);
            const zone = r.debt >= 80 ? 'red' : r.debt >= 65 ? 'orange' : 'green';
            return (
              <div key={r.name} className={`${styles.regionCard} ${styles[`region_${zone}`]}`}>
                <div className={styles.regionHeader}>
                  <MapPin size={13} style={{ color }} />
                  <span className={styles.regionName}>{r.name}</span>
                </div>
                <div className={styles.regionBody}>
                  <div className={styles.regionRow}>
                    <span className={styles.regionKey}>Qarz darajasi:</span>
                    <span className={styles.regionVal} style={{ color }}>{r.debt}%</span>
                  </div>
                  <div className={styles.regionRow}>
                    <span className={styles.regionKey}>Qarzdorlar:</span>
                    <span className={styles.regionDebtors}>{r.debtors}</span>
                  </div>
                </div>
                <div className={styles.regionBarTrack}>
                  <div className={styles.regionBarFill} style={{ width: `${r.debt}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

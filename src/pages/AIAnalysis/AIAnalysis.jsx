import { Brain, Target, TrendingUp, AlertTriangle, Users as Users2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './AIAnalysis.module.scss';

// ── KPI data ──────────────────────────────────────────────────
const KPI = [
  {
    icon: Target,
    value: '87.3%',
    label: 'Bashorat aniqligi',
    sub: "Oxirgi 3 oylik ma'lumotlar asosida",
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
  {
    icon: AlertTriangle,
    value: '67',
    label: 'Yuqori xavfli qarzdorlar',
    sub: "Tezkor choralar ko'rish talab etiladi",
    iconBg: '#fee2e2',
    iconColor: '#ef4444',
  },
  {
    icon: Brain,
    value: '234',
    label: 'Avtomatik tavsiyalar',
    sub: 'AI tomonidan yaratilgan strategiyalar',
    iconBg: '#f1f5f9',
    iconColor: '#475569',
  },
  {
    icon: TrendingUp,
    value: '74.2%',
    label: 'Prognoz qilingan qaytish',
    sub: 'Keyingi 30 kun uchun',
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
];

// ── Pie chart ─────────────────────────────────────────────────
const RISK_SLICES = [
  { label: 'Yuqori xavf', pct: 34, color: '#ef4444', count: 67 },
  { label: "O'rta xavf",  pct: 32, color: '#f97316', count: 66 },
  { label: 'Past xavf',   pct: 34, color: '#22c55e', count: 67 },
];

function PieChart({ slices }) {
  const R = 90, CX = 120, CY = 110;
  let cumAngle = -90;
  const paths = slices.map((s) => {
    const startAngle = cumAngle;
    const sweep = (s.pct / 100) * 360;
    cumAngle += sweep;
    const endAngle = cumAngle - 0.5;
    const toRad = (d) => (d * Math.PI) / 180;
    const x1 = CX + R * Math.cos(toRad(startAngle));
    const y1 = CY + R * Math.sin(toRad(startAngle));
    const x2 = CX + R * Math.cos(toRad(endAngle));
    const y2 = CY + R * Math.sin(toRad(endAngle));
    const large = sweep > 180 ? 1 : 0;
    // label position
    const midAngle = startAngle + sweep / 2;
    const lx = CX + (R + 28) * Math.cos(toRad(midAngle));
    const ly = CY + (R + 28) * Math.sin(toRad(midAngle));
    return { d: `M${CX},${CY} L${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} Z`, lx, ly, midAngle, ...s };
  });

  return (
    <svg viewBox="0 0 240 220" className={styles.piesvg}>
      {paths.map((p) => (
        <path key={p.label} d={p.d} fill={p.color} opacity="0.9" />
      ))}
      {paths.map((p) => (
        <text
          key={p.label + 'l'}
          x={p.lx}
          y={p.ly}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="9.5"
          fontWeight="700"
          fill={p.color}
        >
          {p.label.split(' ')[0] + ' ' + p.label.split(' ')[1] + ': ' + p.pct + '%'}
        </text>
      ))}
    </svg>
  );
}

// ── Bar chart ─────────────────────────────────────────────────
const PROB_BARS = [
  { label: '0-30%',   value: 65, color: '#ef4444' },
  { label: '30-60%',  value: 49, color: '#f97316' },
  { label: '60-100%', value: 84, color: '#22c55e' },
];

function ProbBarChart({ bars }) {
  const W = 320, H = 180, PL = 36, PB = 36, PT = 12, PR = 12;
  const cW = W - PL - PR;
  const cH = H - PT - PB;
  const ticks = [0, 25, 50, 75, 100];
  const bW = (cW / bars.length) * 0.45;
  const gap = cW / bars.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.barsvg}>
      {ticks.map((t) => {
        const y = PT + cH - (t / 100) * cH;
        return (
          <g key={t}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={PL - 5} y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end">{t}</text>
          </g>
        );
      })}
      {bars.map((b, i) => {
        const x = PL + i * gap + (gap - bW) / 2;
        const bH = (b.value / 100) * cH;
        const y = PT + cH - bH;
        return (
          <g key={b.label}>
            <rect x={x} y={y} width={bW} height={bH} rx="5" fill={b.color} opacity="0.88" />
            <text x={x + bW / 2} y={H - 6} fontSize="10" fill="#64748b" textAnchor="middle">{b.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Circular progress ─────────────────────────────────────────
function CircleProgress({ pct }) {
  const r = 18, c = 2 * Math.PI * r;
  const fill = c - (pct / 100) * c;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
      <circle
        cx="22" cy="22" r={r}
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeDasharray={c}
        strokeDashoffset={fill}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
      />
      <text x="22" y="27" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">{pct}%</text>
    </svg>
  );
}

// ── Priority debtors ──────────────────────────────────────────
const PRIORITY = [
  { name: 'Kamola Sharipov',    region: 'Samarqand', id: '30000000144', pct: 7 },
  { name: 'Ahmadjon Karimov',   region: 'Toshkent',  id: '30000000000', pct: 8 },
  { name: 'Ahmadjon Madaminov', region: 'Samarqand', id: '30000000105', pct: 6 },
  { name: 'Dilnoza Yusupova',   region: "Farg'ona",  id: '30000000302', pct: 9 },
  { name: 'Hadicha Yusupov',    region: 'Namangan',  id: '30000000006', pct: 12 },
  { name: 'Eldor Abdullayev',   region: 'Andijon',   id: '30000000003', pct: 15 },
  { name: 'Farrux Sharipov',    region: "Farg'ona",  id: '30000000004', pct: 17 },
  { name: 'Ikrom Ismoilov',     region: 'Surxondaryo', id: '30000000007', pct: 20 },
  { name: 'Jahongir Ergashev',  region: 'Navoiy',    id: '30000000008', pct: 18 },
  { name: 'Nodira Tursunov',    region: 'Sirdaryo',  id: '30000000192', pct: 11 },
];

// ── AI recommendations ────────────────────────────────────────
const RECS = [
  {
    icon: Target,
    title: 'Yuqori samaradorlik strategiyasi',
    desc: "60-100% to'lov ehtimoli bilan 84 ta qarzdorga SMS eslatmalari yuborish tavsiya etiladi. Kutilayotgan qaytish: 85%",
    bg: '#f0fdf4',
    border: '#bbf7d0',
    iconBg: '#22c55e',
    iconColor: 'white',
  },
  {
    icon: Users2,
    title: 'Operator resurslarini qayta taqsimlash',
    desc: "O'rta xavfli qarzdorlar uchun qo'ng'iroqlar sonini 40% ga oshirish orqali qaytarish foizini 15% ga oshirish mumkin.",
    bg: '#fff7ed',
    border: '#fed7aa',
    iconBg: '#f97316',
    iconColor: 'white',
  },
  {
    icon: AlertTriangle,
    title: "Tezkor ta'sir kerak",
    desc: "Andijon va Farg'ona viloyatlarida yuqori xavfli qarzdorlar soni kritik darajaga yetdi. Qo'shimcha operatorlar ajratish tavsiya etiladi.",
    bg: '#fef2f2',
    border: '#fecaca',
    iconBg: '#ef4444',
    iconColor: 'white',
  },
];

// ── Component ─────────────────────────────────────────────────
export default function AIAnalysis() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t.ai?.title ?? 'AI tahlil va bashorat'}</h1>
        <p className={styles.pageSubtitle}>{t.ai?.subtitle ?? "Sun'iy intellekt asosida qarz qaytarilishi prognozi va tavsiyalar"}</p>
      </div>

      {/* KPI cards */}
      <div className={styles.kpiGrid}>
        {KPI.map(({ icon: Icon, value, label, sub, iconBg, iconColor }) => (
          <div key={label} className={styles.kpiCard}>
            <div className={styles.kpiIcon} style={{ background: iconBg, color: iconColor }}>
              <Icon size={20} />
            </div>
            <div className={styles.kpiValue}>{value}</div>
            <div className={styles.kpiLabel}>{label}</div>
            <div className={styles.kpiSub}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className={styles.chartsRow}>

        {/* Pie chart card */}
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Xavf darajasi taqsimoti</h3>
          <p className={styles.cardSub}>Qarzdorlarning xavf kategoriyalari bo'yicha taqsimlanishi</p>

          <div className={styles.pieWrap}>
            <PieChart slices={RISK_SLICES} />
          </div>

          <div className={styles.pieLegendRow}>
            {RISK_SLICES.map((s) => (
              <span key={s.label} className={styles.legendChip}>
                <span className={styles.legendDot} style={{ background: s.color }} />
                {s.label}
              </span>
            ))}
          </div>

          <div className={styles.riskStats}>
            {RISK_SLICES.map((s) => (
              <div key={s.label} className={styles.riskStatRow}>
                <span className={styles.riskDot} style={{ background: s.color }} />
                <span className={styles.riskStatLabel}>{s.label}</span>
                <span className={styles.riskStatCount}>{s.count} ta</span>
              </div>
            ))}
          </div>
        </div>

        {/* Probability bar chart card */}
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>To'lov ehtimoli taqsimoti</h3>
          <p className={styles.cardSub}>AI tomonidan hisoblangan to'lov qilish ehtimoli</p>

          <ProbBarChart bars={PROB_BARS} />

          <div className={styles.avgSection}>
            <div className={styles.avgLabel}>O'rtacha to'lov ehtimoli</div>
            <div className={styles.avgValue}>49.7%</div>
            <div className={styles.avgTrack}>
              <div className={styles.avgFill} style={{ width: '49.7%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Priority debtors */}
      <div className={styles.priorityCard}>
        <div className={styles.priorityHeader}>
          <AlertTriangle size={18} color="#ef4444" />
          <div>
            <h3 className={styles.cardTitle}>Ustuvor qarzdorlar ro'yxati</h3>
            <p className={styles.cardSub}>Yuqori xavfli va katta qarzga ega bo'lgan fuqarolar — tezkor ta'sir ko'rsatish talab etiladi</p>
          </div>
        </div>
        <div className={styles.priorityList}>
          {PRIORITY.map((p, i) => (
            <div key={p.id} className={styles.priorityRow}>
              <div className={styles.priorityRank}>{i + 1}</div>
              <div className={styles.priorityInfo}>
                <div className={styles.priorityName}>{p.name}</div>
                <div className={styles.priorityMeta}>{p.region} • {p.id}</div>
              </div>
              <div className={styles.priorityRight}>
                <span className={styles.priorityQolgan}>Qolgan qarz</span>
                <CircleProgress pct={p.pct} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI recommendations */}
      <div className={styles.recsCard}>
        <div className={styles.recsHeader}>
          <Brain size={18} color="#475569" />
          <h3 className={styles.cardTitle}>AI tavsiyalari</h3>
        </div>
        <div className={styles.recsList}>
          {RECS.map(({ icon: Icon, title, desc, bg, border, iconBg, iconColor }) => (
            <div key={title} className={styles.recItem} style={{ background: bg, borderColor: border }}>
              <div className={styles.recIcon} style={{ background: iconBg, color: iconColor }}>
                <Icon size={16} />
              </div>
              <div>
                <div className={styles.recTitle}>{title}</div>
                <div className={styles.recDesc}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

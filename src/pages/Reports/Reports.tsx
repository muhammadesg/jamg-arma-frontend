import { useState } from 'react';
import { Download, Calendar, ChevronDown, TrendingUp, TrendingDown, DollarSign, Target, Users as Users2, MapPin, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import { styles } from './Reports.styles';
import { useReportsStats } from '../../features/stats/stats.hooks';

// Formatter for currency (mlrd format)
const formatMoney = (val: number) => {
  if (val >= 1_000_000_000) return (val / 1_000_000_000).toFixed(1) + ' mlrd';
  if (val >= 1_000_000) return (val / 1_000_000).toFixed(1) + ' mln';
  return val.toLocaleString('ru-RU');
};

// ── SVG line chart ────────────────────────────────────────────
function LineChart({ data }: any) {
  const W = 520, H = 200, PL = 40, PB = 36, PT = 16, PR = 16;
  const cW = W - PL - PR;
  const cH = H - PT - PB;
  
  // Find max value for dynamic scaling
  const maxGiven = Math.max(...(data.given || [0]));
  const maxReturned = Math.max(...(data.returned || [0]));
  const absMax = Math.max(maxGiven, maxReturned, 10);
  const maxVal = Math.ceil(absMax / 10) * 10;
  const ticks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];

  const toX = (i: number) => PL + (i / (Math.max(data.labels?.length - 1, 1))) * cW;
  const toY = (v: number) => PT + cH - (v / maxVal) * cH;

  const linePath = (key: 'given' | 'returned') =>
    (data[key] || []).map((d: number, i: number) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d)}`).join(' ');

  if (!data.labels?.length) return <div className="h-48 flex items-center justify-center text-slate-400">Ma'lumot yo'q</div>;

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
      {data.labels.map((l: string, i: number) => (
        <text key={i} x={toX(i)} y={H - 4} fontSize="10" fill="#94a3b8" textAnchor="middle">{l}</text>
      ))}
      {/* Lines */}
      <path d={linePath('given')} fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={linePath('returned')} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Dots */}
      {data.given.map((d: number, i: number) => (
        <g key={i}>
          <circle cx={toX(i)} cy={toY(d)} r="4" fill="#1e293b" />
          <circle cx={toX(i)} cy={toY(data.returned[i])} r="4" fill="#22c55e" />
        </g>
      ))}
    </svg>
  );
}

// ── SVG horizontal bar chart ──────────────────────────────────
function HBarChart({ data }: any) {
  const W = 460, rowH = 28, padL = 100, padR = 40, padT = 10;
  const H = padT + (data?.length || 1) * rowH + 20;
  const maxVal = 100;
  const ticks = [0, 25, 50, 75, 100];
  const cW = W - padL - padR;

  if (!data || data.length === 0) return <div className="h-48 flex items-center justify-center text-slate-400">Ma'lumot yo'q</div>;

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
      {data.map((d: any, i: number) => {
        const y = padT + i * rowH + 4;
        const bW = (d.pct / maxVal) * cW;
        return (
          <g key={d.region}>
            <text x={padL - 8} y={y + 11} fontSize="10.5" fill="#475569" textAnchor="end">{d.region}</text>
            <rect x={padL} y={y} width={Math.max(bW, 0)} height={16} rx="4" fill="#22c55e" opacity="0.85" />
          </g>
        );
      })}
    </svg>
  );
}

const STATUS_META: any = {
  'Yuqori xavf': { cls: 'sHigh', text: 'Yuqori xavf' },
  "O'rta": { cls: 'sMid', text: "O'rta" },
  'Yaxshi': { cls: 'sGood', text: 'Yaxshi' },
};

export default function Reports() {
  const { t } = useLanguage();
  const [period] = useState('Oxirgi oy');
  const { data: reportsResponse, isLoading } = useReportsStats();

  const data = reportsResponse?.data;

  // KPIs
  const KPI = [
    {
      icon: DollarSign,
      label: 'Jami berilgan kredit',
      value: data ? formatMoney(data.total_debt) : '0',
      delta: 'Tizim bo\'yicha',
      up: true,
      iconBg: '#dbeafe',
      iconColor: '#2563eb',
    },
    {
      icon: Target,
      label: 'Qaytarilgan summa',
      value: data ? formatMoney(data.total_paid) : '0',
      delta: 'Jami yopilgan',
      up: true,
      iconBg: '#dcfce7',
      iconColor: '#16a34a',
    },
    {
      icon: TrendingUp,
      label: 'Qaytarish foizi',
      value: data ? `${data.return_percentage}%` : '0%',
      delta: 'Umumiy samaradorlik',
      up: true,
      iconBg: '#22c55e',
      iconColor: 'white',
    },
    {
      icon: Users2,
      label: 'Faol qarzdorlar',
      value: data ? data.active_debtors.toLocaleString('ru-RU') : '0',
      delta: 'Joriy qarzdorlar',
      up: false,
      iconBg: '#fee2e2',
      iconColor: '#ef4444',
    },
  ];

  const statusDist = data?.status_distribution || [];
  const monthlyTrend = data?.monthly_trend || { labels: [], given: [], returned: [] };
  const regionalStats = data?.regional_stats || [];

  // Transform regional stats for the table
  const regionsTable = regionalStats.map((r: any) => {
    let status = 'Yaxshi';
    if (r.pct < 40) status = 'Yuqori xavf';
    else if (r.pct < 65) status = "O'rta";

    return {
      name: r.region,
      debtors: 0, // Backend doesn't return count per region yet, default to 0
      debt: (100 - r.pct).toFixed(1), // Remaining risk 
      rate: r.pct,
      status: status
    };
  });

  const handleExport = (format: string) => {
    if (!data) return;

    if (format === 'PDF formatda') {
      window.print();
      return;
    }

    if (format === "To'liq hisobot") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `toliq_hisobot_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (format === 'CSV formatda' || format === 'Excel formatda') {
      const isExcel = format === 'Excel formatda';
      
      let csv = 'Mintaqa,Xavf ulushi (%),Qaytarish foizi (%),Holat\n';
      
      regionsTable.forEach((r: any) => {
        csv += `${r.name},${r.debt},${r.rate},${r.status}\n`;
      });

      const blobData = isExcel ? '\uFEFF' + csv : csv; // BOM for Excel
      const ext = isExcel ? 'csv' : 'csv'; // Using CSV for both since it opens naturally in Excel
      const blob = new Blob([blobData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mintaqaviy_hisobot_${new Date().toISOString().split('T')[0]}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

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

      {isLoading ? (
        <div className="flex items-center justify-center p-12 text-slate-500">
          Hisobotlar yuklanmoqda...
        </div>
      ) : (
        <>
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
              {statusDist.map((s: any) => (
                <div key={s.label} className={styles.statusItem} style={{ borderColor: `${s.color}40` }}>
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
              <LineChart data={monthlyTrend} />
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
              <p className={styles.cardSub}>Qaytarish foizi bo'yicha hududlar tahlili</p>
              <HBarChart data={regionalStats} />
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
                    <th className={styles.thRight}>Xavf ulushi</th>
                    <th className={styles.thRight}>Qaytarish foizi</th>
                    <th>Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {regionsTable.map((r: any) => {
                    const sm = STATUS_META[r.status] ?? { cls: 'sGood', text: r.status };
                    return (
                      <tr key={r.name} className={styles.row}>
                        <td className={styles.regionName}>{r.name}</td>
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
        </>
      )}

      {/* Export */}
      <div className={styles.exportCard}>
        <div className={styles.exportHeader}>
          <FileText size={17} color="#475569" />
          <h3 className={styles.cardTitle}>Hisobotni eksport qilish</h3>
        </div>
        <div className={styles.exportBtns}>
          {['PDF formatda', 'Excel formatda', 'CSV formatda', "To'liq hisobot"].map((label) => (
            <button 
              key={label} 
              className={styles.exportFormatBtn}
              onClick={() => handleExport(label)}
              disabled={!data}
            >
              <Download size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

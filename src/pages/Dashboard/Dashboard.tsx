import { useState, useEffect } from 'react';
import {
  Target,
  ArrowUpRight, ArrowDownRight, DollarSign,
  Clock, CheckCircle2, PhoneMissed,
  AlertTriangle, BarChart3, Zap,
} from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import { useTodayStats, useAllOperatorsStats, useReportsStats } from '../../features/stats/stats.hooks';
import { useAiRecommendations } from '../../features/ai/ai.hooks';
import { styles } from './Dashboard.styles';
import './Dashboard.css';
import { useAuth } from '../../contexts/useAuth';
import { Spin } from 'antd';





// (Removed static regions and activity arrays)

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
function LineChart({ aiData, actualData, months }) {
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
function BarChart({ regions }) {
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
  const { user } = useAuth();
  const isAdmin = user?.role === 'Administrator';
  const hasReportsPerm = isAdmin || user?.permissions?.includes('Hisobotlar');

  const { data: reportsResponse, isLoading: reportsLoading } = useReportsStats(hasReportsPerm);
  const reportsData = reportsResponse?.data;

  const { data: todayStatsData, isLoading: statsLoading } = useTodayStats();
  const { data: operatorsStatsData } = useAllOperatorsStats(hasReportsPerm);
  const { data: aiRecsData } = useAiRecommendations();
  
  const stats = (isAdmin || hasReportsPerm) ? (todayStatsData?.data || {}) : (operatorsStatsData?.data || {});
  const operators = operatorsStatsData?.data || [];
  const aiRecs = aiRecsData?.data || {};

  // Dynamic regions & activity
  const regions = reportsData?.regional_stats?.slice(0, 8).map((r: any) => ({
    name: r.region,
    debt: 100 - r.pct, // risk portion
    debtors: 0
  })) || [];

  const activity = stats.recent_activity || [];

  // Monthly trend
  const monthlyTrend = reportsData?.monthly_trend || { labels: [], given: [], returned: [] };
  const months = monthlyTrend.labels.length > 0 ? monthlyTrend.labels : ['Yan', 'Fev', 'Mar'];
  const aiData = monthlyTrend.returned.map((v: number) => v * 1.1) || [0, 0, 0]; // Simulating AI prognosis
  const actualData = monthlyTrend.returned || [0, 0, 0];
  
  // Format Goal values
  const currentTotal = reportsData?.total_paid || 0;
  const targetTotal = (reportsData?.total_debt || 400000000) / 12; // Basic mock target: total/12
  const goalPct = targetTotal > 0 ? Math.min(100, Math.round((currentTotal / targetTotal) * 100)) : 0;
  
  const formatCompact = (v: number) => {
    if (v >= 1e9) return (v / 1e9).toFixed(1) + ' mlrd';
    if (v >= 1e6) return (v / 1e6).toFixed(1) + ' mln';
    return v.toLocaleString();
  };
  const kpiCards = [
    {
      label: (isAdmin || hasReportsPerm) ? "Bugungi qo'ng'iroqlar" : "Mening qo'ng'iroqlarim",
      value: stats.total_calls || 0,
      change: '+12.5%',
      up: true,
      icon: PhoneMissed,
      color: 'blue',
      sub: "o'tgan kunga nisbatan",
    },
    {
      label: 'Muvaffaqiyatli',
      value: stats.successful || 0,
      change: '+3.2%',
      up: true,
      icon: CheckCircle2,
      color: 'green',
      sub: "o'tgan kunga nisbatan",
    },
    {
      label: 'Qaytarish foizi',
      value: `${stats.conversion_rate || 0}%`,
      change: '+2.1%',
      up: true,
      icon: Target,
      color: 'teal',
      sub: "o'tgan kunga nisbatan",
    },
    {
      label: 'Muammoli holatlar',
      value: stats.problematic || 0,
      change: '-5.1%',
      up: false,
      icon: AlertTriangle,
      color: 'orange',
      sub: "o'tgan kunga nisbatan",
    },
  ];

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

      {statsLoading ? (
        <div style={{ padding: '80px', textAlign: 'center' }}><Spin size="large" /></div>
      ) : (
        <>
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

          {/* AI Recommendation Alert if any */}
          {aiRecs.best_call_time && (
            <div className={styles.aiAlert}>
              <Zap size={20} color="#f59e0b" />
              <div className={styles.aiAlertContent}>
                <strong>AI tavsiyasi:</strong> {aiRecs.best_call_time.description}
              </div>
            </div>
          )}

          {/* Charts row - Only for users with 'Hisobotlar' permission */}
          {hasReportsPerm && (
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
              <LineChart aiData={aiData} actualData={actualData} months={months} />
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
              <BarChart regions={regions} />
            </div>
            </div>
          )}

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
                <span className={styles.goalPctBadge}>{goalPct}%</span>
              </div>

              <div className={styles.goalNumbers}>
                <span className={styles.goalCurrent}>{formatCompact(currentTotal)}</span>
                <span className={styles.goalSep}>/</span>
                <span className={styles.goalTarget}>{formatCompact(targetTotal)}</span>
              </div>

              <div className={styles.goalTrack}>
                <div className={styles.goalFill} style={{ width: `${goalPct}%` }} />
              </div>
              <div className={styles.goalSubLine}>
                <Zap size={12} style={{ color: '#22c55e' }} />
                <span>Maqsadga yetish uchun {formatCompact(Math.max(0, targetTotal - currentTotal))} qoldi</span>
              </div>

              {/* Only for users with 'Hisobotlar' permission */}
              {hasReportsPerm && (
                <div className={styles.operatorSection}>
                <div className={styles.cardHeaderRow} style={{ marginBottom: 10 }}>
                  <h4 className={styles.cardTitle} style={{ fontSize: 13 }}>Top operatorlar (Bugun)</h4>
                  <BarChart3 size={14} style={{ color: '#94a3b8' }} />
                </div>
                {operators.length > 0 ? operators.slice(0, 3).map((op) => (
                  <div key={op.operator.id} className={styles.opRow}>
                    <div className={styles.opAvatar}>{op.operator.full_name.split(' ').map(n => n[0]).join('')}</div>
                    <div className={styles.opInfo}>
                      <div className={styles.opName}>{op.operator.full_name}</div>
                      <div className={styles.opBar}>
                        <div className={styles.opFill} style={{ width: `${op.conversion_rate}%` }} />
                      </div>
                    </div>
                    <div className={styles.opPct}>{op.conversion_rate}%</div>
                  </div>
                  )) : <div className={styles.empty}>Ma'lumot yo'q</div>}
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
}


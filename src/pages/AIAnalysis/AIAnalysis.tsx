import { useState } from 'react';
import { Brain, Target, TrendingUp, AlertTriangle, Users as Users2, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import { styles } from './AIAnalysis.styles';
import { useAiAnalyze, useAiRecommendations } from '../../features/ai/ai.hooks';

// ── Fallback mock data ──────────────────────────────────────────────────
const FALLBACK_KPI = [
  { icon: Target, value: '0%', label: 'Bashorat aniqligi', sub: "Yuklanmoqda...", iconBg: '#dcfce7', iconColor: '#16a34a' },
  { icon: AlertTriangle, value: '0', label: 'Yuqori xavfli qarzdorlar', sub: "Yuklanmoqda...", iconBg: '#fee2e2', iconColor: '#ef4444' },
  { icon: Brain, value: '0', label: 'Avtomatik tavsiyalar', sub: 'Yuklanmoqda...', iconBg: '#f1f5f9', iconColor: '#475569' },
  { icon: TrendingUp, value: '0%', label: 'Prognoz qilingan qaytish', sub: 'Yuklanmoqda...', iconBg: '#dcfce7', iconColor: '#16a34a' },
];

const FALLBACK_RISK_SLICES = [
  { label: 'Yuqori xavf', pct: 0, color: '#ef4444', count: 0 },
  { label: "O'rta xavf", pct: 0, color: '#f97316', count: 0 },
  { label: 'Past xavf', pct: 0, color: '#22c55e', count: 0 },
];

const FALLBACK_PROB_BARS = [
  { label: '0-30%', value: 0, color: '#ef4444' },
  { label: '30-60%', value: 0, color: '#f97316' },
  { label: '60-100%', value: 0, color: '#22c55e' },
];

// ── Components ─────────────────────────────────────────────────
function PieChart({ slices }: any) {
  const R = 90, CX = 120, CY = 110;
  const validSlices = slices.filter((s: any) => s.pct > 0);

  const paths = validSlices.map((s: any, index: number) => {
    const startAngle = validSlices
      .slice(0, index)
      .reduce((angle: number, slice: any) => angle + (slice.pct / 100) * 360, -90);
    const sweep = (s.pct / 100) * 360;
    const endAngle = startAngle + sweep - 0.5;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = CX + R * Math.cos(toRad(startAngle));
    const y1 = CY + R * Math.sin(toRad(startAngle));
    const x2 = CX + R * Math.cos(toRad(endAngle));
    const y2 = CY + R * Math.sin(toRad(endAngle));
    const large = sweep > 180 ? 1 : 0;
    const midAngle = startAngle + sweep / 2;
    const lx = CX + (R + 28) * Math.cos(toRad(midAngle));
    const ly = CY + (R + 28) * Math.sin(toRad(midAngle));
    return { d: `M${CX},${CY} L${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} Z`, lx, ly, midAngle, ...s };
  });

  return (
    <svg viewBox="0 0 240 220" className={styles.piesvg}>
      {paths.map((p: any) => (
        <path key={p.label} d={p.d} fill={p.color} opacity="0.9" />
      ))}
      {paths.map((p: any) => (
        <text key={p.label + 'l'} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" fontSize="9.5" fontWeight="700" fill={p.color}>
          {p.label.split(' ')[0] + ' ' + p.label.split(' ')[1] + ': ' + p.pct + '%'}
        </text>
      ))}
    </svg>
  );
}

function ProbBarChart({ bars }: any) {
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
      {bars.map((b: any, i: number) => {
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

function CircleProgress({ pct }: any) {
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

// ── Component ─────────────────────────────────────────────────
export default function AIAnalysis() {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const analyzeMutation = useAiAnalyze();
  const { data: recsResponse } = useAiRecommendations();

  const recsData = recsResponse?.data || {};

  // Map real data from backend
  const kpiData = recsData.kpi ? [
    { icon: Target, value: `${recsData.kpi.bashorat_aniqligi}%`, label: 'Bashorat aniqligi', sub: "Tizim ma'lumotlariga asosan", iconBg: '#dcfce7', iconColor: '#16a34a' },
    { icon: AlertTriangle, value: recsData.kpi.yuqori_xavf_count?.toString() || '0', label: 'Yuqori xavfli qarzdorlar', sub: "Tezkor choralar talab etiladi", iconBg: '#fee2e2', iconColor: '#ef4444' },
    { icon: Brain, value: recsData.kpi.avto_tavsiyalar?.toString() || '0', label: 'Avtomatik tavsiyalar', sub: 'Tizimdagi mavjud holatlar', iconBg: '#f1f5f9', iconColor: '#475569' },
    { icon: TrendingUp, value: `${recsData.kpi.prognoz_qaytish}%`, label: 'O\'rtacha to\'lov ehtimoli', sub: 'Hozirgi prognoz qaytish', iconBg: '#dcfce7', iconColor: '#16a34a' },
  ] : FALLBACK_KPI;

  const riskSlices = recsData.risk_distribution || FALLBACK_RISK_SLICES;
  const probBars = recsData.prob_distribution || FALLBACK_PROB_BARS;
  const avgProb = recsData.average_prob !== undefined ? recsData.average_prob : 0;

  const priorityDebtors = recsData.high_probability?.debtors?.map((d: any) => ({
    full_name: d.full_name,
    region: d.region || 'Noma\'lum',
    id: d.pinfl,
    pct: 100 - (d.payment_probability || 0), // Remaining risk/debt percentage
  })) || [];

  const handleAnalyze = () => {
    if (!prompt.trim()) return;
    setOutput('');

    // Gather context data from the page to send to AI
    const contextData = {
      kpiData,
      riskDistribution: riskSlices,
      probabilityDistribution: probBars,
      priorityDebtors,
    };

    analyzeMutation.mutate({ prompt, contextData }, {
      onSuccess: (data: any) => {
        setOutput(data?.result || 'No response from AI');
      },
      onError: (err: any) => {
        setOutput('Error: ' + err.message);
      }
    });
  };

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t.ai?.title ?? 'AI tahlil va bashorat'}</h1>
        <p className={styles.pageSubtitle}>{t.ai?.subtitle ?? "Sun'iy intellekt asosida qarz qaytarilishi prognozi va tizimdagi real ma'lumotlar tahlili"}</p>
      </div>

      {/* KPI cards */}
      <div className={styles.kpiGrid}>
        {kpiData.map(({ icon: Icon, value, label, sub, iconBg, iconColor }) => (
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
          <p className={styles.cardSub}>Qarzdorlarning xavf kategoriyalari bo'yicha real taqsimlanishi</p>

          <div className={styles.pieWrap}>
            {riskSlices.some((s: any) => s.pct > 0) ? (
              <PieChart slices={riskSlices} />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">Ma'lumot yetarli emas</div>
            )}
          </div>

          <div className={styles.pieLegendRow}>
            {riskSlices.map((s: any) => (
              <span key={s.label} className={styles.legendChip}>
                <span className={styles.legendDot} style={{ background: s.color }} />
                {s.label}
              </span>
            ))}
          </div>

          <div className={styles.riskStats}>
            {riskSlices.map((s: any) => (
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

          <ProbBarChart bars={probBars} />

          <div className={styles.avgSection}>
            <div className={styles.avgLabel}>O'rtacha to'lov ehtimoli</div>
            <div className={styles.avgValue}>{avgProb}%</div>
            <div className={styles.avgTrack}>
              <div className={styles.avgFill} style={{ width: `${avgProb}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Priority debtors */}
      {priorityDebtors.length > 0 && (
        <div className={styles.priorityCard}>
          <div className={styles.priorityHeader}>
            <AlertTriangle size={18} color="#ef4444" />
            <div>
              <h3 className={styles.cardTitle}>Ustuvor qarzdorlar ro'yxati (Real ma'lumot)</h3>
              <p className={styles.cardSub}>Yuqori xavfli qarzdorlar — tezkor ta'sir ko'rsatish talab etiladi</p>
            </div>
          </div>
          <div className={styles.priorityList}>
            {priorityDebtors.map((p: any, i: number) => (
              <div key={p.id || i} className={styles.priorityRow}>
                <div className={styles.priorityRank}>{i + 1}</div>
                <div className={styles.priorityInfo}>
                  <div className={styles.priorityName}>{p.full_name}</div>
                  <div className={styles.priorityMeta}>{p.region} • JSHSHIR: {p.id}</div>
                </div>
                <div className={styles.priorityRight}>
                  <span className={styles.priorityQolgan}>Xavf darajasi</span>
                  <CircleProgress pct={p.pct > 100 ? 100 : (p.pct < 0 ? 0 : Math.round(p.pct))} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Chat / Analyze */}
      <div className={styles.aiChatCard}>
        <div className={styles.aiChatTitleRow}>
          <MessageSquare size={18} color="#2563eb" />
          <h3 className={styles.cardTitle}>AI bilan muloqot</h3>
        </div>
        <p className={styles.cardSub}>Qarz boshqaruvi va tahlil bo'yicha sun'iy intellektga maxsus savol bering yoki real ma'lumotlarni tahlil qildiring (Groq API orqali).</p>

        <textarea
          className={styles.aiChatInput}
          placeholder="Masalan: Tizimdagi qaysi hududlarda xavf eng yuqori?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className={styles.aiChatButton}
          onClick={handleAnalyze}
          disabled={analyzeMutation.isPending || !prompt.trim()}
        >
          {analyzeMutation.isPending ? 'Tahlil qilinmoqda...' : 'AI Tahlilni Boshlash'}
        </button>

        {output && (
          <div className={styles.aiChatOutput}>
            {output}
          </div>
        )}
      </div>

    </div>
  );
}

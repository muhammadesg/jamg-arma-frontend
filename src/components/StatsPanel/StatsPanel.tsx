import { CheckCircle, XCircle, PhoneOff, Clock, Zap, AlertTriangle, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import { useAuth } from '../../contexts/useAuth';
import { useOperatorStats } from '../../features/stats/stats.hooks';
import { useAiRecommendations } from '../../features/ai/ai.hooks';
import { styles } from './StatsPanel.styles';
import { Spin } from 'antd';

const CATEGORY_META: any = {
  successful: { icon: CheckCircle, colorClass: styles.numGreen, iconClass: styles.iconGreen },
  problematic: { icon: AlertTriangle, colorClass: styles.numYellow, iconClass: styles.iconYellow }, // Using yellow for generic problems
  no_answer: { icon: PhoneOff, colorClass: styles.numGray, iconClass: styles.iconGray },
  neutral: { icon: HelpCircle, colorClass: styles.numGray, iconClass: styles.iconGray },
};

// Specific mapping for some common result labels if needed
const RESULT_ICONS: any = {
  'Muammoli': XCircle,
};

export default function StatsPanel() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const { data: statsData, isLoading: statsLoading } = useOperatorStats(user?.id);
  const { data: aiData, isLoading: aiLoading } = useAiRecommendations();

  const stats = statsData?.data || {};
  const aiRecs = aiData?.data || {};

  const total = stats.total_calls || 0;
  const conversion = stats.conversion_rate || 0;
  const resultsBreakdown = stats.results_breakdown || [];
  
  // Progress bar based on some target, e.g., 50 calls
  const target = 50;
  const pct = Math.min(100, Math.round((total / target) * 100));

  return (
    <aside className={styles.panel}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t.callcenter?.todayStats ?? 'Bugungi statistika'}</h3>

        {statsLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}><Spin /></div>
        ) : (
          <>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>{t.callcenter?.totalCalls ?? 'Jami qo\'ng\'iroqlar'}</span>
              <span className={styles.totalValue}>{total} / {target}</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>

            <div className={styles.statsList}>
              {resultsBreakdown.length > 0 ? (
                resultsBreakdown.map((item: any, idx: number) => {
                  const meta = CATEGORY_META[item.category] || CATEGORY_META.neutral;
                  const Icon = RESULT_ICONS[item.result] || meta.icon;
                  
                  return (
                    <div key={idx} className={styles.statRow}>
                      <div className={styles.statLeft}>
                        <Icon size={15} className={meta.iconClass} />
                        <span>{item.result}</span>
                      </div>
                      <span className={meta.colorClass}>{item.count}</span>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: '10px 0', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                  Hozircha ma'lumot yo'q
                </div>
              )}
            </div>

            <div className={styles.efficiencyCard}>
              <div className={styles.efficiencyHeader}>
                <Zap size={16} color="white" />
                <span>{t.callcenter?.todayEfficiency ?? 'Bugungi samaradorlik'}</span>
              </div>
              <div className={styles.efficiencyStats}>
                <div className={styles.effStat}>
                  <div className={styles.effValue}>
                    {(() => {
                      const s = Math.max(0, Math.round(stats.avg_duration_seconds || 0));
                      return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
                    })()}
                  </div>
                  <div className={styles.effLabel}>Avg. time</div>
                </div>
                <div className={styles.effStat}>
                  <div className={styles.effValue}>{conversion}%</div>
                  <div className={styles.effLabel}>Conversion</div>
                </div>
                <div className={styles.effStat}>
                  <div className={styles.effValue}>{total}</div>
                  <div className={styles.effLabel}>Total</div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t.callcenter?.aiRecommendations ?? 'AI tavsiyalari'}</h3>

        {aiLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}><Spin /></div>
        ) : (
          <>
            {aiRecs.best_call_time && (
              <div className={styles.aiCard}>
                <div className={styles.aiCardHeader}>
                  <Clock size={15} className={styles.iconGreen} />
                  <span className={styles.aiCardTitle}>{t.callcenter?.bestTime ?? 'Eng yaxshi vaqt'}</span>
                </div>
                <p className={styles.aiCardDesc}>{aiRecs.best_call_time.description}</p>
              </div>
            )}

            {aiRecs.high_probability && (
              <div className={styles.aiCard}>
                <div className={styles.aiCardHeader}>
                  <Zap size={15} className={styles.iconYellow} />
                  <span className={styles.aiCardTitle}>Yuqori konversiya</span>
                </div>
                <p className={styles.aiCardDesc}>{aiRecs.high_probability.description}</p>
              </div>
            )}

            {aiRecs.attention_required && (
              <div className={styles.aiCard}>
                <div className={styles.aiCardHeader}>
                  <CheckCircle size={15} className={styles.iconGreen} />
                  <span className={styles.aiCardTitle}>E'tibor talab</span>
                </div>
                <p className={styles.aiCardDesc}>{aiRecs.attention_required.description}</p>
              </div>
            )}
          </>
        )}
      </section>
    </aside>
  );
}

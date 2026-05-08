import { CheckCircle, XCircle, PhoneOff, Clock, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './StatsPanel.module.scss';

export default function StatsPanel() {
  const { t } = useLanguage();

  const total = 200;
  const done = 156;
  const pct = Math.round((done / total) * 100);

  return (
    <aside className={styles.panel}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t.callcenter.todayStats}</h3>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>{t.callcenter.totalCalls}</span>
          <span className={styles.totalValue}>{done} / {total}</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>

        <div className={styles.statsList}>
          <div className={styles.statRow}>
            <div className={styles.statLeft}>
              <CheckCircle size={15} className={styles.iconGreen} />
              <span>{t.callcenter.successful}</span>
            </div>
            <span className={styles.numGreen}>89</span>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statLeft}>
              <XCircle size={15} className={styles.iconRed} />
              <span>{t.callcenter.problematic}</span>
            </div>
            <span className={styles.numRed}>34</span>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statLeft}>
              <PhoneOff size={15} className={styles.iconGray} />
              <span>{t.callcenter.noAnswer}</span>
            </div>
            <span className={styles.numGray}>33</span>
          </div>
        </div>

        <div className={styles.efficiencyCard}>
          <div className={styles.efficiencyHeader}>
            <Zap size={16} color="white" />
            <span>{t.callcenter.todayEfficiency}</span>
          </div>
          <div className={styles.efficiencyStats}>
            <div className={styles.effStat}>
              <div className={styles.effValue}>4:12</div>
              <div className={styles.effLabel}>Avg. time</div>
            </div>
            <div className={styles.effStat}>
              <div className={styles.effValue}>57%</div>
              <div className={styles.effLabel}>Conversion</div>
            </div>
            <div className={styles.effStat}>
              <div className={styles.effValue}>18/h</div>
              <div className={styles.effLabel}>Hourly</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t.callcenter.aiRecommendations}</h3>

        <div className={styles.aiCard}>
          <div className={styles.aiCardHeader}>
            <Clock size={15} className={styles.iconGreen} />
            <span className={styles.aiCardTitle}>{t.callcenter.bestTime}</span>
          </div>
          <p className={styles.aiCardDesc}>{t.callcenter.bestTimeDesc}</p>
        </div>

        <div className={styles.aiCard}>
          <div className={styles.aiCardHeader}>
            <Zap size={15} className={styles.iconYellow} />
            <span className={styles.aiCardTitle}>Yuqori konversiya</span>
          </div>
          <p className={styles.aiCardDesc}>Toshkent viloyatida to'lov ehtimoli 34% yuqori</p>
        </div>

        <div className={styles.aiCard}>
          <div className={styles.aiCardHeader}>
            <CheckCircle size={15} className={styles.iconGreen} />
            <span className={styles.aiCardTitle}>Samarali skript</span>
          </div>
          <p className={styles.aiCardDesc}>3-chi skript varianti 28% ko'proq natija berdi</p>
        </div>
      </section>
    </aside>
  );
}

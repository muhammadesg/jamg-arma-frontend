import { useState, useEffect } from 'react';
import { Phone, MapPin, DollarSign, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './ActiveCall.module.scss';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export default function ActiveCall({ debtor, onEnd }) {
  const { t } = useLanguage();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResult = (result) => {
    onEnd(result);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Phone size={16} className={styles.phoneIcon} />
          <span className={styles.title}>{t.callcenter.activeCall}</span>
        </div>
        <span className={styles.timer}>
          {t.callcenter.active} — {formatTime(elapsed)}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.debtorRow}>
          <div className={styles.avatar}>{getInitials(debtor.name)}</div>
          <div className={styles.debtorName}>{debtor.name}</div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{debtor.jshshir}</span>
          </div>
          <div className={styles.detailItem}>
            <Phone size={14} color="#64748b" />
            <span>{debtor.phone}</span>
          </div>
          <div className={styles.detailItem}>
            <MapPin size={14} color="#64748b" />
            <span>{debtor.city}</span>
          </div>
          <div className={styles.detailItem}>
            <DollarSign size={14} color="#64748b" />
            <span>{debtor.debtFull || `${debtor.debt.replace('M', '')} 000 000 so'm`}</span>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>{t.callcenter.debtAmount}</div>
            <div className={styles.statValue}>{debtor.debt}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>{t.callcenter.paymentProb}</div>
            <div className={`${styles.statValue} ${styles.green}`}>18%</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>{t.callcenter.riskLevel}</div>
            <div className={`${styles.statValue} ${styles.red}`}>{t.callcenter.highRisk}</div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.resultSection}>
          <span className={styles.resultLabel}>{t.callcenter.callResult}</span>
          <div className={styles.resultBtns}>
            <button
              className={`${styles.resultBtn} ${styles.resultPaid}`}
              onClick={() => handleResult('paid')}
            >
              <CheckCircle size={16} />
              {t.callcenter.paid}
            </button>
            <button
              className={`${styles.resultBtn} ${styles.resultWrong}`}
              onClick={() => handleResult('wrong')}
            >
              <AlertTriangle size={16} />
              {t.callcenter.wrongInfo}
            </button>
            <button
              className={`${styles.resultBtn} ${styles.resultProblem}`}
              onClick={() => handleResult('problem')}
            >
              <XCircle size={16} />
              {t.callcenter.problem}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

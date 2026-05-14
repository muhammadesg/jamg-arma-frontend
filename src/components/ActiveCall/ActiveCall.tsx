import { useState, useEffect } from 'react';
import { Phone, MapPin, DollarSign, AlertTriangle, CheckCircle, XCircle, PhoneOff } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import { useEndCall, useCallResultButtons } from '../../features/calls/calls.hooks';
import { styles } from './ActiveCall.styles';
import { Spin } from 'antd';

const ICON_MAP = {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Phone,
  PhoneOff,
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export default function ActiveCall({ session, onEnd }) {
  const { t } = useLanguage();
  const [elapsed, setElapsed] = useState(0);
  const endCallMutation = useEndCall();
  const { data: buttons, isLoading: buttonsLoading } = useCallResultButtons();

  const debtor = session.debtor;

  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResult = (result, category) => {
    endCallMutation.mutate({
      id: session.id,
      result,
      category,
    }, {
      onSuccess: () => {
        onEnd();
      }
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Phone size={16} className={styles.phoneIcon} />
          <span className={styles.title}>{t.callcenter?.activeCall ?? 'Faol qo\'ng\'iroq'}</span>
        </div>
        <span className={styles.timer}>
          {t.callcenter?.active ?? 'Bajarilmoqda'} — {formatTime(elapsed)}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.debtorRow}>
          <div className={styles.avatar}>{getInitials(debtor.full_name)}</div>
          <div className={styles.debtorName}>{debtor.full_name}</div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{debtor.pinfl}</span>
          </div>
          <div className={styles.detailItem}>
            <Phone size={14} color="#64748b" />
            <span>{debtor.phone}</span>
          </div>
          <div className={styles.detailItem}>
            <MapPin size={14} color="#64748b" />
            <span>{debtor.region}</span>
          </div>
          <div className={styles.detailItem}>
            <DollarSign size={14} color="#64748b" />
            <span>{Number(debtor.debt_amount).toLocaleString('ru-RU')} so'm</span>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>{t.callcenter?.debtAmount ?? 'Qarz summasi'}</div>
            <div className={styles.statValue}>{Number(debtor.debt_amount).toLocaleString('ru-RU')}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>{t.callcenter?.paymentProb ?? 'To\'lov ehtimoli'}</div>
            <div className={`${styles.statValue} ${styles.green}`}>{debtor.payment_probability}%</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>{t.callcenter?.riskLevel ?? 'Xavf darajasi'}</div>
            <div className={`${styles.statValue} ${styles.red}`}>{debtor.risk_level}</div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.resultSection}>
          <span className={styles.resultLabel}>{t.callcenter?.callResult ?? 'Qo\'ng\'iroq natijasi'}</span>
          {endCallMutation.isPending || buttonsLoading ? (
            <div style={{ textAlign: 'center', padding: '10px' }}><Spin /></div>
          ) : (
            <div className={styles.resultBtns}>
              {Array.isArray(buttons) && buttons.map((btn) => {
                const Icon = ICON_MAP[btn.icon] || Phone;
                let colorClass = styles.resultPaid;
                if (btn.color === 'yellow') colorClass = styles.resultWrong;
                if (btn.color === 'red') colorClass = styles.resultProblem;
                if (btn.color === 'gray') colorClass = styles.resultGray; // Assuming this exists or falls back
                
                return (
                  <button
                    key={btn.id}
                    className={`${styles.resultBtn} ${colorClass}`}
                    onClick={() => handleResult(btn.label, btn.category)}
                  >
                    <Icon size={16} />
                    {btn.label}
                  </button>
                );
              })}
              
              {(!buttons || buttons.length === 0) && (
                  <>
                    <button
                        className={`${styles.resultBtn} ${styles.resultPaid}`}
                        onClick={() => handleResult('paid', 'successful')}
                    >
                        <CheckCircle size={16} />
                        {t.callcenter?.paid ?? 'To\'landi'}
                    </button>
                    <button
                        className={`${styles.resultBtn} ${styles.resultWrong}`}
                        onClick={() => handleResult('wrong_info', 'problematic')}
                    >
                        <AlertTriangle size={16} />
                        {t.callcenter?.wrongInfo ?? 'Noto\'g\'ri ma\'lumot'}
                    </button>
                    <button
                        className={`${styles.resultBtn} ${styles.resultProblem}`}
                        onClick={() => handleResult('problem', 'problematic')}
                    >
                        <XCircle size={16} />
                        {t.callcenter?.problem ?? 'Muammo'}
                    </button>
                  </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

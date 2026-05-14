import { Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import { styles } from './CallQueue.styles';

export default function CallQueue({ activeCallId, onCallStart, data = [] }) {
  const { t } = useLanguage();

  const getRiskLabel = (risk) => {
    return risk || t.callcenter.lowRisk;
  };

  return (
    <div className={styles.queue}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Phone size={18} className={styles.headerIcon} />
          <span className={styles.title}>{t.callcenter?.queue ?? 'Navbat'}</span>
        </div>
        <span className={styles.count}>{data.length} {t.callcenter?.debtors ?? 'qarzdor'}</span>
      </div>
      <p className={styles.subtitle}>{t.callcenter?.queueSubtitle ?? 'Bugungi qo\'ng\'iroqlar ro\'yxati'}</p>

      <div className={styles.list}>
        {data.map((debtor, index) => (
          <div key={debtor.id} className={styles.item}>
            <div className={styles.itemNumber}>{index + 1}</div>
            <div className={styles.itemInfo}>
              <div className={styles.itemTop}>
                <span className={styles.itemName}>{debtor.full_name}</span>
                <span className={`${styles.riskTag} ${styles[`risk_${debtor.risk_level === 'Yuqori' ? 'high' : debtor.risk_level === 'O\'rta' ? 'medium' : 'low'}`]}`}>
                  {getRiskLabel(debtor.risk_level)}
                </span>
              </div>
              <div className={styles.itemSub}>
                {debtor.phone} &bull; {debtor.region}
              </div>
            </div>
            <div className={styles.itemRight}>
              <div className={styles.itemDebt}>
                <span className={styles.debtLabel}>{t.callcenter?.debt ?? 'Qarz'}</span>
                <span className={styles.debtValue}>{Number(debtor.debt_amount).toLocaleString('ru-RU')}</span>
              </div>
              <button
                className={styles.callBtn}
                disabled={!!activeCallId}
                onClick={() => onCallStart(debtor)}
              >
                <Phone size={14} />
                {t.callcenter?.callBtn ?? 'Qo\'ng\'iroq'}
              </button>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className={styles.emptyQueue}>Navbat bo'sh</div>
        )}
      </div>
    </div>
  );
}


import { Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './CallQueue.module.scss';

const queueData = [
  { id: 1, name: 'Ahmadjon Madaminov', jshshir: '30000000105', phone: '+998 96 8129289', city: 'Samarqand', debt: '44.2M', risk: 'high' },
  { id: 2, name: 'Ahmadjon Karimov', jshshir: '30000000201', phone: '+998 90 5852851', city: 'Xorazm', debt: '37.5M', risk: 'high' },
  { id: 3, name: 'Ahmadjon Karimov', jshshir: '30000000302', phone: '+998 93 2484437', city: "Farg'ona", debt: '37.2M', risk: 'high' },
  { id: 4, name: 'Eldor Ergashev', jshshir: '30000000403', phone: '+998 93 3143914', city: 'Jizzax', debt: '35.7M', risk: 'high' },
  { id: 5, name: 'Hadicha Yusupov', jshshir: '30000000504', phone: '+998 96 6834464', city: 'Namangan', debt: '32.5M', risk: 'high' },
  { id: 6, name: 'Sardor Toshmatov', jshshir: '30000000605', phone: '+998 91 2345678', city: 'Toshkent', debt: '28.1M', risk: 'medium' },
  { id: 7, name: 'Nilufar Rашидова', jshshir: '30000000706', phone: '+998 94 8765432', city: 'Buxoro', debt: '21.4M', risk: 'medium' },
];

export default function CallQueue({ activeCallId, onCallStart }) {
  const { t } = useLanguage();

  const getRiskLabel = (risk) => {
    if (risk === 'high') return t.callcenter.highRisk;
    if (risk === 'medium') return t.callcenter.mediumRisk;
    return t.callcenter.lowRisk;
  };

  return (
    <div className={styles.queue}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Phone size={18} className={styles.headerIcon} />
          <span className={styles.title}>{t.callcenter.queue}</span>
        </div>
        <span className={styles.count}>{queueData.length} {t.callcenter.debtors}</span>
      </div>
      <p className={styles.subtitle}>{t.callcenter.queueSubtitle}</p>

      <div className={styles.list}>
        {queueData.map((debtor) => (
          <div key={debtor.id} className={styles.item}>
            <div className={styles.itemNumber}>{debtor.id}</div>
            <div className={styles.itemInfo}>
              <div className={styles.itemTop}>
                <span className={styles.itemName}>{debtor.name}</span>
                <span className={`${styles.riskTag} ${styles[`risk_${debtor.risk}`]}`}>
                  {getRiskLabel(debtor.risk)}
                </span>
              </div>
              <div className={styles.itemSub}>
                {debtor.phone} &bull; {debtor.city}
              </div>
            </div>
            <div className={styles.itemRight}>
              <div className={styles.itemDebt}>
                <span className={styles.debtLabel}>{t.callcenter.debt}</span>
                <span className={styles.debtValue}>{debtor.debt}</span>
              </div>
              <button
                className={styles.callBtn}
                disabled={!!activeCallId}
                onClick={() => onCallStart(debtor)}
              >
                <Phone size={14} />
                {t.callcenter.callBtn}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

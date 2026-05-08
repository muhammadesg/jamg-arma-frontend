import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import CallQueue from '../../components/CallQueue/CallQueue';
import ActiveCall from '../../components/ActiveCall/ActiveCall';
import StatsPanel from '../../components/StatsPanel/StatsPanel';
import styles from './CallCenter.module.scss';

export default function CallCenter() {
  const { t } = useLanguage();
  const [activeCall, setActiveCall] = useState(null);

  const handleCallStart = (debtor) => {
    setActiveCall(debtor);
  };

  const handleCallEnd = () => {
    setActiveCall(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t.callcenter.title}</h1>
        <p className={styles.pageSubtitle}>{t.callcenter.subtitle}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          {activeCall && (
            <ActiveCall debtor={activeCall} onEnd={handleCallEnd} />
          )}
          <CallQueue activeCallId={activeCall?.id} onCallStart={handleCallStart} />
        </div>

        <StatsPanel />
      </div>
    </div>
  );
}

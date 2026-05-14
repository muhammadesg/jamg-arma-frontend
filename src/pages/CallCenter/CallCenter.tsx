import { useState } from 'react';
import { useCallQueue, useStartCall } from '../../features/calls/calls.hooks';
import { useLanguage } from '../../contexts/useLanguage';
import CallQueue from '../../components/CallQueue/CallQueue';
import ActiveCall from '../../components/ActiveCall/ActiveCall';
import StatsPanel from '../../components/StatsPanel/StatsPanel';
import { styles } from './CallCenter.styles';
import { Spin } from 'antd';

export default function CallCenter() {
  const { t } = useLanguage();
  const [activeSession, setActiveSession] = useState(null);
  const { data: queueData, isLoading: queueLoading } = useCallQueue();
  const startCallMutation = useStartCall();
  const queueItems = Array.isArray(queueData?.data)
    ? queueData.data
    : Array.isArray(queueData?.data?.data)
      ? queueData.data.data
      : [];
  const debtors = queueItems
    .filter((queueItem) => queueItem.debtor)
    .map((queueItem) => ({ ...queueItem.debtor, queue_entry_id: queueItem.id }));

  const handleCallStart = (debtor) => {
    startCallMutation.mutate(debtor, {
      onSuccess: (response) => {
        // response.data is the session object
        setActiveSession({
          ...response.data,
          debtor, // Attach debtor info for UI
        });
      },
    });
  };

  const handleCallEnd = () => {
    setActiveSession(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t.callcenter?.title ?? 'Qo\'ng\'iroqlar markazi'}</h1>
        <p className={styles.pageSubtitle}>{t.callcenter?.subtitle ?? 'Qarzdorlar bilan ishlash va qo\'ng\'iroqlar navbati'}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          {activeSession && (
            <ActiveCall 
              session={activeSession} 
              onEnd={handleCallEnd} 
            />
          )}
          
          {queueLoading || startCallMutation.isPending ? (
            <div style={{ padding: '40px', textAlign: 'center' }}><Spin size="large" tip={startCallMutation.isPending ? "Qo'ng'iroq boshlanmoqda..." : ""} /></div>
          ) : (
            <CallQueue 
              activeCallId={activeSession?.debtor_id} 
              onCallStart={handleCallStart} 
              data={debtors}
            />
          )}
        </div>

        <StatsPanel />
      </div>
    </div>
  );
}


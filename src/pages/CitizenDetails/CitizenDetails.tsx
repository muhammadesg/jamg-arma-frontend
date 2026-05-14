import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Bot, CalendarDays, CreditCard, DollarSign,
  MapPin, MessageSquare, Phone, UserRound,
} from 'lucide-react';
import { Button, Spin } from 'antd';
import { useDebtor } from '../../features/debtors/debtors.hooks';
import { styles } from './CitizenDetails.styles';

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString('ru-RU')} so'm`;
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(value) {
  if (!value) return '-';
  return String(value).slice(0, 10);
}

function getRiskLabel(risk) {
  if (risk === 'Yuqori') return 'Yuqori xavf';
  if (risk === "O'rta") return "O'rta xavf";
  return 'Past xavf';
}

export default function CitizenDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useDebtor(id);
  const debtor = response?.data;

  const financials = useMemo(() => {
    const debt = Number(debtor?.debt_amount || 0);
    const balance = Number(debtor?.balance || 0);
    const paid = Math.max(debt - balance, 0);
    const progress = debt > 0 ? Math.round((paid / debt) * 1000) / 10 : 0;

    return { debt, balance, paid, progress };
  }, [debtor]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !debtor) {
    return (
      <div className={styles.page}>
        <Button icon={<ArrowLeft size={15} />} onClick={() => navigate('/citizens')}>
          Orqaga
        </Button>
        <div className={styles.empty}>Fuqaro ma'lumotlari topilmadi</div>
      </div>
    );
  }

  const events = [
    {
      icon: Phone,
      title: "Telefon qo'ng'irog'i",
      text: "Qarzdorga qo'ng'iroq qilindi. To'lov bo'yicha kelishuv kutilmoqda.",
      date: formatDate(debtor.last_contact_date),
    },
    {
      icon: MessageSquare,
      title: 'SMS xabar',
      text: 'SMS eslatma yuborildi: qarz muddati yaqinlashmoqda.',
      date: '-',
    },
    {
      icon: Bot,
      title: 'AI Chatbot',
      text: "AI chatbot orqali muloqot. Fuqaro to'lov grafigini so'radi.",
      date: '-',
    },
    {
      icon: CreditCard,
      title: "To'lov",
      text: `${formatMoney(financials.paid)} to'langan summa sifatida qayd etilgan.`,
      date: formatDate(debtor.updated_at),
    },
  ];

  return (
    <div className={styles.page}>
      <Button icon={<ArrowLeft size={15} />} onClick={() => navigate('/citizens')}>
        Orqaga
      </Button>

      <section className={styles.heroCard}>
        <div className={styles.identity}>
          <div className={styles.avatar}>{getInitials(debtor.full_name)}</div>
          <div>
            <h1>{debtor.full_name}</h1>
            <div className={styles.badges}>
              <span className={styles.status}>{debtor.status}</span>
              <span className={styles.category}>{debtor.category || '-'}</span>
            </div>
          </div>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.infoItem}>
            <UserRound size={17} />
            <div>
              <span>JSHSHIR</span>
              <strong>{debtor.pinfl}</strong>
            </div>
          </div>
          <div className={styles.infoItem}>
            <Phone size={17} />
            <div>
              <span>Telefon</span>
              <strong>{debtor.phone}</strong>
            </div>
          </div>
          <div className={styles.infoItem}>
            <MapPin size={17} />
            <div>
              <span>Manzil</span>
              <strong>{debtor.region}</strong>
            </div>
          </div>
          <div className={styles.infoItem}>
            <CalendarDays size={17} />
            <div>
              <span>Oxirgi aloqa</span>
              <strong>{formatDate(debtor.last_contact_date)}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <div className={styles.mainColumn}>
          <section className={styles.card}>
            <div className={styles.cardTitle}>
              <DollarSign size={17} />
              Moliyaviy ma'lumotlar
            </div>

            <div className={styles.financeGrid}>
              <div>
                <span>Kredit summasi</span>
                <strong>{formatMoney(financials.debt)}</strong>
              </div>
              <div>
                <span>Qolgan qarz</span>
                <strong className={styles.red}>{formatMoney(financials.balance)}</strong>
              </div>
            </div>

            <div className={styles.progressHeader}>
              <span>To'lov jarayoni</span>
              <strong>{financials.progress}%</strong>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${Math.min(financials.progress, 100)}%` }} />
            </div>

            <div className={styles.moneyRows}>
              <div>
                <span>To'langan summa</span>
                <strong className={styles.green}>{formatMoney(financials.paid)}</strong>
              </div>
              <div>
                <span>Oxirgi to'lov sanasi</span>
                <strong>{formatDate(debtor.updated_at)}</strong>
              </div>
              <div>
                <span>Muddati tugash sanasi</span>
                <strong>{formatDate(debtor.created_at)}</strong>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardTitle}>O'zaro munosabatlar tarixi</div>
            <div className={styles.timeline}>
              {events.map(({ icon: Icon, title, text, date }) => (
                <div key={title} className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                  <time>{date}</time>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.sideColumn}>
          <section className={styles.card}>
            <div className={styles.cardTitle}>AI tahlil</div>
            <span className={styles.muted}>To'lov ehtimoli</span>
            <div className={styles.donutWrap}>
              <div
                className={styles.donut}
                style={{ background: `conic-gradient(#ef4444 ${Number(debtor.payment_probability || 0)}%, #edf0f4 0)` }}
              >
                <div>{Number(debtor.payment_probability || 0)}%</div>
              </div>
            </div>
            <div className={styles.sideDivider} />
            <div className={styles.riskRow}>
              <span>Xavf darajasi</span>
              <strong>{getRiskLabel(debtor.risk_level)}</strong>
            </div>
            <div className={styles.sideDivider} />
            <button className={styles.callButton}>
              <Phone size={15} />
              Qo'ng'iroq qilish
            </button>
            <button className={styles.smsButton}>
              <MessageSquare size={15} />
              SMS yuborish
            </button>
          </section>

          <section className={styles.card}>
            <div className={styles.cardTitle}>Tezkor statistika</div>
            <div className={styles.statRows}>
              <div>
                <span>Jami murojaat</span>
                <strong>{Number(debtor.failed_attempts || 0) + 1}</strong>
              </div>
              <div>
                <span>To'lov foizi</span>
                <strong>{financials.progress}%</strong>
              </div>
              <div>
                <span>Hudud</span>
                <strong>{debtor.region}</strong>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

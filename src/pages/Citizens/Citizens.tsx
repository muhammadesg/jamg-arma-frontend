import { useState } from 'react';
import {
  Search, SlidersHorizontal,
  Eye, ChevronLeft, ChevronRight, Users,
  AlertTriangle, CheckCircle2, Clock3,
  UserPlus, Edit, PhoneForwarded
} from 'lucide-react';
import { Select, Spin, Modal, Form, Input, InputNumber, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/useLanguage';
import { useDebtors, useCreateDebtor, useUpdateDebtor } from '../../features/debtors/debtors.hooks';
import { useAddToQueue } from '../../features/calls/calls.hooks';
import { styles } from './Citizens.styles';

const STATUS_META = {
  Muammoli: { cls: 'statusProblem', icon: AlertTriangle },
  Faol: { cls: 'statusActive', icon: CheckCircle2 },
  "To'langan": { cls: 'statusPaid', icon: CheckCircle2 },
  "Muddati o'tgan": { cls: 'statusOverdue', icon: Clock3 },
};

const RISK_META = {
  Yuqori: { cls: 'riskHigh', label: 'Yuqori' },
  "O'rta": { cls: 'riskMedium', label: "O'rta" },
  Past: { cls: 'riskLow', label: 'Past' },
};

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString('ru-RU')} so'm`;
}

export default function Citizens() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCitizen, setEditingCitizen] = useState(null);
  const [form] = Form.useForm();

  const createCitizen = useCreateDebtor();
  const updateCitizen = useUpdateDebtor();
  const addToQueue = useAddToQueue();

  const { data: response, isLoading } = useDebtors({
    search,
    status: statusFilter === 'all' ? undefined : statusFilter,
    page,
  });

  const debtors = response?.data || [];
  const total = response?.total || 0;
  const lastPage = response?.last_page || 1;
  const perPage = response?.per_page || 20;

  const statusOptions = [
    { value: 'all', label: 'Barcha holatlar' },
    { value: 'Faol', label: 'Faol' },
    { value: 'Muammoli', label: 'Muammoli' },
    { value: "Muddati o'tgan", label: "Muddati o'tgan" },
    { value: "To'langan", label: "To'langan" },
  ];

  const openCreateModal = () => {
    setEditingCitizen(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (citizen) => {
    setEditingCitizen(citizen);
    form.setFieldsValue({
      ...citizen,
      debt_amount: Number(citizen.debt_amount),
      balance: Number(citizen.balance),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCitizen(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingCitizen) {
        updateCitizen.mutate(
          { id: editingCitizen.id, data: values },
          { onSuccess: closeModal }
        );
      } else {
        createCitizen.mutate(values, { onSuccess: closeModal });
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{t.citizens?.title ?? 'Fuqarolar bazasi'}</h1>
          <p className={styles.pageSubtitle}>{t.citizens?.subtitle ?? "Barcha qarzdorlar va ularning moliyaviy ma'lumotlari"}</p>
        </div>
        <div className={styles.headerKpi}>
          <button className={styles.addBtn} onClick={openCreateModal}>
            <UserPlus size={16} />
            {t.citizens?.addBtn ?? 'Yangi fuqaro'}
          </button>
          <div className={styles.kpiPill}>
            <Users size={14} />
            <span>Jami: <strong>{total.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      <div className={styles.filterPanel}>
        <div className={styles.filterTitle}>
          <SlidersHorizontal size={16} />
          Filtrlar va qidiruv
        </div>
        <div className={styles.filterRow}>
          <div className={styles.searchBox}>
            <Search size={15} color="#94a3b8" />
            <input
              type="text"
              placeholder="JSHSHIR, ism yoki telefon raqami..."
              value={search}
              onChange={(event) => { setSearch(event.target.value); setPage(1); }}
              className={styles.searchInput}
            />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch('')}>x</button>
            )}
          </div>
          <Select
            value={statusFilter}
            onChange={(value) => { setStatus(value); setPage(1); }}
            options={statusOptions}
            className={styles.filterSelect}
            popupMatchSelectWidth={false}
          />
        </div>
        <div className={styles.filterMeta}>
          <span>
            Jami <strong>{total}</strong> ta natija topildi
          </span>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}><Spin size="large" /></div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thJshshir}>JSHSHIR</th>
                <th>F.I.O.</th>
                <th>Hudud</th>
                <th>Telefon</th>
                <th className={styles.thRight}>Qarz summasi</th>
                <th className={styles.thRight}>Qoldiq</th>
                <th>Holat</th>
                <th>Xavf</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {debtors.map((citizen) => {
                const risk = RISK_META[citizen.risk_level] || RISK_META.Past;
                const status = STATUS_META[citizen.status] ?? { cls: 'statusActive', icon: CheckCircle2 };
                return (
                  <tr key={citizen.id} className={styles.row}>
                    <td className={styles.jshshir}>{citizen.pinfl}</td>
                    <td>
                      <div className={styles.nameCell}>
                        <div className={styles.fullName}>{citizen.full_name}</div>
                        <span className={styles.categoryTag}>{citizen.category}</span>
                      </div>
                    </td>
                    <td className={styles.regionCell}>{citizen.region}</td>
                    <td className={styles.phoneCell}>{citizen.phone}</td>
                    <td className={styles.debtCell}>{formatMoney(citizen.debt_amount)}</td>
                    <td className={styles.balanceCell}>
                      {Number(citizen.balance) === 0
                        ? <span className={styles.zeroBal}>0 so'm</span>
                        : <span className={styles.redBal}>{formatMoney(citizen.balance)}</span>
                      }
                    </td>
                    <td>
                      <span className={`${styles.statusTag} ${styles[status.cls]}`}>
                        {citizen.status}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.riskTag} ${styles[risk.cls]}`}>
                        {risk.label}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button
                          className={styles.queueBtn}
                          onClick={() => addToQueue.mutate(citizen.id)}
                          disabled={addToQueue.isPending}
                          title="Navbatga qo'shish"
                        >
                          <PhoneForwarded size={14} />
                        </button>
                        <button className={styles.editBtn} onClick={() => openEditModal(citizen)}>
                          <Edit size={14} />
                          {t.citizens?.editBtn ?? 'Tahrirlash'}
                        </button>
                        <button className={styles.viewBtn} onClick={() => navigate(`/citizens/${citizen.id}`)}>
                          <Eye size={14} />
                          Ko'rish
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {!isLoading && debtors.length === 0 && (
          <div className={styles.empty}>
            <Search size={32} color="#cbd5e1" />
            <p>Natija topilmadi</p>
          </div>
        )}
      </div>

      {!isLoading && lastPage > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            {(page - 1) * perPage + 1}-{Math.min(page * perPage, total)} / {total}
          </span>
          <div className={styles.pageButtons}>
            <button
              className={styles.pageBtn}
              disabled={page === 1}
              onClick={() => setPage((currentPage) => currentPage - 1)}
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: Math.min(lastPage, 7) }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`${styles.pageBtn} ${pageNumber === page ? styles.pageBtnActive : ''}`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              disabled={page === lastPage}
              onClick={() => setPage((currentPage) => currentPage + 1)}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      <Modal
        title={editingCitizen ? t.citizens?.editTitle : t.citizens?.addTitle}
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            {t.citizens?.form?.cancel ?? 'Bekor qilish'}
          </Button>,
          <Button
            key="save"
            type="primary"
            loading={createCitizen.isPending || updateCitizen.isPending}
            onClick={handleSubmit}
            style={{ background: '#0f172a', borderColor: '#0f172a' }}
          >
            {t.citizens?.form?.save ?? 'Saqlash'}
          </Button>,
        ]}
        width={700}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'Faol', payment_probability: 50 }}
          style={{ marginTop: 20 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <Form.Item
              name="full_name"
              label={t.citizens?.form?.fullName}
              rules={[{ required: true, message: t.citizens?.form?.required }]}
            >
              <Input placeholder="Ali Valiyev" />
            </Form.Item>
            <Form.Item
              name="pinfl"
              label={t.citizens?.form?.pinfl}
              rules={[
                { required: true, message: t.citizens?.form?.required },
                { len: 14, message: t.citizens?.form?.pinflSize }
              ]}
            >
              <Input placeholder="30101901234567" maxLength={14} />
            </Form.Item>
            <Form.Item
              name="phone"
              label={t.citizens?.form?.phone}
              rules={[{ required: true, message: t.citizens?.form?.required }]}
            >
              <Input placeholder="+998 90 123 45 67" />
            </Form.Item>
            <Form.Item
              name="region"
              label={t.citizens?.form?.region}
              rules={[{ required: true, message: t.citizens?.form?.required }]}
            >
              <Input placeholder="Toshkent sh." />
            </Form.Item>
            <Form.Item name="category" label={t.citizens?.form?.category}>
              <Select
                options={[
                  { value: 'Ayollar daftari', label: 'Ayollar daftari' },
                  { value: 'Yoshlar daftari', label: 'Yoshlar daftari' },
                  { value: 'Keksa fuqarolar', label: 'Keksa fuqarolar' },
                  { value: 'Boshqa', label: 'Boshqa' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="status"
              label={t.citizens?.form?.status}
              rules={[{ required: true, message: t.citizens?.form?.required }]}
            >
              <Select options={statusOptions.filter(o => o.value !== 'all')} />
            </Form.Item>
            <Form.Item
              name="debt_amount"
              label={t.citizens?.form?.debtAmount}
              rules={[{ required: true, message: t.citizens?.form?.required }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                parser={value => value?.replace(/\s?|so'm/g, '')}
              />
            </Form.Item>
            <Form.Item
              name="balance"
              label={t.citizens?.form?.balance}
              rules={[{ required: true, message: t.citizens?.form?.required }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                parser={value => value?.replace(/\s?|so'm/g, '')}
              />
            </Form.Item>
            <Form.Item
              name="payment_probability"
              label={t.citizens?.form?.paymentProb}
              rules={[{ required: true, message: t.citizens?.form?.required }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <Form.Item name="notes" label={t.citizens?.form?.notes}>
            <Input.TextArea rows={3} placeholder="Qo'shimcha ma'lumotlar..." />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
}


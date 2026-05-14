import { useEffect, useMemo, useState } from 'react';
import { UserPlus, Users as UsersIcon, Phone, Settings, Eye, File as FileEdit, PhoneCall, ShieldCheck, List, MousePointer2 } from 'lucide-react';
import { Button, Checkbox, Form, Input, Modal, Select, Spin, Switch, Tabs } from 'antd';
import { useLanguage } from '../../contexts/useLanguage';
import { useCreateUser, useUpdateUser, useUsers } from '../../features/users/users.hooks';
import { useAuth } from '../../contexts/useAuth';
import CallResultButtonsSettings from './CallResultButtonsSettings';
import { styles } from './Users.styles';

const ALL_PERMS = [
  { key: 'reports', label: 'Hisobotlar', icon: Eye },
  { key: 'edit', label: 'Tahrirlash', icon: FileEdit },
  { key: 'call', label: "Qo'ng'iroq", icon: PhoneCall },
  { key: 'admin', label: 'Admin', icon: ShieldCheck },
];

const ROLE_OPTIONS = [
  'Administrator',
  'Mintaqaviy menejer',
  'Operator',
  'Tahlilchi',
];

const ROLE_META = {
  Administrator: { cls: 'roleAdmin', color: '#7c3aed' },
  'Mintaqaviy menejer': { cls: 'roleManager', color: '#2563eb' },
  Operator: { cls: 'roleOperator', color: '#16a34a' },
  Tahlilchi: { cls: 'roleAnalyst', color: '#d97706' },
};

function Toggle({ on }) {
  return (
    <div className={`${styles.toggle} ${on ? styles.toggleOn : styles.toggleOff}`}>
      <div className={styles.toggleThumb} />
    </div>
  );
}

function getUsersFromResponse(response) {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response)) return response;
  return [];
}

function getInitials(user) {
  return (user.full_name || user.name || '')
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2);
}

export default function Users() {
  const { t } = useLanguage();
  const { user: currentUser } = useAuth();
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: usersData, isLoading } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const users = getUsersFromResponse(usersData);
  const isSaving = createUser.isPending || updateUser.isPending;
  
  const isAdmin = currentUser?.role === 'Administrator';

  const permissionOptions = useMemo(
    () => ALL_PERMS.map((permission) => ({ label: permission.label, value: permission.label })),
    [],
  );

  const openCreateModal = () => {
    if (!isAdmin) return;
    setEditingUser(null);
    form.resetFields();
    form.setFieldsValue({
      role: 'Operator',
      is_active: true,
      permissions: ['Qo\'ng\'iroq'],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    if (!isAdmin) return;
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      region: user.region,
      is_active: Boolean(user.is_active),
      permissions: Array.isArray(user.permissions) ? user.permissions : [],
      password: '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const payload = {
      ...values,
      region: values.region || null,
      permissions: values.permissions || [],
    };

    if (!payload.password) {
      delete payload.password;
    }

    if (!payload.name && payload.email) {
      payload.name = payload.email.split('@')[0];
    }

    if (editingUser) {
      updateUser.mutate(
        { id: editingUser.id, data: payload },
        { onSuccess: closeModal },
      );
      return;
    }

    createUser.mutate(payload, { onSuccess: closeModal });
  };

  const toggleActive = (user) => {
    if (!isAdmin) return;
    updateUser.mutate({
      id: user.id,
      data: { is_active: !user.is_active },
    });
  };

  const kpi = [
    { label: 'Jami foydalanuvchilar', value: users.length, icon: UsersIcon, iconBg: '#1e293b', iconColor: 'white' },
    { label: 'Faol foydalanuvchilar', value: users.filter((user) => user.is_active).length, icon: UsersIcon, iconBg: '#22c55e', iconColor: 'white' },
    { label: 'Operatorlar', value: users.filter((user) => user.role === 'Operator').length, icon: Phone, iconBg: '#dcfce7', iconColor: '#16a34a' },
    { label: 'Menejerlar', value: users.filter((user) => user.role === 'Mintaqaviy menejer').length, icon: Settings, iconBg: '#dbeafe', iconColor: '#2563eb' },
  ];

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
    }
  }, [form, isModalOpen]);

  const UsersList = () => (
    <>
      <div className={styles.kpiGrid}>
        {kpi.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className={styles.kpiCard}>
            <div className={styles.kpiLeft}>
              <div className={styles.kpiLabel}>{label}</div>
              <div className={styles.kpiValue}>{value}</div>
            </div>
            <div className={styles.kpiIcon} style={{ background: iconBg, color: iconColor }}>
              <Icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>Barcha foydalanuvchilar</h3>
          {isAdmin && (
            <button className={styles.addBtn} onClick={openCreateModal}>
              <UserPlus size={15} />
              Yangi foydalanuvchi
            </button>
          )}
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Foydalanuvchi</th>
                <th>Rol</th>
                <th>Mintaqa</th>
                <th>Holat</th>
                <th>Ruxsatlar</th>
                {isAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const role = ROLE_META[user.role] ?? { cls: 'roleOperator', color: '#16a34a' };
                return (
                  <tr key={user.id} className={styles.row}>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}>{getInitials(user)}</div>
                        <div>
                          <div className={styles.userName}>{user.full_name || user.name}</div>
                          <div className={styles.userEmail}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.roleBadge} ${styles[role.cls]}`}>{user.role}</span>
                    </td>
                    <td className={styles.regionCell}>{user.region ?? '-'}</td>
                    <td>
                      <button
                        className={styles.statusToggleBtn}
                        title="Holatni o'zgartirish"
                        onClick={() => toggleActive(user)}
                        disabled={updateUser.isPending || !isAdmin}
                      >
                        <Toggle on={user.is_active} />
                        <span className={user.is_active ? styles.activeLabel : styles.inactiveLabel}>
                          {user.is_active ? 'Faol' : 'Nofaol'}
                        </span>
                      </button>
                    </td>
                    <td>
                      <div className={styles.permsRow}>
                        {(user.permissions || []).map((permissionLabel) => {
                          const permission = ALL_PERMS.find((item) => item.label === permissionLabel);
                          if (!permission) return <span key={permissionLabel} className={styles.permChip}>{permissionLabel}</span>;
                          const PIcon = permission.icon;
                          return (
                            <span key={permissionLabel} className={styles.permChip}>
                              <PIcon size={11} />
                              {permission.label}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    {isAdmin && (
                      <td>
                        <button className={styles.editBtn} onClick={() => openEditModal(user)}>
                          Tahrirlash
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const items = [
    {
      key: '1',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <List size={16} />
          Foydalanuvchilar
        </span>
      ),
      children: <UsersList />,
    },
    {
      key: '2',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MousePointer2 size={16} />
          Tugmalar sozlamalari
        </span>
      ),
      children: <CallResultButtonsSettings />,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{t.users?.title ?? 'Foydalanuvchilar boshqaruvi'}</h1>
          <p className={styles.pageSubtitle}>{t.users?.subtitle ?? 'Rolga asoslangan kirish nazorati (RBAC) tizimi'}</p>
        </div>
      </div>

      {isLoading ? (
        <div style={{ padding: '80px', textAlign: 'center' }}><Spin size="large" /></div>
      ) : (
        <Tabs 
          defaultActiveKey="1" 
          items={isAdmin ? items : [items[0]]} 
          className="custom-tabs"
        />
      )}

      <Modal
        title={editingUser ? 'Foydalanuvchini tahrirlash' : 'Yangi foydalanuvchi'}
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>Bekor qilish</Button>,
          <Button key="save" type="primary" loading={isSaving} onClick={handleSubmit}>
            Saqlash
          </Button>,
        ]}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="full_name"
            label="F.I.O."
            rules={[{ required: true, message: 'F.I.O. kiriting' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Login"
            rules={[{ required: true, message: 'Login kiriting' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email kiriting' },
              { type: 'email', message: "Email noto'g'ri" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={editingUser ? 'Yangi parol' : 'Parol'}
            rules={editingUser ? [] : [{ required: true, message: 'Parol kiriting' }, { min: 8, message: 'Kamida 8 belgi' }]}
          >
            <Input.Password placeholder={editingUser ? "O'zgartirmaslik uchun bo'sh qoldiring" : undefined} />
          </Form.Item>
          <Form.Item name="role" label="Rol" rules={[{ required: true, message: 'Rol tanlang' }]}>
            <Select options={ROLE_OPTIONS.map((role) => ({ label: role, value: role }))} />
          </Form.Item>
          <Form.Item name="region" label="Mintaqa">
            <Input allowClear />
          </Form.Item>
          <Form.Item name="permissions" label="Ruxsatlar">
            <Checkbox.Group options={permissionOptions} />
          </Form.Item>
          <Form.Item name="is_active" label="Holat" valuePropName="checked">
            <Switch checkedChildren="Faol" unCheckedChildren="Nofaol" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

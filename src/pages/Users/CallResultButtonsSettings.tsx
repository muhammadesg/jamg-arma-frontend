import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button, Form, Input, Modal, Select, Table, Tag, Space, Switch, InputNumber } from 'antd';
import { useCallResultButtons, useCreateCallResultButton, useUpdateCallResultButton, useDeleteCallResultButton } from '../../features/calls/calls.hooks';

const COLOR_OPTIONS = [
  { label: 'Yashil (Muvaffaqiyat)', value: 'green' },
  { label: 'Sariq (Ogohlantirish)', value: 'yellow' },
  { label: 'Qizil (Xavf/Muammo)', value: 'red' },
  { label: 'Ko\'k (Ma\'lumot)', value: 'blue' },
  { label: 'Kulrang (Nofaol/Boshqa)', value: 'gray' },
];

const ICON_OPTIONS = [
  { label: 'CheckCircle', value: 'CheckCircle' },
  { label: 'AlertTriangle', value: 'AlertTriangle' },
  { label: 'XCircle', value: 'XCircle' },
  { label: 'Phone', value: 'Phone' },
  { label: 'PhoneOff', value: 'PhoneOff' },
];

const CATEGORY_OPTIONS = [
  { label: 'Muvaffaqiyatli (Successful)', value: 'successful' },
  { label: 'Muammoli (Problematic)', value: 'problematic' },
  { label: 'Javob bermadi (No Answer)', value: 'no_answer' },
  { label: 'Neytral (Neutral)', value: 'neutral' },
];

export default function CallResultButtonsSettings() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingButton, setEditingButton] = useState<any>(null);

  const { data: buttons, isLoading } = useCallResultButtons();
  const createMutation = useCreateCallResultButton();
  const updateMutation = useUpdateCallResultButton();
  const deleteMutation = useDeleteCallResultButton();

  const openCreateModal = () => {
    setEditingButton(null);
    form.resetFields();
    form.setFieldsValue({ order: (buttons?.length || 0) + 1, is_active: true, category: 'neutral' });
    setIsModalOpen(true);
  };

  const openEditModal = (button: any) => {
    setEditingButton(button);
    form.setFieldsValue(button);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Haqiqatdan ham o\'chirmoqchimisiz?',
      content: 'Bu amalni qaytarib bo\'lmaydi.',
      onOk: () => deleteMutation.mutate(id),
    });
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editingButton) {
      updateMutation.mutate({ id: editingButton.id, data: values }, { onSuccess: () => setIsModalOpen(false) });
    } else {
      createMutation.mutate(values, { onSuccess: () => setIsModalOpen(false) });
    }
  };

  const columns = [
    {
      title: 'Tartib',
      dataIndex: 'order',
      key: 'order',
      width: 80,
    },
    {
      title: 'Yorliq (Label)',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Rang',
      dataIndex: 'color',
      key: 'color',
      render: (color: string) => {
        const colors: any = { green: 'success', yellow: 'warning', red: 'error', blue: 'processing', gray: 'default' };
        return <Tag color={colors[color] || 'default'}>{color}</Tag>;
      },
    },
    {
      title: 'Kategoriya',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const colors: any = { successful: 'green', problematic: 'orange', no_answer: 'blue', neutral: 'default' };
        return <Tag color={colors[category] || 'default'}>{category}</Tag>;
      },
    },
    {
      title: 'Ikonka',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: 'Holat',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (active: boolean) => (
        <Tag color={active ? 'green' : 'red'}>{active ? 'Faol' : 'Nofaol'}</Tag>
      ),
    },
    {
      title: 'Amallar',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<Edit2 size={14} />} onClick={() => openEditModal(record)} />
          <Button danger icon={<Trash2 size={14} />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Qo'ng'iroq natijasi tugmalari</h3>
        <Button type="primary" icon={<Plus size={14} />} onClick={openCreateModal}>
          Yangi tugma
        </Button>
      </div>

      <Table
        dataSource={buttons}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={false}
      />

      <Modal
        title={editingButton ? 'Tugmani tahrirlash' : 'Yangi tugma'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="label" label="Tugma matni" rules={[{ required: true }]}>
            <Input placeholder="Masalan: To'landi" />
          </Form.Item>
          <Form.Item name="category" label="Kategoriya (Statistika uchun)" rules={[{ required: true }]}>
            <Select options={CATEGORY_OPTIONS} />
          </Form.Item>
          <Form.Item name="color" label="Rang" rules={[{ required: true }]}>
            <Select options={COLOR_OPTIONS} />
          </Form.Item>
          <Form.Item name="icon" label="Ikonka">
            <Select options={ICON_OPTIONS} />
          </Form.Item>
          <Form.Item name="order" label="Tartib raqami" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="is_active" label="Holat" valuePropName="checked">
            <Switch checkedChildren="Faol" unCheckedChildren="Nofaol" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

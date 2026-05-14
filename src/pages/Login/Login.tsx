import { Form, Input, Button, Card } from 'antd';
import { FileText, Lock, Mail } from 'lucide-react';
import { useLogin } from '../../features/auth/auth.hooks';
import { styles } from './Login.styles';

export default function Login() {
  const [form] = Form.useForm();
  const { mutate: login, isPending } = useLogin();

  const onFinish = (values) => {
    login({ email: values.email, password: values.password });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <FileText size={24} color="#22c55e" />
          </div>
          <div>
            <div className={styles.brandName}>Qarz Boshqaruvi</div>
            <div className={styles.brandSub}>CRM tizimi</div>
          </div>
        </div>

        <Card className={styles.card} bordered={false}>
          <h1 className={styles.title}>Tizimga kirish</h1>
          <p className={styles.subtitle}>Davom etish uchun ma'lumotlaringizni kiriting</p>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className={styles.form}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email kiritish majburiy' },
                { type: 'email', message: "To'g'ri email kiriting" },
              ]}
            >
              <Input
                prefix={<Mail size={15} color="#94a3b8" />}
                placeholder="admin@example.com"
                size="large"
                className={styles.input}
                disabled={isPending}
              />
            </Form.Item>

            <Form.Item
              label="Parol"
              name="password"
              rules={[{ required: true, message: 'Parol kiritish majburiy' }]}
            >
              <Input.Password
                prefix={<Lock size={15} color="#94a3b8" />}
                placeholder="••••••••"
                size="large"
                className={styles.input}
                disabled={isPending}
              />
            </Form.Item>

            <Form.Item className={styles.submitItem}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isPending}
                className={styles.submitBtn}
              >
                {isPending ? 'Kirish...' : 'Kirish'}
              </Button>
            </Form.Item>
          </Form>

          <p className={styles.hint}>
            Demo: <strong>admin@example.com</strong> / <strong>admin123</strong>
          </p>
        </Card>

        <p className={styles.footer}>© 2026 O'zbekiston Respublikasi</p>
      </div>
    </div>
  );
}

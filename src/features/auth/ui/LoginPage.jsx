import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Typography, Alert, Flex } from 'antd';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (values) => {
    setLoading(true);
    setError(null);
    
    // Mock API call - Replace with real API
    setTimeout(() => {
      if (values.username === 'admin' && values.password === '123456') {
        alert('Đăng nhập thành công!');
      } else {
        setError('Sai tên đăng nhập hoặc mật khẩu');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: '100vh',
        background: '#f0f2f5',
        padding: '24px',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Flex vertical gap={24} align="center">
          <Flex justify="center" align="center" gap={4} style={{
            flexDirection: 'column'
          }} >
            <Title level={3}>Đăng nhập</Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
                Hệ thống quản lý
            </Text>
          </Flex>
          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              style={{ width: '100%' }}
            />
          )}

          <Form
            onFinish={handleSubmit}
            style={{ width: '100%' }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Vui lòng nhập tên đăng nhập' },
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Tên đăng nhập" 
                size="large" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu' },
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Mật khẩu" 
                size="large" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                loading={loading}
              >
                Đăng nhập 
              </Button>
            </Form.Item>
          </Form>

          <Text type="secondary">
            Quên mật khẩu? <a href="/forgot-password">Khôi phục</a>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default LoginPage;
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography, Alert, Flex, notification } from "antd";
import { APP_NAME } from "@/constants/mainConstants";
import { useAppDispatch } from "@/app/hooks";
import { loginAction } from "../authApi";

const { Title, Text } = Typography;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const res = await dispatch(loginAction(values));
      if (res.payload) {
        const name = res.payload?.user?.name || res.payload?.user?.email || "Bạn";
        const { access_token, refresh_token } = res.payload;
        notification.success({
          message: "Đăng nhập thành công",
          description: "Chào mừng bạn trở lại, " + name
        });
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        window.location.href = "/";
      } else {
        // raise an error if the login fails
        loading = false;
      }
    } catch (err) {
      setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
      notification.error({
        message: "Đăng nhập không thành công",
        description: "Vui lòng kiểm tra lại thông tin đăng nhập."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        padding: "24px"
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <Flex vertical gap={24} align="center">
          <Flex
            justify="center"
            align="center"
            gap={4}
            style={{
              flexDirection: "column"
            }}
          >
            <Title level={3}>Đăng nhập</Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              {APP_NAME} - Hệ thống quản lý
            </Text>
          </Flex>
          {error && <Alert message={error} type="error" showIcon style={{ width: "100%" }} />}

          <Form onFinish={handleSubmit} style={{ width: "100%" }}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập" },
                { type: "email", message: "Tên đăng nhập không hợp lệ" }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email đăng nhập" size="large" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={loading}>
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

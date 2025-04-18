import BaseLayout from "@/layouts/HomeLayout";
import { Card } from "antd";

const HomePage = () => {
  return (
    <BaseLayout>
      <Card title="Chào mừng bạn">
        <p>Đây là trang tổng quan của hệ thông</p>
        <p>
          Hệ thống giúp bạn quản lý và theo dõi các hoạt động một cách dễ dàng
        </p>
      </Card>
    </BaseLayout>
  );
};

export default HomePage;

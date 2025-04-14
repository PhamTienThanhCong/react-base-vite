import BaseLayout from "@/layouts/BaseLayout/HomeLayout";
import { Card } from "antd";

const HomePage = () => {
  return (
    <BaseLayout>
      <Card title="Nội dung chính">
        <p>Đây là nội dung được truyền vào qua children</p>
        <p>Bạn có thể đặt bất kỳ component nào ở đây</p>
      </Card>
    </BaseLayout>
  );
};

export default HomePage;

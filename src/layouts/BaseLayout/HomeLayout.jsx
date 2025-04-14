import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import "./BaseLayout.scss"; // Tạo file CSS riêng nếu cần

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const BaseLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState(["Home", "Dashboard"]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed} width={250} breakpoint="lg" collapsedWidth="80">
        <div className="logo">{collapsed ? "AD" : "Ant Design"}</div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>

          <SubMenu key="sub1" icon={<UserOutlined />} title="Quản lý người dùng">
            <Menu.Item key="2">Danh sách</Menu.Item>
            <Menu.Item key="3">Thêm mới</Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<TeamOutlined />} title="Nhóm">
            <Menu.Item key="4">Nhóm 1</Menu.Item>
            <Menu.Item key="5">Nhóm 2</Menu.Item>
          </SubMenu>

          <Menu.Item key="6" icon={<FileOutlined />}>
            Tài liệu
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header className="site-layout-header">
          <div className="header-content">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: toggleCollapsed
            })}
            <div className="header-right">
              <span className="user-name">Người dùng</span>
            </div>
          </div>
        </Header>

        {/* Content */}
        <Content className="site-layout-content">
          {/* Breadcrumb */}
          <Breadcrumb className="breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>

          {/* Main content - children sẽ được render ở đây */}
          <div className="content-container">{children}</div>
        </Content>

        {/* Footer */}
        <Footer className="site-layout-footer">Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;

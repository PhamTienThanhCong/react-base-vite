import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Badge, List, Divider } from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  BookOutlined,
  LockOutlined,
  AppstoreOutlined,
  ShopOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import "./BaseLayout.scss";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const BaseLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbItems] = useState(["Home", "Dashboard"]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Menu items data
  const menuItems = [
    { key: "1", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "2", icon: <FileTextOutlined />, label: "Documentation" },
    { key: "3", icon: <BookOutlined />, label: "Guide" },
    { key: "4", icon: <LockOutlined />, label: "Permission" },
    { key: "5", icon: <AppstoreOutlined />, label: "Component" },
    { key: "6", icon: <ShopOutlined />, label: "Business" }
  ];

  // Notification data
  const notifications = [
    { id: 1, title: "Cập nhật hệ thống", description: "Phiên bản mới 2.0 đã có sẵn" },
    { id: 2, title: "Bảo trì", description: "Hệ thống sẽ bảo trì vào 02:00 - 04:00" },
    { id: 3, title: "Thông báo mới", description: "Bạn có 3 nhiệm vụ chưa hoàn thành" }
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Hồ sơ
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Cài đặt
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const notificationMenu = (
    <Menu className="notification-menu">
      <div className="notification-header">
        <h4>Thông báo</h4>
        <a href="#mark-all">Đánh dấu đã đọc</a>
      </div>
      <Divider style={{ margin: 0 }} />
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={item => (
          <Menu.Item key={item.id} className="notification-item">
            <div className="notification-content">
              <div className="notification-title">{item.title}</div>
              <div className="notification-description">{item.description}</div>
              <div className="notification-time">2 giờ trước</div>
            </div>
          </Menu.Item>
        )}
      />
      <Divider style={{ margin: 0 }} />
      <Menu.Item key="view-all" className="view-all">
        <a href="#view-all">Xem tất cả thông báo</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        width={250} 
        breakpoint="lg" 
        collapsedWidth="80"
        className="custom-sider"
      >
        <div className="logo">
          {collapsed ? (
            <div className="logo-collapsed">AD</div>
          ) : (
            <div className="logo-expanded">Admin Pro</div>
          )}
        </div>

        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={["1"]}
          className="custom-menu"
        >
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout className="site-layout">
        {/* Header */}
        <Header className="site-layout-header">
          <div className="header-content">
            <div className="header-left">
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: "trigger",
                onClick: toggleCollapsed,
                style: { fontSize: '20px' }
              })}
            </div>
            
            <div className="header-right">
              <Dropdown 
                overlay={notificationMenu} 
                placement="bottomRight" 
                trigger={['click']}
                overlayClassName="notification-dropdown"
              >
                <div className="notification-trigger">
                  <Badge count={notifications.length} className="notification-badge">
                    <BellOutlined className="action-icon" />
                  </Badge>
                </div>
              </Dropdown>
              
              <Dropdown overlay={userMenu} placement="bottomRight">
                <div className="user-profile">
                  <Avatar 
                    size="default" 
                    icon={<UserOutlined />} 
                    className="user-avatar"
                  />
                  {!collapsed && (
                    <div className="user-info">
                      <span className="user-name">Admin</span>
                      <span className="user-role">Quản trị viên</span>
                    </div>
                  )}
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>

        {/* Content */}
        <Content className="site-layout-content">
          {/* Breadcrumb */}
          <div className="breadcrumb-container">
            <Breadcrumb className="breadcrumb">
              {breadcrumbItems.map((item, index) => (
                <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>

          {/* Main content */}
          <div className="content-container">
            {children}
          </div>
        </Content>

        {/* Footer */}
        <Footer className="site-layout-footer">
          Admin Pro ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, Popconfirm } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import { items, useLayout } from './hooks';
import './index.scss';
const GeekLayout = () => {
  const { loginOut, selectedKeys, name, menuClick } = useLayout();
  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <div className='user-info'>
          <span className='user-name'>{name}</span>
          <span className='user-logout'>
            <Popconfirm
              title='是否确认退出？'
              okText='退出'
              cancelText='取消'
              onConfirm={loginOut}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            theme='dark'
            selectedKeys={selectedKeys}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={menuClick}
          ></Menu>
        </Sider>
        <Layout className='layout-content' style={{ padding: 20 }}>
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;

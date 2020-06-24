import { Menu } from 'antd';
import React from 'react';
import { UserOutlined, DesktopOutlined } from '@ant-design/icons';

export default class MenuComponent extends React.PureComponent {
  render() {
    return (
      <div style={{ width: 256 }}>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            系统接入
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

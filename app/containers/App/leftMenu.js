import React from 'react';
import { Menu, Icon, Layout } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Sider } = Layout;
export default class LeftMenu extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    return (
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} ><span style={{ color: '#fff', lineHeight: '32px' }}>LOGO</span></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span>User</span></span>}
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span>Team</span></span>}
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>

          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

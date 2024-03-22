import React from "react";
import { MessageOutlined, TruckOutlined , SettingOutlined,LoginOutlined ,MenuUnfoldOutlined ,MailOutlined,GiftOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu,Layout, theme } from 'antd';
import {Outlet} from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout; 

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const items: MenuProps['items'] = [ 
  
    getItem('Home', 'grp', null, [
      getItem('Overview', '1',<MenuUnfoldOutlined />), 
      getItem('Response', '2',<MailOutlined />),
      getItem('Orders', '3',<GiftOutlined />),
      getItem('Chats', '4',<MessageOutlined />),
      getItem('Tracking', '5',<TruckOutlined />)], 'group'),

    getItem('Account', 'grp', null, [
      getItem('Setting', '1',<SettingOutlined/>), 
      getItem('Logout', '2',<LoginOutlined />),], 'group'),

  ];
 
export const PateintDashboard :React.FC= () =>{

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
      };
      const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

return(
    <>

<Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      
      >
        <div className="demo-logo-vertical" />
        <Menu
            onClick={onClick}
            style={{ width: '100%'}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            theme="dark"
    />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Mediconnect ©{new Date().getFullYear()} Created by Mediconnect
        </Footer>
      </Layout>
    </Layout>
    </>
)

}
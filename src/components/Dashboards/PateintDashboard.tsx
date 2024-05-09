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
      getItem('Analytics', '2',<MailOutlined />),
      getItem('Payments', '3',<GiftOutlined />),
      getItem('Orders', '4',<MessageOutlined />),
      getItem('Reports', '5',<MessageOutlined />),
      getItem('Requests', '6',<MessageOutlined />)], 'group'),
      // getItem('Tracking', '7',<TruckOutlined />)

    getItem('ACCOUNT', 'grp', null, [
      getItem('Settings', '1',<SettingOutlined/>), 
      getItem('Logouts', '2',<LoginOutlined />),], 'group'),

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
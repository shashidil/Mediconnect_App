import React,{useEffect} from "react";
import { MessageOutlined, TruckOutlined , SettingOutlined,LoginOutlined ,MenuUnfoldOutlined ,MailOutlined,GiftOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu,Layout, theme } from 'antd';
import {Outlet,useNavigate} from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { MedicationReminder } from "../../services/MedicationReminder";
import axiosInstance from "../../services/axiosInstance";
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
      getItem('upload', '1',<MenuUnfoldOutlined />), 
      getItem('Responses', '2',<MailOutlined />),
      getItem('Orders', '3',<GiftOutlined />),
      getItem('Chat', '4',<MessageOutlined />),
      getItem('Tracking', '5',<TruckOutlined  />)], 'group'),

    getItem('ACCOUNT', 'grp', null, [
      getItem('Settings', '6',<SettingOutlined/>), 
      getItem('Logouts', '7',<LoginOutlined />),], 'group'),

  ];
 
export const PateintDashboard :React.FC= () =>{
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  //   MedicationReminder(userId.toString())
  //   //sendTestNotification();
  // }, []); 

  const sendTestNotification = async () => {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    try {
      await axiosInstance.get(`/api/test/sendTestNotification`, {
        params: { userId },
      });
      console.log('Test notification sent');
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  };

 

    const onClick: MenuProps['onClick'] = (e) => {
      switch (e.key) {
        case "1":
          navigate("upload");
          break;
        case "2":
          navigate("response");
          break;
        case "3":
          navigate("/patient/ordersHistory");
          break;
        case "4":
          navigate("/patient/chat");
          break;
        case "5":
          navigate("/patient/tracking");
          break;
        case "6":
          navigate("/patient/settings");
          break;
        case "7":
          navigate("/logout");
          break;
        default:
          break;

      }
      };
      const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

return(
    <>
     <NavBar logoSrc="hjhh" appName="MediConnect" userName="User" profilePhotoSrc="gjhj" />

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
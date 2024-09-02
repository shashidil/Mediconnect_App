import React,{useEffect} from "react";
import { MessageOutlined, SettingOutlined,LoginOutlined ,MenuUnfoldOutlined ,MailOutlined,GiftOutlined,QuestionCircleOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu,Layout, theme } from 'antd';
import {Outlet,useNavigate} from "react-router-dom";
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
      getItem('Dashboard', '1',<MenuUnfoldOutlined />),
      getItem('Responses', '2',<MailOutlined />),
      getItem('Orders', '3',<GiftOutlined />),
      getItem('Chat', '4',<MessageOutlined />),
      getItem('Support', '5',<QuestionCircleOutlined />)], 'group'),

    getItem('Account', 'grp', null, [
      getItem('Settings', '6',<SettingOutlined/>), 
      getItem('Logouts', '7',<LoginOutlined />),], 'group'),

  ];
 
export const PateintDashboard :React.FC= () =>{
  const navigate = useNavigate();

  useEffect(() => {
    // const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    // MedicationReminder(userId.toString())
  }, []); 

 

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
          navigate("/patient/inquires");
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

<Layout style={{ minHeight: "100vh" }}>
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
    <div className="logo-container" style={{padding: '30px 10px', textAlign: 'center'}}>
      <img src="/static/media/logo.aae2efaa9818d500f11f.png" alt="Logo" style={{width: '100%', height: 'auto'}}/>
    </div>
    <Menu
        onClick={onClick}
        style={{width: '100%'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
        theme="dark"
    />
  </Sider>


  <Layout>
    <Content style={{margin: '24px 16px 0'}}>
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
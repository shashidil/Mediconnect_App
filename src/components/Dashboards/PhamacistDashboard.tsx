import { LineChartOutlined, TruckOutlined , SettingOutlined,LoginOutlined ,MenuUnfoldOutlined ,MailOutlined,DollarOutlined,MessageOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu,Layout,theme } from 'antd';
import NavBar from "../NavBar/NavBar";
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
      
        getItem('Home', 'grp', null, 
        [getItem('Overview', '1',<MenuUnfoldOutlined />),
         getItem('Request', '2',<MailOutlined />),
         getItem('Payment', '3',<DollarOutlined />),
         getItem('Reports', '4',<LineChartOutlined />),
        // getItem('Chat', '5',<MessageOutlined />),
         getItem('Chat', '5',<MessageOutlined />)], 'group'),

        getItem('Account', 'grp', null, [
            getItem('Setting', '6',<SettingOutlined/>), 
            getItem('Logout', '7',<LoginOutlined />),], 'group'),
    
      ];





export const PhamacistDashboard = () =>{
  const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
      switch (e.key) {
        // case "1":
        //   navigate("requests");
        //   break;
        case "2":
          navigate("requests");
          break;
        case "3":
          navigate("/pharmacist/payment");
          break;
        // case "4":
        //  navigate("payment");
        //  break;
        case "5":
          navigate("/pharmacist/chat");
          break;
        // case "6":
        //   navigate("/patient/settings");
        //   break;
        // case "7":
        //   navigate("/logout");
        //   break;
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
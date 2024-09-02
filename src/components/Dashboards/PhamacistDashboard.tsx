import {
    LineChartOutlined,
    SettingOutlined,
    LoginOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    DollarOutlined,
    MessageOutlined, QuestionCircleOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu, Layout, theme} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";
import React from "react";

const {Header, Footer, Sider, Content} = Layout;

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
        [getItem('Overview', '1', <MenuUnfoldOutlined/>),
            getItem('Request', '2', <MailOutlined/>),
            getItem('Payment', '3', <DollarOutlined/>),
            getItem('Reports', '4', <LineChartOutlined/>),
            // getItem('Chat', '5',<MessageOutlined />),
            getItem('Chat', '5', <MessageOutlined/>),
            getItem('Support', '6',<QuestionCircleOutlined />)], 'group'),

    getItem('Account', 'grp', null, [
        getItem('Setting', '7', <SettingOutlined/>),
        getItem('Logout', '8', <LoginOutlined/>),], 'group'),

];


export const PhamacistDashboard = () => {
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case "1":
              navigate("overview");
              break;
            case "2":
                navigate("requests");
                break;
            case "3":
                navigate("/pharmacist/payment");
                break;
            case "4":
                navigate("/pharmacist/reports");
                break;
            // case "4":
            //  navigate("payment");
            //  break;
            case "5":
                navigate("/pharmacist/chat");
                break;
            case "6":
                navigate("/pharmacist/inquires");
                break;
            case "7":
                navigate("/pharmacist/settings");
                break;

            // case "7":
            //   navigate("/logout");
            //   break;
            default:
                break;

        }


    };
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
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
                        <img src="/static/media/logo.aae2efaa9818d500f11f.png" alt="Logo"
                             style={{width: '100%', height: 'auto'}}/>
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
                    <Footer style={{textAlign: 'center'}}>
                        Mediconnect ©{new Date().getFullYear()} Created by Mediconnect
                    </Footer>
                </Layout>
            </Layout>

        </>

    )
}
import React, { useEffect, useState } from "react";
import { MessageOutlined, SettingOutlined, LoginOutlined, MenuUnfoldOutlined, MailOutlined, GiftOutlined, QuestionCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Layout, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from "react-router-dom";

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

export const PateintDashboard: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPaymentButton, setShowPaymentButton] = useState<boolean>(false); // State for Payment Button
    const [selectedKey, setSelectedKey] = useState<string>('1'); // State to track selected menu item

    useEffect(() => {
        // Show payment button only when the user is on the order page
        if (location.pathname === "/patient/orders") {
            setShowPaymentButton(true);
            setSelectedKey("8"); // Highlight the payment button when on the orders page
        } else {
            setShowPaymentButton(false);
        }
    }, [location]);

    const onClick: MenuProps['onClick'] = (e) => {
        setSelectedKey(e.key); // Update selected key when a menu item is clicked
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
                localStorage.removeItem("user");
                localStorage.removeItem("userId");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("sessionExpiration");
                navigate("/signin");
                break;
            default:
                break;
        }
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items: MenuProps['items'] = [
        getItem('Home', 'grp', null, [
            getItem('Dashboard', '1', <MenuUnfoldOutlined />),
            getItem('Responses', '2', <MailOutlined />),
            getItem('Orders', '3', <GiftOutlined />),
            getItem('Chat', '4', <MessageOutlined />),
            getItem('Support', '5', <QuestionCircleOutlined />)
        ], 'group'),
        getItem('Account', 'grp', null, [
            getItem('Settings', '6', <SettingOutlined />),
            getItem('Logout', '7', <LoginOutlined />),
        ], 'group'),
        ...(showPaymentButton ? [getItem('Payment', '8', <CreditCardOutlined />)] : []), 
    ];

    return (
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
                <div className="logo-container" style={{ padding: '30px 10px', textAlign: 'center' }}>
                    <img src="/static/media/logo.aae2efaa9818d500f11f.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
                </div>
                <Menu
                    onClick={onClick}
                    style={{ width: '100%' }}
                    selectedKeys={[selectedKey]} // Highlight the selected menu item
                    mode="inline"
                    items={items}
                    theme="dark"
                />
            </Sider>

            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Mediconnect ©{new Date().getFullYear()} Created by Mediconnect
                </Footer>
            </Layout>
        </Layout>
    );
};

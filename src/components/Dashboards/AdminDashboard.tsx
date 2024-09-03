import React from "react";
import {
    Layout,
    Menu,
    type MenuProps,
    theme
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { LoginOutlined, MenuUnfoldOutlined, MessageOutlined } from "@ant-design/icons";

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { Footer, Sider, Content } = Layout;
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuProps['items'] = [
        getItem('Dashboard', '1', <MenuUnfoldOutlined />),
        getItem('Chat', '2', <MessageOutlined />),
        getItem('Logout', '3', <LoginOutlined />),
    ];

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

    const onClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case "1":
                navigate("/admin/dashboard");
                break;
            case "2":
                navigate("/admin/chat");
                break;
            case "3":
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
                    <div className="logo-container" style={{ padding: '30px 10px', textAlign: 'center' }}>
                        <img src="/static/media/logo.aae2efaa9818d500f11f.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <Menu
                        onClick={onClick}
                        style={{ width: '100%' }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
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
        </>
    );
};

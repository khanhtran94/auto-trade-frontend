import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    BankOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ConfigTable from "./components/config/ConfigTable";
import CoinTable from "./components/coin/CoinTable";
import SignTelegramTable from "./components/signTelegram/SignTelegramTable";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}

                >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/nav1">Config</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<BankOutlined />}>
                        <Link to="/coin">Coin</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<BankOutlined />}>
                        <Link to="/signTelegram">SignTelegram</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route path="/nav1" element={<ConfigTable/>} />
                        <Route path="/coin" element={<CoinTable/>} />
                        <Route path="/signTelegram" element={<SignTelegramTable/>} />
                    </Routes>
                </Content>

            </Layout>
        </Layout>
    );
};

export default App;
import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Input, Button, Row, Col, Form,notification } from 'antd';
import { SigninDto } from '../../Interfaces/SigninDto';
import { loginUser } from '../../services/api/UserAuthApi';
import googleLogo from '../../assets/google.svg';
import Logo from '../../assets/logo.png';
import login from '../../assets/login.jpg';
import { MedicationReminder } from '../../services/MedicationReminder';

export const UserLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const loginDto: SigninDto = {
        username: username,
        password: password,
      };

      const userData = await loginUser(loginDto);

      if (userData) {
        const roles = userData.roles;
        if (roles.includes('ROLE_PHARMACIST')) {
          window.location.href = '/pharmacist/overview';
        } else if (roles.includes('ROLE_CUSTOMER')) {
          window.location.href = 'patient/upload';
        } else if (roles.includes('ROLE_ADMIN')) {
          window.location.href = 'admin/dashboard';
        } else {
          notification.error({
            message: 'Error',
            description: 'User role not recognized',
          });
        }
       

      } else {
        notification.error({
          message: 'Error',
          description: 'User Login Failed',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Login failed. Please try again.',
      });
    }
  };

  return (
    <div style={{ textAlign: 'center', width: '1200px', margin: '0 auto', paddingTop: '60px' }}>
      <Row gutter={16} justify="center" align="middle">
        <Col span={12}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
              <img src={Logo} alt="Logo" style={{ width: '350px', height: 'auto' }} />
            </div>
            <h1 style={{ fontSize: '40px', fontWeight: '500' }}>Sign In</h1>

            <Form onFinish={handleLogin} style={{ width: '80%' }}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please fill out this field' }]}
              >
                <Input
                  placeholder="Enter your username"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  value={username}
                  style={{padding: '10px', width: '60%' }}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please fill out this field' }]}
              >
                <Input.Password
                  placeholder="Input password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  value={password}
                  style={{ marginTop: '20px', padding: '10px', width: '60%' }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Row justify="space-between" style={{ width: '100%', marginTop: '-10px' }}>
                <Col>
                  <a style={{color:'#a79f9f',marginTop:'10px',position:'relative',marginLeft:'100px'}}  href="#">
                    Forgot Password?
                  </a>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '60%', marginTop: '20px',marginLeft:'100px', padding: '10px', background: '#2e384d', color: '#fff' ,textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>

            <Button
              type="primary"
              style={{
                width: '80%',
                marginTop: '20px',
                padding: '10px',
                background: '#fff',
                color: '#534747',
                fontWeight: 'bold',
                border: '2px solid #a2aecd',
                textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',
              }}
            >
              <img style={{width:'20px',height:'20px',marginRight:'10px'}} src={googleLogo} alt="google login" />
              Continue with Google
            </Button>

            <div style={{ marginTop: '20px', color: '#a79f9f' }}>
              Don't have an account? <a href="">Sign up</a>
            </div>
          </div>
        </Col>

        <Col span={12}>
          <img src={login} alt="Login" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Col>
      </Row>
    </div>
  );
};

import React,{ useState }  from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Input, Button,Row,Col,notification } from 'antd';
import img from '../../assets/uploadimage.jpg';
import { SigninDto } from '../../Interfaces/SigninDto';
import { loginUser } from '../../services/api/UserAuthApi';


export const UserLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const loginDto: SigninDto = {
      userName: username,
      password: password,
    };

    const loginSuccess = await loginUser(loginDto);

    if (loginSuccess) {
      notification.success({
        message: 'Success',
        description: 'User registered successfully',
    });
    } else {
      notification.error({
        message: 'Error',
        description: 'User registered Failed',
    });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
    <Row gutter={16} justify="center">
      {/* Left side container */}
      <Col span={12} >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Logo and "Mediconnect" name */}
          <div style={{ marginBottom: '20px' , marginTop:'20px'}}>
            <img src="/path/to/logo.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
            <h2 style={{ margin: '0', fontSize: '1.5rem' }}>Mediconnect</h2>
          </div>

          
          <Input
              placeholder="Enter your username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              style={{ marginTop: '25%', padding: '10px', width: '50%' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input.Password
              placeholder="Input password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ marginTop: '40px', padding: '10px', width: '50%' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          {/* Continue with Google */}
          <Button type="primary" style={{ width: '50%', marginTop: '40px',padding:'20px' ,textAlign:'center'} }>
            Continue with Google
          </Button>

          {/* Login Button */}
          <Button type="primary" onClick={handleLogin} htmlType="submit" style={{ width: '50%', marginTop: '20px',padding:'20px' ,textAlign:'center'}}>
            Login
          </Button>
        </div>
      </Col>

      {/* Right side container */}
      <Col span={12}>
        <img src={img} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Col>
    </Row>
  </div>
  );
};

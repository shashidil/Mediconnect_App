import React,{ useState }  from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Input, Button,Row,Col,notification } from 'antd';
import img from '../../assets/uploadimage.jpg';
import { SigninDto } from '../../Interfaces/SigninDto';
import { loginUser } from '../../services/api/UserAuthApi';
import googleLogo from '../../assets/google.svg'
import Logo from '../../assets/logo.png'
import login from '../../assets/login.jpg'


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
    <div style={{ textAlign: 'center',width:'1200px', margin:'0 auto',paddingTop:'60px' }}>
    <Row style={{alignItems:'center'}} gutter={16} justify="center">
      {/* Left side container */}
      <Col span={12} >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , position:'relative'}}>
          {/* Logo and "Mediconnect" name */}
          <div style={{ marginBottom: '20px' , marginTop:'20px'}}>
            <img src={Logo} alt="Logo" style={{ width: '350px', height: 'auto' }} />
          </div>
          <h1 style={{left: '-110px',position: 'relative',fontSize: '40px',fontWeight:'500'}}>Sign In</h1>
          
          <Input
              placeholder="Enter your username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              style={{padding: '10px', width: '60%' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />

          <Input.Password
              placeholder="Input password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ marginTop: '40px', padding: '10px', width: '60%' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <a style={{left:'-120px',color:'#a79f9f',marginTop:'10px',position:'relative'}} href="#">Forgot Password ?</a>

          {/* Continue with Google */}
          <Button type="primary" style={{ width: '60%', marginTop: '40px',padding:'20px' ,textAlign:'center',background:'#fff',display:'flex',justifyContent:'center',alignItems:'center',border:'2px solid #a2aecd',color:'#534747',fontWeight:'bold'} }>
            <img style={{width:'20px',height:'20px',marginRight:'10px'}} src={googleLogo} alt="google login" />
            Continue with Google
          </Button>

          {/* Login Button */}
          <Button type="primary" onClick={handleLogin} htmlType="submit" style={{ width: '60%', marginTop: '20px',padding:'20px' ,textAlign:'center',background:'#2e384d',display:'flex',justifyContent:'center',alignItems:'center'}}>
            LOGIN
          </Button>
          <span style={{left:'-65px',color:'#a79f9f',position:'relative',marginTop:'10px'}}>Don't you have an account ? <a href="">Sign up</a></span>
        </div>
      </Col>

      {/* Right side container */}
      <Col span={12}>
        <img src={login} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Col>
    </Row>
  </div>
  );
};

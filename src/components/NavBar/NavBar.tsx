import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Dropdown } from 'antd';
import UserIcon from '../../assets/woman-user-circle-icon.webp'
import Logo from '../../assets/logo.png'

interface NavBarProps {
  logoSrc: string; // Path to your logo image
  appName: string;
  userName: string; // User's displayed name
  profilePhotoSrc?: string; // Path to user profile image (optional)
}

const NavBar: React.FC<NavBarProps> = ({
  logoSrc,
  appName,
  userName,
  profilePhotoSrc,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="user-account">
        <Link to="/user-account">Account</Link>
      </Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between' ,width:'1450px',height:'100px',margin:'0 auto'}}> {/* Inline Style  */}
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* Inline Style  */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}> {/* Inline Style  */}
          <img style={{width:'200px'}} src={Logo} alt={appName} />
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* Inline Style  */}
        <Dropdown overlay={menu} placement="bottomRight">
          <a style={{display:'flex',alignItems:'center'}}>
            {profilePhotoSrc ? (
              <Avatar src={UserIcon} />
            ) : (
              <Avatar icon="" />
            )}
            <span>
              <h2 style={{margin:'0 0 0 10px'}}>Medicare</h2>
              <span style={{color:'#ad9d9d',fontSize:'10px',marginLeft:'-15px'}}>View Profile</span>
            </span>
            {/* <span>{userName}</span> */}
          </a>
        </Dropdown>
      </div>
    </nav>
  );
};

export default NavBar;

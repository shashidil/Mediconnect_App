import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Dropdown } from 'antd';

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
    <nav style={{ display: 'flex', justifyContent: 'space-between' ,width:'100%',height:'100px',backgroundColor:' #f5f5f5'}}> {/* Inline Style  */}
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* Inline Style  */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}> {/* Inline Style  */}
          <img src={logoSrc} alt={appName} />
          <span>{appName}</span>
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* Inline Style  */}
        <Dropdown overlay={menu} placement="bottomRight">
          <a>
            {profilePhotoSrc ? (
              <Avatar src={profilePhotoSrc} />
            ) : (
              <Avatar icon="user" />
            )}
            <span>{userName}</span>
          </a>
        </Dropdown>
      </div>
    </nav>
  );
};

export default NavBar;

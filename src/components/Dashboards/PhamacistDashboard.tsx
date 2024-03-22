import { LineChartOutlined, TruckOutlined , SettingOutlined,LoginOutlined ,MenuUnfoldOutlined ,MailOutlined,DollarOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu,Layout } from 'antd';
import NavBar from "../NavBar/NavBar";

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
         getItem('Analytics', '5',<TruckOutlined />)], 'group'),

        getItem('Account', 'grp', null, [
            getItem('Setting', '1',<SettingOutlined/>), 
            getItem('Logout', '2',<LoginOutlined />),], 'group'),
    
      ];





export const PhamacistDashboard = () =>{
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
      };
    
    return(
        <>
        <NavBar logoSrc="hjhh" appName="MediConnect" userName="User" profilePhotoSrc="gjhj" />
 
 <Menu
   onClick={onClick}
   style={{ width: 256}}
   defaultSelectedKeys={['1']}
   defaultOpenKeys={['sub1']}
   mode="inline"
   items={items}
 />
 </>
    
    )
}
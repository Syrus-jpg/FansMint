import React, { useState } from 'react';
import { Menu, Button, Drawer, Space } from 'antd';
import { 
  HomeOutlined, 
  RocketOutlined, 
  LineChartOutlined, 
  MenuOutlined,
  GithubOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  TrophyOutlined,
  TeamOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

// Logo component that renders the BN logo
const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
    <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 圆形边框 - 加粗 */}
      <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="6" fill="none" />
      
      {/* FM字母 - 向左下移动一点，使其居中 */}
      <g transform="translate(-2, 2)">
        {/* F字母 - 正常形状 */}
        <path d="M30 30H50V38H37V44H48V52H37V61H30V30Z" fill="white" />
        
        {/* M字母 - 两个连起来的锐角三角形 */}
        <path d="M53 30H60V61H53V30Z" fill="white" />
        <path d="M60 30L70 45L60 61V30Z" fill="white" />
        <path d="M70 30H77V61H70V30Z" fill="white" />
        <path d="M70 30L60 45L70 61V30Z" fill="white" />
      </g>
    </svg>
  </div>
);

interface NavigationProps {
  mode?: 'horizontal' | 'vertical';
  isMobile?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  mode = 'horizontal',
  isMobile = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home'
    },
    {
      key: '/create',
      icon: <HeartOutlined />,
      label: 'Create Fan Token'
    },
    {
      key: '/dashboard',
      icon: <TeamOutlined />,
      label: 'My Fan Tokens'
    },
    {
      key: 'docs',
      icon: <ApiOutlined />,
      label: 'Explore exSat',
      onClick: () => window.open('https://exsat.network/docs', '_blank')
    },
    {
      key: 'github',
      icon: <GithubOutlined />,
      label: 'GitHub',
      onClick: () => window.open('https://github.com/Syrus-jpg/FansMint', '_blank')
    }
  ];

  const handleMenuClick = (e: { key: string }) => {
    // External links are handled in their own onClick handlers
    if (e.key !== 'docs' && e.key !== 'github') {
      navigate(e.key);
      if (isMobile) {
        setDrawerVisible(false);
      }
    }
  };

  const mobileMenu = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <Logo />
        <Title level={4} style={{ margin: 0, color: '#6b46c1', fontSize: '26px' }}>FansMint</Title>
      </div>
      <Button 
        type="text" 
        icon={<MenuOutlined />} 
        onClick={() => setDrawerVisible(true)} 
        style={{ fontSize: '18px' }}
      />
      <Drawer 
        title="Menu" 
        placement="right" 
        onClose={() => setDrawerVisible(false)} 
        open={drawerVisible}
        width={250}
      >
        <Menu 
          mode="vertical"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </Drawer>
    </div>
  );

  const desktopMenu = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Logo />
          <Title level={4} style={{ margin: 0, marginRight: 40, color: '#6b46c1', fontSize: '26px' }}>FansMint</Title>
        </div>
        <Menu 
          mode={mode}
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={menuItems.slice(0, 3)} // Show first 3 items in the menu
          style={{ border: 'none', backgroundColor: 'transparent', fontWeight: 500 }}
        />
      </div>
      <Space>
        {menuItems.slice(3, 4).map(item => (
          <Button 
            key={item.key}
            type="primary" 
            icon={item.icon}
            onClick={item.onClick}
            style={{ 
              height: 40,
              paddingLeft: 16,
              paddingRight: 16,
              fontSize: 14
            }}
          >
            {item.label}
          </Button>
        ))}
        {menuItems.slice(4).map(item => (
          <Button 
            key={item.key}
            type="text" 
            icon={item.icon}
            onClick={item.onClick}
          >
            {item.label}
          </Button>
        ))}
      </Space>
    </div>
  );

  return isMobile ? mobileMenu : desktopMenu;
};

export default Navigation;

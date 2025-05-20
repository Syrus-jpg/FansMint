import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';
import en_US from 'antd/lib/locale/en_US';
import './App.css';

// Import page components
import HomePage from './pages/HomePage';
import CreateAsset from './pages/CreateAsset';
import AssetDetails from './pages/AssetDetails';
import Dashboard from './pages/Dashboard';
import Navigation from './components/layout/Navigation';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ConfigProvider
      locale={en_US}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#6b46c1', // Purple theme for a modern Linear-style design
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 10, 
            width: '100%',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(13, 15, 25, 0.8)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
          }}>
            <Navigation isMobile={isMobile} />
          </Header>
          <Content style={{ padding: isMobile ? '0 16px' : '0 64px', marginTop: 24 }}>
            <div style={{ 
              padding: isMobile ? 16 : 28, 
              minHeight: 300, 
              borderRadius: 8,
              background: 'rgba(23, 25, 35, 0.6)',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreateAsset />} />
                <Route path="/tokens/:id" element={<AssetDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ 
            textAlign: 'center', 
            color: '#888',
            backgroundColor: 'transparent',
            padding: '16px 24px'
          }}>
            FansMint ©{new Date().getFullYear()} • Tokenizing fandom with emotion and purpose • Powered by Bitcoin and exSat
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;

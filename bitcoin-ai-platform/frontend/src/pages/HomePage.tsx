import React, { useEffect } from 'react';
import { Typography, Button, Card, Row, Col, Space } from 'antd';
import { HeartOutlined, TeamOutlined, FileTextOutlined, ApiOutlined, RightOutlined, EditOutlined, RocketOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

// 添加自定义FM Logo组件
const FMLogo: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width={style?.fontSize || 140} height={style?.fontSize || 140} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* 移除黑色背景圆圈 */}
    
    {/* White border circle */}
    <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="5" fill="none" />
    
    {/* FM letters - White */}
    <g transform="translate(-2, 2)">
      {/* F letter - Normal shape */}
      <path d="M30 30H50V38H37V44H48V52H37V61H30V30Z" fill="white" />
      
      {/* M letter - Two connected sharp triangles */}
      <path d="M53 30H60V61H53V30Z" fill="white" />
      <path d="M60 30L70 45L60 61V30Z" fill="white" />
      <path d="M70 30H77V61H70V30Z" fill="white" />
      <path d="M70 30L60 45L70 61V30Z" fill="white" />
    </g>
  </svg>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Create cosmic dust particles and distant galaxies on component mount
  useEffect(() => {
    // Create cosmic dust particles
    const dustContainer = document.createElement('div');
    dustContainer.className = 'cosmic-dust';
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'dust-particle';
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.opacity = (Math.random() * 0.5 + 0.3).toString();
      particle.style.animationDelay = Math.random() * 20 + 's';
      dustContainer.appendChild(particle);
    }
    
    document.body.appendChild(dustContainer);
    
    // Add distant galaxies
    const galaxies = document.createElement('div');
    galaxies.className = 'distant-galaxies';
    document.body.appendChild(galaxies);

    // Cleanup function
    return () => {
      document.body.removeChild(dustContainer);
      document.body.removeChild(galaxies);
    };
  }, []);

  return (
    <>
      {/* Cosmic Background Elements */}
      <div className="starfield"></div>
      <div className="nebula"></div>
      <div className="stars-small"></div>
      <div className="stars-medium"></div>
      <div className="stars-large"></div>
      
      <div className="home-page">
        {/* Cosmic vortex effect */}
        <div className="cosmic-vortex">
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '800px',
            height: '800px',
            marginTop: '-400px',
            marginLeft: '-400px',
            background: 'conic-gradient(from 0deg, rgba(124, 58, 237, 0.1), rgba(139, 92, 246, 0.15), rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.2), rgba(91, 33, 182, 0.15), rgba(124, 58, 237, 0.1))',
            borderRadius: '50%',
            animation: 'rotateVortex 40s linear infinite',
          }}></div>
        </div>
      
        {/* Add special light/glow effects */}
        <div className="special-effects">
          <div className="glow-orb" style={{
            top: '2%',
            left: '10%',
            width: '300px',
            height: '300px',
          }}></div>
          
          <div className="glow-orb" style={{
            top: '10%',
            right: '5%',
            width: '200px',
            height: '200px',
            animationDelay: '-5s',
          }}></div>
          
          <div className="light-flare" style={{
            top: '20%',
            left: '20%',
            width: '4px',
            height: '4px',
            boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.8)',
          }}></div>
          
          <div className="light-flare" style={{
            top: '40%',
            right: '30%',
            width: '6px',
            height: '6px',
            boxShadow: '0 0 30px 3px rgba(255, 255, 255, 0.7)',
          }}></div>
        </div>
        

        {/* Hero Section */}
        <section className="hero-section" style={{ 
          textAlign: 'center', 
          minHeight: '80vh', /* 降低最小高度 */
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 20, /* 减少顶部间距 */
          paddingBottom: 20, /* 减少底部间距 */
          position: 'relative',
          zIndex: 5
        }}>
          <div className="hero-titles" style={{ marginBottom: 30 }}>
            <Title level={1} style={{ 
              color: 'white',
              fontSize: '6rem',
              marginBottom: 20,
              position: 'relative',
              zIndex: 2
            }}>
              <span style={{ 
                background: 'linear-gradient(90deg, #6b46c1, #d6bcfa)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}>FansMint</span>
            </Title>
            <Title level={1} className="subtitle" style={{ 
              fontSize: '3.5rem', 
              lineHeight: 1.2,
              fontWeight: 600,
              marginTop: 20,
              marginBottom: 24,
              color: '#c7b6ed',
              textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
            }}>
              Tokenize Your Fandom
            </Title>
          </div>
          
          <Paragraph>
            <div style={{ fontSize: 16, maxWidth: 800, margin: '0 auto 6px', color: '#d6bcfa' }}>
              Create your own fan token to celebrate the artists you love!
            </div>
            <div style={{ fontSize: 16, maxWidth: 800, margin: '0 auto 6px', color: '#d6bcfa' }}>
              Anyone can do it — no tech skills required.
            </div>
            <div style={{ fontSize: 16, maxWidth: 800, margin: '0 auto 20px', color: '#d6bcfa' }}>
              Powered by Bitcoin and exSat.
            </div>
          </Paragraph>
          
          <div style={{ 
            marginTop: 8,
            position: 'relative',
            maxWidth: 300,
            margin: '0 auto',
            zIndex: 50 // 更高的Z-index确保按钮在最上层
          }}>
            <a href="/create" style={{ 
              textDecoration: 'none', 
              display: 'block',
              zIndex: 51,
              position: 'relative'
            }}>
              <Button 
                type="primary" 
                size="large" 
                icon={<FMLogo style={{ fontSize: 16 }} />} 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/create');
                }}
                style={{ 
                  height: 54,
                  fontSize: 18,
                  paddingLeft: 30,
                  paddingRight: 30,
                  width: '100%',
                  background: '#8A5CF6', // 调整为和下方按钮一致的颜色
                  border: 'none',
                  boxShadow: '0 0 25px rgba(138, 92, 246, 0.5)',
                  position: 'relative', // 确保位置正确
                  zIndex: 51, // 确保按钮文字和图标在顶层
                  cursor: 'pointer', // 确保鼠标悬停时显示为可点击状态
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.6)' // 为按钮文字添加发光效果
                }}
              >
                Mint Your Fan Token Now!
              </Button>
            </a>
          </div>
        </section>

        {/* Mint Your Emotions Section */}
        <section className="feature-section" style={{ 
          minHeight: '90vh', /* 降低最小高度 */
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '50px 0', /* 减少上下间距 */
          marginTop: '-40px' /* 向上移动整个部分 */
        }}>
          <div className="container" style={{ 
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 2
          }}>
            <Row gutter={[60, 60]} align="middle">
              <Col xs={24} lg={12}>
                <div className="feature-image" style={{ 
                  position: 'relative',
                  height: 500,
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: 'rgba(30, 32, 42, 0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(107, 70, 193, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '60%',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 80%)',
                    filter: 'blur(20px)',
                    zIndex: 0
                  }}></div>
                  <div style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1
                  }}>
                    <FMLogo style={{ fontSize: 120, color: 'white' }} />
                  </div>
                  
                  {/* Add text content below the logo */}
                  <div style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    zIndex: 1
                  }}>
                    <div style={{
                      fontSize: 18,
                      color: 'white',
                      fontWeight: 600,
                      marginBottom: 8
                    }}>
                      Built for Fans, Backed by Bitcoin
                    </div>
                    <div style={{
                      fontSize: 14,
                      color: '#c4b5f8',
                      maxWidth: '80%',
                      margin: '0 auto'
                    }}>
                      Turn your fandom into digital legacy
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <div className="feature-content">
                  <Title level={2} style={{ 
                    color: 'white',
                    fontSize: '3rem',
                    marginBottom: 24
                  }}>
                    Mint Your Emotions
                  </Title>
                  <Paragraph style={{ 
                    color: '#a0aec0',
                    fontSize: 18,
                    lineHeight: 1.6,
                    marginBottom: 30
                  }}>
                    Turn your love for artists into digital memories - no tech skills needed.
                  </Paragraph>
                  <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 40px 0'
                  }}>
                    {[
                      "Add your own images, words, and memories",
                      "Create special edition tokens for unforgettable moments",
                      "All tokens are recorded on Bitcoin via exSat",
                      "Share your tokens with fellow fans around the world"
                    ].map((item, index) => (
                      <li key={index} style={{ 
                        padding: '12px 0',
                        color: '#d6bcfa',
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <span style={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: 12,
                          background: 'rgba(139, 92, 246, 0.2)',
                          color: '#9f7aea',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 16,
                          fontSize: 14
                        }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    type="primary" 
                    size="large" 
                    onClick={() => navigate('/create')}
                    style={{ height: 50, paddingLeft: 24, paddingRight: 24 }}
                  >
                    Start Creating <RightOutlined style={{ marginLeft: 8 }}/>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          {/* Background element */}
          <div style={{ 
            position: 'absolute',
            top: 100,
            right: 0,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            borderRadius: '50%',
            zIndex: 0
          }}></div>
        </section>

        {/* Fan Community Management Section */}
        <section className="feature-section" style={{ 
          minHeight: '90vh', /* 降低最小高度 */
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '50px 0', /* 减少上下间距 */
          marginTop: '-40px' /* 向上移动整个部分 */
        }}>
          <div className="container" style={{ 
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 2
          }}>
            <Row gutter={[60, 60]} align="middle">
              <Col xs={24} lg={{ span: 12, order: 2 }}>
                <div className="feature-image" style={{ 
                  position: 'relative',
                  height: 500,
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: 'rgba(30, 32, 42, 0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(107, 70, 193, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '60%',
                    background: 'radial-gradient(circle, rgba(91, 33, 182, 0.3) 0%, rgba(91, 33, 182, 0.1) 50%, transparent 80%)',
                    filter: 'blur(20px)',
                    zIndex: 0
                  }}></div>
                  <div style={{ 
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1
                  }}>
                    <TeamOutlined style={{ fontSize: 120, color: 'white' }} />
                  </div>
                  <div style={{ 
                    position: 'absolute',
                    bottom: 50,
                    left: 30,
                    right: 30,
                    zIndex: 1,
                    borderRadius: 12,
                    padding: 20,
                    background: 'rgba(23, 25, 35, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(107, 70, 193, 0.2)'
                  }}>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 15
                    }}>
                      <div style={{ color: '#a0aec0' }}>Total Holders</div>
                      <div style={{ color: 'white', fontWeight: 600 }}>14,532</div>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 15
                    }}>
                      <div style={{ color: '#a0aec0' }}>Engagement Rate</div>
                      <div style={{ color: 'white', fontWeight: 600 }}>72.8%</div>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ color: '#a0aec0' }}>Active Community</div>
                      <div style={{ color: '#9f7aea', fontWeight: 600 }}>Growing ↑</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={{ span: 12, order: 1 }}>
                <div className="feature-content">
                  <Title level={2} style={{ 
                    color: 'white',
                    fontSize: '3rem',
                    marginBottom: 24
                  }}>
                    Fan Community Management
                  </Title>
                  <Paragraph style={{ 
                    color: '#a0aec0',
                    fontSize: 18,
                    lineHeight: 1.6,
                    marginBottom: 30
                  }}>
                    Easily track fan token circulation, holder count, engagement metrics and other key community indicators to build a stronger connection with your fans.
                  </Paragraph>
                  <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 40px 0'
                  }}>
                    {[
                      "Real-time dashboard with intuitive analytics",
                      "Identify your most engaged community members",
                      "Monitor token distribution and circulation trends",
                      "Directly engage with your holders through messages"
                    ].map((item, index) => (
                      <li key={index} style={{ 
                        padding: '12px 0',
                        color: '#d6bcfa',
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <span style={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: 12,
                          background: 'rgba(139, 92, 246, 0.2)',
                          color: '#9f7aea',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 16,
                          fontSize: 14
                        }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    type="primary" 
                    size="large" 
                    onClick={() => navigate('/dashboard')}
                    style={{ height: 50, paddingLeft: 24, paddingRight: 24 }}
                  >
                    View Dashboard <RightOutlined style={{ marginLeft: 8 }}/>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          {/* Background element */}
          <div style={{ 
            position: 'absolute',
            bottom: 100,
            left: 0,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(91, 33, 182, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            borderRadius: '50%',
            zIndex: 0
          }}></div>
        </section>

        {/* AI Creative Assistant Section */}
        <section className="feature-section" style={{ 
          minHeight: '90vh', /* 降低最小高度 */
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '50px 0', /* 减少上下间距 */
          marginTop: '-40px' /* 向上移动整个部分 */
        }}>
          <div className="container" style={{ 
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 2
          }}>
            <Row gutter={[60, 60]} align="middle">
              <Col xs={24} lg={12}>
                <div className="feature-image" style={{ 
                  position: 'relative',
                  height: 500,
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: 'rgba(30, 32, 42, 0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(107, 70, 193, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                    height: '70%',
                    background: 'radial-gradient(circle, rgba(44, 31, 95, 0.3) 0%, rgba(44, 31, 95, 0.1) 50%, transparent 80%)',
                    filter: 'blur(20px)',
                    zIndex: 0
                  }}></div>
                  <div style={{ 
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1
                  }}>
                    <EditOutlined style={{ fontSize: 120, color: 'white' }} />
                  </div>
                  <div style={{ 
                    position: 'absolute',
                    bottom: 40,
                    left: 30,
                    right: 30,
                    zIndex: 1
                  }}>
                    <div style={{ 
                      borderRadius: 8,
                      padding: '12px 16px',
                      background: 'rgba(91, 33, 182, 0.2)',
                      color: '#d6bcfa',
                      marginBottom: 10,
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: 12,
                        background: 'rgba(139, 92, 246, 0.3)',
                        marginRight: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12
                      }}>AI</div>
                      Generate engaging descriptions for your token
                    </div>
                    <div style={{ 
                      borderRadius: 8,
                      padding: '12px 16px',
                      background: 'rgba(91, 33, 182, 0.2)',
                      color: '#d6bcfa', 
                      marginBottom: 10,
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: 12,
                        background: 'rgba(139, 92, 246, 0.3)',
                        marginRight: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12
                      }}>AI</div>
                      Create community engagement strategies
                    </div>
                    <div style={{ 
                      borderRadius: 8,
                      padding: '12px 16px',
                      background: 'rgba(91, 33, 182, 0.2)',
                      color: '#d6bcfa',
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: 12,
                        background: 'rgba(139, 92, 246, 0.3)',
                        marginRight: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12
                      }}>AI</div>
                      Suggest value-adding perks for token holders
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <div className="feature-content">
                  <Title level={2} style={{ 
                    color: 'white',
                    fontSize: '3rem',
                    marginBottom: 24
                  }}>
                    AI Creative Assistant
                  </Title>
                  <Paragraph style={{ 
                    color: '#a0aec0',
                    fontSize: 18,
                    lineHeight: 1.6,
                    marginBottom: 30
                  }}>
                    Use AI technology to automatically generate professional token descriptions and creative strategies for stronger fan communities, even if you're not a marketing expert.
                  </Paragraph>
                  <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 40px 0'
                  }}>
                    {[
                      "AI-generated token descriptions that resonate with fans",
                      "Community engagement strategies tailored to your audience",
                      "Automatic content suggestions for announcements",
                      "Ideas for exclusive perks and experiences for token holders"
                    ].map((item, index) => (
                      <li key={index} style={{ 
                        padding: '12px 0',
                        color: '#d6bcfa',
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <span style={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: 12,
                          background: 'rgba(139, 92, 246, 0.2)',
                          color: '#9f7aea',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 16,
                          fontSize: 14
                        }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    type="primary" 
                    size="large" 
                    onClick={() => navigate('/create')}
                    style={{ height: 50, paddingLeft: 24, paddingRight: 24 }}
                  >
                    Try AI Assistant <RightOutlined style={{ marginLeft: 8 }}/>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          {/* Background element */}
          <div style={{ 
            position: 'absolute',
            top: '40%',
            right: '10%',
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(76, 29, 149, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
            borderRadius: '50%',
            zIndex: 0
          }}></div>
        </section>

        {/* Built on exSat Section */}
        <section className="exsat-section" style={{ 
          minHeight: '60vh', /* 降低最小高度 */
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          padding: '30px 0', /* 减少上下间距 */
          marginTop: '-20px', /* 向上移动整个部分 */
          background: 'transparent'
        }}>
          <Title level={1} style={{ 
            color: 'white',
            fontSize: '4rem',
            marginBottom: 20,
            position: 'relative',
            zIndex: 2
          }}>
            Built on <span style={{ 
              background: 'linear-gradient(90deg, #6b46c1, #d6bcfa)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>exSat</span>
          </Title>
          
          <Paragraph style={{ 
            fontSize: 20, 
            maxWidth: 800, 
            margin: '0 auto 40px',
            color: '#a0aec0',
            position: 'relative',
            zIndex: 2
          }}>
            exSat extends Bitcoin's metadata consensus, bringing Bitcoin's powerful and established trust mechanism 
            to the creator economy, securing emotional value like never before.
          </Paragraph>
          
          <Space size="large" style={{ 
            marginTop: 24,
            position: 'relative',
            zIndex: 2
          }}>
            <Button 
              type="primary" 
              size="large" 
              icon={<ApiOutlined />} 
              href="https://exsat.network" 
              target="_blank"
              style={{ 
                height: 54,
                paddingLeft: 24,
                paddingRight: 24,
                fontSize: 16
              }}
            >
              Explore exSat
            </Button>
          </Space>
          
          <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
            filter: 'blur(80px)',
            borderRadius: '50%',
            zIndex: 0
          }}></div>
        </section>
      </div>
    </>
  );
};

export default HomePage; 
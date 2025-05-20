import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Tabs, 
  Button,
  Space,
  Table,
  Tag,
  Skeleton,
  Divider,
  Alert,
  Badge
} from 'antd';
import { 
  LineChartOutlined, 
  TeamOutlined, 
  SwapOutlined, 
  LinkOutlined,
  CopyOutlined,
  FileTextOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { useParams, Link, useLocation } from 'react-router-dom';
import { assetApi } from '../services/api';
import ReactECharts from 'echarts-for-react';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

interface Holder {
  address: string;
  balance: string;
  percentage: number;
}

interface Transaction {
  txId: string;
  from: string;
  to: string;
  amount: string;
  timestamp: string;
  type: 'in' | 'out';
}

const AssetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  // 新增：从location.state获取前面创建资产时传递过来的数据
  const assetData = location.state || {};

  // Mock holders data
  const holders: Holder[] = [
    { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', balance: '250,000', percentage: 25 },
    { address: '0x5aeda56215b167893e80b4fe645ba6d5bab767de', balance: '150,000', percentage: 15 },
    { address: '0x6796cc07bac28e08818ed0e6d3bab143b6e74c02', balance: '100,000', percentage: 10 },
    { address: '0x28f35ca8d308bea4b325a9c34b58d6a72876468d', balance: '50,000', percentage: 5 },
    { address: '0xabc123...', balance: '200,000', percentage: 20 }
  ];

  // Mock transactions data
  const transactions: Transaction[] = [
    { txId: 'tx_12345', from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', to: '0x5aeda56215b167893e80b4fe645ba6d5bab767de', amount: '10,000', timestamp: '2023-05-19T12:00:00Z', type: 'out' },
    { txId: 'tx_12346', from: '0x5aeda56215b167893e80b4fe645ba6d5bab767de', to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', amount: '5,000', timestamp: '2023-05-18T10:30:00Z', type: 'in' },
    { txId: 'tx_12347', from: '0x6796cc07bac28e08818ed0e6d3bab143b6e74c02', to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', amount: '2,500', timestamp: '2023-05-17T15:45:00Z', type: 'in' },
    { txId: 'tx_12348', from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', to: '0x28f35ca8d308bea4b325a9c34b58d6a72876468d', amount: '7,500', timestamp: '2023-05-16T08:20:00Z', type: 'out' }
  ];

  const holderColumns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => (
        <Space>
          <Text ellipsis style={{ maxWidth: 150 }}>{text}</Text>
          <CopyOutlined style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => copyToClipboard(text)} />
        </Space>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => `${percentage}%`,
    },
  ];

  const transactionColumns = [
    {
      title: 'Transaction ID',
      dataIndex: 'txId',
      key: 'txId',
      render: (txId: string) => (
        <Space>
          <Text ellipsis style={{ maxWidth: 100 }}>{txId}</Text>
          <LinkOutlined style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => window.open(`https://blockstream.info/tx/${txId}`, '_blank')} />
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        type === 'in' 
          ? <Tag color="green" icon={<ArrowDownOutlined />}>Received</Tag> 
          : <Tag color="volcano" icon={<ArrowUpOutlined />}>Sent</Tag>
      )
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (text: string) => <Text ellipsis style={{ maxWidth: 100 }}>{text}</Text>,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (text: string) => <Text ellipsis style={{ maxWidth: 100 }}>{text}</Text>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add notification here if needed
  };

  useEffect(() => {
    const fetchAssetDetails = async () => {
      setLoading(true);
      try {
        // 如果有location.state（即从创建页跳转过来），直接用
        if (assetData && assetData.tokenName) {
          setAsset({
            id: assetData.id || id || '1',
            name: assetData.tokenName ? assetData.tokenName + 'Token' : '',
            symbol: assetData.tokenName ? assetData.tokenName.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() : '',
            artistName: assetData.artistName || '',
            totalSupply: assetData.totalSupply || '',
            description: assetData.description || '',
            icon: assetData.icon || '',
          });
          setLoading(false);
          return;
        }

        // Real API call
        // const response = await assetApi.getAssetById(id || '');
        // setAsset(response.data.asset);

        // Mock data
        setTimeout(() => {
          setAsset({
            id: id || '1',
            name: 'ExampleToken',
            symbol: 'EXT',
            totalSupply: '1000000',
            circulatingSupply: '750000',
            holdersCount: '120',
            createdAt: '2023-05-19T10:00:00Z',
            description: 'Example token for demonstrating asset details page functionality.',
            contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            creator: '0x5aeda56215b167893e80b4fe645ba6d5bab767de',
            tokenType: 'Utility Token',
            transactionsCount: 235,
            status: 'active',
            iconUrl: '/api/v1/assets/1/icon',
            price: {
              current: '0.05',
              change: '+3.2%'
            }
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching asset details:', error);
        setLoading(false);
      }
    };

    fetchAssetDetails();
  }, [id, assetData]);

  // Chart options
  const getChartOptions = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Holders',
          type: 'line',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [20, 42, 71, 94, 103, 118, 120]
        },
        {
          name: 'Transactions',
          type: 'line',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [10, 42, 85, 120, 160, 195, 235]
        }
      ]
    };
  };

  const getPieChartOptions = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: ['Team', 'Community', 'Liquidity', 'Ecosystem Development']
      },
      series: [
        {
          name: 'Token Distribution',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 150000, name: 'Team' },
            { value: 300000, name: 'Community' },
            { value: 250000, name: 'Liquidity' },
            { value: 300000, name: 'Ecosystem Development' }
          ]
        }
      ]
    };
  };

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <Card style={{ maxWidth: 600, margin: '0 auto', background: 'rgba(44, 31, 95, 0.15)', borderRadius: 16 }}>
        {loading ? <Skeleton active /> : (
          <>
            {asset?.icon && (
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <img src={asset.icon} alt="Asset Icon" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '2px solid #d6bcfa', background: '#fff' }} />
              </div>
            )}
            <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: 16 }}>{asset?.name}</Title>
            <Paragraph style={{ color: '#d6bcfa', textAlign: 'center', marginBottom: 24 }}>{asset?.description}</Paragraph>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col span={12}><Text strong>Asset Symbol:</Text> <Text copyable>{asset?.symbol}</Text></Col>
              <Col span={12}><Text strong>Artist Name:</Text> {asset?.artistName}</Col>
              <Col span={12}><Text strong>Total Supply:</Text> {asset?.totalSupply}</Col>
              <Col span={12}><Text strong>Asset ID:</Text> {asset?.id}</Col>
            </Row>
          </>
        )}
      </Card>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={<span><LineChartOutlined />Analytics</span>} 
          key="1"
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={14}>
              <Card title="Activity Overview" style={{ marginBottom: 24 }}>
                <ReactECharts option={getChartOptions()} style={{ height: 400 }} />
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card title="Token Distribution" style={{ marginBottom: 24, height: '100%' }}>
                <ReactECharts option={getPieChartOptions()} style={{ height: 400 }} />
              </Card>
            </Col>
          </Row>
          
          <Card title="Market Information">
            <Alert 
              message="This is a demo version" 
              description="In the production version, this section would display real-time market data and trading information from actual exchanges." 
              type="info" 
              showIcon 
              style={{ marginBottom: 16 }}
            />
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={8}>
                <Statistic 
                  title="Current Price" 
                  value={asset.price.current} 
                  precision={4} 
                  prefix="$"
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic 
                  title="24h Change" 
                  value={asset.price.change} 
                  valueStyle={{ color: asset.price.change.startsWith('+') ? '#3f8600' : '#cf1322' }}
                  prefix={asset.price.change.startsWith('+') ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic 
                  title="Market Cap" 
                  value={(parseFloat(asset.price.current) * parseFloat(asset.circulatingSupply.replace(/,/g, ''))).toLocaleString()} 
                  prefix="$"
                />
              </Col>
            </Row>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><TeamOutlined />Holders</span>} 
          key="2"
        >
          <Card>
            <Table
              columns={holderColumns}
              dataSource={holders.map((holder, index) => ({ ...holder, key: index }))}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><SwapOutlined />Transactions</span>} 
          key="3"
        >
          <Card>
            <Table
              columns={transactionColumns}
              dataSource={transactions.map((tx, index) => ({ ...tx, key: index }))}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><FileTextOutlined />Whitepaper</span>} 
          key="4"
        >
          <Card>
            <div style={{ whiteSpace: 'pre-wrap', padding: 16 }}>
              <Title level={2}>ExampleToken Whitepaper</Title>
              
              <Title level={3}>1. Introduction</Title>
              <Paragraph>
                ExampleToken is a digital asset based on the Bitcoin ecosystem, designed to serve as a utility token for example purposes.
                This whitepaper outlines the token's purpose, technical specifications, and roadmap.
              </Paragraph>
              
              <Title level={3}>2. Technical Architecture</Title>
              <Paragraph>
                ExampleToken is built on the exSat protocol, inheriting Bitcoin's security and decentralization features. 
                The token utilizes a unique consensus mechanism that ensures fast, secure transactions while maintaining compatibility with Bitcoin.
              </Paragraph>
              
              <Title level={3}>3. Tokenomics</Title>
              <Paragraph>
                <ul>
                  <li><Text strong>Total Supply:</Text> 1,000,000 EXT</li>
                  <li><Text strong>Token Type:</Text> Utility Token</li>
                  <li><Text strong>Distribution:</Text></li>
                  <ul>
                    <li>Team: 15% (150,000 EXT)</li>
                    <li>Community: 30% (300,000 EXT)</li>
                    <li>Liquidity: 25% (250,000 EXT)</li>
                    <li>Ecosystem Development: 30% (300,000 EXT)</li>
                  </ul>
                </ul>
              </Paragraph>
              
              <Title level={3}>4. Use Cases</Title>
              <Paragraph>
                ExampleToken can be used for various purposes within its ecosystem, including:
                <ul>
                  <li>Paying for transaction fees</li>
                  <li>Participating in governance decisions</li>
                  <li>Staking for network security</li>
                  <li>Accessing premium features and services</li>
                </ul>
              </Paragraph>
              
              <Title level={3}>5. Roadmap</Title>
              <Paragraph>
                <ul>
                  <li><Text strong>Phase 1 (Q2 2023):</Text> Token Issuance and Initial Distribution</li>
                  <li><Text strong>Phase 2 (Q3 2023):</Text> Ecosystem Building and Partnership Expansion</li>
                  <li><Text strong>Phase 3 (Q4 2023):</Text> Feature Extension and Use Case Implementation</li>
                  <li><Text strong>Phase 4 (Q1 2024):</Text> Market Expansion and Enhanced Interoperability</li>
                </ul>
              </Paragraph>
              
              <Title level={3}>6. Team</Title>
              <Paragraph>
                Our team consists of blockchain experts, security engineers, and industry advisors dedicated to 
                building secure and efficient blockchain applications.
              </Paragraph>
              
              <Title level={3}>7. Conclusion</Title>
              <Paragraph>
                ExampleToken will provide innovative solutions for digital asset management and exchange, 
                and with the advantages of the exSat platform, we are confident in creating value within the Bitcoin ecosystem.
              </Paragraph>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AssetDetails;

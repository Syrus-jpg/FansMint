import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Button, 
  Table, 
  Tag, 
  Space, 
  Statistic, 
  Input,
  Select,
  Divider,
  Alert,
  Skeleton
} from 'antd';
import { 
  SearchOutlined, 
  RocketOutlined, 
  LineChartOutlined, 
  FileTextOutlined,
  TeamOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { assetApi } from '../services/api';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

interface Asset {
  id: string;
  name: string;
  symbol: string;
  totalSupply: string;
  holdersCount: string;
  circulatingSupply: string;
  createdAt: string;
  status: 'active' | 'pending' | 'paused';
  iconUrl?: string;
  price?: {
    current: string;
    change: string;
  };
}

const Dashboard: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      // Real API call
      // const response = await assetApi.getAssets();
      // setAssets(response.data.assets);

      // Mock data
      setTimeout(() => {
        setAssets([
          {
            id: '1',
            name: 'ExampleToken',
            symbol: 'EXT',
            totalSupply: '1,000,000',
            holdersCount: '120',
            circulatingSupply: '750,000',
            createdAt: '2023-05-19T10:00:00Z',
            status: 'active',
            iconUrl: '/api/v1/assets/1/icon',
            price: {
              current: '0.05',
              change: '+3.2%'
            }
          },
          {
            id: '2',
            name: 'BitcoinUtility',
            symbol: 'BTU',
            totalSupply: '2,100,000',
            holdersCount: '89',
            circulatingSupply: '1,050,000',
            createdAt: '2023-05-15T14:30:00Z',
            status: 'active',
            iconUrl: '/api/v1/assets/2/icon',
            price: {
              current: '0.12',
              change: '+1.5%'
            }
          },
          {
            id: '3',
            name: 'ExSatGovernance',
            symbol: 'ESG',
            totalSupply: '500,000',
            holdersCount: '56',
            circulatingSupply: '300,000',
            createdAt: '2023-05-10T09:15:00Z',
            status: 'active',
            price: {
              current: '0.21',
              change: '-0.7%'
            }
          },
          {
            id: '4',
            name: 'StableBitcoin',
            symbol: 'SBT',
            totalSupply: '10,000,000',
            holdersCount: '345',
            circulatingSupply: '8,500,000',
            createdAt: '2023-05-05T11:00:00Z',
            status: 'active',
            price: {
              current: '1.00',
              change: '+0.1%'
            }
          },
          {
            id: '5',
            name: 'BitDefi',
            symbol: 'BDF',
            totalSupply: '5,000,000',
            holdersCount: '152',
            circulatingSupply: '3,750,000',
            createdAt: '2023-04-28T16:45:00Z',
            status: 'active',
            price: {
              current: '0.03',
              change: '-2.1%'
            }
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching assets:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'pending':
        return 'gold';
      case 'paused':
        return 'volcano';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Asset) => (
        <Space>
          <Link to={`/assets/${record.id}`}>
            <Text strong>{text}</Text>
          </Link>
          <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
        </Space>
      ),
      sorter: (a: Asset, b: Asset) => a.name.localeCompare(b.name),
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (text: string) => <Text code>{text}</Text>,
    },
    {
      title: 'Total Supply',
      dataIndex: 'totalSupply',
      key: 'totalSupply',
      sorter: (a: Asset, b: Asset) => parseFloat(a.totalSupply.replace(/,/g, '')) - parseFloat(b.totalSupply.replace(/,/g, '')),
    },
    {
      title: 'Holders',
      dataIndex: 'holdersCount',
      key: 'holdersCount',
      sorter: (a: Asset, b: Asset) => parseInt(a.holdersCount) - parseInt(b.holdersCount),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: Asset['price']) => (
        <Space>
          <span>${price?.current}</span>
          <span style={{ 
            color: price?.change.startsWith('+') ? '#3f8600' : '#cf1322' 
          }}>
            {price?.change}
          </span>
        </Space>
      ),
      sorter: (a: Asset, b: Asset) => {
        if (a.price && b.price) {
          return parseFloat(a.price.current) - parseFloat(b.price.current);
        }
        return 0;
      },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: Asset, b: Asset) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Asset) => (
        <Space size="small">
          <Link to={`/assets/${record.id}`}>
            <Button size="small" type="primary">View</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const filteredAssets = assets.filter(asset => {
    // First apply search term
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply filter
    if (filter === 'all') return matchesSearch;
    return matchesSearch && asset.status === filter;
  });

  const getTotalStats = () => {
    let totalMarketCap = 0;
    let totalHolders = 0;

    assets.forEach(asset => {
      if (asset.price) {
        totalMarketCap += parseFloat(asset.price.current) * parseFloat(asset.circulatingSupply.replace(/,/g, ''));
      }
      totalHolders += parseInt(asset.holdersCount);
    });

    return {
      totalAssets: assets.length,
      totalHolders,
      totalMarketCap
    };
  };

  const stats = getTotalStats();

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Title level={2}>
        <LineChartOutlined /> Asset Dashboard
      </Title>
      <Paragraph>
        Monitor and manage all assets issued on the platform
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Assets"
              value={stats.totalAssets}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Holders"
              value={stats.totalHolders}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Market Cap"
              value={stats.totalMarketCap}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Alert 
          message="Demo Dashboard" 
          description="This dashboard displays simulated data. In production, real-time data from exSat would be shown." 
          type="info" 
          showIcon 
          style={{ marginBottom: 16 }}
        />
        
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Space style={{ marginBottom: 16 }}>
            <Search
              placeholder="Search by name or symbol"
              allowClear
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: 250 }}
            />
            <Select 
              defaultValue="all"
              style={{ width: 120 }}
              onChange={setFilter}
            >
              <Option value="all">All</Option>
              <Option value="active">Active</Option>
              <Option value="pending">Pending</Option>
              <Option value="paused">Paused</Option>
            </Select>
          </Space>
          
          <Link to="/create">
            <Button 
              type="primary" 
              icon={<RocketOutlined />}
            >
              Create New Asset
            </Button>
          </Link>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={filteredAssets.map(asset => ({ ...asset, key: asset.id }))} 
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;

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
import { ethers } from 'ethers';

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

// Add this for Metamask/ethereum compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    ethereum?: any;
  }
}

const Dashboard: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [xsatName, setXsatName] = useState<string>('');
  const [xsatTotalSupply, setXsatTotalSupply] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletXSAT, setWalletXSAT] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [blockNumber, setBlockNumber] = useState<string>('');
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('');

  // exSat testnet config
  const exsatChainId = '0xcd4f'; // 839999 in hex
  const exsatParams = {
    chainId: exsatChainId,
    chainName: 'exSat Testnet',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18
    },
    rpcUrls: ['https://evm-tst3.exsat.network'],
    blockExplorerUrls: ['https://scan-testnet.exsat.network']
  };

  // exSat 测试网 token 合约地址
  const tokenContracts = [
    {
      address: '0x8266f2fbc720012e5Ac038aD3dbb29d2d613c459', // XSAT
      customName: 'XSAT Token'
    },
    {
      address: '0x4aa4365da82ACD46e378A6f3c92a863f3e763d34', // XBTC
      customName: 'XBTC Token'
    },
    {
      address: '0xA7366BE06B2867a207c0C4F37481fF7B0cE62D87', // USDT
      customName: 'Tether USD'
    },
    {
      address: '0x893AfC357b656EdD4F0c028670516F846FE89CFb', // USDC
      customName: 'USD Coin'
    },
    {
      address: '0x81e1Da8BDEbC4686B9025839c72c7FB0229F180C', // ETH (WETH)
      customName: 'Wrapped ETH'
    }
  ];

  const erc20Abi = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function decimals() view returns (uint8)'
  ];

  const [assetRows, setAssetRows] = useState<any[]>([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalHolders, setTotalHolders] = useState(0); // 可选: 需链上统计
  const [totalMarketCap, setTotalMarketCap] = useState(0); // 可选: 需链上/外部价格

  useEffect(() => {
    async function fetchTokens() {
      const provider = new ethers.JsonRpcProvider('https://evm-tst3.exsat.network');
      const rows = [];
      let holdersSum = 0;
      let marketCapSum = 0;

      // 获取当前区块高度
      try {
        const block = await provider.getBlockNumber();
        setBlockNumber(block.toString());
        setLastUpdateTime(new Date().toLocaleString());
      } catch (err) {
        console.error('Error fetching block number:', err);
      }

      for (const t of tokenContracts) {
        try {
          const contract = new ethers.Contract(t.address, erc20Abi, provider);
          const [name, symbol, totalSupply, decimals] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.totalSupply(),
            contract.decimals()
          ]);
          // 价格和持有人数暂用 mock
          const price = symbol === 'XSAT' ? 0.01 : symbol === 'XBTC' ? 65000 : symbol === 'USDT' ? 1 : symbol === 'USDC' ? 1 : symbol === 'ETH' ? 3500 : 0;
          const holders = Math.floor(Math.random() * 1000) + 50; // mock
          holdersSum += holders;
          const supply = Number(totalSupply) / 10 ** Number(decimals);
          marketCapSum += supply * price;
          rows.push({
            name: t.customName || name,
            symbol,
            totalSupply: supply.toLocaleString(),
            holders,
            price: `$${price}`,
            created: '-',
            status: 'active'
          });
        } catch (e) {
          // 跳过异常
        }
      }
      setAssetRows(rows);
      setTotalAssets(rows.length);
      setTotalHolders(holdersSum);
      setTotalMarketCap(marketCapSum);
    }
    fetchTokens();
  }, []);

  useEffect(() => {
    fetchAssets();
    // Connect to exSat EVM testnet and fetch XSAT token info
    const provider = new ethers.JsonRpcProvider('https://evm-tst3.exsat.network');
    // XSAT Token contract address and minimal ERC20 ABI
    const xsatAddress = '0x8266f2fbc720012e5Ac038aD3dbb29d2d613c459';
    const contract = new ethers.Contract(xsatAddress, erc20Abi, provider);
    async function fetchXSAT() {
      try {
        const name = await contract.name();
        const totalSupply = await contract.totalSupply();
        const decimals = await contract.decimals();
        setXsatName(name);
        // Format total supply with decimals
        setXsatTotalSupply(ethers.formatUnits(totalSupply, decimals));
      } catch (err) {
        setXsatName('Error');
        setXsatTotalSupply('Error');
      }
    }
    fetchXSAT();
  }, []);

  // Connect wallet and switch to exSat testnet
  const connectWallet = async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        alert('Please install Metamask or another EVM wallet.');
        setIsConnecting(false);
        return;
      }
      // Only request account, do not switch network
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error('Wallet connect error:', err);
      alert('Failed to connect wallet.');
    }
    setIsConnecting(false);
  };

  // Fetch XSAT balance after wallet connected
  useEffect(() => {
    if (!walletAddress) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const xsatAddress = '0x8266f2fbc720012e5Ac038aD3dbb29d2d613c459';
    const contract = new ethers.Contract(xsatAddress, erc20Abi, provider);
    async function fetchBalance() {
      try {
        const balance = await contract.balanceOf(walletAddress);
        const decimals = await contract.decimals();
        setWalletXSAT(ethers.formatUnits(balance, decimals));
      } catch (err) {
        setWalletXSAT('Network Error (exSat RPC)');
      }
    }
    fetchBalance();
  }, [walletAddress]);

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
      render: (text: string, record: any) => (
        <Space>
          <Link to={`/assets/${record.id}`}>
            <Text strong>{text}</Text>
          </Link>
          <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
        </Space>
      ),
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
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
      sorter: (a: any, b: any) => parseFloat(a.totalSupply.replace(/,/g, '')) - parseFloat(b.totalSupply.replace(/,/g, '')),
    },
    {
      title: 'Holders',
      dataIndex: 'holders',
      key: 'holders',
      sorter: (a: any, b: any) => a.holders - b.holders,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => <span>{price}</span>,
      sorter: (a: any, b: any) => {
        const pa = parseFloat(a.price.replace('$', ''));
        const pb = parseFloat(b.price.replace('$', ''));
        return pa - pb;
      },
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      render: (date: string) => date,
      sorter: (a: any, b: any) => 0, // mock
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button size="small" type="primary" disabled>View</Button>
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
              value={totalAssets}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Holders"
              value={totalHolders}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Market Cap"
              value={totalMarketCap}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        {/* exSat XSAT token info from exSat EVM testnet */}
        <Col xs={24} md={12}>
          <Card>
            <Statistic
              title="XSAT Token Name (from exSat EVM)"
              value={xsatName}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Statistic
              title="XSAT Total Supply (from exSat EVM)"
              value={xsatTotalSupply}
            />
          </Card>
        </Col>
        {/* 添加区块信息和更新时间 */}
        <Col xs={24} md={12}>
          <Card>
            <Statistic
              title="Current Block Height (exSat Testnet)"
              value={blockNumber || 'Loading...'}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Statistic
              title="Last Update Time"
              value={lastUpdateTime || 'Loading...'}
            />
          </Card>
        </Col>
      </Row>

      {/* Wallet connect and XSAT balance section */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={24}>
          <Card style={{ textAlign: 'right', background: 'rgba(44,31,95,0.10)' }}>
            {walletAddress ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 24 }}>
                <div style={{ fontWeight: 500, color: '#d6bcfa' }}>
                  Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
                <div style={{ fontWeight: 500, color: '#fff' }}>
                  XSAT Balance: {walletXSAT}
                </div>
              </div>
            ) : (
              <Button type="primary" loading={isConnecting} onClick={connectWallet}>
                Connect Wallet (exSat Testnet)
              </Button>
            )}
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
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
          dataSource={assetRows.map((row, idx) => ({ ...row, key: tokenContracts[idx].address, id: tokenContracts[idx].address }))}
          pagination={{ pageSize: 10 }}
        />
        
        {/* 添加数据说明 */}
        <div style={{ marginTop: 16, padding: '12px 24px', background: 'rgba(44,31,95,0.10)', borderRadius: 8 }}>
          <Alert
            message="Data Source Information"
            description={
              <div>
                <p>• All token data (name, symbol, totalSupply) is fetched directly from exSat Testnet</p>
                <p>• Some fields (holders, price) are currently using mock data for demonstration</p>
                <p>• Block height and last update time are real-time from exSat Testnet</p>
              </div>
            }
            type="info"
            showIcon
          />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

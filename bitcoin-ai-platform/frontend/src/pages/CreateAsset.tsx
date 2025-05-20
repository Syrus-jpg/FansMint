import React, { useState } from 'react';
import { 
  Typography, 
  Form, 
  Input, 
  Button, 
  InputNumber, 
  Select, 
  Card, 
  Steps, 
  message, 
  Spin, 
  Divider,
  Alert,
  Space,
  Upload
} from 'antd';
import { 
  RocketOutlined, 
  FileTextOutlined, 
  SolutionOutlined, 
  CheckCircleOutlined,
  BulbOutlined,
  UploadOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { assetApi, aiApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface AssetFormData {
  name: string;
  symbol: string;
  totalSupply: number;
  description: string;
  useCase: string;
  tokenType: string;
  icon?: string; // base64 encoded image
}

const CreateAsset: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);
  const [whitepaper, setWhitepaper] = useState<string>('');
  const [createdAsset, setCreatedAsset] = useState<any>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  // Get AI suggestions
  const getAiSuggestions = async (values: any) => {
    setLoading(true);
    try {
      // 模拟 AI 建议（本地生成，保证演示效果）
      setTimeout(() => {
        setAiSuggestion({
          name: values.tokenName ? `${values.tokenName}Token` : 'RecommendedToken',
          symbol: values.tokenName ? values.tokenName.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() : 'RTK',
          description: values.artistName
            ? `This is a fan-oriented digital asset dedicated to ${values.artistName}, built on the Bitcoin ecosystem via exSat. It is designed to enhance fan engagement, emotional expression, and digital ownership within the ${values.artistName} community.`
            : 'This is a fan-oriented digital asset built on the Bitcoin ecosystem via exSat. It is designed to enhance fan engagement, emotional expression, and digital ownership within the community.',
          marketPotential: 'This fan token has strong potential for viral growth, especially within active online fandoms and cross-platform communities.'
        });
        setLoading(false);
      }, 1200);
    } catch (error) {
      console.error('Failed to get AI suggestions:', error);
      message.error('Failed to get AI suggestions, please try again');
      setLoading(false);
    }
  };

  // Generate whitepaper
  const generateWhitepaper = async (values: AssetFormData) => {
    setLoading(true);
    try {
      // Real API interaction
      // const response = await aiApi.generateWhitepaper(values);
      // setWhitepaper(response.data.content);

      // Simulate API response
      setTimeout(() => {
        setWhitepaper(`# ${values.name} Whitepaper

## Abstract
${values.name} (${values.symbol}) is a digital asset based on the Bitcoin ecosystem, designed to ${values.useCase}.

## 1. Introduction
${values.description}

## 2. Technical Architecture
${values.name} is built on the exSat protocol, inheriting Bitcoin's security and decentralization features.

## 3. Tokenomics
- Total Supply: ${values.totalSupply.toLocaleString()}
- Token Type: ${values.tokenType}
- Distribution Plan: 
  * Team: 15%
  * Community: 30% 
  * Liquidity: 25%
  * Ecosystem Development: 30%

## 4. Use Cases
${values.useCase}

## 5. Roadmap
- Phase 1: Token Issuance and Initial Distribution
- Phase 2: Ecosystem Building and Partnership Expansion
- Phase 3: Feature Extension and Use Case Implementation

## 6. Team
Our team consists of blockchain experts, security engineers, and industry advisors dedicated to building secure and efficient blockchain applications.

## 7. Conclusion
${values.name} will provide innovative solutions for ${values.useCase}, and with the advantages of the exSat platform, we are confident in creating value within the Bitcoin ecosystem.
`);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to generate whitepaper:', error);
      message.error('Failed to generate whitepaper, please try again');
      setLoading(false);
    }
  };

  // Create asset
  const createAsset = async (values: AssetFormData) => {
    setLoading(true);
    try {
      // Real API interaction
      // const response = await assetApi.createAsset(values);
      // setCreatedAsset(response.data);

      // Simulate API response
      setTimeout(() => {
        setCreatedAsset({
          id: 'ast_' + Math.random().toString(36).substr(2, 9),
          name: values.name,
          symbol: values.symbol,
          totalSupply: values.totalSupply,
          createdAt: new Date().toISOString(),
          status: 'active',
          icon: values.icon
        });
        message.success('Asset created successfully!');
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to create asset:', error);
      message.error('Failed to create asset, please try again');
      setLoading(false);
    }
  };

  // Step completion handler
  const onStepComplete = async (values: any) => {
    switch (currentStep) {
      case 0:
        await getAiSuggestions(values);
        setCurrentStep(1);
        break;
      case 1:
        const combinedValues = { 
          ...values,
          ...(aiSuggestion && form.getFieldValue('useAiSuggestion') ? aiSuggestion : {})
        };
        form.setFieldsValue(combinedValues);
        await generateWhitepaper(combinedValues);
        setCurrentStep(2);
        break;
      case 2:
        await createAsset(values);
        setCurrentStep(3);
        break;
      case 3:
        navigate(`/`);
        break;
      default:
        break;
    }
  };

  // Handle icon upload
  const handleIconUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} uploaded successfully`);
      
      // Read the uploaded image file and convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        const base64 = reader.result as string;
        setIconPreview(base64);
        form.setFieldsValue({ icon: base64 });
      };
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const steps = [
    {
      title: 'Basic Information',
      icon: <SolutionOutlined />,
      content: (
        <Form.Item>
          <Card title="Project Basic Information" style={{ marginBottom: 24 }}>
            <Form.Item name="tokenName" label="Token Name" rules={[{ required: true, message: 'Please enter your token name' }]}>
              <Input placeholder="" />
            </Form.Item>
            <Form.Item name="artistName" label="Artist Name" rules={[{ required: true, message: 'Please enter the artist or fan group name' }]}>
              <Input placeholder="" />
            </Form.Item>
            <Alert
              message="AI Assistance"
              description="Based on your project purpose, our AI assistant will suggest a token name, symbol, and description — so you can focus on what matters most: your fandom."
              type="info"
              showIcon
              icon={<BulbOutlined />}
              style={{ marginBottom: 16 }}
            />
          </Card>
          <Button type="primary" onClick={() => form.submit()}>
            Get AI Suggestions
          </Button>
        </Form.Item>
      ),
    },
    {
      title: 'Asset Details',
      icon: <FileTextOutlined />,
      content: (
        <Form.Item>
          {aiSuggestion && (
            <Card 
              title={
                <Space>
                  <BulbOutlined style={{ color: '#f7931a' }} />
                  <span>AI Recommendations</span>
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <Paragraph>
                <Text strong>Name Suggestion: </Text> {aiSuggestion.name}
              </Paragraph>
              <Paragraph>
                <Text strong>Symbol Suggestion: </Text> {aiSuggestion.symbol}
              </Paragraph>
              <Paragraph>
                <Text strong>Description Suggestion: </Text> {aiSuggestion.description}
              </Paragraph>
              <Paragraph>
                <Text strong>Market Potential Analysis: </Text> Market Potential Analysis: {aiSuggestion.marketPotential}
              </Paragraph>
              <Form.Item name="useAiSuggestion" valuePropName="checked">
                <Button type="primary" onClick={() => {
                  form.setFieldsValue({
                    name: aiSuggestion.name,
                    symbol: aiSuggestion.symbol,
                    description: aiSuggestion.description
                  });
                  message.success('AI suggestions applied');
                }}>
                  Apply AI Suggestions
                </Button>
              </Form.Item>
            </Card>
          )}

          <Card title="Asset Detailed Information" style={{ marginBottom: 24 }}>
            <Form.Item name="name" label="Asset Name" rules={[{ required: true, message: 'Please enter asset name' }]}>
              <Input placeholder="e.g., Bitcoin" />
            </Form.Item>
            <Form.Item name="symbol" label="Asset Symbol" rules={[{ required: true, message: 'Please enter asset symbol' }]}>
              <Input placeholder="e.g., BTC" />
            </Form.Item>
            <Form.Item
              name="icon"
              label="Asset Icon"
              extra="Upload an image that represents your token. Recommended size: 200x200px. Format: PNG, JPG."
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Upload
                  name="icon"
                  listType="picture-card"
                  showUploadList={false}
                  customRequest={({ file, onSuccess }: any) => {
                    setTimeout(() => {
                      onSuccess("ok", new Response());
                    }, 0);
                  }}
                  onChange={handleIconUpload}
                  accept=".png,.jpg,.jpeg"
                  maxCount={1}
                >
                  {iconPreview ? (
                    <img src={iconPreview} alt="asset icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div>
                      <PictureOutlined style={{ fontSize: 24 }} />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                {iconPreview && (
                  <Button 
                    type="text" 
                    danger 
                    onClick={() => {
                      setIconPreview(null);
                      form.setFieldsValue({ icon: undefined });
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </Form.Item>
            <Form.Item name="description" label="Asset Description" rules={[{ required: true, message: 'Please enter asset description' }]}>
              <TextArea rows={4} placeholder="Detailed description of your asset features and uses" />
            </Form.Item>
            <Form.Item name="totalSupply" label="Total Supply" rules={[{ required: true, message: 'Please enter total supply' }]}>
              <InputNumber style={{ width: '100%' }} min={1} placeholder="e.g., 21000000" />
            </Form.Item>
            <Form.Item name="tokenType" label="Token Type" rules={[{ required: true, message: 'Please select token type' }]}>
              <Select placeholder="Select token type">
                <Option value="utility">Utility Token</Option>
                <Option value="security">Security Token</Option>
                <Option value="governance">Governance Token</Option>
                <Option value="stablecoin">Stablecoin</Option>
              </Select>
            </Form.Item>
          </Card>
          <Space>
            <Button onClick={() => setCurrentStep(0)}>
              Previous
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              Generate Whitepaper
            </Button>
          </Space>
        </Form.Item>
      ),
    },
    {
      title: 'Whitepaper Preview',
      icon: <FileTextOutlined />,
      content: (
        <Form.Item>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="About This Token" bordered={false} style={{ background: 'rgba(44, 31, 95, 0.15)' }}>
              <Paragraph style={{ fontSize: 16, color: '#e0e0e0' }}>
                <Text strong>{form.getFieldValue('tokenName') ? form.getFieldValue('tokenName') + 'Token' : 'YourToken'}</Text> is a fan token based on the exSat protocol, designed to empower the {form.getFieldValue('artistName') || 'artist'} fan community with emotional value and digital ownership.
              </Paragraph>
            </Card>
            <Card title="Key Use Cases" bordered={false} style={{ background: 'rgba(44, 31, 95, 0.15)' }}>
              <ul style={{ color: '#e0e0e0', fontSize: 16, margin: 0, paddingLeft: 20 }}>
                <li>Fan anniversary check-ins</li>
                <li>Community voting (e.g., favorite stage performance)</li>
                <li>Redeemable for NFTs, badges, or merchandise discounts</li>
              </ul>
            </Card>
            <Card title="Tokenomics" bordered={false} style={{ background: 'rgba(44, 31, 95, 0.15)' }}>
              <Paragraph style={{ color: '#e0e0e0', fontSize: 16, marginBottom: 8 }}>
                <Text strong>Total Supply:</Text> {form.getFieldValue('totalSupply')}
              </Paragraph>
              <Paragraph style={{ color: '#e0e0e0', fontSize: 16, marginBottom: 0 }}>
                <Text strong>Token Type:</Text> {form.getFieldValue('tokenType')}
              </Paragraph>
            </Card>
            <Card title="Roadmap" bordered={false} style={{ background: 'rgba(44, 31, 95, 0.15)' }}>
              <ul style={{ color: '#e0e0e0', fontSize: 16, margin: 0, paddingLeft: 20 }}>
                <li>Phase 1: Token creation and initial distribution</li>
                <li>Phase 2: Launch of fan community engagement features</li>
                <li>Phase 3: AI-powered personalized recommendations and exchange system</li>
              </ul>
            </Card>
            <Card title="Team" bordered={false} style={{ background: 'rgba(44, 31, 95, 0.15)' }}>
              <Paragraph style={{ color: '#e0e0e0', fontSize: 16 }}>
                Maintained by the FansMint project team, currently an open-source community initiative.
              </Paragraph>
            </Card>
            <Card title="Disclaimer" bordered={false} style={{ background: 'rgba(44, 31, 95, 0.15)' }}>
              <Paragraph style={{ color: '#e0e0e0', fontSize: 16 }}>
                This token is not a financial investment, but a tool for emotional connection and fan empowerment.
              </Paragraph>
            </Card>
          </Space>
          <Space>
            <Button onClick={() => setCurrentStep(1)}>
              Previous
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              Create Asset
            </Button>
          </Space>
        </Form.Item>
      ),
    },
    {
      title: 'Complete',
      icon: <CheckCircleOutlined />,
      content: (
        <Form.Item>
          <Card style={{ textAlign: 'center', padding: 24 }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 24 }} />
            {form.getFieldValue('icon') && (
              <div style={{ marginBottom: 24 }}>
                <img 
                  src={form.getFieldValue('icon')} 
                  alt="Asset Icon" 
                  style={{ 
                    width: 100, 
                    height: 100, 
                    objectFit: 'cover', 
                    borderRadius: '50%',
                    border: '2px solid #f0f0f0'
                  }} 
                />
              </div>
            )}
            <Title level={3}>Congratulations! Your asset has been successfully created</Title>
            <Paragraph>
              Asset ID: {createdAsset?.id}
            </Paragraph>
            <Paragraph>
              Asset Name: {createdAsset?.name || (form.getFieldValue('tokenName') ? form.getFieldValue('tokenName') + 'Token' : '')}
            </Paragraph>
            <Paragraph>
              Asset Symbol: {createdAsset?.symbol || (form.getFieldValue('tokenName') ? form.getFieldValue('tokenName').replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() : '')}
            </Paragraph>
            <Paragraph>
              Total Supply: {createdAsset?.totalSupply || form.getFieldValue('totalSupply')}
            </Paragraph>
            <Divider />
            <Space>
              <Button type="primary" onClick={() => navigate(`/`)}>
                Back to Home
              </Button>
              <Button onClick={() => navigate('/dashboard')}>
                Go to Asset Dashboard
              </Button>
            </Space>
          </Card>
        </Form.Item>
      ),
    },
  ];

  return (
    <div className="create-asset-page">
      <Title level={2}>
        <RocketOutlined /> Issue New Asset
      </Title>
      <Paragraph style={{ marginBottom: 24 }}>
        Launch your own fan token in just a few steps — no coding skills needed. Built on Bitcoin, powered by emotion.
      </Paragraph>

      <Steps
        current={currentStep}
        items={steps.map(item => ({
          title: item.title,
          icon: item.icon,
        }))}
        style={{ marginBottom: 32 }}
      />

      <Spin spinning={loading && currentStep !== 2}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onStepComplete}
          initialValues={{
            name: '',
            symbol: '',
            totalSupply: 1000000,
            description: '',
            useCase: '',
            tokenType: 'utility'
          }}
        >
          {steps[currentStep].content}
        </Form>
      </Spin>
    </div>
  );
};

export default CreateAsset;
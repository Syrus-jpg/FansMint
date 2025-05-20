import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Asset related API
export const assetApi = {
  // Get asset list
  getAssets: () => api.get('/assets'),
  
  // Get asset details
  getAssetById: (id: string) => api.get(`/assets/${id}`),
  
  // Create new asset
  createAsset: (assetData: any) => api.post('/assets/create', assetData),
};

// AI related API
export const aiApi = {
  // Generate whitepaper
  generateWhitepaper: (data: any) => api.post('/ai/generate-whitepaper', data),
  
  // Get token suggestions
  getTokenSuggestions: (data: any) => api.post('/ai/token-suggestion', data),
};

export default api; 
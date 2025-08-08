// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://gasguard-backend-omega.vercel.app'
  : 'http://localhost:3001';

// API Endpoints
export const API_ENDPOINTS = {
  ALERTS: `${API_BASE_URL}/api/alerts`,
  ALERTS_DISMISS: (id) => `${API_BASE_URL}/api/alerts/${id}/dismiss`,
  ALERTS_ACTION: (id) => `${API_BASE_URL}/api/alerts/${id}/action`,
  APPROVALS: (address) => `${API_BASE_URL}/api/okx/approvals?address=${address}`,
  APPROVALS_REVOKE: `${API_BASE_URL}/api/approvals/revoke`,
  GAS_DATA: `${API_BASE_URL}/api/okx/gas`,
  SECURITY: (contractAddress) => `${API_BASE_URL}/api/okx/security?contractAddress=${contractAddress}`,
  MARKETS: `${API_BASE_URL}/api/markets`
};

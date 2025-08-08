const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const OKX_API_KEY = process.env.OKX_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'GasGuard Backend API is running!',
    version: '1.0.0',
    endpoints: ['/api/alerts', '/api/okx/gas', '/api/okx/approvals']
  });
});

// Gas data endpoint with Etherscan fallback
app.get('/api/okx/gas', async (req, res) => {
  try {
    // Fallback to Etherscan
    const etherscanResponse = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`);
    
    if (etherscanResponse.data && etherscanResponse.data.result) {
      const gasData = etherscanResponse.data.result;
      return res.json({
        low: parseInt(gasData.SafeGasPrice) || 20,
        standard: parseInt(gasData.StandardGasPrice) || 25,
        high: parseInt(gasData.FastGasPrice) || 30,
        lastUpdated: new Date().toISOString(),
        source: 'Etherscan'
      });
    }

    // Final fallback
    res.json({
      low: 20,
      standard: 25,
      high: 30,
      lastUpdated: new Date().toISOString(),
      source: 'fallback'
    });

  } catch (error) {
    console.error('Gas API Error:', error);
    res.status(500).json({ error: 'Failed to fetch gas data' });
  }
});

// Token approvals endpoint
app.get('/api/okx/approvals', async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' });
    }

    // Mock data for now
    const mockApprovals = [
      {
        id: '1',
        tokenName: 'USDC',
        tokenSymbol: 'USDC',
        tokenAddress: '0xa0b86a33e6ba3c0e9439c4bb9ad09c9b93e7b6b2',
        spender: 'Uniswap V3',
        spenderAddress: '0xe592427a0aece92de3edee1f18e0157c05861564',
        allowance: 'Unlimited',
        lastUsed: '2024-01-15',
        riskLevel: 'medium'
      }
    ];

    res.json({
      approvals: mockApprovals,
      totalCount: mockApprovals.length
    });
  } catch (error) {
    console.error('Approvals API Error:', error);
    res.status(500).json({ error: 'Failed to fetch approvals' });
  }
});

// Security check endpoint
app.get('/api/okx/security', async (req, res) => {
  try {
    const { contractAddress } = req.query;
    
    if (!contractAddress) {
      return res.status(400).json({ error: 'Contract address parameter is required' });
    }

    // Mock security data
    res.json({
      contractAddress,
      securityScore: 85,
      riskLevel: 'Low',
      checks: {
        verified: true,
        hasProxy: false,
        hasTimelock: true,
        hasMultisig: true
      },
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Security API Error:', error);
    res.status(500).json({ error: 'Failed to fetch security data' });
  }
});

// Alerts endpoints
app.get('/api/alerts', (req, res) => {
  const mockAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Gas Fees',
      description: 'Gas prices are currently high. Consider waiting for lower fees.',
      timestamp: new Date().toISOString(),
      priority: 'medium'
    },
    {
      id: 2,
      type: 'security',
      title: 'Suspicious Contract Detected',
      description: 'A contract you\'re about to interact with has security concerns.',
      timestamp: new Date().toISOString(),
      priority: 'high'
    }
  ];

  res.json({ success: true, data: mockAlerts });
});

app.post('/api/alerts/:id/dismiss', (req, res) => {
  const { id } = req.params;
  res.json({ success: true, message: `Alert ${id} dismissed` });
});

app.post('/api/alerts/:id/action', (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  res.json({ success: true, message: `Action ${action} taken for alert ${id}` });
});

// Approval revoke endpoint
app.post('/api/approvals/revoke', (req, res) => {
  const { tokenAddress, spenderAddress, userAddress } = req.body;
  
  if (!tokenAddress || !spenderAddress || !userAddress) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  res.json({
    success: true,
    message: 'Approval revoked successfully',
    transactionData: {
      to: tokenAddress,
      data: '0x',
      gasLimit: '21000'
    }
  });
});

// Markets endpoint
app.get('/api/markets', (req, res) => {
  const mockMarkets = [
    {
      id: 'ETH-USDT',
      name: 'Ethereum',
      price: 2245.67,
      change24h: 2.45,
      volume: '1.2B'
    },
    {
      id: 'BTC-USDT', 
      name: 'Bitcoin',
      price: 43521.89,
      change24h: -1.23,
      volume: '2.8B'
    }
  ];
  
  res.json({ success: true, data: mockMarkets });
});

// Export for Vercel
module.exports = app;
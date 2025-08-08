const axios = require('axios');

// Environment variables
const OKX_API_KEY = process.env.OKX_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;

  try {
    // Health check endpoint
    if (url === '/' || url === '') {
      return res.status(200).json({
        message: 'GasGuard Backend API is running!',
        version: '1.0.0',
        endpoints: ['/api/alerts', '/api/okx/gas', '/api/okx/approvals']
      });
    }

    // Gas data endpoint
    if (url === '/api/okx/gas' && method === 'GET') {
      try {
        const etherscanResponse = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`);
        
        if (etherscanResponse.data && etherscanResponse.data.result) {
          const gasData = etherscanResponse.data.result;
          return res.status(200).json({
            low: parseInt(gasData.SafeGasPrice) || 20,
            standard: parseInt(gasData.StandardGasPrice) || 25,
            high: parseInt(gasData.FastGasPrice) || 30,
            lastUpdated: new Date().toISOString(),
            source: 'Etherscan'
          });
        }
      } catch (error) {
        console.log('Etherscan API failed, using fallback');
      }

      // Fallback
      return res.status(200).json({
        low: 20,
        standard: 25,
        high: 30,
        lastUpdated: new Date().toISOString(),
        source: 'fallback'
      });
    }

    // Alerts endpoint
    if (url === '/api/alerts' && method === 'GET') {
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

      return res.status(200).json({ success: true, data: mockAlerts });
    }

    // Token approvals endpoint
    if (url.startsWith('/api/okx/approvals') && method === 'GET') {
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

      return res.status(200).json({
        approvals: mockApprovals,
        totalCount: mockApprovals.length
      });
    }

    // Security check endpoint
    if (url.startsWith('/api/okx/security') && method === 'GET') {
      return res.status(200).json({
        contractAddress: req.query.contractAddress || 'unknown',
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
    }

    // Markets endpoint
    if (url === '/api/markets' && method === 'GET') {
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
      
      return res.status(200).json({ success: true, data: mockMarkets });
    }

    // Alert dismiss endpoint
    if (url.includes('/api/alerts/') && url.includes('/dismiss') && method === 'POST') {
      const id = url.split('/')[3];
      return res.status(200).json({ success: true, message: `Alert ${id} dismissed` });
    }

    // Alert action endpoint
    if (url.includes('/api/alerts/') && url.includes('/action') && method === 'POST') {
      const id = url.split('/')[3];
      return res.status(200).json({ success: true, message: `Action taken for alert ${id}` });
    }

    // Approval revoke endpoint
    if (url === '/api/approvals/revoke' && method === 'POST') {
      return res.status(200).json({
        success: true,
        message: 'Approval revoked successfully',
        transactionData: {
          to: req.body?.tokenAddress || 'unknown',
          data: '0x',
          gasLimit: '21000'
        }
      });
    }

    // Default 404
    res.status(404).json({ error: 'Endpoint not found' });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
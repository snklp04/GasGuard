require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'GasGuard Backend API is running!', version: '1.0.0' });
});

// Example: Fetch gas data from OKX DEX API
app.get('/api/okx/gas', async (req, res) => {
  try {
    // Fallback to Etherscan gas tracker
    const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TODO: Add more endpoints for approvals, security, etc.

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`GasGuard backend running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;

// Token approvals endpoint
app.get('/api/okx/approvals', async (req, res) => {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'Missing address parameter' });
  try {
    // Example OKX endpoint for approvals (replace with actual endpoint if different)
    const response = await axios.get(`https://www.okx.com/api/v5/dex/public/token-approval?address=${address}`, {
      headers: {
        'OK-ACCESS-KEY': process.env.OKX_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contract security endpoint
app.get('/api/okx/security', async (req, res) => {
  const { contractAddress } = req.query;
  if (!contractAddress) return res.status(400).json({ error: 'Missing contractAddress parameter' });
  try {
    // Example OKX endpoint for contract security (replace with actual endpoint if different)
    const response = await axios.get(`https://www.okx.com/api/v5/dex/public/security-check?contractAddress=${contractAddress}`, {
      headers: {
        'OK-ACCESS-KEY': process.env.OKX_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alerts endpoint
app.get('/api/alerts', async (req, res) => {
  try {
    // Mock alerts data - replace with actual OKX API or database
    const alerts = [
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
    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dismiss alert endpoint
app.post('/api/alerts/:id/dismiss', async (req, res) => {
  try {
    const { id } = req.params;
    // In a real app, you'd update the database here
    res.json({ success: true, message: `Alert ${id} dismissed` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Take action on alert endpoint
app.post('/api/alerts/:id/action', async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    // In a real app, you'd handle the specific action here
    res.json({ success: true, message: `Action ${action} taken for alert ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Revoke approval endpoint
app.post('/api/approvals/revoke', async (req, res) => {
  try {
    const { tokenAddress, spenderAddress, userAddress } = req.body;
    
    if (!tokenAddress || !spenderAddress || !userAddress) {
      return res.status(400).json({ 
        error: 'Missing required parameters: tokenAddress, spenderAddress, userAddress' 
      });
    }

    // Mock response - in a real app, you'd interact with the blockchain
    res.json({ 
      success: true, 
      message: 'Approval revoke transaction prepared',
      transactionData: {
        to: tokenAddress,
        data: '0x', // This would be the actual transaction data
        gasLimit: '21000'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

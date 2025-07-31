require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`GasGuard backend running on port ${PORT}`);
});

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

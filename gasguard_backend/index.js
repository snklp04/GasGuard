module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Health check
  if (req.url === '/' || req.url === '') {
    res.status(200).json({ 
      message: 'GasGuard Backend API is running!', 
      version: '1.0.0',
      endpoints: ['/api/alerts', '/api/okx/gas', '/api/okx/approvals']
    });
    return;
  }

  // Alerts endpoint
  if (req.url === '/api/alerts' && req.method === 'GET') {
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
    res.status(200).json({ success: true, data: alerts });
    return;
  }

  // Gas data endpoint
  if (req.url === '/api/okx/gas' && req.method === 'GET') {
    // Mock gas data
    res.status(200).json({
      status: '1',
      message: 'OK',
      result: {
        SafeGasPrice: '20',
        StandardGasPrice: '25',
        FastGasPrice: '30'
      }
    });
    return;
  }

  // Default 404
  res.status(404).json({ error: 'Endpoint not found' });
};

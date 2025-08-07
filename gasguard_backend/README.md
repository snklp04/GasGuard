# GasGuard Backend

Backend API for the GasGuard application, providing gas optimization, token approval management, and security alerts.

## Features

- 🔥 Gas price tracking with Etherscan API fallback
- 🔐 Token approval management with OKX DEX API
- ⚠️ Security alerts and contract scanning
- 🚀 RESTful API with CORS support

## API Endpoints

### Gas Data
- `GET /api/okx/gas` - Get current gas prices

### Token Approvals
- `GET /api/okx/approvals?address=<wallet_address>` - Get token approvals for an address
- `POST /api/approvals/revoke` - Revoke token approval

### Security
- `GET /api/okx/security?contractAddress=<contract_address>` - Check contract security

### Alerts
- `GET /api/alerts` - Get security alerts
- `POST /api/alerts/:id/dismiss` - Dismiss an alert
- `POST /api/alerts/:id/action` - Take action on an alert

### Health Check
- `GET /` - Health check endpoint

## Deployment

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Set the following environment variables:
   - `OKX_API_KEY`: Your OKX API key
   - `ETHERSCAN_API_KEY`: Your Etherscan API key
   - `PORT`: 3001 (or Railway's assigned port)

3. Railway will automatically detect the Node.js app and deploy

### Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## CORS Configuration

The backend is configured to accept requests from any origin for development. For production, consider restricting CORS to your frontend domain.

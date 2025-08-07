# Deploy GasGuard Backend to Vercel

## 🚀 Quick Deployment Steps

### 1. Push to GitHub
Make sure your backend code is pushed to your GitHub repository.

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: Set the root directory to `gasguard_backend`
5. Vercel will auto-detect it as a Node.js project

### 3. Set Environment Variables
In Vercel dashboard, go to Settings > Environment Variables and add:

```
OKX_API_KEY = 4cc0d0a9-1215-4a42-8849-f54b29827596
ETHERSCAN_API_KEY = Q7VBC1Y2AEIFB3IC3V2CNM87CGNN7F8EW3
NODE_ENV = production
```

### 4. Deploy
Click "Deploy" - Vercel will build and deploy your backend automatically.

## 📡 API Endpoints

Once deployed, your API will be available at:
- Base URL: `https://your-project-name.vercel.app`
- Health check: `https://your-project-name.vercel.app/`
- Gas data: `https://your-project-name.vercel.app/api/okx/gas`
- Alerts: `https://your-project-name.vercel.app/api/alerts`

## ⚠️ Important Notes

1. **Serverless Environment**: Vercel runs your backend as serverless functions
2. **Cold Starts**: First request might be slower due to cold start
3. **Execution Time**: Functions have a 10-second execution limit on free plan
4. **Database**: For production, consider adding a database (Vercel KV, PostgreSQL, etc.)

## 🔄 Update Frontend

After deployment, update your frontend API calls from:
```javascript
const response = await fetch('http://localhost:3001/api/alerts');
```

To:
```javascript
const response = await fetch('https://your-project-name.vercel.app/api/alerts');
```

## 🛠️ Local Development

For local development, the server will still run on port 3001:
```bash
npm start
```

## 📱 Alternative: Separate Backend Hosting

Consider these alternatives for better backend performance:
- **Railway**: Better for persistent servers
- **Render**: Good free tier for backends
- **Heroku**: Traditional platform-as-a-service

Vercel is optimized for frontend + API routes, but works fine for simple backends!

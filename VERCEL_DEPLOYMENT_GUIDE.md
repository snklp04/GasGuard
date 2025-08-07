# 🚀 Complete Vercel Deployment Guide

## 📋 **Step-by-Step Deployment Instructions**

### **Phase 1: Prepare Your Code**

✅ **Already Done:**
- API configuration centralized in `src/config/api.ts`
- Frontend updated to use configurable API endpoints
- Backend configured for Vercel serverless deployment
- Both projects have proper `vercel.json` files

---

## **Phase 2: Deploy Backend First**

### **Step 1: Deploy Backend to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure Backend Project:**
   - **Project Name**: `gasguard-backend`
   - **Root Directory**: `gasguard_backend`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

5. **Set Environment Variables:**
   ```
   OKX_API_KEY = 4cc0d0a9-1215-4a42-8849-f54b29827596
   ETHERSCAN_API_KEY = Q7VBC1Y2AEIFB3IC3V2CNM87CGNN7F8EW3
   NODE_ENV = production
   ```

6. **Click "Deploy"**

✅ **You'll get a URL like**: `https://gasguard-backend-xyz.vercel.app`

---

## **Phase 3: Update Frontend with Backend URL**

### **Step 2: Update API Configuration**

Once your backend is deployed, update the API URL:

1. **Open** `gasguard_frontend/src/config/api.ts`
2. **Replace** `https://your-backend-url.vercel.app` with your actual backend URL
3. **Example:**
   ```typescript
   export const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://gasguard-backend-xyz.vercel.app' // Your actual URL
     : 'http://localhost:3001';
   ```

---

## **Phase 4: Deploy Frontend**

### **Step 3: Deploy Frontend to Vercel**

1. **Go to Vercel again**
2. **Click "New Project"**
3. **Import the same GitHub repository**
4. **Configure Frontend Project:**
   - **Project Name**: `gasguard`
   - **Root Directory**: Leave as `/` (root)
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (already configured)
   - **Output Directory**: `gasguard_frontend/dist` (already configured)

5. **Click "Deploy"**

✅ **You'll get a URL like**: `https://gasguard-xyz.vercel.app`

---

## **Phase 5: Test Your Deployment**

### **Step 4: Verify Everything Works**

1. **Visit your frontend URL**
2. **Test these features:**
   - ✅ Home page loads
   - ✅ Alerts page shows data
   - ✅ Token approvals work
   - ✅ Gas tracker functions
   - ✅ No console errors

---

## **🎯 Quick Commands Summary**

```bash
# 1. Commit your changes
git add .
git commit -m "Ready for production deployment"
git push origin main

# 2. Deploy backend first (manual in Vercel dashboard)
# 3. Update API URL in frontend
# 4. Deploy frontend (manual in Vercel dashboard)
```

---

## **📱 Final URLs Structure**

After deployment you'll have:

- **Frontend**: `https://gasguard-xyz.vercel.app`
- **Backend**: `https://gasguard-backend-xyz.vercel.app`
- **API Endpoints**:
  - Health: `https://gasguard-backend-xyz.vercel.app/`
  - Alerts: `https://gasguard-backend-xyz.vercel.app/api/alerts`
  - Gas Data: `https://gasguard-backend-xyz.vercel.app/api/okx/gas`

---

## **🔧 Troubleshooting**

**If deployment fails:**
1. Check environment variables are set correctly
2. Ensure root directory is correct for each project
3. Check build logs in Vercel dashboard
4. Verify all dependencies are in package.json

**If API calls fail:**
1. Check CORS is enabled (already configured)
2. Verify backend URL is correct in api.ts
3. Check browser network tab for exact error

---

## **🎉 You're Ready!**

Follow these steps and your GasGuard application will be fully deployed and functional on Vercel!

# Vercel Deployment Instructions for Resorcery

## ✅ Deployment Preparation Complete

I've configured your project for Vercel deployment with:
- ✅ `vercel.json` configuration for Express server
- ✅ Optimized `package.json` build scripts  
- ✅ Environment variables template (`.env.example`)
- ✅ Production build tested locally
- ✅ All changes committed to git
- ✅ README and documentation created

## 🚀 Next Steps (You'll need to do these):

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Login to Vercel:**
   ```bash
   vercel login
   ```
   *(Follow the authentication flow)*

2. **Deploy to production:**
   ```bash
   vercel --prod
   ```
   
3. **Follow the prompts:**
   - Project name: `resorcery-nyc` (or your preference)
   - Directory: `.` (current directory)
   - Link to existing project: `N` (new project)
   - Set up project: `Y`

### Option 2: Deploy via Vercel Dashboard (Alternative)

1. **Push to GitHub first:**
   ```bash
   # Create new repository on GitHub (github.com/new)
   git remote add origin https://github.com/yourusername/resorcery-nyc.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Vercel will auto-detect settings from `vercel.json`

## 🔧 Environment Variables to Set in Vercel

In your Vercel dashboard, add these environment variables:

| Variable | Value | Notes |
|----------|--------|-------|
| `NODE_ENV` | `production` | Required |
| `REACT_APP_MAPBOX_TOKEN` | `[your_mapbox_token]` | Optional - for enhanced maps |
| `SESSION_SECRET` | `[random_string]` | Required for sessions |

*Get a free Mapbox token at [mapbox.com](https://mapbox.com) if you want enhanced mapping features.*

## 📋 Expected Deployment Result

Once deployed, you'll get:
- **Live URL:** `https://resorcery-nyc.vercel.app` (or similar)
- **Automatic SSL certificate**
- **Global CDN distribution**
- **Automatic deployments** on future commits

## 🎯 For David Prize Application

Once deployed, update the application with:
- **Platform Demo:** `https://your-app.vercel.app`
- **GitHub Repository:** `https://github.com/yourusername/resorcery-nyc`

## ⚠️ Potential Issues & Solutions

**If build fails:**
- Check Vercel build logs for specific errors
- The bundle is large (2MB+) due to visualization libraries - this is normal
- Serverless function has 250MB limit, which should be sufficient

**If Express server doesn't work:**
- The `vercel.json` is configured for Express support
- All routes are properly configured to handle the server
- Function timeout is set to 30 seconds

**If environment variables are missing:**
- Set them in Vercel dashboard under Project Settings > Environment Variables
- Redeploy after adding environment variables

## 📱 Testing After Deployment

1. **Homepage:** Should show community-first messaging
2. **Executive Dashboard:** `/executive-dashboard` - Mayor's office view
3. **All Tools:** Navigate through simplified 4-tool structure
4. **Brooklyn Demo:** Test the guided demo experience

## 🎉 Ready for Presentations!

Once deployed, you'll have a professional live demo perfect for:
- NYC Mayor presentations
- David Prize submission  
- Community stakeholder meetings
- Investor/partner demos

The platform is now positioned as **"evidence-based community development"** rather than just housing tech!
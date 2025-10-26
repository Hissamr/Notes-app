# 🚀 Complete Step-by-Step Deployment Guide

Follow these exact steps to deploy your Notes App to production.

---

## 📋 **Pre-Deployment Checklist**

Before starting, make sure you have:
- [ ] GitHub account (you already have: Hissamr)
- [ ] Your code pushed to GitHub
- [ ] Email address for sign-ups

---

## 🔑 **STEP 1: Generate JWT Secret**

This is CRITICAL for security. Run ONE of these commands:

### Option A: Using Node.js (Recommended)
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### Option B: Using PowerShell
```powershell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```

**📝 Copy the output** - You'll need it in Step 5!

Example output: `Xy9+kL2mN4pQ8rS5tU7vW9xY0zA1bC3dE5fG7hJ9kL2mN4pQ8rS5tU7vW9xY0zA=`

---

## 🗄️ **STEP 2: Deploy Backend to Railway**

### 2.1 Sign Up for Railway
1. Go to: https://railway.app
2. Click **"Start a New Project"**
3. Sign in with your GitHub account
4. Authorize Railway to access your repositories

### 2.2 Create New Project
1. Click **"+ New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: **`Hissamr/Notes-app`**
4. Click **"Deploy Now"**

### 2.3 Configure Build Settings
1. In your project, click on your service
2. Go to **"Settings"** tab
3. Under **"Build"** section:
   - **Root Directory**: `backend/notesapp`
   - **Build Command**: Leave as default (Railway auto-detects Maven)
4. Click **"Save"**

### 2.4 Add PostgreSQL Database
1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Wait for provisioning (30 seconds)
4. PostgreSQL will auto-create these variables:
   - `DATABASE_URL`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

### 2.5 Set Environment Variables
1. Click on your **backend service** (not the database)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add these ONE BY ONE:

```bash
# Variable 1
SPRING_PROFILES_ACTIVE=prod

# Variable 2 (Use YOUR generated secret from Step 1!)
JWT_SECRET=<paste-your-generated-secret-here>

# Variable 3
JWT_EXPIRATION=86400000

# Variable 4 (We'll update this after deploying frontend)
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

5. Click **"Add"** for each variable

### 2.6 Deploy Backend
1. Railway should auto-deploy after adding variables
2. If not, click **"Deploy"** button
3. Wait 2-3 minutes for build to complete
4. Check **"Deployments"** tab for build logs

### 2.7 Get Your Backend URL
1. Go to **"Settings"** tab
2. Under **"Domains"** section
3. Click **"Generate Domain"**
4. Copy your URL: `https://[your-app].railway.app`

**📝 SAVE THIS URL** - You need it for Step 3!

---

## 🌐 **STEP 3: Deploy Frontend to Vercel**

### 3.1 Sign Up for Vercel
1. Go to: https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find your repository: **`Hissamr/Notes-app`**
3. Click **"Import"**

### 3.3 Configure Build Settings
1. **Framework Preset**: Select **"Create React App"**
2. **Root Directory**: Click **"Edit"** → Enter: `frontend`
3. **Build Command**: `npm run build` (auto-filled)
4. **Output Directory**: `build` (auto-filled)
5. **Install Command**: `npm install` (auto-filled)

### 3.4 Add Environment Variable
1. Scroll to **"Environment Variables"** section
2. Add this variable:

```
Name: REACT_APP_API_URL
Value: https://[your-railway-url].railway.app/api
```

**⚠️ IMPORTANT**: Replace `[your-railway-url]` with YOUR actual Railway URL from Step 2.7

Example: `https://notesapp-production-abc123.railway.app/api`

3. Click **"Add"**

### 3.5 Deploy Frontend
1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. Vercel will show you the deployment status

### 3.6 Get Your Frontend URL
1. After deployment completes, you'll see: **"Congratulations!"**
2. Click **"Visit"** or copy your URL
3. Your URL will be: `https://[your-project].vercel.app`

**📝 SAVE THIS URL** - You need it for Step 4!

---

## 🔄 **STEP 4: Update CORS Configuration**

Now we need to tell the backend to accept requests from your frontend.

### 4.1 Update Railway Variables
1. Go back to **Railway**
2. Click on your **backend service**
3. Go to **"Variables"** tab
4. Find `CORS_ALLOWED_ORIGINS`
5. Click **"Edit"** (pencil icon)
6. Update the value to YOUR Vercel URLs:

```
https://[your-project].vercel.app,https://[your-project].vercel.app
```

Example: `https://notes-app-hissamr.vercel.app,https://www.notes-app-hissamr.vercel.app`

7. Click **"Save"**
8. Railway will auto-redeploy (30 seconds)

---

## ✅ **STEP 5: Test Your Deployment**

### 5.1 Test Backend Health
Open this URL in your browser:
```
https://[your-railway-url].railway.app/actuator/health
```

**Expected Response:**
```json
{"status":"UP"}
```

### 5.2 Test Frontend
1. Open: `https://[your-vercel-url].vercel.app`
2. You should see your landing page
3. Click **"Get Started Free"**
4. Register a new account
5. Try creating a note

### 5.3 Check Browser Console
1. Press **F12** to open DevTools
2. Go to **"Console"** tab
3. Check for errors (there should be none)
4. Look for successful API calls

---

## 🐛 **Troubleshooting Common Issues**

### Issue 1: "Failed to fetch" or CORS Error
**Solution:**
1. Check `CORS_ALLOWED_ORIGINS` in Railway
2. Make sure it matches your Vercel URL EXACTLY
3. Include both `https://` versions
4. Wait 30 seconds for Railway to redeploy

### Issue 2: Backend won't start
**Solution:**
1. Go to Railway → Deployments → View Logs
2. Look for error messages
3. Common fixes:
   - Check `JWT_SECRET` is set
   - Verify `SPRING_PROFILES_ACTIVE=prod`
   - Ensure PostgreSQL is running

### Issue 3: Frontend shows blank page
**Solution:**
1. Check Vercel deployment logs
2. Verify `REACT_APP_API_URL` is correct
3. Make sure URL ends with `/api`
4. Rebuild and redeploy

### Issue 4: Can't login/register
**Solution:**
1. Open browser console (F12)
2. Check Network tab for 401/403 errors
3. Verify backend is running (health check)
4. Check if JWT_SECRET matches

---

## 🎉 **Success! Your App is Live**

You should now have:
- ✅ Backend running on Railway with PostgreSQL
- ✅ Frontend running on Vercel
- ✅ CORS properly configured
- ✅ HTTPS enabled automatically
- ✅ Working authentication

**Your Live URLs:**
- Frontend: `https://[your-project].vercel.app`
- Backend: `https://[your-railway-url].railway.app`

---

## 📊 **Monitoring Your App**

### Railway Dashboard:
- View logs: Click service → "Logs" tab
- Check metrics: CPU, Memory, Network
- Database: Click PostgreSQL → View metrics

### Vercel Dashboard:
- View analytics: Project → "Analytics"
- Check deployments: "Deployments" tab
- Monitor performance

---

## 🔒 **Security Checklist**

After deployment, verify:
- [ ] JWT_SECRET is long and random (64+ chars)
- [ ] CORS allows only your domain (not "*")
- [ ] HTTPS is enabled (automatic)
- [ ] H2 console is disabled (check logs)
- [ ] Debug logging is off (check logs)
- [ ] Environment variables are secret (not in code)

---

## 💰 **Costs**

- **Railway**: $5/month with $5 free credit = FREE
- **Vercel**: FREE forever for hobby projects
- **Total**: $0/month (with Railway credit)

---

## 🎯 **Next Steps**

### Optional Improvements:
1. **Custom Domain** ($10/year):
   - Buy from Namecheap or GoDaddy
   - Add to Vercel: Settings → Domains
   
2. **Environment Monitoring**:
   - Set up Sentry for error tracking
   - Enable Vercel Analytics

3. **Email Service**:
   - Configure SendGrid for password reset emails
   - Add to Railway environment variables

---

## 📝 **Configuration Files Summary**

I've created these files for you:
- ✅ `backend/notesapp/railway.json` - Railway build config
- ✅ `backend/notesapp/Procfile` - Deployment command
- ✅ `frontend/vercel.json` - Vercel routing config
- ✅ `backend/notesapp/src/main/resources/application-prod.properties` - Production settings

All files are ready - just follow the steps above!

---

## 🆘 **Need Help?**

If you get stuck:
1. Check the troubleshooting section above
2. Review Railway/Vercel logs
3. Verify all environment variables
4. Make sure URLs don't have trailing slashes

---

## 🎊 **Congratulations!**

You've successfully deployed a full-stack application with:
- Spring Boot backend
- React frontend
- PostgreSQL database
- JWT authentication
- Production-grade security

**Add these links to your resume now!** 🚀

---

**Deployment Time**: ~30-45 minutes
**Last Updated**: October 26, 2025

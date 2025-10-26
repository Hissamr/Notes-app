# 🚀 Deployment Guide - Notes App

## Security Fixes Applied ✅

This guide shows how to deploy your Notes App securely to production.

---

## 📋 Pre-Deployment Checklist

### ✅ Security Fixes Completed:

- [x] JWT secret now uses environment variables
- [x] CORS configuration accepts dynamic origins
- [x] Production profile created (`application-prod.properties`)
- [x] PostgreSQL dependency added
- [x] H2 console disabled in production
- [x] Debug logging disabled in production
- [x] Error stacktraces hidden in production

---

## 🔧 Environment Variables Required

### Backend (Railway/Render):

```bash
SPRING_PROFILES_ACTIVE=prod
JWT_SECRET=<generate-a-secure-random-string>
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
DATABASE_URL=<provided-by-railway>
```

### Frontend (Vercel):

```bash
REACT_APP_API_URL=https://your-backend.railway.app/api
```

---

## 🎲 Generate Secure JWT Secret

Run one of these commands to generate a secure JWT secret:

### Option 1: Node.js

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### Option 2: PowerShell

```powershell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Option 3: Online

Visit: https://generate-random.org/api-token-generator?count=1&length=64

---

## 🚢 Deployment Steps

### **Step 1: Deploy Backend to Railway**

1. **Sign up at [railway.app](https://railway.app)**

2. **Create New Project**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `Notes-app` repository
   - Select `backend/notesapp` as root directory

3. **Add PostgreSQL Database**

   - In your project, click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway auto-creates `DATABASE_URL` environment variable

4. **Set Environment Variables**
   Go to your service → Variables → Add these:

   ```
   SPRING_PROFILES_ACTIVE=prod
   JWT_SECRET=<your-generated-secret>
   JWT_EXPIRATION=86400000
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
   ```

5. **Deploy**
   - Railway auto-deploys from GitHub
   - Wait for build to complete
   - Copy your backend URL (e.g., `https://your-app.railway.app`)

---

### **Step 2: Deploy Frontend to Vercel**

1. **Sign up at [vercel.com](https://vercel.com)**

2. **Import Project**

   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Set root directory to `frontend`

3. **Configure Build Settings**

   ```
   Framework Preset: Create React App
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Set Environment Variable**
   Go to Settings → Environment Variables:

   ```
   REACT_APP_API_URL=https://your-backend.railway.app/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Copy your frontend URL (e.g., `https://your-app.vercel.app`)

---

### **Step 3: Update CORS**

Go back to Railway → Your service → Variables:

```
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,https://www.your-app.vercel.app
```

Redeploy if needed.

---

## 🔒 Security Best Practices

### ✅ DO:

- ✅ Use strong, random JWT secrets (64+ characters)
- ✅ Keep environment variables secret
- ✅ Use HTTPS only (both platforms provide this)
- ✅ Set specific CORS origins (not "\*")
- ✅ Enable rate limiting (future improvement)
- ✅ Regularly update dependencies
- ✅ Monitor logs for suspicious activity

### ❌ DON'T:

- ❌ Commit `.env` files or secrets to Git
- ❌ Use default/weak JWT secrets
- ❌ Enable H2 console in production
- ❌ Use DEBUG logging in production
- ❌ Allow CORS from "\*" (any origin)
- ❌ Expose error stacktraces to users

---

## 🧪 Testing Your Deployment

1. **Test Backend Health**

   ```bash
   curl https://your-backend.railway.app/actuator/health
   ```

   Should return: `{"status":"UP"}`

2. **Test Frontend**

   - Visit `https://your-app.vercel.app`
   - Try to register a new account
   - Login and create a note
   - Test parent-child linking

3. **Check CORS**
   - Open browser console
   - Should see no CORS errors

---

## 📊 Monitoring & Maintenance

### Railway (Backend):

- View logs: Project → Service → Logs
- Check metrics: CPU, Memory, Database usage
- Set up health checks

### Vercel (Frontend):

- Analytics: Project → Analytics
- Monitor build times and deployment status

---

## 🐛 Troubleshooting

### Backend won't start:

- Check Railway logs for errors
- Verify all environment variables are set
- Ensure PostgreSQL database is running

### Frontend can't reach backend:

- Check `REACT_APP_API_URL` is correct
- Verify CORS_ALLOWED_ORIGINS includes your frontend URL
- Check browser console for CORS errors

### Database connection failed:

- Railway should auto-provide `DATABASE_URL`
- Ensure PostgreSQL service is running
- Check database logs in Railway

### 401 Unauthorized errors:

- Ensure JWT_SECRET matches between deployments
- Check token expiration settings
- Verify authentication headers are sent

---

## 💰 Cost Estimate

### Free Tier (Recommended for Portfolio):

- **Railway**: $5/month with $5 free credit monthly = FREE
- **Vercel**: Unlimited for hobby projects = FREE
- **Total**: FREE (with Railway credit) or $5/month

### Paid Plans (If Needed):

- Railway Pro: $20/month (more resources)
- Vercel Pro: $20/month (custom domains, analytics)

---

## 🎯 Next Steps After Deployment

1. **Custom Domain** (Optional):

   - Buy domain from Namecheap (~$10/year)
   - Add to Vercel: Settings → Domains
   - Update CORS_ALLOWED_ORIGINS

2. **Add Email Service** (For password reset):

   - SendGrid (free tier: 100 emails/day)
   - Mailgun
   - AWS SES

3. **Enable Analytics**:

   - Google Analytics
   - Vercel Analytics (built-in)

4. **Add Error Tracking**:
   - Sentry (free tier available)
   - LogRocket

---

## ✅ Deployment Complete!

Your app is now:

- ✅ Securely deployed
- ✅ Using production database
- ✅ Protected with JWT
- ✅ Ready for your portfolio/resume

**Live URLs:**

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app`

Share these links with recruiters! 🎉

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Spring Boot Production Best Practices](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

---

**Need help?** Check the troubleshooting section or review your deployment logs.

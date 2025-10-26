# ⚡ Quick Deployment Commands & Checklist

## 🚀 Before You Start

### Generate JWT Secret

```bash
# Run this FIRST and save the output
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

---

## 📝 Railway Environment Variables Template

Copy and paste these into Railway (update the values):

```
SPRING_PROFILES_ACTIVE=prod
JWT_SECRET=<YOUR_GENERATED_SECRET_FROM_ABOVE>
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

---

## 🌐 Vercel Environment Variable Template

```
REACT_APP_API_URL=https://your-backend.railway.app/api
```

**⚠️ Important**: Don't forget `/api` at the end!

---

## ✅ Deployment Checklist

### Phase 1: Railway Backend Setup

- [ ] Sign up at railway.app with GitHub
- [ ] Create new project from `Hissamr/Notes-app`
- [ ] Set root directory to `backend/notesapp`
- [ ] Add PostgreSQL database
- [ ] Add 4 environment variables
- [ ] Wait for deployment (2-3 min)
- [ ] Copy backend URL: `_______________________`
- [ ] Test health: `https://[your-url].railway.app/actuator/health`

### Phase 2: Vercel Frontend Setup

- [ ] Sign up at vercel.com with GitHub
- [ ] Import `Hissamr/Notes-app` project
- [ ] Set root directory to `frontend`
- [ ] Framework: Create React App
- [ ] Add REACT_APP_API_URL variable
- [ ] Deploy (1-2 min)
- [ ] Copy frontend URL: `_______________________`

### Phase 3: Update CORS

- [ ] Go back to Railway
- [ ] Update CORS_ALLOWED_ORIGINS with Vercel URL
- [ ] Wait 30 seconds for redeploy

### Phase 4: Testing

- [ ] Backend health check returns `{"status":"UP"}`
- [ ] Frontend loads at Vercel URL
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can create a note
- [ ] No CORS errors in browser console
- [ ] No 401/403 errors

---

## 🔗 Your URLs (Fill in after deployment)

```
Frontend: https://________________________________.vercel.app
Backend:  https://________________________________.railway.app
GitHub:   https://github.com/Hissamr/Notes-app
```

---

## 🐛 Quick Fixes

### CORS Error?

```bash
# Make sure CORS_ALLOWED_ORIGINS in Railway matches EXACTLY:
https://your-app.vercel.app
```

### Backend won't start?

1. Check Railway logs
2. Verify JWT_SECRET is set
3. Confirm SPRING_PROFILES_ACTIVE=prod

### Frontend blank page?

1. Check REACT_APP_API_URL has `/api` at end
2. Verify backend is running
3. Check browser console for errors

---

## 📊 Test Commands

### Test Backend Health

```bash
curl https://your-backend.railway.app/actuator/health
```

### Test Backend CORS

```bash
curl -H "Origin: https://your-frontend.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://your-backend.railway.app/api/auth/login
```

---

## 🎯 Success Criteria

Your deployment is successful when:

- ✅ Health check returns UP
- ✅ Frontend loads without errors
- ✅ Can register and login
- ✅ Can create/read/update/delete notes
- ✅ No console errors
- ✅ HTTPS works on both URLs

---

## 💡 Pro Tips

1. **Railway logs are your friend** - Check them if anything fails
2. **Wait 30 seconds** after changing environment variables
3. **Use incognito mode** to test - avoids cache issues
4. **Save your URLs** - You'll need them for your resume
5. **Commit config files** - Don't forget to push the new files!

---

## 🔄 Redeploy Commands

### Force Redeploy Backend (Railway)

```
Go to Railway → Service → Click "Deploy" button
```

### Force Redeploy Frontend (Vercel)

```
Go to Vercel → Deployments → Click "Redeploy"
```

---

## 📱 Share Your App

After successful deployment, share with:

- **Recruiters**: Send both Frontend and GitHub URLs
- **Portfolio**: Add to your personal website
- **LinkedIn**: Post about your project
- **Resume**: Add under "Projects" section

---

**Estimated Time**: 30-45 minutes
**Cost**: $0 (FREE with Railway credit)

Good luck! 🚀

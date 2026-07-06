# Quick Start - GitHub → Vercel (5 Minutes)

## Files You Have

✅ `index.html` - The complete game
✅ `README.md` - Project documentation  
✅ `vercel.json` - Vercel configuration
✅ `.gitignore` - Git ignore rules
✅ `GITHUB_TO_VERCEL.md` - Detailed guide

## 4-Step Deployment

### Step 1: GitHub (2 minutes)

1. Go to **github.com/new**
2. Name: `dating-reveal-game`
3. Make it **Public**
4. Click "Create repository"
5. Click "Add file" → "Upload files"
6. Drag all 4 files (index.html, vercel.json, README.md, .gitignore)
7. Click "Commit changes"

### Step 2: Vercel (2 minutes)

1. Go to **vercel.com**
2. Sign up → "Continue with GitHub"
3. Click "New Project"
4. Select `dating-reveal-game`
5. Click "Import"
6. Click "Deploy"
7. Wait 1-2 minutes

### Step 3: Firebase — Required for game creation (2 minutes)

Game state is stored in Firebase Realtime Database. **Without this step the app cannot create or join games.**

1. Go to **console.firebase.google.com** → create a free project
2. Click **Build → Realtime Database → Create database** (choose "Start in test mode")
3. Copy the database URL shown (e.g. `https://YOUR_PROJECT-default-rtdb.firebaseio.com`)
4. In Vercel: go to your project → **Settings → Environment Variables** → add:
   ```
   Name:  FIREBASE_DATABASE_URL
   Value: https://YOUR_PROJECT-default-rtdb.firebaseio.com
   ```
5. Click **Save**, then go to **Deployments → Redeploy**

### Step 4: Share (30 seconds)

Copy your Vercel URL and send to friends:
```
https://dating-reveal-game-[random].vercel.app
```

## Done! 🎉

Your game is now live and playable for everyone!

---

For detailed instructions, see **GITHUB_TO_VERCEL.md**

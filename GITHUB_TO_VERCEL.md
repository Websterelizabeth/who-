# Deploy to GitHub and Vercel (Complete Guide)

Follow these steps to get your Dating Reveal Game live on Vercel via GitHub.

## Step 1: Create a GitHub Repository

### If you DON'T have a GitHub account yet:
1. Go to **github.com**
2. Click "Sign up"
3. Enter email, create password, choose username
4. Verify your email address

### Create your repository:
1. Go to **github.com/new**
2. Repository name: `dating-reveal-game`
3. Description: "Interactive dating reveal game - guess who submitted the photos"
4. Select **Public** (so it's deployable)
5. Click **"Create repository"**

## Step 2: Upload Files to GitHub

### Option A: Upload via Browser (Easiest)

1. On your new repository page, click **"Add file"** → **"Upload files"**
2. Drag and drop or select these files:
   - `index.html`
   - `vercel.json`
   - `README.md`
   - `.gitignore`
3. Scroll down and click **"Commit changes"**

### Option B: Use Git Command Line

```bash
# Create a folder
mkdir dating-reveal-game
cd dating-reveal-game

# Initialize git
git init

# Add all files (copy index.html, vercel.json, README.md, .gitignore into this folder first)
git add .

# Commit
git commit -m "Initial commit - Dating Reveal Game"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/dating-reveal-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3a. Sign up for Vercel

1. Go to **vercel.com**
2. Click "Sign up"
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### 3b. Deploy your repository

1. After signing in, click **"New Project"**
2. You'll see your GitHub repositories
3. Find **"dating-reveal-game"** and click **"Import"**
4. Keep default settings (nothing needs to change)
5. Click **"Deploy"**
6. Wait 1-2 minutes for deployment

### 3c. Get your live URL

After deployment completes, you'll see:
```
✅ Deployment Complete
https://dating-reveal-game-[random].vercel.app
```

Copy this URL - this is your game link!

## Step 4: Share with Friends

Send your game URL to friends:
```
https://dating-reveal-game-[random].vercel.app
```

They can visit it immediately and start playing!

## Step 5: Update Your Game (Optional)

If you make changes and want to deploy them:

```bash
# Make changes to files locally
# Then:
git add .
git commit -m "Update: describe your change"
git push origin main
```

Vercel automatically redeploys within 1-2 minutes. Your friends can refresh the page to see updates.

## Troubleshooting

### "Repository not found" when deploying
- Make sure repository is **Public**, not Private
- Try disconnecting and reconnecting Vercel to GitHub

### "Deployment failed" error
- Check that all files (especially `index.html`) were uploaded
- Verify files aren't corrupted

### URL doesn't work after deployment
- Wait 5 minutes (sometimes takes longer)
- Try opening in incognito/private mode
- Check Vercel deployment status at vercel.com

### Want a custom domain?
- In Vercel dashboard, go to project Settings
- Click "Domains"
- Add your custom domain (requires DNS setup)

## Your Game is Now Live! 🚀

- **GitHub URL**: https://github.com/YOUR_USERNAME/dating-reveal-game
- **Vercel URL**: https://dating-reveal-game-[random].vercel.app

Friends can visit your Vercel URL anytime to play!

## What's Next?

1. **Customize Colors** - Edit hex codes in `index.html`
2. **Change Photo Limit** - Modify `slice(0, 20)` to different number
3. **Add Features** - Extend the game with new functionality
4. **Promote** - Share your game on social media!

---

**That's it!** Your game is live and ready to play. 🎉

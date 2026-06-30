# Dating Reveal Game 💕

An interactive web-based dating reveal game where friends submit photos, then play together to guess who submitted each photo. Perfect for parties and gatherings!

## Features

✅ **Create or Join Games** - Generate a random code to share with friends
✅ **Photo Submissions** - Upload up to 20 photos per player
✅ **Interactive Gameplay** - Guess who submitted each photo
✅ **Smart Reveal** - Shows all players who submitted the same person
✅ **No Backend** - All data stored locally in browser
✅ **Mobile Friendly** - Works on phones, tablets, and desktop
✅ **Instant** - Deploy in minutes to Vercel

## How to Play

1. **Create a Game** - Enter your name and game title, get a 6-character code
2. **Share Code** - Send code to friends who want to join
3. **Join Game** - Friends enter their name and the code
4. **Submit Photos** - Each player uploads up to 20 photos
5. **Start Game** - Click "Start Game" when ready to play
6. **Guess & Reveal** - See image, guess who submitted it, click to reveal answer

## Example

- You submit a photo of "Jordan"
- Henri and Csenga also submit photos of "Jordan"
- When any of those photos appear in the game
- Players guess who it is
- Answer reveals: **"You + Henri + Csenga"** (all who submitted Jordan)

## Quick Start

### Deploy to Vercel (Recommended - Takes 2 minutes)

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/dating-reveal-game.git
   cd dating-reveal-game
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Get instant live URL!

4. **Share the URL** with your friends

### Or Deploy to Netlify

1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag `index.html` onto the page
3. Get instant live link

### Or Use GitHub Pages

1. Push to GitHub (see steps above)
2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Save and your site is live at `https://yourusername.github.io/dating-reveal-game/`

## Files

- **index.html** - Complete game app (no dependencies needed)
- **vercel.json** - Vercel configuration (optional)
- **README.md** - This file
- **.gitignore** - Git ignore rules

## How It Works

### Create Game Flow
```
Welcome → Create Game → Enter Name & Title → Get Code → Copy & Share
```

### Join Game Flow
```
Welcome → Join Game → Enter Name & Code → View Lobby → Submit Photos
```

### Game Play Flow
```
Lobby → Start Game → See Image & Guess → Click Name → Reveal Answer → Next Photo
```

## Game Rules

- Each player can submit up to 20 photos
- Photos are shuffled randomly when game starts
- Players guess who submitted each photo
- Multiple people can submit photos of the same person
- When revealed, ALL names of people who submitted that person appear together
- Game continues through all submitted photos

## Technical Details

- **Pure HTML/CSS/JavaScript** - No server needed for same-device play
- **localStorage** - Game data persists across page refreshes in the same browser
- **BroadcastChannel** - Instant cross-tab sync within the same browser
- **Firebase (optional)** - Enables real-time cross-device sync
- **Image compression** - Photos auto-resized to 500px max before storing
- **No Dependencies** - Just one HTML file (plus optional Firebase SDK)

## Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy

- All data stored **locally** in browser
- Nothing sent to any server
- No analytics or tracking
- Completely anonymous gameplay

## Customization

### Change Game Code Length
Edit line in `index.html`:
```javascript
code += chars.charAt(Math.floor(Math.random() * chars.length));
```
Repeat the line more/fewer times for longer/shorter codes.

### Change Colors
Search for these hex codes and modify:
- `#667eea` - Primary purple
- `#764ba2` - Secondary purple
- `#FFD700` - Gold highlights

### Modify Photo Limit
Find this line:
```javascript
Array.from(files).slice(0, 20)
```
Change `20` to your desired limit.

## Troubleshooting

**"Game not found" when joining on the same device/browser**
- Double-check the 6-character code (case-insensitive, auto-uppercased)
- Make sure you are using the same browser on the same device — games are stored in that browser's localStorage
- Refreshing the page is safe; game data persists in localStorage

**"Game not found" when joining from a different device (iPhone vs MacBook)**
- This requires a cloud backend. See **Cross-Device Setup (Firebase)** below.

**Photos not uploading**
- Photos are automatically compressed; any image format works
- Try refreshing the page if the photo grid doesn't appear

**Game won't start**
- At least one player must have submitted photos
- Click "Start Game" button in lobby

**Can't see other players' photos**
- On the same browser: photos sync automatically via BroadcastChannel
- On different devices: requires Firebase setup (see below)

## Cross-Device Setup (Firebase)

To allow players on **different devices** (e.g., iPhone + MacBook) to join the same game:

1. **Create a free Firebase project** at https://console.firebase.google.com
2. Click **Add app → Web**, register your app, copy the config object
3. Go to **Build → Realtime Database → Create database → Start in test mode**
4. In `index.html`, find the `FIREBASE_CONFIG = null` line near the bottom of the file and replace it:
   ```js
   const FIREBASE_CONFIG = {
     apiKey: "...",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
     projectId: "YOUR_PROJECT_ID",
   };
   ```
5. Just above the `</body>` tag, uncomment the two Firebase `<script>` lines
6. Redeploy to Vercel/Netlify — cross-device sync is now enabled!

> **Note:** "Test mode" rules allow open read/write for 30 days — sufficient for game sessions. For long-term use, restrict rules to your domain.

## Deployment Tips

### Vercel (Recommended)
- Fastest setup
- Auto-deploys on git push
- Free tier includes everything you need
- Gets a `.vercel.app` domain

### Netlify
- Simple drag & drop deployment
- Free tier works great
- Gets a `.netlify.app` domain
- Auto-deploys from git

### GitHub Pages
- Free hosting
- Gets `yourusername.github.io` domain
- Great for long-term projects
- No third-party needed

## Questions?

Check the troubleshooting section above or open an issue on GitHub.

## License

MIT License - Feel free to use and modify for your needs.

---

**Ready to play?** Deploy now and share the link with your friends! 🎉

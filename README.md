# Dating Reveal Game 💕

An interactive web-based dating reveal game where friends submit photos, then play together to guess who submitted each photo. Perfect for parties and gatherings!

## Features

✅ **Create or Join Games** - Generate a random code to share with friends
✅ **Photo Submissions** - Upload up to 20 photos per player
✅ **Interactive Gameplay** - Guess who submitted each photo
✅ **Smart Reveal** - Shows all players who submitted the same person
✅ **Firebase Backend** - Real-time multiplayer across any device
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

## Firebase Setup (Required for Multiplayer)

The game uses **Firebase Realtime Database** so players on different devices can join the same game in real time. You must create a free Firebase project and add your config to `index.html` before the game will work.

### Step 1 — Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project**, give it a name (e.g. *dating-reveal*), follow the prompts
3. On the left sidebar click **Build → Realtime Database → Create database**
4. Choose any location and start in **test mode** (you can tighten rules later)

### Step 2 — Register a Web App

1. In your project's overview page, click the **`</>`** (Web) icon
2. Give it a nickname and click **Register app**
3. Copy the `firebaseConfig` object that appears — you'll need it next

### Step 3 — Paste Config into index.html

Open `index.html` and find the `firebaseConfig` block near the top of the `<script>` section. Replace the placeholder values with the ones from your Firebase project:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 4 — Set Database Rules

In the Firebase console go to **Realtime Database → Rules** and set:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Click **Publish**. This lets any player read/write game data without logging in.

### Step 5 — Deploy

Commit `index.html` with your config and push to GitHub. Vercel will automatically redeploy.

---



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

- **Pure HTML/CSS/JavaScript** - No server needed
- **Local Storage** - All data stays in browser
- **No Dependencies** - Just one HTML file
- **Responsive Design** - Works on all devices
- **Offline Capable** - Works after first load

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

**"Game not found" when joining**
- Make sure you completed the Firebase setup and deployed the updated `index.html`
- Double-check the 6-character code (it is case-insensitive; the app auto-uppercases it)
- The game creator must have successfully created the game — check for any error alerts

**"Firebase Not Configured" screen on load**
- You haven't replaced the placeholder values in `firebaseConfig` inside `index.html`
- Follow the Firebase Setup section above, then redeploy

**Photos not uploading**
- Ensure photos are JPG or PNG format
- Keep photos under 10MB
- Try refreshing the page

**Game won't start**
- At least one player must have submitted photos
- Click "Start Game" button in lobby

**Can't see other players' photos**
- Photos sync in real time via Firebase — no refresh needed
- Check the browser console for Firebase permission errors; verify your database rules are set to `true`

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

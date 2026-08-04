# How to Clear Browser Cache - Quick Guide for Users

If you're experiencing runtime errors or the website isn't loading properly, please follow these steps:

## Quick Fix: Use Incognito/Private Mode

**Fastest way to test if it's a cache issue:**

- **Chrome/Edge**: `Ctrl+Shift+N` (Windows) or `Cmd+Shift+N` (Mac)
- **Firefox**: `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
- **Safari**: `Cmd+Shift+N`
- **Mobile**: Look for "New Incognito Tab" or "New Private Tab" in browser menu

If the site works in incognito mode, it's definitely a cache issue. Continue with the steps below.

---

## Desktop Browsers

### Chrome / Edge / Brave

**Method 1: Hard Refresh (Quickest)**
1. Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. This forces a reload without cache

**Method 2: Clear Cache (Most Thorough)**
1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Select **"Cached images and files"**
3. Time range: **"All time"**
4. Click **"Clear data"**
5. Reload the page

### Firefox

**Method 1: Hard Refresh**
1. Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Method 2: Clear Cache**
1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Select **"Cache"**
3. Time range: **"Everything"**
4. Click **"Clear Now"**
5. Reload the page

### Safari (Mac)

**Method 1: Empty Cache**
1. Press `Cmd+Option+E`
2. Reload the page

**Method 2: Clear All Website Data**
1. Safari → Preferences → Privacy
2. Click **"Manage Website Data"**
3. Click **"Remove All"**
4. Confirm and reload the page

---

## Mobile Browsers

### iOS (iPhone/iPad) - Safari

**Method 1: Close All Tabs and Force Quit**
1. Close all Safari tabs
2. Double-click home button (or swipe up)
3. Swipe up on Safari to force quit
4. Reopen Safari and try again

**Method 2: Clear Cache (Most Thorough)**
1. Go to **Settings** → **Safari**
2. Scroll down and tap **"Clear History and Website Data"**
3. Confirm by tapping **"Clear History and Data"**
4. Reopen Safari and visit the site

### Android - Chrome

**Method 1: Close All Tabs and Force Stop**
1. Close all Chrome tabs
2. Go to Settings → Apps → Chrome
3. Tap **"Force Stop"**
4. Reopen Chrome and try again

**Method 2: Clear Cache (Most Thorough)**
1. Open Chrome
2. Tap the three dots (⋮) in the top right
3. Go to **Settings** → **Privacy and security**
4. Tap **"Clear browsing data"**
5. Select **"Cached images and files"**
6. Time range: **"All time"**
7. Tap **"Clear data"**
8. Reload the page

### Android - Firefox

1. Tap the three dots (⋮) in the top right
2. Go to **Settings** → **Delete browsing data**
3. Select **"Cache"**
4. Tap **"Delete browsing data"**
5. Reload the page

---

## Still Having Issues?

If clearing cache doesn't work:

1. **Try a different browser** - If Chrome doesn't work, try Firefox or Safari
2. **Check your internet connection** - Try switching between WiFi and mobile data
3. **Update your browser** - Make sure you're using the latest version
4. **Restart your device** - Sometimes a full restart helps

---

## Why Is This Necessary?

We recently updated the website to fix some technical issues. Your browser may have cached old files that are no longer compatible with the new version. Clearing the cache ensures you get the latest, working version of the site.

This is a one-time issue - after clearing your cache once, you shouldn't need to do it again.

---

## For Technical Users

If you want to verify the cache headers:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload the page
4. Check the response headers for the main document
5. You should see:
   ```
   Cache-Control: no-cache, no-store, must-revalidate
   Pragma: no-cache
   Expires: 0
   ```

This confirms the new cache policy is active.

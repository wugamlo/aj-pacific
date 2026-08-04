# Hydration Error Fix - Next.js with Nginx Proxy Manager

## Problem Summary

When updating React components in a Next.js application served through Nginx Proxy Manager, hydration errors can occur even after:
- Updating the source code
- Restarting the Next.js container
- Clearing the `.next` build directory
- Using private browser windows
- Hard refreshing the browser

### Error Message
```
Unhandled Runtime Error
Error: Hydration failed because the initial UI does not match what was rendered on the server.
Expected server HTML to contain a matching <form> in <div>.
```

## Root Cause Analysis

The issue was caused by **multiple layers of caching**:

1. **Next.js Build Cache** (`.next` directory)
   - Stores compiled pages and components
   - Located at `/app/.next` inside the container

2. **Nginx Proxy Manager Asset Cache**
   - Caches JavaScript bundles, CSS, and other static assets
   - Configured via `include conf.d/include/assets.conf;` in proxy host config
   - Located at `/data/nginx/proxy_host/1.conf`

3. **Browser Cache**
   - Caches JavaScript bundles and assets locally
   - Can persist even in private/incognito windows if not properly cleared

## The Solution

When making component changes that result in hydration errors, follow these steps **in order**:

### Step 1: Clear Next.js Build Cache
```bash
docker exec ajpacific-next-app-1 sh -c "rm -rf /app/.next"
docker restart ajpacific-next-app-1
```

### Step 2: Clear Nginx Proxy Manager Cache
```bash
docker restart ajpacific-nginx-proxy-manager-1
```

### Step 3: Clear Browser Cache
- **Chrome/Edge**: Press `Ctrl+Shift+Delete`, select "Cached images and files", click "Clear data"
- **Or**: Open DevTools (F12), right-click refresh button, select "Empty Cache and Hard Reload"

### Quick Command (All at Once)
```bash
docker exec ajpacific-next-app-1 sh -c "rm -rf /app/.next" && \
docker restart ajpacific-next-app-1 && \
docker restart ajpacific-nginx-proxy-manager-1
```

Wait 30-60 seconds for containers to restart, then clear browser cache.

## Why This Happens

Hydration errors occur when:
1. The server renders HTML with one structure (e.g., old form)
2. The client JavaScript expects a different structure (e.g., new iframe)
3. React detects the mismatch and throws a hydration error

In our case:
- The source code was updated (form → iframe)
- Next.js dev server recompiled the page
- But Nginx was serving **cached JavaScript bundles** from before the change
- The browser loaded the cached JS expecting the old form structure
- The server sent HTML with the new iframe structure
- React detected the mismatch → hydration error

## Prevention

To minimize future hydration errors:

1. **Disable Nginx Asset Caching for Development**
   - Edit `/data/nginx/proxy_host/1.conf`
   - Comment out: `# include conf.d/include/assets.conf;`
   - Restart nginx: `docker restart ajpacific-nginx-proxy-manager-1`

2. **Use Cache-Busting Keys**
   - Add unique `key` props to components when making structural changes
   - Example: `<div key="contact-v2">`

3. **Monitor Container Logs**
   - Check if Next.js is actually recompiling: `docker logs --tail 50 ajpacific-next-app-1`
   - Look for "✓ Compiled /contact in Xms" messages

## Related Files

- Next.js App: `/opt/ajpacific/next-app/`
- Nginx Config: `/opt/ajpacific/data/nginx/proxy_host/1.conf`
- Docker Compose: `/opt/ajpacific/docker-compose.yml`

## Date
2026-01-26

# Mobile Browser Troubleshooting Guide

## Issue: "undefined is not an object (evaluating 'originalFactory.call')" Error

This error was caused by hydration mismatches between server-side and client-side rendering in Next.js when using client components with animations.

## Solutions Implemented

### 1. Client Component Wrapper
Created [`ClientLayout.tsx`](components/ClientLayout.tsx) to properly separate client-side code from server components.

**Why this helps:**
- Prevents hydration mismatches
- Ensures proper component initialization
- Separates server and client rendering boundaries

### 2. Dynamic Import with SSR Disabled
Used Next.js dynamic imports with `ssr: false` option:

```typescript
const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false,
  loading: () => null,
});
```

**Why this helps:**
- Prevents server-side rendering of client-only components
- Eliminates hydration errors
- Ensures component only loads in browser environment
- Prevents "window is not defined" errors

### 3. Cache Control Headers
Added cache control headers in [`next.config.js`](next.config.js):

```javascript
headers: [
  {
    key: 'Cache-Control',
    value: 'no-cache, no-store, must-revalidate',
  },
]
```

**Why this helps:**
- Prevents mobile browsers from serving stale cached versions
- Ensures users always get the latest code
- Eliminates issues from aggressive mobile browser caching

## How to Clear Mobile Browser Cache

If you still see errors after the fixes, clear your mobile browser cache:

### iOS Safari
1. Settings → Safari
2. Tap "Clear History and Website Data"
3. Confirm

### Chrome Mobile (Android/iOS)
1. Chrome Menu (⋮) → Settings
2. Privacy → Clear Browsing Data
3. Select "Cached images and files"
4. Tap "Clear data"

### Firefox Mobile
1. Menu (⋮) → Settings
2. Delete browsing data
3. Select "Cache"
4. Tap "Delete browsing data"

## Testing After Changes

1. **Hard Refresh on Desktop:**
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`

2. **Mobile Testing:**
   - Close the browser app completely
   - Clear cache (see above)
   - Reopen and navigate to the site
   - Test the chat widget functionality

3. **Verify No Errors:**
   - Open browser developer tools (mobile debugging)
   - Check console for errors
   - Test widget open/close functionality
   - Test on different screen sizes

## Architecture Changes

### Before (Problematic)
```
layout.tsx (Server Component)
  └─ ChatWidget (Client Component with animations)
     └─ Framer Motion (Client-only library)
```

**Problem:** Server tries to render client-only code, causing hydration errors.

### After (Fixed)
```
layout.tsx (Server Component)
  └─ ClientLayout (Client Component Wrapper)
     └─ ChatWidget (Dynamically imported, SSR disabled)
        └─ Framer Motion (Only loads in browser)
```

**Solution:** Clear separation of server and client code with dynamic loading.

## Why Mobile Browsers Are More Sensitive

1. **Aggressive Caching:**
   - Mobile browsers cache more aggressively to save data
   - Service workers may cache old versions
   - Harder to force refresh on mobile

2. **Different JavaScript Engines:**
   - iOS uses JavaScriptCore (Safari)
   - Android uses V8 (Chrome)
   - Different error handling and timing

3. **Memory Constraints:**
   - Mobile devices have less memory
   - More aggressive garbage collection
   - Stricter error handling

4. **Network Conditions:**
   - Slower connections can cause timing issues
   - Partial page loads can trigger hydration errors
   - Service workers may serve stale content

## Prevention Best Practices

### 1. Always Use "use client" Directive
```typescript
"use client";  // At the top of client components

import { useState } from 'react';
```

### 2. Dynamic Import for Heavy Client Libraries
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
```

### 3. Avoid Direct Window/Document Access
```typescript
// ❌ Bad
const width = window.innerWidth;

// ✅ Good
const [width, setWidth] = useState(0);

useEffect(() => {
  setWidth(window.innerWidth);
}, []);
```

### 4. Use Proper Loading States
```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
```

## Monitoring for Issues

### Development
```bash
# Watch for hydration warnings
docker compose logs next-app -f | grep -i "hydration\|error"
```

### Production
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor mobile-specific errors
- Test on real devices regularly

## Common Mobile-Specific Errors

### 1. Hydration Mismatch
**Symptom:** Content flashes or changes after load
**Solution:** Use dynamic imports with `ssr: false`

### 2. Window/Document Not Defined
**Symptom:** "window is not defined" error
**Solution:** Use `useEffect` or dynamic imports

### 3. Animation Jank
**Symptom:** Stuttering animations on mobile
**Solution:** Use CSS transforms, GPU acceleration

### 4. Touch Event Issues
**Symptom:** Buttons not responding to taps
**Solution:** Ensure minimum 44x44px touch targets

## Verification Checklist

After implementing fixes, verify:

- [ ] No console errors on page load
- [ ] No hydration warnings in development
- [ ] Chat widget appears correctly
- [ ] FAB button is clickable/tappable
- [ ] Widget expands smoothly
- [ ] Widget closes properly
- [ ] No content overlap on mobile
- [ ] Works after hard refresh
- [ ] Works after clearing cache
- [ ] Works on iOS Safari
- [ ] Works on Chrome Mobile
- [ ] Works on Firefox Mobile

## Additional Resources

- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
- [React Hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Mobile Web Best Practices](https://web.dev/mobile/)

## Support

If issues persist after following this guide:

1. Check browser console for specific error messages
2. Test in incognito/private mode
3. Try a different mobile browser
4. Check network tab for failed requests
5. Verify Docker container is running: `docker compose ps`
6. Check container logs: `docker compose logs next-app`

---

**Last Updated:** 2026-01-23
**Status:** Issues Resolved

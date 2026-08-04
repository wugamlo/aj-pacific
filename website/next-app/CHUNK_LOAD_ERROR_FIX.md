# Chunk Load Error Fix

## Error
```
ChunkLoadError: Loading chunk _app-pages-browser_components_ChatWidget_tsx failed.
(error: https://dev.aj-pacific.com/_next/undefined)
```

## Root Cause
The error was caused by an unnecessary layer of indirection when importing the ChatWidget component:

```
layout.tsx (Server Component)
  └─ ClientLayout.tsx (Client Component Wrapper)
     └─ ChatWidget.tsx (Client Component)
```

This created a webpack chunking issue where the browser couldn't properly load the nested dynamic import.

## Solution
Simplified the architecture by removing the intermediate `ClientLayout.tsx` wrapper and using direct dynamic import in the layout:

```typescript
// In layout.tsx
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
});
```

### New Architecture
```
layout.tsx (Server Component)
  └─ ChatWidget.tsx (Dynamically imported, SSR disabled)
```

## Changes Made

### 1. Updated [`layout.tsx`](app/layout.tsx)
- Removed import of `ClientLayout`
- Added direct dynamic import of `ChatWidget` with `ssr: false`
- Simplified component tree

### 2. Deleted `ClientLayout.tsx`
- Removed unnecessary wrapper component
- Eliminated extra chunking layer

### 3. Cleared Build Cache
- Removed `.next` directory
- Forced clean rebuild
- Ensured no stale chunks

## Why This Works

### Dynamic Import with SSR Disabled
```typescript
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
});
```

**Benefits:**
- ✅ Component only loads in browser (client-side only)
- ✅ No server-side rendering attempts
- ✅ Proper webpack chunking
- ✅ No nested dynamic imports
- ✅ Clear import path resolution

### Simplified Component Tree
- Fewer layers = fewer potential failure points
- Direct import path = better webpack optimization
- No wrapper overhead = faster loading

## Technical Details

### Webpack Chunking
Next.js uses webpack to split code into chunks for optimal loading. When you have:
- Multiple layers of dynamic imports
- Nested client components
- Complex import paths

Webpack can create circular dependencies or undefined chunk references.

### The `ssr: false` Option
This tells Next.js:
1. Don't try to render this component on the server
2. Only load it in the browser
3. Create a separate client-side chunk
4. Don't include in initial HTML

### Why the Error Showed "undefined"
The URL `https://dev.aj-pacific.com/_next/undefined` indicates webpack couldn't resolve the chunk name, likely because:
- The import path was too nested
- The chunk manifest was corrupted
- Build cache had stale references

## Prevention

### Best Practices for Dynamic Imports

1. **Keep It Simple**
```typescript
// ✅ Good - Direct dynamic import
const Component = dynamic(() => import('./Component'), { ssr: false });

// ❌ Bad - Nested wrappers
const Wrapper = dynamic(() => import('./Wrapper'), { ssr: false });
// Where Wrapper also dynamically imports Component
```

2. **Use Absolute Imports**
```typescript
// ✅ Good - Clear path
import('@/components/ChatWidget')

// ⚠️ Okay but less clear
import('../components/ChatWidget')
```

3. **Clear Build Cache When Changing Architecture**
```bash
docker compose exec next-app rm -rf .next
docker compose restart next-app
```

4. **Avoid Multiple Layers of Client Components**
```typescript
// ✅ Good
Server Component → Dynamic Client Component

// ❌ Bad
Server Component → Client Wrapper → Dynamic Client Component
```

## Verification Steps

1. **Check Browser Console**
   - Should see no chunk load errors
   - No 404s for `_next/undefined`
   - ChatWidget loads successfully

2. **Check Network Tab**
   - All chunks load with proper names
   - No failed requests
   - Proper cache headers

3. **Test Functionality**
   - FAB button appears
   - Click to expand works
   - No runtime errors
   - Works on mobile and desktop

## If Error Persists

1. **Hard Refresh**
   - Desktop: `Ctrl+Shift+R` or `Cmd+Shift+R`
   - Mobile: Close browser completely and reopen

2. **Clear Browser Cache**
   - Settings → Privacy → Clear Browsing Data
   - Select "Cached images and files"

3. **Check Server Logs**
```bash
docker compose logs next-app --tail=50
```

4. **Verify Build**
```bash
docker compose exec next-app ls -la .next
```

5. **Rebuild from Scratch**
```bash
docker compose down
docker compose up -d
```

## Related Files

- [`app/layout.tsx`](app/layout.tsx) - Main layout with dynamic import
- [`components/ChatWidget.tsx`](components/ChatWidget.tsx) - Chat widget component
- [`next.config.js`](next.config.js) - Next.js configuration

## Additional Notes

### Why Not Just Use "use client"?
While marking the layout as a client component would work, it would:
- Disable server-side rendering for the entire layout
- Increase bundle size
- Reduce performance
- Lose SEO benefits

Dynamic imports with `ssr: false` give us:
- Server-side rendering for the layout
- Client-side only rendering for the widget
- Best of both worlds

### Performance Impact
- **Before**: Extra wrapper component, nested imports
- **After**: Direct import, single chunk
- **Result**: Faster loading, smaller bundle, fewer HTTP requests

---

**Status**: ✅ Fixed
**Last Updated**: 2026-01-23
**Build Cache**: Cleared
**Server**: Restarted

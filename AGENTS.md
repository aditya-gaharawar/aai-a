# Repository Knowledge

## Routing Fix (2026-01-16)

### Issue
The application was experiencing routing issues with safety page and other routes not working correctly or falling back to hash-based routing which was undesirable.

### Solution
We implemented a custom Single Page Application (SPA) routing mechanism using the History API.

1.  **History API Implementation**:
    -   Removed hash-based routing (`#/`) in favor of standard paths (`/`).
    -   Implemented a custom navigation handler in `App.tsx` that:
        -   Intercepts internal link clicks (`<a>` tags).
        -   Prevents default browser navigation.
        -   Updates the URL using `window.history.pushState()`.
        -   Scrolls to the top of the page on route change.
        -   Listens to `popstate` events to handle browser back/forward buttons.

2.  **Link Updates**:
    -   Updated internal links in `Header.tsx` and `constants/data.tsx` to use absolute paths (e.g., `/safety`).

3.  **Netlify Configuration**:
    -   Added a `public/_redirects` file with the content `/*  /index.html  200`.
    -   This ensures that all requests are served by `index.html`, allowing the client-side router to handle the routing correctly on Netlify deployments.

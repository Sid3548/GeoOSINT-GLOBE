# GeoOSINT GLOBE

Real-Time Geopolitical Intelligence Dashboard with an interactive 3D globe.

## Features

- **3D Interactive Globe** - Visualize global events on a rotating Earth with pulse effects and arc connections
- **Real-Time Event Feed** - Live intelligence feed with simulated OSINT data from multiple sources
- **Event Filtering** - Filter by event type (Conflict, Protest, Cyber, Disaster, Military, Political, Economic) and severity level
- **Country Risk Index** - Instability scoring for countries based on event data
- **Threat Distribution** - Visual breakdown of event types and severity levels
- **Event Detail Modal** - Click events on the globe or feed for full details with coordinates and source info
- **Responsive Design** - Works on desktop and mobile layouts
- **Performance Optimized** - Lazy-loaded globe, memoized components, efficient re-renders

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **globe.gl** - 3D globe rendering (Three.js-based)
- **Three.js** - WebGL 3D engine
- **D3** - Data visualization utilities

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Architecture

```
src/
  components/
    Globe3D.jsx      - 3D globe with event points, rings, arcs, labels
    Header.jsx       - Top bar with stats and live indicator
    EventFeed.jsx    - Scrollable intelligence feed with search
    FilterPanel.jsx  - Event type and severity filters
    StatsPanel.jsx   - Threat distribution and country risk charts
    EventDetail.jsx  - Modal with full event details
  data/
    events.js        - Event data, types, and random event generator
  hooks/
    useEvents.js     - Event state management and filtering
  utils/
    formatters.js    - Time, severity, and color utilities
```

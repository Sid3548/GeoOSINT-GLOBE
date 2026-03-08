import { useState, useCallback, lazy, Suspense } from 'react';
import { Header } from './components/Header.jsx';
import { EventFeed } from './components/EventFeed.jsx';
import { FilterPanel } from './components/FilterPanel.jsx';
import { StatsPanel } from './components/StatsPanel.jsx';
import { EventDetail } from './components/EventDetail.jsx';
import { useEvents } from './hooks/useEvents.js';

const Globe3D = lazy(() => import('./components/Globe3D.jsx').then(m => ({ default: m.Globe3D })));
import './App.css';

function App() {
  const {
    events,
    allEvents,
    selectedEvent,
    setSelectedEvent,
    filters,
    toggleTypeFilter,
    setMinSeverity,
    setSearch,
    stats,
  } = useEvents();

  const [showStats, setShowStats] = useState(true);
  const [detailEvent, setDetailEvent] = useState(null);

  const handleEventSelect = useCallback((event) => {
    setSelectedEvent(event);
  }, [setSelectedEvent]);

  const handleEventDetail = useCallback((event) => {
    setSelectedEvent(event);
    setDetailEvent(event);
  }, [setSelectedEvent]);

  const handleCloseDetail = useCallback(() => {
    setDetailEvent(null);
  }, []);

  return (
    <div className="app">
      <Header stats={stats} />

      <main className="app-main">
        {/* Globe */}
        <div className="globe-container">
          <Suspense fallback={
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: '100%', color: 'var(--accent)', fontSize: '14px',
              fontFamily: 'var(--font-mono)',
            }}>
              Loading Globe...
            </div>
          }>
            <Globe3D
              events={events}
              selectedEvent={selectedEvent}
              onEventClick={handleEventDetail}
            />
          </Suspense>

          {/* Globe overlay controls */}
          <div className="globe-controls">
            <button
              className={`control-btn ${showStats ? 'active' : ''}`}
              onClick={() => setShowStats(!showStats)}
              title="Toggle Statistics"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="18" y="3" width="4" height="18" rx="1"/>
                <rect x="10" y="8" width="4" height="13" rx="1"/>
                <rect x="2" y="13" width="4" height="8" rx="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="sidebar">
          <FilterPanel
            filters={filters}
            onToggleType={toggleTypeFilter}
            onSetSeverity={setMinSeverity}
          />

          {showStats && (
            <StatsPanel events={allEvents} stats={stats} />
          )}

          <EventFeed
            events={events}
            selectedEvent={selectedEvent}
            onEventSelect={handleEventDetail}
            search={filters.search}
            onSearchChange={setSearch}
          />
        </aside>
      </main>

      {/* Event detail modal */}
      <EventDetail event={detailEvent} onClose={handleCloseDetail} />
    </div>
  );
}

export default App;

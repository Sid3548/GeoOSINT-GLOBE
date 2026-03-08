import { memo, useCallback, useRef, useEffect } from 'react';
import { EVENT_CONFIG } from '../data/events.js';
import { timeAgo, getSeverityLabel, getSeverityColor } from '../utils/formatters.js';

function EventCard({ event, isSelected, onClick }) {
  const config = EVENT_CONFIG[event.type];

  return (
    <div
      className={`event-card ${isSelected ? 'selected' : ''} severity-${event.severity}`}
      onClick={() => onClick(event)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(event)}
    >
      <div className="event-card-header">
        <span className="event-type-badge" style={{ background: config.color + '22', color: config.color }}>
          {config.icon} {config.label}
        </span>
        <span className="event-severity" style={{ color: getSeverityColor(event.severity) }}>
          {getSeverityLabel(event.severity)}
        </span>
      </div>
      <h3 className="event-title">{event.title}</h3>
      <p className="event-description">{event.description}</p>
      <div className="event-meta">
        <span className="event-location">
          📍 {event.city}, {event.country}
        </span>
        <span className="event-time">{timeAgo(event.timestamp)}</span>
      </div>
      <div className="event-source">
        Source: {event.source}
      </div>
    </div>
  );
}

function EventFeedComponent({ events, selectedEvent, onEventSelect, search, onSearchChange }) {
  const feedRef = useRef(null);

  // Scroll to top when new events arrive
  const prevCountRef = useRef(events.length);
  useEffect(() => {
    if (events.length > prevCountRef.current && feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
    prevCountRef.current = events.length;
  }, [events.length]);

  return (
    <div className="event-feed">
      <div className="feed-header">
        <h2>Intelligence Feed</h2>
        <span className="feed-count">{events.length} events</span>
      </div>

      <div className="feed-search">
        <input
          type="text"
          placeholder="Search events, countries..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="feed-list" ref={feedRef}>
        {events.length === 0 ? (
          <div className="feed-empty">No events match your filters</div>
        ) : (
          events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isSelected={selectedEvent?.id === event.id}
              onClick={onEventSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}

export const EventFeed = memo(EventFeedComponent);

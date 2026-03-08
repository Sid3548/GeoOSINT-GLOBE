import { memo } from 'react';
import { EVENT_CONFIG } from '../data/events.js';
import { formatTimestamp, getSeverityLabel, getSeverityColor } from '../utils/formatters.js';

function EventDetailComponent({ event, onClose }) {
  if (!event) return null;

  const config = EVENT_CONFIG[event.type];

  return (
    <div className="event-detail-overlay" onClick={onClose}>
      <div className="event-detail" onClick={e => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="detail-header">
          <span className="detail-type" style={{ background: config.color + '22', color: config.color }}>
            {config.icon} {config.label}
          </span>
          <span className="detail-severity" style={{
            background: getSeverityColor(event.severity) + '22',
            color: getSeverityColor(event.severity)
          }}>
            {getSeverityLabel(event.severity)} Severity
          </span>
        </div>

        <h2 className="detail-title">{event.title}</h2>

        <div className="detail-location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {event.city}, {event.country}
        </div>

        <p className="detail-description">{event.description}</p>

        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-label">Coordinates</span>
            <span className="detail-value">{event.lat.toFixed(4)}, {event.lng.toFixed(4)}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Timestamp</span>
            <span className="detail-value">{formatTimestamp(event.timestamp)}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Source</span>
            <span className="detail-value">{event.source}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Event ID</span>
            <span className="detail-value">GEO-{String(event.id).padStart(5, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const EventDetail = memo(EventDetailComponent);

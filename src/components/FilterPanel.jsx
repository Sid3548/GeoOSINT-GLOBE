import { memo } from 'react';
import { EVENT_TYPES, EVENT_CONFIG } from '../data/events.js';

function FilterPanelComponent({ filters, onToggleType, onSetSeverity }) {
  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3 className="filter-title">Event Types</h3>
        <div className="filter-chips">
          {Object.values(EVENT_TYPES).map(type => {
            const config = EVENT_CONFIG[type];
            const active = filters.types.size === 0 || filters.types.has(type);
            return (
              <button
                key={type}
                className={`filter-chip ${active ? 'active' : ''}`}
                style={{
                  '--chip-color': config.color,
                  borderColor: active ? config.color : 'transparent',
                  background: active ? config.color + '18' : 'rgba(255,255,255,0.04)',
                  color: active ? config.color : 'var(--text-muted)',
                }}
                onClick={() => onToggleType(type)}
              >
                {config.icon} {config.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Min Severity</h3>
        <div className="severity-slider">
          {[1, 2, 3, 4].map(level => (
            <button
              key={level}
              className={`severity-btn ${filters.minSeverity <= level ? 'active' : ''}`}
              onClick={() => onSetSeverity(level)}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="severity-labels">
          <span>Low</span>
          <span>Critical</span>
        </div>
      </div>
    </div>
  );
}

export const FilterPanel = memo(FilterPanelComponent);

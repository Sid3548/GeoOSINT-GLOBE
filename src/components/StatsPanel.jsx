import { memo, useMemo } from 'react';
import { EVENT_CONFIG, COUNTRY_RISK } from '../data/events.js';
import { getRiskColor } from '../utils/formatters.js';

function StatsPanelComponent({ events, stats }) {
  const topCountries = useMemo(() => {
    const counts = {};
    events.forEach(e => {
      counts[e.country] = (counts[e.country] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([country, count]) => ({
        country,
        count,
        risk: COUNTRY_RISK[country] || 0,
      }));
  }, [events]);

  const typeCounts = useMemo(() => {
    return Object.entries(EVENT_CONFIG).map(([type, config]) => ({
      type,
      ...config,
      count: events.filter(e => e.type === type).length,
    })).sort((a, b) => b.count - a.count);
  }, [events]);

  return (
    <div className="stats-panel">
      <div className="stats-section">
        <h3 className="stats-title">Threat Distribution</h3>
        <div className="type-bars">
          {typeCounts.map(({ type, label, color, count, icon }) => (
            <div key={type} className="type-bar-row">
              <span className="type-bar-label" style={{ color }}>{icon} {label}</span>
              <div className="type-bar-track">
                <div
                  className="type-bar-fill"
                  style={{
                    width: `${Math.max(2, (count / Math.max(events.length, 1)) * 100)}%`,
                    background: color,
                  }}
                />
              </div>
              <span className="type-bar-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3 className="stats-title">Country Risk Index</h3>
        <div className="risk-list">
          {topCountries.map(({ country, count, risk }) => (
            <div key={country} className="risk-row">
              <span className="risk-country">{country}</span>
              <div className="risk-bar-track">
                <div
                  className="risk-bar-fill"
                  style={{
                    width: `${risk}%`,
                    background: getRiskColor(risk),
                  }}
                />
              </div>
              <span className="risk-score" style={{ color: getRiskColor(risk) }}>{risk}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3 className="stats-title">Alert Summary</h3>
        <div className="alert-grid">
          <div className="alert-box critical">
            <span className="alert-count">{stats.critical}</span>
            <span className="alert-label">Critical</span>
          </div>
          <div className="alert-box high">
            <span className="alert-count">{stats.high}</span>
            <span className="alert-label">High</span>
          </div>
          <div className="alert-box medium">
            <span className="alert-count">{events.filter(e => e.severity === 2).length}</span>
            <span className="alert-label">Medium</span>
          </div>
          <div className="alert-box low">
            <span className="alert-count">{events.filter(e => e.severity === 1).length}</span>
            <span className="alert-label">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const StatsPanel = memo(StatsPanelComponent);

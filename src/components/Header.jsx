import { memo } from 'react';

function HeaderComponent({ stats }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <div>
            <h1>GeoOSINT <span className="accent">GLOBE</span></h1>
            <span className="subtitle">Real-Time Geopolitical Intelligence</span>
          </div>
        </div>
      </div>

      <div className="header-stats">
        <div className="stat-badge">
          <span className="stat-dot live" />
          <span className="stat-label">LIVE</span>
        </div>
        <div className="stat-badge">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Events</span>
        </div>
        <div className="stat-badge critical">
          <span className="stat-value">{stats.critical}</span>
          <span className="stat-label">Critical</span>
        </div>
        <div className="stat-badge warning">
          <span className="stat-value">{stats.high}</span>
          <span className="stat-label">High</span>
        </div>
      </div>

      <div className="header-right">
        <span className="timestamp">{new Date().toLocaleString('en-US', {
          weekday: 'short', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: false
        })}</span>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);

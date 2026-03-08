export function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function getSeverityLabel(severity) {
  const labels = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };
  return labels[severity] || 'Unknown';
}

export function getSeverityColor(severity) {
  const colors = { 1: '#22c55e', 2: '#f59e0b', 3: '#ef4444', 4: '#dc2626' };
  return colors[severity] || '#6b7280';
}

export function getRiskColor(score) {
  if (score >= 80) return '#dc2626';
  if (score >= 60) return '#ef4444';
  if (score >= 40) return '#f59e0b';
  if (score >= 20) return '#22c55e';
  return '#10b981';
}

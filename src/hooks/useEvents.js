import { useState, useEffect, useCallback, useRef } from 'react';
import { getInitialEvents, generateRandomEvent } from '../data/events.js';

const MAX_EVENTS = 50;
const NEW_EVENT_INTERVAL = 15000; // 15 seconds

export function useEvents() {
  const [events, setEvents] = useState(() => getInitialEvents());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({
    types: new Set(),
    minSeverity: 1,
    search: '',
  });
  const intervalRef = useRef(null);

  // Simulate real-time event arrival
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setEvents(prev => {
        const newEvent = generateRandomEvent();
        const updated = [newEvent, ...prev];
        if (updated.length > MAX_EVENTS) updated.pop();
        return updated;
      });
    }, NEW_EVENT_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, []);

  const filteredEvents = events.filter(event => {
    if (filters.types.size > 0 && !filters.types.has(event.type)) return false;
    if (event.severity < filters.minSeverity) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        event.title.toLowerCase().includes(q) ||
        event.country.toLowerCase().includes(q) ||
        event.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleTypeFilter = useCallback((type) => {
    setFilters(prev => {
      const types = new Set(prev.types);
      if (types.has(type)) types.delete(type);
      else types.add(type);
      return { ...prev, types };
    });
  }, []);

  const setMinSeverity = useCallback((minSeverity) => {
    setFilters(prev => ({ ...prev, minSeverity }));
  }, []);

  const setSearch = useCallback((search) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const stats = {
    total: events.length,
    critical: events.filter(e => e.severity === 4).length,
    high: events.filter(e => e.severity === 3).length,
    byType: Object.groupBy
      ? Object.groupBy(events, e => e.type)
      : events.reduce((acc, e) => {
          (acc[e.type] = acc[e.type] || []).push(e);
          return acc;
        }, {}),
  };

  return {
    events: filteredEvents,
    allEvents: events,
    selectedEvent,
    setSelectedEvent,
    filters,
    toggleTypeFilter,
    setMinSeverity,
    setSearch,
    stats,
  };
}

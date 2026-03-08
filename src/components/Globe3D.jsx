import { useEffect, useRef, useCallback, memo } from 'react';
import GlobeGL from 'globe.gl';
import { EVENT_CONFIG } from '../data/events.js';
import { getSeverityColor } from '../utils/formatters.js';

const GLOBE_IMAGE = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
const BUMP_IMAGE = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
const NIGHT_IMAGE = 'https://unpkg.com/three-globe/example/img/earth-night.jpg';
const ATMOSPHERE_COLOR = 'rgba(0, 255, 136, 0.15)';

function Globe3DComponent({ events, selectedEvent, onEventClick }) {
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // Initialize globe once
  useEffect(() => {
    if (!containerRef.current || globeRef.current) return;

    const globe = GlobeGL()
      .globeImageUrl(GLOBE_IMAGE)
      .bumpImageUrl(BUMP_IMAGE)
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showAtmosphere(true)
      .atmosphereColor(ATMOSPHERE_COLOR)
      .atmosphereAltitude(0.2)
      .pointOfView({ lat: 30, lng: 20, altitude: 2.2 })
      // Points layer for events
      .pointsData([])
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude(d => 0.01 + d.severity * 0.015)
      .pointRadius(d => 0.3 + d.severity * 0.15)
      .pointColor(d => EVENT_CONFIG[d.type]?.color || '#ffffff')
      .pointsMerge(false)
      .onPointClick(d => onEventClick?.(d))
      // Rings layer for pulse effect
      .ringsData([])
      .ringLat('lat')
      .ringLng('lng')
      .ringMaxRadius(d => 3 + d.severity)
      .ringPropagationSpeed(d => 0.5 + d.severity * 0.3)
      .ringRepeatPeriod(d => 800 + (4 - d.severity) * 400)
      .ringColor(d => {
        const c = EVENT_CONFIG[d.type]?.color || '#ffffff';
        return t => `${c}${Math.round((1 - t) * 255).toString(16).padStart(2, '0')}`;
      })
      // Arcs for connections between related events
      .arcsData([])
      .arcColor(() => ['rgba(0,255,136,0.3)', 'rgba(0,255,136,0.05)'])
      .arcDashLength(0.4)
      .arcDashGap(0.2)
      .arcDashAnimateTime(2000)
      .arcStroke(0.3)
      // Labels
      .labelsData([])
      .labelLat('lat')
      .labelLng('lng')
      .labelText('title')
      .labelSize(0.6)
      .labelDotRadius(0.3)
      .labelColor(d => EVENT_CONFIG[d.type]?.color || '#ffffff')
      .labelResolution(2)
      .labelAltitude(0.01);

    globe(containerRef.current);

    // Style the globe renderer
    const renderer = globe.renderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Customize scene lighting
    const scene = globe.scene();
    scene.children.forEach(child => {
      if (child.type === 'DirectionalLight') {
        child.intensity = 0.8;
      }
      if (child.type === 'AmbientLight') {
        child.intensity = 0.6;
      }
    });

    // Auto-rotate
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    globeRef.current = globe;

    // Handle resize
    const handleResize = () => {
      if (containerRef.current && globeRef.current) {
        globeRef.current.width(containerRef.current.clientWidth);
        globeRef.current.height(containerRef.current.clientHeight);
      }
    };

    resizeObserverRef.current = new ResizeObserver(handleResize);
    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      resizeObserverRef.current?.disconnect();
      if (globeRef.current) {
        globeRef.current._destructor?.();
        globeRef.current = null;
      }
    };
  }, []);

  // Update events data
  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.pointsData(events);

    // Show rings only for high severity events
    const ringEvents = events.filter(e => e.severity >= 3);
    globeRef.current.ringsData(ringEvents);

    // Show labels for critical events
    const labelEvents = events.filter(e => e.severity === 4);
    globeRef.current.labelsData(labelEvents);

    // Create arcs between nearby high-severity events
    const arcs = [];
    const highEvents = events.filter(e => e.severity >= 3);
    for (let i = 0; i < highEvents.length - 1 && arcs.length < 8; i++) {
      for (let j = i + 1; j < highEvents.length && arcs.length < 8; j++) {
        const dist = Math.sqrt(
          Math.pow(highEvents[i].lat - highEvents[j].lat, 2) +
          Math.pow(highEvents[i].lng - highEvents[j].lng, 2)
        );
        if (dist < 40 && dist > 5) {
          arcs.push({
            startLat: highEvents[i].lat,
            startLng: highEvents[i].lng,
            endLat: highEvents[j].lat,
            endLng: highEvents[j].lng,
          });
        }
      }
    }
    globeRef.current.arcsData(arcs);
  }, [events]);

  // Handle selected event - fly to it
  useEffect(() => {
    if (!globeRef.current || !selectedEvent) return;

    globeRef.current.pointOfView(
      { lat: selectedEvent.lat, lng: selectedEvent.lng, altitude: 1.5 },
      1000
    );

    // Pause auto-rotate briefly
    const controls = globeRef.current.controls();
    controls.autoRotate = false;
    const timer = setTimeout(() => {
      controls.autoRotate = true;
    }, 5000);

    return () => clearTimeout(timer);
  }, [selectedEvent]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'grab',
      }}
    />
  );
}

export const Globe3D = memo(Globe3DComponent);

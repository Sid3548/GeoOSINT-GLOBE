// Simulated real-time geopolitical events data
// In production, this would come from RSS feeds, APIs, and OSINT sources

export const EVENT_TYPES = {
  CONFLICT: 'conflict',
  PROTEST: 'protest',
  CYBER: 'cyber',
  DISASTER: 'disaster',
  MILITARY: 'military',
  POLITICAL: 'political',
  ECONOMIC: 'economic',
};

export const EVENT_CONFIG = {
  [EVENT_TYPES.CONFLICT]: { color: '#ef4444', label: 'Conflict', icon: '⚔' },
  [EVENT_TYPES.PROTEST]: { color: '#f59e0b', label: 'Protest', icon: '✊' },
  [EVENT_TYPES.CYBER]: { color: '#8b5cf6', label: 'Cyber', icon: '🛡' },
  [EVENT_TYPES.DISASTER]: { color: '#06b6d4', label: 'Disaster', icon: '🌊' },
  [EVENT_TYPES.MILITARY]: { color: '#dc2626', label: 'Military', icon: '🎯' },
  [EVENT_TYPES.POLITICAL]: { color: '#3b82f6', label: 'Political', icon: '🏛' },
  [EVENT_TYPES.ECONOMIC]: { color: '#10b981', label: 'Economic', icon: '📈' },
};

export const SEVERITY_LEVELS = {
  LOW: { value: 1, label: 'Low', color: '#22c55e' },
  MEDIUM: { value: 2, label: 'Medium', color: '#f59e0b' },
  HIGH: { value: 3, label: 'High', color: '#ef4444' },
  CRITICAL: { value: 4, label: 'Critical', color: '#dc2626' },
};

let eventIdCounter = 100;

const BASE_EVENTS = [
  {
    id: 1, lat: 48.8566, lng: 2.3522, type: EVENT_TYPES.PROTEST,
    title: 'Large-scale protests in Paris',
    description: 'Tens of thousands gather in central Paris over pension reform disputes.',
    severity: 3, country: 'France', city: 'Paris',
    source: 'Reuters', timestamp: Date.now() - 3600000,
  },
  {
    id: 2, lat: 50.4501, lng: 30.5234, type: EVENT_TYPES.CONFLICT,
    title: 'Escalation in Eastern Ukraine',
    description: 'Renewed shelling reported along the contact line in Donetsk region.',
    severity: 4, country: 'Ukraine', city: 'Kyiv',
    source: 'BBC News', timestamp: Date.now() - 7200000,
  },
  {
    id: 3, lat: 31.7683, lng: 35.2137, type: EVENT_TYPES.CONFLICT,
    title: 'Tensions rise in Jerusalem',
    description: 'Security forces deployed following clashes near the Old City.',
    severity: 3, country: 'Israel', city: 'Jerusalem',
    source: 'Al Jazeera', timestamp: Date.now() - 1800000,
  },
  {
    id: 4, lat: 35.6762, lng: 139.6503, type: EVENT_TYPES.DISASTER,
    title: 'Earthquake warning issued for Tokyo',
    description: '5.2 magnitude earthquake detected off the coast of Chiba prefecture.',
    severity: 2, country: 'Japan', city: 'Tokyo',
    source: 'JMA', timestamp: Date.now() - 5400000,
  },
  {
    id: 5, lat: 38.9072, lng: -77.0369, type: EVENT_TYPES.POLITICAL,
    title: 'Emergency Senate session called',
    description: 'Bipartisan committee convenes to address critical infrastructure bill.',
    severity: 2, country: 'United States', city: 'Washington D.C.',
    source: 'AP News', timestamp: Date.now() - 900000,
  },
  {
    id: 6, lat: 39.9042, lng: 116.4074, type: EVENT_TYPES.CYBER,
    title: 'Major cyber attack on financial systems',
    description: 'State-sponsored threat actors target banking infrastructure in coordinated campaign.',
    severity: 4, country: 'China', city: 'Beijing',
    source: 'CrowdStrike', timestamp: Date.now() - 10800000,
  },
  {
    id: 7, lat: 55.7558, lng: 37.6173, type: EVENT_TYPES.MILITARY,
    title: 'Military exercises announced',
    description: 'Large-scale military drills scheduled near western border regions.',
    severity: 3, country: 'Russia', city: 'Moscow',
    source: 'TASS', timestamp: Date.now() - 14400000,
  },
  {
    id: 8, lat: -33.8688, lng: 151.2093, type: EVENT_TYPES.ECONOMIC,
    title: 'Reserve Bank rate decision',
    description: 'Central bank announces unexpected interest rate hold amid inflation concerns.',
    severity: 2, country: 'Australia', city: 'Sydney',
    source: 'Bloomberg', timestamp: Date.now() - 18000000,
  },
  {
    id: 9, lat: 14.5995, lng: 120.9842, type: EVENT_TYPES.DISASTER,
    title: 'Typhoon approaching Philippines',
    description: 'Category 4 typhoon expected to make landfall within 48 hours.',
    severity: 4, country: 'Philippines', city: 'Manila',
    source: 'PAGASA', timestamp: Date.now() - 600000,
  },
  {
    id: 10, lat: 6.5244, lng: 3.3792, type: EVENT_TYPES.PROTEST,
    title: 'Anti-corruption rallies in Lagos',
    description: 'Youth-led demonstrations demanding government accountability spread across districts.',
    severity: 2, country: 'Nigeria', city: 'Lagos',
    source: 'Premium Times', timestamp: Date.now() - 21600000,
  },
  {
    id: 11, lat: 51.5074, lng: -0.1278, type: EVENT_TYPES.CYBER,
    title: 'NHS systems targeted by ransomware',
    description: 'Multiple hospital trusts report disruptions to patient records systems.',
    severity: 3, country: 'United Kingdom', city: 'London',
    source: 'NCSC', timestamp: Date.now() - 4200000,
  },
  {
    id: 12, lat: 25.2048, lng: 55.2708, type: EVENT_TYPES.ECONOMIC,
    title: 'OPEC+ emergency meeting called',
    description: 'Oil producing nations convene to discuss production targets amid price volatility.',
    severity: 3, country: 'UAE', city: 'Dubai',
    source: 'OPEC', timestamp: Date.now() - 8100000,
  },
  {
    id: 13, lat: 28.6139, lng: 77.2090, type: EVENT_TYPES.POLITICAL,
    title: 'New defense pact announced',
    description: 'India signs landmark defense cooperation agreement with strategic partners.',
    severity: 2, country: 'India', city: 'New Delhi',
    source: 'The Hindu', timestamp: Date.now() - 12600000,
  },
  {
    id: 14, lat: -23.5505, lng: -46.6333, type: EVENT_TYPES.PROTEST,
    title: 'Environmental protests in Sao Paulo',
    description: 'Massive demonstrations against Amazon deforestation policies block major highways.',
    severity: 2, country: 'Brazil', city: 'Sao Paulo',
    source: 'Folha', timestamp: Date.now() - 16200000,
  },
  {
    id: 15, lat: 33.8938, lng: 35.5018, type: EVENT_TYPES.CONFLICT,
    title: 'Cross-border incidents reported',
    description: 'Multiple exchange of fire incidents along the southern border region.',
    severity: 3, country: 'Lebanon', city: 'Beirut',
    source: 'L\'Orient Today', timestamp: Date.now() - 2700000,
  },
  {
    id: 16, lat: 37.5665, lng: 126.9780, type: EVENT_TYPES.MILITARY,
    title: 'Joint naval exercises commence',
    description: 'Multinational naval forces begin exercises in the East Sea.',
    severity: 2, country: 'South Korea', city: 'Seoul',
    source: 'Yonhap', timestamp: Date.now() - 9000000,
  },
  {
    id: 17, lat: 52.5200, lng: 13.4050, type: EVENT_TYPES.POLITICAL,
    title: 'EU emergency summit on migration',
    description: 'European leaders gather to address border security and asylum policy reforms.',
    severity: 2, country: 'Germany', city: 'Berlin',
    source: 'DW', timestamp: Date.now() - 19800000,
  },
  {
    id: 18, lat: 15.3694, lng: 44.1910, type: EVENT_TYPES.CONFLICT,
    title: 'Humanitarian crisis deepens',
    description: 'Aid organizations report critical shortages in conflict-affected regions.',
    severity: 4, country: 'Yemen', city: 'Sanaa',
    source: 'ICRC', timestamp: Date.now() - 6300000,
  },
  {
    id: 19, lat: 41.0082, lng: 28.9784, type: EVENT_TYPES.ECONOMIC,
    title: 'Currency crisis accelerates',
    description: 'Lira drops to new record low as central bank depletes foreign reserves.',
    severity: 3, country: 'Turkey', city: 'Istanbul',
    source: 'Financial Times', timestamp: Date.now() - 11700000,
  },
  {
    id: 20, lat: -1.2921, lng: 36.8219, type: EVENT_TYPES.CYBER,
    title: 'Mobile banking hack affects millions',
    description: 'Coordinated attack compromises M-Pesa transaction records across East Africa.',
    severity: 3, country: 'Kenya', city: 'Nairobi',
    source: 'Daily Nation', timestamp: Date.now() - 15300000,
  },
];

// Random event generator for simulating real-time feed
const RANDOM_TITLES = {
  [EVENT_TYPES.CONFLICT]: [
    'Armed clashes reported near border',
    'Ceasefire violation detected',
    'Militia activity surge detected',
    'IED explosion near checkpoint',
  ],
  [EVENT_TYPES.PROTEST]: [
    'Workers strike enters third day',
    'Student demonstrations grow',
    'Anti-government march planned',
    'Labor union calls general strike',
  ],
  [EVENT_TYPES.CYBER]: [
    'Phishing campaign targets government',
    'DDoS attack on telecom provider',
    'Data breach at major corporation',
    'Zero-day exploit in the wild',
  ],
  [EVENT_TYPES.DISASTER]: [
    'Flash flooding in urban areas',
    'Wildfire threatens communities',
    'Volcanic activity increases',
    'Severe storm system approaching',
  ],
  [EVENT_TYPES.MILITARY]: [
    'Troop movements detected via satellite',
    'Air defense systems activated',
    'Naval fleet repositioned',
    'Military convoy spotted on highway',
  ],
  [EVENT_TYPES.POLITICAL]: [
    'Emergency legislation proposed',
    'Diplomatic relations downgraded',
    'Embassy staff recalled',
    'Sanctions package announced',
  ],
  [EVENT_TYPES.ECONOMIC]: [
    'Stock market circuit breaker triggered',
    'Trade embargo expanded',
    'Currency peg under pressure',
    'Commodity prices spike',
  ],
};

const CITIES = [
  { city: 'Taipei', country: 'Taiwan', lat: 25.0330, lng: 121.5654 },
  { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { city: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332 },
  { city: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018 },
  { city: 'Warsaw', country: 'Poland', lat: 52.2297, lng: 21.0122 },
  { city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  { city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  { city: 'Addis Ababa', country: 'Ethiopia', lat: 9.0250, lng: 38.7469 },
  { city: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lng: -58.3816 },
  { city: 'Hanoi', country: 'Vietnam', lat: 21.0285, lng: 105.8542 },
  { city: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686 },
  { city: 'Bogota', country: 'Colombia', lat: 4.7110, lng: -74.0721 },
];

export function generateRandomEvent() {
  const types = Object.values(EVENT_TYPES);
  const type = types[Math.floor(Math.random() * types.length)];
  const location = CITIES[Math.floor(Math.random() * CITIES.length)];
  const titles = RANDOM_TITLES[type];
  const title = titles[Math.floor(Math.random() * titles.length)];
  const severity = Math.floor(Math.random() * 4) + 1;

  return {
    id: ++eventIdCounter,
    lat: location.lat + (Math.random() - 0.5) * 2,
    lng: location.lng + (Math.random() - 0.5) * 2,
    type,
    title,
    description: `Developing situation in ${location.city} region. Intelligence sources report significant activity.`,
    severity,
    country: location.country,
    city: location.city,
    source: 'OSINT Feed',
    timestamp: Date.now(),
  };
}

export function getInitialEvents() {
  return BASE_EVENTS.map(e => ({ ...e }));
}

// Country risk scores (CII - Country Instability Index)
export const COUNTRY_RISK = {
  'Ukraine': 92, 'Yemen': 88, 'Syria': 85, 'Somalia': 82,
  'Afghanistan': 80, 'Myanmar': 78, 'Sudan': 76, 'Libya': 74,
  'Iraq': 72, 'Lebanon': 70, 'Haiti': 68, 'Ethiopia': 65,
  'Nigeria': 62, 'Pakistan': 60, 'Colombia': 55, 'Venezuela': 53,
  'Turkey': 50, 'Egypt': 48, 'Thailand': 45, 'Philippines': 42,
  'Russia': 58, 'China': 40, 'Iran': 65, 'North Korea': 75,
  'Israel': 55, 'India': 38, 'Brazil': 35, 'Mexico': 45,
  'United States': 25, 'United Kingdom': 18, 'France': 30,
  'Germany': 15, 'Japan': 12, 'South Korea': 28, 'Australia': 10,
  'Canada': 8, 'Sweden': 12, 'Poland': 22, 'Taiwan': 45,
  'Saudi Arabia': 35, 'UAE': 15, 'Kenya': 42, 'South Africa': 48,
  'Argentina': 40, 'Indonesia': 32, 'Vietnam': 25,
};

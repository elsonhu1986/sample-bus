export interface BusArrival {
  etaMinutes: number; // 0 for Arr
  etaLabel: string; // 'Arr' or 'X'
  deck: 'SD' | 'DD' | 'BD'; // Single Decker, Double Decker, Bendy
  accessible: boolean;
  occupancy: 'seats' | 'standing' | 'limited';
  occupancyLabel: string;
}

export interface BusStop {
  id: string; // 5-digit code
  name: string;
  road: string;
  landmark?: string;
  mrtCode?: string;
  berth?: string;
  etaOffsetMinutes: number;
  latitude: number;
  longitude: number;
}

export interface BusService {
  serviceNo: string;
  type: 'Trunk' | 'Feeder' | 'Express' | 'Townlink';
  isExpress?: boolean;
  terminals: {
    dir1: { name: string; terminus: string };
    dir2: { name: string; terminus: string };
  };
  currentDirection: 1 | 2;
  approachingVehicle: {
    plateNumber: string;
    speedKmH: number;
    distanceMeters: number;
    fromStop: string;
    toStop: string;
    progressPercent: number;
  };
  nextBuses: BusArrival[];
  upcomingStops: BusStop[];
  totalStops: number;
  totalDurationMins: number;
  advisory: {
    title: string;
    text: string;
    updatedAgo: string;
  };
}

export interface TransitStopContext {
  id: string;
  name: string;
  berth: string;
  locationDesc: string;
  mrtConnections: string;
  distanceAway: string;
  latitude: number;
  longitude: number;
}

export const TRANSIT_STOPS: TransitStopContext[] = [
  {
    id: '75009',
    name: 'Tampines Int',
    berth: 'Berth B04',
    locationDesc: 'Tampines Central 1',
    mrtConnections: 'Integrated Transport Hub with Downtown Line (DT32) & East-West Line (EW2)',
    distanceAway: '120m away',
    latitude: 1.3533,
    longitude: 103.9452,
  },
  {
    id: '76131',
    name: 'Opp Century Sq',
    berth: 'Roadside Bus Bay',
    locationDesc: 'Tampines Ave 5',
    mrtConnections: 'Near Tampines MRT (DT32/EW2) Exit B',
    distanceAway: '380m away',
    latitude: 1.3524,
    longitude: 103.9431,
  },
  {
    id: '09023',
    name: 'Orchard Stn / Tangs',
    berth: 'Bay 1',
    locationDesc: 'Orchard Blvd',
    mrtConnections: 'Thomson-East Coast Line (TE14) & North-South Line (NS22)',
    distanceAway: '14.2km away',
    latitude: 1.3048,
    longitude: 103.8318,
  },
  {
    id: '14009',
    name: 'HarbourFront Int',
    berth: 'Berth A01',
    locationDesc: 'Seah Im Rd',
    mrtConnections: 'Circle Line (CC29) & North East Line (NE1)',
    distanceAway: '18.6km away',
    latitude: 1.2655,
    longitude: 103.8211,
  },
  {
    id: '17009',
    name: 'Clementi Int',
    berth: 'Berth 02',
    locationDesc: 'Commonwealth Ave West',
    mrtConnections: 'East-West Line (EW23)',
    distanceAway: '21.4km away',
    latitude: 1.3152,
    longitude: 103.7652,
  },
  {
    id: '52009',
    name: 'Toa Payoh Int',
    berth: 'Berth B03',
    locationDesc: 'Lorong 6 Toa Payoh',
    mrtConnections: 'North-South Line (NS19)',
    distanceAway: '11.8km away',
    latitude: 1.3326,
    longitude: 103.8475,
  }
];

export const BUS_SERVICES_DATABASE: Record<string, BusService> = {
  '65': {
    serviceNo: '65',
    type: 'Trunk',
    terminals: {
      dir1: { name: 'Dir 1: Tampines Int Loop', terminus: 'Tampines Int via Bedok' },
      dir2: { name: 'Dir 2: To HarbourFront Int', terminus: 'HarbourFront Int via Orchard Rd' },
    },
    currentDirection: 2,
    approachingVehicle: {
      plateNumber: 'SBS 8892 Z',
      speedKmH: 34,
      distanceMeters: 450,
      fromStop: 'Opp Century Sq (76131)',
      toStop: 'Tampines Int (75009)',
      progressPercent: 82,
    },
    nextBuses: [
      {
        etaMinutes: 0,
        etaLabel: 'Arr',
        deck: 'DD',
        accessible: true,
        occupancy: 'seats',
        occupancyLabel: 'Seats Avail',
      },
      {
        etaMinutes: 7,
        etaLabel: '7',
        deck: 'DD',
        accessible: true,
        occupancy: 'standing',
        occupancyLabel: 'Standing Avail',
      },
      {
        etaMinutes: 19,
        etaLabel: '19',
        deck: 'SD',
        accessible: true,
        occupancy: 'seats',
        occupancyLabel: 'Seats Avail',
      },
    ],
    upcomingStops: [
      {
        id: '75009',
        name: 'Tampines Int',
        road: 'Tampines Central 1',
        berth: 'Berth B04',
        etaOffsetMinutes: 0,
        latitude: 1.3533,
        longitude: 103.9452,
      },
      {
        id: '76131',
        name: 'Opp Century Sq',
        road: 'Tampines Ave 5',
        etaOffsetMinutes: 2,
        latitude: 1.3524,
        longitude: 103.9431,
      },
      {
        id: '76081',
        name: 'Blk 938',
        road: 'Tampines Ave 5',
        etaOffsetMinutes: 5,
        latitude: 1.3489,
        longitude: 103.9398,
      },
      {
        id: '75369',
        name: 'Bedok Reservoir Rd',
        road: 'Opp Blk 701',
        etaOffsetMinutes: 9,
        latitude: 1.3392,
        longitude: 103.9218,
      },
      {
        id: '72031',
        name: 'Kaki Bukit MRT Stn',
        road: 'Jalan Eunos Link',
        mrtCode: 'DT28',
        etaOffsetMinutes: 14,
        latitude: 1.3351,
        longitude: 103.9084,
      },
      {
        id: '70251',
        name: 'Ubi Ave 2 (Blk 3019)',
        road: 'Ubi Ave 2',
        mrtCode: 'DT27',
        etaOffsetMinutes: 18,
        latitude: 1.3289,
        longitude: 103.8992,
      },
      {
        id: '70101',
        name: 'MacPherson Stn Exit A',
        road: 'Paya Lebar Rd',
        mrtCode: 'CC10/DT26',
        etaOffsetMinutes: 23,
        latitude: 1.3262,
        longitude: 103.8901,
      },
      {
        id: '60139',
        name: 'Potong Pasir Stn Exit B',
        road: 'Upper Serangoon Rd',
        mrtCode: 'NE10',
        etaOffsetMinutes: 31,
        latitude: 1.3314,
        longitude: 103.8692,
      },
      {
        id: '09023',
        name: 'Orchard Stn / Tangs',
        road: 'Orchard Blvd',
        mrtCode: 'NS22/TE14',
        etaOffsetMinutes: 48,
        latitude: 1.3048,
        longitude: 103.8318,
      },
      {
        id: '14009',
        name: 'HarbourFront Int',
        road: 'Seah Im Rd',
        mrtCode: 'NE1/CC29',
        etaOffsetMinutes: 78,
        latitude: 1.2655,
        longitude: 103.8211,
      },
    ],
    totalStops: 52,
    totalDurationMins: 78,
    advisory: {
      title: 'Transit Advisory Notice',
      text: 'Bus 65 is currently experiencing smooth traffic along Tampines Ave 1 & Bartley Rd East. Expected headway regularity is 6–9 minutes during off-peak hours.',
      updatedAgo: '3m ago',
    },
  },
  '14': {
    serviceNo: '14',
    type: 'Trunk',
    terminals: {
      dir1: { name: 'Dir 1: Bedok Int', terminus: 'Bedok Int via East Coast' },
      dir2: { name: 'Dir 2: To Clementi Int', terminus: 'Clementi Int via Orchard' },
    },
    currentDirection: 2,
    approachingVehicle: {
      plateNumber: 'SBS 3218 T',
      speedKmH: 28,
      distanceMeters: 890,
      fromStop: 'Tampines Ave 4 (76201)',
      toStop: 'Tampines Int (75009)',
      progressPercent: 65,
    },
    nextBuses: [
      {
        etaMinutes: 4,
        etaLabel: '4',
        deck: 'DD',
        accessible: true,
        occupancy: 'standing',
        occupancyLabel: 'Standing Avail',
      },
      {
        etaMinutes: 12,
        etaLabel: '12',
        deck: 'DD',
        accessible: true,
        occupancy: 'seats',
        occupancyLabel: 'Seats Avail',
      },
      {
        etaMinutes: 24,
        etaLabel: '24',
        deck: 'SD',
        accessible: true,
        occupancy: 'seats',
        occupancyLabel: 'Seats Avail',
      },
    ],
    upcomingStops: [
      { id: '75009', name: 'Tampines Int', road: 'Tampines Central 1', berth: 'Berth A05', etaOffsetMinutes: 0, latitude: 1.3533, longitude: 103.9452 },
      { id: '76141', name: 'Blk 147', road: 'Tampines Ave 4', etaOffsetMinutes: 3, latitude: 1.3508, longitude: 103.9421 },
      { id: '84011', name: 'Bedok Sports Ctr', road: 'Bedok North Ave 1', etaOffsetMinutes: 11, latitude: 1.3267, longitude: 103.9312 },
      { id: '09019', name: 'Dhoby Ghaut Stn', road: 'Orchard Rd', mrtCode: 'NS24/NE6/CC1', etaOffsetMinutes: 38, latitude: 1.2991, longitude: 103.8458 },
      { id: '17009', name: 'Clementi Int', road: 'Commonwealth Ave West', mrtCode: 'EW23', etaOffsetMinutes: 68, latitude: 1.3152, longitude: 103.7652 },
    ],
    totalStops: 48,
    totalDurationMins: 68,
    advisory: {
      title: 'Traffic Regular',
      text: 'Bus 14 running on scheduled schedule. Minor congestion near Orchard Boulevard signal junctions.',
      updatedAgo: '5m ago',
    },
  },
  '28': {
    serviceNo: '28',
    type: 'Trunk',
    terminals: {
      dir1: { name: 'Dir 1: Tampines Int', terminus: 'Tampines Int' },
      dir2: { name: 'Dir 2: To Toa Payoh Int', terminus: 'Toa Payoh Int via Paya Lebar' },
    },
    currentDirection: 2,
    approachingVehicle: {
      plateNumber: 'SBS 6542 M',
      speedKmH: 41,
      distanceMeters: 620,
      fromStop: 'Tampines Stadium (76051)',
      toStop: 'Tampines Int (75009)',
      progressPercent: 74,
    },
    nextBuses: [
      {
        etaMinutes: 2,
        etaLabel: '2',
        deck: 'SD',
        accessible: true,
        occupancy: 'seats',
        occupancyLabel: 'Seats Avail',
      },
      {
        etaMinutes: 15,
        etaLabel: '15',
        deck: 'DD',
        accessible: true,
        occupancy: 'standing',
        occupancyLabel: 'Standing Avail',
      },
      {
        etaMinutes: 27,
        etaLabel: '27',
        deck: 'DD',
        accessible: true,
        occupancy: 'seats',
        occupancyLabel: 'Seats Avail',
      },
    ],
    upcomingStops: [
      { id: '75009', name: 'Tampines Int', road: 'Tampines Central 1', berth: 'Berth B02', etaOffsetMinutes: 0, latitude: 1.3533, longitude: 103.9452 },
      { id: '76111', name: 'Opp Tampines Stadium', road: 'Tampines Ave 5', etaOffsetMinutes: 3, latitude: 1.3512, longitude: 103.9405 },
      { id: '71049', name: 'Geylang East Ctr', road: 'Aljunied Ave 2', etaOffsetMinutes: 16, latitude: 1.3211, longitude: 103.8834 },
      { id: '52009', name: 'Toa Payoh Int', road: 'Lor 6 Toa Payoh', mrtCode: 'NS19', etaOffsetMinutes: 44, latitude: 1.3326, longitude: 103.8475 },
    ],
    totalStops: 42,
    totalDurationMins: 44,
    advisory: {
      title: 'Optimal Headway',
      text: 'Good headway on Bus 28. Fleet equipped with real-time telematics and digital passenger counters.',
      updatedAgo: '1m ago',
    },
  },
  '67': {
    serviceNo: '67',
    type: 'Trunk',
    terminals: {
      dir1: { name: 'Dir 1: Tampines Int', terminus: 'Tampines Int' },
      dir2: { name: 'Dir 2: To Choa Chu Kang Int', terminus: 'Choa Chu Kang Int via Bukit Timah' },
    },
    currentDirection: 2,
    approachingVehicle: {
      plateNumber: 'SBS 7490 U',
      speedKmH: 31,
      distanceMeters: 1400,
      fromStop: 'Tampines Regional Library',
      toStop: 'Tampines Int (75009)',
      progressPercent: 50,
    },
    nextBuses: [
      {
        etaMinutes: 9,
        etaLabel: '9',
        deck: 'DD',
        accessible: true,
        occupancy: 'seats',
        occupancyLabel: 'Seats Avail',
      },
      {
        etaMinutes: 21,
        etaLabel: '21',
        deck: 'DD',
        accessible: true,
        occupancy: 'standing',
        occupancyLabel: 'Standing Avail',
      },
      {
        etaMinutes: 34,
        etaLabel: '34',
        deck: 'DD',
        accessible: true,
        occupancy: 'limited',
        occupancyLabel: 'Limited Standing',
      },
    ],
    upcomingStops: [
      { id: '75009', name: 'Tampines Int', road: 'Tampines Central 1', berth: 'Berth A03', etaOffsetMinutes: 0, latitude: 1.3533, longitude: 103.9452 },
      { id: '76191', name: 'Opp Tampines Reg Lib', road: 'Tampines Ave 4', etaOffsetMinutes: 3, latitude: 1.3501, longitude: 103.9419 },
      { id: '61019', name: 'Little India Stn', road: 'Bukit Timah Rd', mrtCode: 'NE7/DT12', etaOffsetMinutes: 32, latitude: 1.3068, longitude: 103.8491 },
      { id: '44009', name: 'Choa Chu Kang Int', road: 'Choa Chu Kang Loop', mrtCode: 'NS4/JS1', etaOffsetMinutes: 72, latitude: 1.3853, longitude: 103.7444 },
    ],
    totalStops: 58,
    totalDurationMins: 72,
    advisory: {
      title: 'Cross-Island Trunk',
      text: 'Double Decker services active. High capacity available for Bukit Timah & Little India sectors.',
      updatedAgo: '7m ago',
    },
  },
  '7': {
    serviceNo: '7',
    type: 'Trunk',
    terminals: {
      dir1: { name: 'Dir 1: Bedok Int', terminus: 'Bedok Int' },
      dir2: { name: 'Dir 2: To Clementi Int', terminus: 'Clementi Int via Orchard' },
    },
    currentDirection: 2,
    approachingVehicle: {
      plateNumber: 'SBS 2901 L',
      speedKmH: 36,
      distanceMeters: 750,
      fromStop: 'Tampines East MRT',
      toStop: 'Tampines Int (75009)',
      progressPercent: 70,
    },
    nextBuses: [
      { etaMinutes: 5, etaLabel: '5', deck: 'DD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
      { etaMinutes: 14, etaLabel: '14', deck: 'DD', accessible: true, occupancy: 'standing', occupancyLabel: 'Standing Avail' },
      { etaMinutes: 26, etaLabel: '26', deck: 'SD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
    ],
    upcomingStops: [
      { id: '75009', name: 'Tampines Int', road: 'Tampines Central 1', etaOffsetMinutes: 0, latitude: 1.3533, longitude: 103.9452 },
      { id: '09048', name: 'Somerset Stn', road: 'Orchard Rd', mrtCode: 'NS23', etaOffsetMinutes: 36, latitude: 1.3002, longitude: 103.8384 },
    ],
    totalStops: 46,
    totalDurationMins: 62,
    advisory: {
      title: 'Normal Operations',
      text: 'All headway within target schedule.',
      updatedAgo: '4m ago',
    },
  },
  '2': {
    serviceNo: '2',
    type: 'Trunk',
    terminals: {
      dir1: { name: 'Dir 1: Changi Village Ter', terminus: 'Changi Village' },
      dir2: { name: 'Dir 2: To Kampong Bahru Ter', terminus: 'Kampong Bahru via Victoria St' },
    },
    currentDirection: 2,
    approachingVehicle: {
      plateNumber: 'SBS 6012 H',
      speedKmH: 33,
      distanceMeters: 550,
      fromStop: 'Upper Changi Rd East',
      toStop: 'Tampines Int (75009)',
      progressPercent: 79,
    },
    nextBuses: [
      { etaMinutes: 3, etaLabel: '3', deck: 'DD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
      { etaMinutes: 11, etaLabel: '11', deck: 'SD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
      { etaMinutes: 23, etaLabel: '23', deck: 'DD', accessible: true, occupancy: 'standing', occupancyLabel: 'Standing Avail' },
    ],
    upcomingStops: [
      { id: '75009', name: 'Tampines Int', road: 'Tampines Central 1', etaOffsetMinutes: 0, latitude: 1.3533, longitude: 103.9452 },
      { id: '01012', name: 'Bugis Stn Exit D', road: 'Victoria St', mrtCode: 'EW12/DT14', etaOffsetMinutes: 34, latitude: 1.3005, longitude: 103.8561 },
    ],
    totalStops: 44,
    totalDurationMins: 60,
    advisory: {
      title: 'Normal Operations',
      text: 'Smooth flow along Upper Changi and Victoria Corridor.',
      updatedAgo: '6m ago',
    },
  },
  '196': {
    serviceNo: '196',
    type: 'Express',
    isExpress: true,
    terminals: {
      dir1: { name: 'Dir 1: Bedok Int', terminus: 'Bedok Int via Marine Parade' },
      dir2: { name: 'Dir 2: To Clementi Int', terminus: 'Clementi Int via Shenton Way / CBD' },
    },
    currentDirection: 2,
    approachingVehicle: {
      plateNumber: 'SBS 3988 S',
      speedKmH: 48,
      distanceMeters: 1100,
      fromStop: 'Tampines Highway Junc',
      toStop: 'Tampines Int (75009)',
      progressPercent: 60,
    },
    nextBuses: [
      { etaMinutes: 6, etaLabel: '6', deck: 'DD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
      { etaMinutes: 18, etaLabel: '18', deck: 'DD', accessible: true, occupancy: 'standing', occupancyLabel: 'Standing Avail' },
      { etaMinutes: 30, etaLabel: '30', deck: 'DD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
    ],
    upcomingStops: [
      { id: '75009', name: 'Tampines Int', road: 'Tampines Central 1', etaOffsetMinutes: 0, latitude: 1.3533, longitude: 103.9452 },
      { id: '03019', name: 'Shenton Way / UIC Bldg', road: 'Shenton Way', mrtCode: 'TE19', etaOffsetMinutes: 35, latitude: 1.2789, longitude: 103.8502 },
      { id: '17009', name: 'Clementi Int', road: 'Commonwealth Ave West', mrtCode: 'EW23', etaOffsetMinutes: 65, latitude: 1.3152, longitude: 103.7652 },
    ],
    totalStops: 50,
    totalDurationMins: 65,
    advisory: {
      title: 'Express Corridor Advisory',
      text: 'Express sectors running via ECP highway bypass. Transit card taps active.',
      updatedAgo: '2m ago',
    },
  },
  '166': {
    serviceNo: '166',
    type: 'Trunk',
    terminals: {
      dir1: { name: 'Dir 1: Ang Mo Kio Int', terminus: 'Ang Mo Kio Int' },
      dir2: { name: 'Dir 2: To Clementi Int', terminus: 'Clementi Int via Thomson & Vivocity' },
    },
    currentDirection: 2,
    approachingVehicle: {
      plateNumber: 'SBS 7511 X',
      speedKmH: 30,
      distanceMeters: 920,
      fromStop: 'Tampines Ave 1',
      toStop: 'Tampines Int (75009)',
      progressPercent: 62,
    },
    nextBuses: [
      { etaMinutes: 8, etaLabel: '8', deck: 'DD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
      { etaMinutes: 16, etaLabel: '16', deck: 'SD', accessible: true, occupancy: 'standing', occupancyLabel: 'Standing Avail' },
      { etaMinutes: 29, etaLabel: '29', deck: 'DD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
    ],
    upcomingStops: [
      { id: '75009', name: 'Tampines Int', road: 'Tampines Central 1', etaOffsetMinutes: 0, latitude: 1.3533, longitude: 103.9452 },
      { id: '53009', name: 'Bishan Stn', road: 'Bishan Rd', mrtCode: 'NS17/CC15', etaOffsetMinutes: 28, latitude: 1.3508, longitude: 103.8488 },
      { id: '17009', name: 'Clementi Int', road: 'Commonwealth Ave West', mrtCode: 'EW23', etaOffsetMinutes: 70, latitude: 1.3152, longitude: 103.7652 },
    ],
    totalStops: 54,
    totalDurationMins: 70,
    advisory: {
      title: 'Normal Operations',
      text: 'Smooth traffic conditions across all sectors.',
      updatedAgo: '5m ago',
    },
  },
};

export const POPULAR_SERVICE_NUMBERS = ['65', '14', '7', '2', '196', '166', '28', '67'];

export const SERVICE_ALERTS_LIST = [
  {
    id: 'alt-1',
    type: 'Notice',
    severity: 'info',
    title: 'Normal Transit Operations Islandwide',
    service: 'All Routes',
    message: 'SBS Transit bus trunks and feeder feeder loops are operating at standard service frequencies. No major delays reported.',
    timestamp: 'Updated 2m ago',
  },
  {
    id: 'alt-2',
    type: 'Diversion Notice',
    severity: 'warning',
    title: 'Upcoming Sunday Car-Free Sunday Route Diversions',
    service: 'Services 65, 14, 166',
    message: 'Bus services will skip stops along Connaught Drive and St. Andrew’s Road from 06:00 to 12:00 due to civic district community event.',
    timestamp: 'Scheduled for this weekend',
  },
  {
    id: 'alt-3',
    type: 'Fleet Modernization',
    severity: 'info',
    title: '100% Electric Bus Rollout on Route 65 & 28',
    service: 'Services 65, 28',
    message: 'New Euro 6 three-door single & double-deck electric buses featuring passenger USB charging ports and digital display telemetry.',
    timestamp: 'Updated yesterday',
  },
];

export const NEARBY_STOPS_LIST = [
  {
    id: '75009',
    name: 'Tampines Int',
    road: 'Tampines Central 1',
    distance: '120m away',
    walkTime: '2 min walk',
    services: ['65', '14', '28', '67', '2', '7', '196', '166', '29', '31'],
    isCurrent: true,
  },
  {
    id: '76131',
    name: 'Opp Century Sq',
    road: 'Tampines Ave 5',
    distance: '380m away',
    walkTime: '5 min walk',
    services: ['65', '28', '67', '27'],
    isCurrent: false,
  },
  {
    id: '76141',
    name: 'Tampines Stn Exit B',
    road: 'Tampines Central 2',
    distance: '250m away',
    walkTime: '3 min walk',
    services: ['3', '15', '21', '27', '168'],
    isCurrent: false,
  },
  {
    id: '76081',
    name: 'Blk 938',
    road: 'Tampines Ave 5',
    distance: '550m away',
    walkTime: '7 min walk',
    services: ['65', '28', '67', '291'],
    isCurrent: false,
  },
];

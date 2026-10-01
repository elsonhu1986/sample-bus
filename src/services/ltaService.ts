import { BusArrival, BusService } from '../data/transitData';

export interface LtaBusUnit {
  OriginCode?: string;
  DestinationCode?: string;
  EstimatedArrival?: string;
  Latitude?: string;
  Longitude?: string;
  VisitNumber?: string;
  Load?: 'SEA' | 'SDA' | 'LSD' | string;
  Feature?: 'WAB' | string;
  Type?: 'SD' | 'DD' | 'BD' | string;
  Monitored?: number;
}

export interface LtaBusServiceItem {
  ServiceNo: string;
  Operator: string;
  NextBus?: LtaBusUnit;
  NextBus2?: LtaBusUnit;
  NextBus3?: LtaBusUnit;
}

export interface LtaBusArrivalResponse {
  'odata.metadata'?: string;
  BusStopCode: string;
  Services: LtaBusServiceItem[];
  _source?: string;
  _note?: string;
}

export interface ApiHealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
  uptimeSeconds?: number;
  ltaDataMall?: {
    endpointV3: string;
    configured: boolean;
    refreshRate: string;
  };
}

/**
 * Parses LTA DataMall v3 NextBus unit into our application's BusArrival model
 */
export function parseLtaBusUnit(unit?: LtaBusUnit): BusArrival | null {
  if (!unit || !unit.EstimatedArrival) {
    return null;
  }

  const arrivalTime = new Date(unit.EstimatedArrival).getTime();
  if (isNaN(arrivalTime)) {
    return null;
  }

  const diffMs = arrivalTime - Date.now();
  const diffMinutes = Math.max(0, Math.round(diffMs / (60 * 1000)));

  // Map load
  let occupancy: 'seats' | 'standing' | 'limited' = 'seats';
  let occupancyLabel = 'Seats Avail';

  if (unit.Load === 'SDA') {
    occupancy = 'standing';
    occupancyLabel = 'Standing Avail';
  } else if (unit.Load === 'LSD') {
    occupancy = 'limited';
    occupancyLabel = 'Limited Standing';
  }

  return {
    etaMinutes: diffMinutes,
    etaLabel: diffMinutes === 0 ? 'Arr' : `${diffMinutes}`,
    deck: (unit.Type as any) || 'DD',
    accessible: unit.Feature === 'WAB',
    occupancy,
    occupancyLabel,
  };
}

/**
 * Fetch bus arrival information from the /api/bus-arrival endpoint
 */
export async function fetchLtaBusArrival(
  busStopCode: string,
  serviceNo?: string
): Promise<LtaBusArrivalResponse> {
  const url = new URL('/api/bus-arrival', window.location.origin);
  url.searchParams.set('BusStopCode', busStopCode);
  if (serviceNo) {
    url.searchParams.set('ServiceNo', serviceNo);
  }

  const res = await fetch(url.toString(), {
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch bus arrival: HTTP ${res.status}`);
  }

  return await res.json();
}

/**
 * Check health of the API at /api/health
 */
export async function fetchApiHealth(): Promise<ApiHealthResponse> {
  const res = await fetch('/api/health');
  if (!res.ok) {
    throw new Error(`Health check failed with status: ${res.status}`);
  }
  return await res.json();
}

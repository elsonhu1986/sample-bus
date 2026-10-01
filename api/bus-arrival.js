// Vercel Serverless Function: /api/bus-arrival
// Proxies Singapore LTA DataMall v3 BusArrival endpoint with AccountKey

export default async function handler(req, res) {
  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');
  res.setHeader('Cache-Control', 'public, s-maxage=15, stale-while-revalidate=5');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = req.query || {};
  const busStopCode = (query.BusStopCode || query.busStopCode || '75009').toString().trim();
  const serviceNo = (query.ServiceNo || query.serviceNo || '').toString().trim();
  const accountKey = process.env.LTA_ACCOUNT_KEY ? process.env.LTA_ACCOUNT_KEY.trim() : '';

  // 1. If LTA_ACCOUNT_KEY is configured in Vercel environment, query real LTA DataMall v3
  if (accountKey) {
    try {
      const url = new URL('https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival');
      url.searchParams.set('BusStopCode', busStopCode);
      if (serviceNo) {
        url.searchParams.set('ServiceNo', serviceNo);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          AccountKey: accountKey,
          accept: 'application/json',
          'User-Agent': 'SBSTransit-LiveBusTracker/3.0',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({
          ...data,
          _source: 'live_lta_datamall',
        });
      } else {
        const errText = await response.text();
        console.warn(`LTA DataMall responded with HTTP ${response.status}:`, errText);
        // Fall back to synthetic LTA v3 structure below if upstream fails
      }
    } catch (err) {
      console.error('Error fetching LTA DataMall v3:', err);
      // Fallback
    }
  }

  // 2. Fallback / Mock generator in exact LTA DataMall v3 schema format
  // Generates real-time ISO dates relative to now so that ETAs are accurate
  const now = Date.now();
  const makeIsoEta = (offsetMinutes) => {
    return new Date(now + offsetMinutes * 60 * 1000).toISOString();
  };

  const defaultServices = serviceNo
    ? [serviceNo]
    : ['65', '14', '28', '67'];

  const mockServices = defaultServices.map((svc) => {
    let baseEta = 0;
    let s2Eta = 7;
    let s3Eta = 18;

    if (svc === '14') {
      baseEta = 4;
      s2Eta = 12;
      s3Eta = 24;
    } else if (svc === '28') {
      baseEta = 2;
      s2Eta = 15;
      s3Eta = 27;
    } else if (svc === '67') {
      baseEta = 9;
      s2Eta = 21;
      s3Eta = 34;
    } else if (svc === '176') {
      baseEta = 1;
      s2Eta = 16;
      s3Eta = 23;
    }

    return {
      ServiceNo: svc,
      Operator: svc === '67' ? 'SMRT' : 'SBST',
      NextBus: {
        OriginCode: '75009',
        DestinationCode: '14009',
        EstimatedArrival: makeIsoEta(baseEta),
        Monitored: 1,
        Latitude: '1.3524',
        Longitude: '103.9431',
        VisitNumber: '1',
        Load: baseEta === 0 ? 'SEA' : baseEta < 5 ? 'SDA' : 'SEA',
        Feature: 'WAB',
        Type: 'DD',
      },
      NextBus2: {
        OriginCode: '75009',
        DestinationCode: '14009',
        EstimatedArrival: makeIsoEta(s2Eta),
        Monitored: 1,
        Latitude: '1.3392',
        Longitude: '103.9218',
        VisitNumber: '1',
        Load: 'SDA',
        Feature: 'WAB',
        Type: 'DD',
      },
      NextBus3: {
        OriginCode: '75009',
        DestinationCode: '14009',
        EstimatedArrival: makeIsoEta(s3Eta),
        Monitored: 1,
        Latitude: '1.3289',
        Longitude: '103.8992',
        VisitNumber: '1',
        Load: 'SEA',
        Feature: 'WAB',
        Type: 'SD',
      },
    };
  });

  return res.status(200).json({
    'odata.metadata': 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival',
    BusStopCode: busStopCode,
    Services: mockServices,
    _source: accountKey ? 'lta_fallback' : 'simulated_feed',
    _note: accountKey
      ? undefined
      : 'Set LTA_ACCOUNT_KEY in Vercel environment variables to enable direct LTA DataMall v3 telematics.',
  });
}

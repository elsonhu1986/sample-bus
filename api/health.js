// Vercel Serverless Function: /api/health
export default function handler(req, res) {
  // Support CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hasLtaKey = Boolean(process.env.LTA_ACCOUNT_KEY && process.env.LTA_ACCOUNT_KEY.trim() !== '');

  res.status(200).json({
    status: 'ok',
    service: 'SBS Transit Live Bus Tracker API',
    version: '3.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    ltaDataMall: {
      endpointV3: 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival',
      configured: hasLtaKey,
      refreshRate: '20s recommended'
    },
    monitoredEndpoints: [
      { path: '/api/health', method: 'GET', description: 'API health & telemetry status' },
      { path: '/api/bus-arrival', method: 'GET', description: 'Next buses at a stop (LTA v3)' },
      { path: '/api/BusArrival', method: 'GET', description: 'Next buses alias (LTA v3)' }
    ]
  });
}

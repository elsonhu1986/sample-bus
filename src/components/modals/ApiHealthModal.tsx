import React, { useState, useEffect } from 'react';
import { fetchApiHealth, ApiHealthResponse, fetchLtaBusArrival, LtaBusArrivalResponse } from '../../services/ltaService';

interface ApiHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiHealthModal: React.FC<ApiHealthModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [health, setHealth] = useState<ApiHealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test query
  const [testStop, setTestStop] = useState('83139');
  const [testService, setTestService] = useState('15');
  const [testResult, setTestResult] = useState<LtaBusArrivalResponse | null>(null);
  const [testLoading, setTestLoading] = useState(false);

  const loadHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApiHealth();
      setHealth(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to connect to /api/health');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadHealth();
    }
  }, [isOpen]);

  const runTestQuery = async () => {
    setTestLoading(true);
    try {
      const res = await fetchLtaBusArrival(testStop, testService);
      setTestResult(res);
    } catch (err: any) {
      console.error(err);
    } finally {
      setTestLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#e4e7ed] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#ededf8] flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00875a] text-[24px]">
              vital_signs
            </span>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#191b23]">
              API Telemetry &amp; Health Monitor
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7b7481] hover:text-[#191b23] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Health Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Status summary */}
          <div className="p-4 rounded-xl border bg-[#f6f7fa] border-[#e4e7ed] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4a4450]">
                Endpoint: <code className="bg-[#ededf8] px-1.5 py-0.5 rounded text-[#39126b]">/api/health</code>
              </span>
              <button
                onClick={loadHealth}
                className="text-xs font-semibold text-[#39126b] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                <span>Refresh</span>
              </button>
            </div>

            {loading ? (
              <div className="text-xs text-[#7b7481] py-2 flex items-center gap-2">
                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                <span>Pinging API health endpoint...</span>
              </div>
            ) : error ? (
              <div className="text-xs text-[#b51c00] font-semibold">
                Error: {error}
              </div>
            ) : health ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#4a4450]">API Service Status:</span>
                  <span className="px-2 py-0.5 bg-[#e3fcef] text-[#00875a] rounded-full font-bold uppercase text-[10px]">
                    {health.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4a4450]">LTA DataMall v3 Key:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      health.ltaDataMall?.configured
                        ? 'bg-[#e3fcef] text-[#00875a]'
                        : 'bg-[#fff0d6] text-[#f58220]'
                    }`}
                  >
                    {health.ltaDataMall?.configured
                      ? 'LTA_ACCOUNT_KEY Configured'
                      : 'LTA_ACCOUNT_KEY Pending in Vercel'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4a4450]">Uptime:</span>
                  <span className="font-mono text-[#191b23] font-bold">
                    {health.uptimeSeconds}s
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4a4450]">Timestamp:</span>
                  <span className="font-mono text-[11px] text-[#7b7481]">
                    {health.timestamp}
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Real-time Query Tester */}
          <div className="p-4 rounded-xl border border-[#e4e7ed] bg-white space-y-3">
            <span className="text-xs font-bold text-[#191b23] uppercase tracking-wider block">
              Test /api/bus-arrival (LTA v3)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-[#7b7481] block mb-1">
                  BusStopCode
                </label>
                <input
                  type="text"
                  value={testStop}
                  onChange={(e) => setTestStop(e.target.value)}
                  className="w-full p-2 bg-[#f6f7fa] rounded border border-[#e4e7ed] text-xs font-mono font-bold"
                  placeholder="e.g. 83139"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#7b7481] block mb-1">
                  ServiceNo (optional)
                </label>
                <input
                  type="text"
                  value={testService}
                  onChange={(e) => setTestService(e.target.value)}
                  className="w-full p-2 bg-[#f6f7fa] rounded border border-[#e4e7ed] text-xs font-mono font-bold"
                  placeholder="e.g. 15"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={runTestQuery}
              disabled={testLoading}
              className="w-full py-2 bg-[#39126b] hover:bg-[#502d82] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span
                className={`material-symbols-outlined text-[16px] ${
                  testLoading ? 'animate-spin' : ''
                }`}
              >
                {testLoading ? 'sync' : 'send'}
              </span>
              <span>
                {testLoading
                  ? 'Querying /api/bus-arrival...'
                  : `Fetch Arrival for Stop ${testStop} (Svc ${testService || 'All'})`}
              </span>
            </button>

            {testResult && (
              <div className="mt-3 p-3 bg-slate-900 text-slate-200 rounded-lg text-[11px] font-mono overflow-x-auto max-h-48 border border-slate-700">
                <div className="text-emerald-400 font-bold mb-1">
                  // Source: {testResult._source || 'lta_v3'}
                </div>
                <pre>{JSON.stringify(testResult, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-[#ededf8] bg-[#faf8ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#39126b] text-white rounded-lg text-xs font-bold hover:bg-[#502d82]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { SERVICE_ALERTS_LIST } from '../../data/transitData';

interface ServiceAlertsViewProps {
  onGoToArrivals: () => void;
}

export const ServiceAlertsView: React.FC<ServiceAlertsViewProps> = ({
  onGoToArrivals,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e4e7ed] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b51c00] text-[28px]">
              warning
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-[#191b23]">
              LTA &amp; SBS Transit Service Alerts
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4a4450] mt-1">
            Real-time route diversions, road closures, and network operational bulletins
          </p>
        </div>

        <button
          onClick={onGoToArrivals}
          className="self-start sm:self-auto px-4 py-2 bg-[#39126b] text-white rounded-lg text-xs font-bold hover:bg-[#502d82] transition-colors"
        >
          Back to Live Arrivals
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {SERVICE_ALERTS_LIST.map((alert) => {
          const isWarning = alert.severity === 'warning';

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${
                isWarning
                  ? 'border-l-4 border-l-[#b51c00] border-[#e4e7ed]'
                  : 'border-l-4 border-l-[#00875a] border-[#e4e7ed]'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      isWarning
                        ? 'bg-[#ffebe6] text-[#b51c00]'
                        : 'bg-[#e3fcef] text-[#00875a]'
                    }`}
                  >
                    {alert.type}
                  </span>
                  <span className="text-xs font-bold bg-[#ededf8] text-[#39126b] px-2 py-0.5 rounded">
                    {alert.service}
                  </span>
                </div>

                <span className="text-xs text-[#7b7481]">{alert.timestamp}</span>
              </div>

              <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#191b23] mb-1">
                {alert.title}
              </h3>

              <p className="text-xs text-[#4a4450] leading-relaxed">
                {alert.message}
              </p>

              <div className="mt-3 pt-3 border-t border-[#f0f0fb] flex items-center justify-between text-[11px] text-[#7b7481]">
                <span>Issued by LTA Intelligent Transport Systems Command</span>
                <span className="text-[#39126b] font-semibold">Active Bulletin</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeatherModal: React.FC<WeatherModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#e4e7ed] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#ededf8] flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#39126b] text-[24px]">
              wb_sunny
            </span>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#191b23]">
              Singapore Meteorological Telemetry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7b7481] hover:text-[#191b23] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gradient-to-br from-[#39126b] to-[#502d82] text-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-white/80 font-medium uppercase tracking-wider">
                  Eastern Sector (Tampines / Changi)
                </span>
                <div className="font-['Space_Grotesk'] text-4xl font-bold mt-1">
                  31°C
                </div>
                <div className="text-xs text-white/90 mt-1">
                  Fair &amp; Breezy • Humidity 68%
                </div>
              </div>
              <span className="material-symbols-outlined text-[54px] text-amber-300">
                sunny
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#f6f7fa] p-3 rounded-lg border border-[#e4e7ed]">
              <span className="text-[#7b7481] block">Precipitation Radar</span>
              <span className="font-bold text-[#00875a] text-sm">0% No Rain</span>
            </div>
            <div className="bg-[#f6f7fa] p-3 rounded-lg border border-[#e4e7ed]">
              <span className="text-[#7b7481] block">UV Index</span>
              <span className="font-bold text-[#f58220] text-sm">6.2 (Moderate)</span>
            </div>
            <div className="bg-[#f6f7fa] p-3 rounded-lg border border-[#e4e7ed]">
              <span className="text-[#7b7481] block">Wind Speed</span>
              <span className="font-bold text-[#191b23] text-sm">14 km/h ENE</span>
            </div>
            <div className="bg-[#f6f7fa] p-3 rounded-lg border border-[#e4e7ed]">
              <span className="text-[#7b7481] block">24h PSI (Air Quality)</span>
              <span className="font-bold text-[#00875a] text-sm">42 Good</span>
            </div>
          </div>

          <p className="text-[11px] text-[#7b7481] leading-relaxed">
            Data synchronized via National Environment Agency (NEA) API 2.0 automated weather stations. Commuters advised to carry an umbrella for late afternoon showers.
          </p>
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

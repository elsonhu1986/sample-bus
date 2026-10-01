import React from 'react';

interface CommuterConvenienceStripProps {
  onOpenFareCalculator: () => void;
  onOpenWeatherModal: () => void;
  onOpenHelplineModal: () => void;
}

export const CommuterConvenienceStrip: React.FC<CommuterConvenienceStripProps> = ({
  onOpenFareCalculator,
  onOpenWeatherModal,
  onOpenHelplineModal,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
      {/* 1. Smart Fare */}
      <div
        onClick={onOpenFareCalculator}
        className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e7ed] hover:border-[#502d82]/40 transition-all flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-lg bg-[#ededf8] group-hover:bg-[#39126b] group-hover:text-white transition-colors flex items-center justify-center text-[#39126b] shrink-0">
          <span className="material-symbols-outlined text-[22px]">contactless</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-[#4a4450] block truncate">
            Smart Fare (Adult CEPAS)
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#191b23] block truncate">
            $1.09 - $2.27 Distance Fare
          </span>
        </div>
        <span className="material-symbols-outlined text-[#7b7481] group-hover:text-[#39126b] text-[18px]">
          calculate
        </span>
      </div>

      {/* 2. Weather at Tampines */}
      <div
        onClick={onOpenWeatherModal}
        className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e7ed] hover:border-[#502d82]/40 transition-all flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-lg bg-[#ededf8] group-hover:bg-[#39126b] group-hover:text-white transition-colors flex items-center justify-center text-[#39126b] shrink-0">
          <span className="material-symbols-outlined text-[22px]">wb_sunny</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-[#4a4450] block truncate">
            Weather at Tampines
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#191b23] block truncate">
            31°C • Fair &amp; Breezy
          </span>
        </div>
        <span className="material-symbols-outlined text-[#7b7481] group-hover:text-[#39126b] text-[18px]">
          info
        </span>
      </div>

      {/* 3. SBS Transit Helpline */}
      <div
        onClick={onOpenHelplineModal}
        className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e7ed] hover:border-[#b51c00]/40 transition-all flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-lg bg-[#ffebe6] group-hover:bg-[#b51c00] group-hover:text-white transition-colors flex items-center justify-center text-[#b51c00] shrink-0">
          <span className="material-symbols-outlined text-[22px]">support_agent</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-[#4a4450] block truncate">
            SBS Transit Helpline
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#191b23] block truncate">
            1800-287-2727 (Toll-Free)
          </span>
        </div>
        <span className="material-symbols-outlined text-[#7b7481] group-hover:text-[#b51c00] text-[18px]">
          call
        </span>
      </div>
    </div>
  );
};

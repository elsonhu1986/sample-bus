import React from 'react';

interface TransitRibbonProps {
  countdownSeconds: number;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const TransitRibbon: React.FC<TransitRibbonProps> = ({
  countdownSeconds,
  isRefreshing,
  onRefresh,
}) => {
  return (
    <div className="w-full bg-[#39126b] text-white py-2 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold shadow-sm">
      {/* Left Status */}
      <div className="flex items-center gap-2">
        <span className="inline-flex relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00875a] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00875a]"></span>
        </span>
        <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
          LTA Intelligent Transport Systems
        </span>
        <span className="text-white/60 hidden sm:inline">•</span>
        <span className="text-white/80 hidden sm:inline font-normal">
          Normal Network Operations Islandwide
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 text-white/90">
        <span className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs">
          <span
            className={`material-symbols-outlined text-[15px] ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          >
            sync
          </span>
          <span>
            {isRefreshing ? 'Updating feed...' : `Auto-refresh in ${countdownSeconds}s`}
          </span>
        </span>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="hover:text-white transition-opacity inline-flex items-center gap-1 cursor-pointer bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-[11px] font-semibold"
          title="Force refresh live bus telematics"
        >
          <span
            className={`material-symbols-outlined text-[14px] ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          >
            refresh
          </span>
          <span>Refresh Now</span>
        </button>
      </div>
    </div>
  );
};

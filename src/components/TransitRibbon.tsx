import React from 'react';

interface TransitRibbonProps {
  countdownSeconds: number;
  isRefreshing: boolean;
  onRefresh: () => void;
  onOpenApiHealth?: () => void;
  dataSource?: string;
}

export const TransitRibbon: React.FC<TransitRibbonProps> = ({
  countdownSeconds,
  isRefreshing,
  onRefresh,
  onOpenApiHealth,
  dataSource = 'LTA DataMall v3',
}) => {
  return (
    <div className="w-full bg-[#39126b] text-white py-2 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold shadow-sm">
      {/* Left Status */}
      <div className="flex items-center gap-2">
        <span className="inline-flex relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00875a] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00875a]"></span>
        </span>
        <button
          onClick={onOpenApiHealth}
          className="hover:underline flex items-center gap-1.5 cursor-pointer text-left"
          title="Click to check /api/health and LTA DataMall connection"
        >
          <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
            LTA Intelligent Transport Systems
          </span>
          <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded font-mono">
            {dataSource}
          </span>
        </button>
        <span className="text-white/60 hidden sm:inline">•</span>
        <span className="text-white/80 hidden sm:inline font-normal">
          Normal Network Operations Islandwide
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4 text-white/90">
        {onOpenApiHealth && (
          <button
            onClick={onOpenApiHealth}
            className="hidden sm:inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-300 cursor-pointer"
            title="API Health Monitor"
          >
            <span className="material-symbols-outlined text-[13px]">vital_signs</span>
            <span>API Health</span>
          </button>
        )}

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

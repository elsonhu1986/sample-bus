import React, { useState } from 'react';
import { TransitStopContext, POPULAR_SERVICE_NUMBERS } from '../data/transitData';

interface BentoHeaderProps {
  currentStop: TransitStopContext;
  selectedService: string;
  onSelectService: (service: string) => void;
  onOpenStopSelector: () => void;
  onRefreshGps: () => void;
  isGpsLocating: boolean;
}

export const BentoHeader: React.FC<BentoHeaderProps> = ({
  currentStop,
  selectedService,
  onSelectService,
  onOpenStopSelector,
  onRefreshGps,
  isGpsLocating,
}) => {
  const [searchValue, setSearchValue] = useState(selectedService);
  const [inputError, setInputError] = useState('');

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchValue.trim();
    if (!query) {
      setInputError('Please enter a service number');
      return;
    }
    setInputError('');
    onSelectService(query);
  };

  const handleClear = () => {
    setSearchValue('');
    setInputError('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Main Search Card (Col 1-8) */}
      <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e7ed] flex flex-col justify-between">
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#39126b] text-white font-['Space_Grotesk'] font-bold text-lg">
                SBS
              </span>
              <span className="font-['Space_Grotesk'] font-bold text-lg text-[#191b23]">
                Live Bus Timing
              </span>
            </div>

            <span className="text-xs font-semibold text-[#4a4450] bg-[#ededf8] px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#e1e1ed]">
              <span className="material-symbols-outlined text-[14px] text-[#39126b]">
                verified
              </span>
              <span>Official SBS Feed</span>
            </span>
          </div>

          <p className="text-sm text-[#4a4450] mb-5">
            Query real-time automated telemetry across Singapore public bus trunk &amp; feeder routes.
          </p>

          {/* Search Input Box */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#502d82]">
              <span className="material-symbols-outlined text-[24px]">search</span>
            </div>

            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value.toUpperCase());
                setInputError('');
              }}
              placeholder="Enter Bus Service Number (e.g. 65, 14, 196)..."
              className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-[#f6f7fa] text-[#191b23] font-['Space_Grotesk'] text-xl font-semibold rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#502d82] border border-transparent focus:border-[#502d82] transition-all placeholder:text-[#7b7481]/60"
            />

            <div className="absolute inset-y-0 right-1.5 flex items-center gap-1 pr-1">
              {searchValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-2 text-[#7b7481] hover:text-[#191b23] transition-colors cursor-pointer rounded-lg hover:bg-black/5"
                  title="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}

              <button
                type="submit"
                className="bg-[#39126b] hover:bg-[#502d82] active:scale-95 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <span>Find</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>

          {inputError && (
            <p className="text-xs text-[#b51c00] font-semibold mt-1.5">{inputError}</p>
          )}
        </div>

        {/* Popular Service Pills Filter */}
        <div className="mt-6 pt-4 border-t border-[#f0f0fb] flex flex-col gap-2">
          <span className="text-[11px] font-bold text-[#4a4450] uppercase tracking-wider">
            Popular SBS Services Near You:
          </span>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {POPULAR_SERVICE_NUMBERS.map((serviceNum) => {
              const isSelected = selectedService === serviceNum;
              const isExp = serviceNum === '196';

              let buttonClasses = 'px-3.5 py-1.5 rounded-lg font-["Space_Grotesk"] text-[16px] leading-tight transition-all cursor-pointer font-bold ';

              if (isSelected) {
                buttonClasses += 'bg-[#39126b] text-white shadow-sm scale-105 ring-2 ring-[#502d82]/40';
              } else if (isExp) {
                buttonClasses += 'bg-[#b51c00] text-white hover:opacity-90 hover:scale-105';
              } else {
                buttonClasses += 'bg-[#ededf8] hover:bg-[#e7e7f3] text-[#191b23] hover:scale-105';
              }

              return (
                <button
                  key={serviceNum}
                  type="button"
                  onClick={() => {
                    setSearchValue(serviceNum);
                    onSelectService(serviceNum);
                  }}
                  className={buttonClasses}
                >
                  {serviceNum}
                  {isExp && (
                    <span className="text-[10px] ml-1 uppercase font-sans font-semibold tracking-wide">
                      Exp
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Geolocation & Stop Context (Col 9-12) */}
      <div className="lg:col-span-4 bg-gradient-to-br from-[#282552] to-[#39126b] text-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(57,18,107,0.18)] flex flex-col justify-between relative overflow-hidden">
        {/* Subtle Watermark Bus Icon */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[170px]">directions_bus</span>
        </div>

        <div>
          {/* Geofence and distance header */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-white/10">
              <span className="material-symbols-outlined text-[16px] text-[#00875a]">
                my_location
              </span>
              <span>GPS Geofence Locked</span>
            </span>

            <span className="text-xs font-medium bg-black/30 px-2 py-0.5 rounded border border-white/10">
              {currentStop.distanceAway}
            </span>
          </div>

          <div className="text-[11px] font-bold text-white/70 uppercase tracking-widest mb-1">
            Detected Transit Point
          </div>

          <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">
            {currentStop.name}
          </h2>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded tracking-wider">
              STOP ID: {currentStop.id}
            </span>
            <span className="text-xs text-white/80 font-medium">
              {currentStop.berth}
            </span>
          </div>

          <p className="text-xs text-white/75 mt-3 leading-relaxed">
            {currentStop.locationDesc} • {currentStop.mrtConnections}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 pt-4 flex items-center gap-2 relative z-10">
          <button
            type="button"
            onClick={onRefreshGps}
            disabled={isGpsLocating}
            className="flex-1 bg-white text-[#39126b] hover:bg-[#faf8ff] active:scale-95 py-2.5 px-3 rounded-lg text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                isGpsLocating ? 'animate-spin' : ''
              }`}
            >
              {isGpsLocating ? 'sync' : 'near_me'}
            </span>
            <span>{isGpsLocating ? 'Locating...' : 'Refresh GPS'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenStopSelector}
            className="bg-white/15 hover:bg-white/25 active:scale-95 text-white py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer border border-white/20"
          >
            <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
            <span>Change</span>
          </button>
        </div>
      </div>
    </div>
  );
};

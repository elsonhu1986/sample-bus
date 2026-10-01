import React from 'react';
import { BusService } from '../data/transitData';

interface HeroArrivalCardProps {
  service: BusService;
  onOpenDetails?: () => void;
}

export const HeroArrivalCard: React.FC<HeroArrivalCardProps> = ({
  service,
  onOpenDetails,
}) => {
  const { nextBuses, approachingVehicle, terminals, currentDirection } = service;
  const currentTerminus =
    currentDirection === 1
      ? terminals.dir1.terminus
      : terminals.dir2.terminus;

  const getOccupancyBg = (occupancy: 'seats' | 'standing' | 'limited') => {
    switch (occupancy) {
      case 'seats':
        return 'bg-[#e3fcef] border-[#00875a]/25 text-[#00875a]';
      case 'standing':
        return 'bg-[#fff0d6] border-[#f58220]/25 text-[#f58220]';
      case 'limited':
        return 'bg-[#ffebe6] border-[#d32f2f]/25 text-[#d32f2f]';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#e4e7ed] transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] relative overflow-hidden">
      {/* Accent strip on left */}
      <div className="absolute top-0 left-0 w-2 h-full bg-[#39126b]"></div>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ededf8]">
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Main Route Badge */}
          <div className="w-16 h-16 rounded-xl bg-[#39126b] text-white flex items-center justify-center font-['Space_Grotesk'] text-[24px] font-bold tracking-tight shrink-0 shadow-sm">
            {service.serviceNo}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-['Space_Grotesk'] text-xl font-bold text-[#191b23]">
                Bus {service.serviceNo}
              </span>
              <span className="text-xs bg-[#39126b]/10 text-[#39126b] px-2 py-0.5 rounded-md font-semibold">
                {service.type}
              </span>
              <span className="text-xs bg-[#ededf8] text-[#4a4450] px-2 py-0.5 rounded-md flex items-center gap-0.5 font-medium">
                <span className="material-symbols-outlined text-[13px]">accessible</span>
                <span>WAB</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#4a4450] mt-1">
              Terminus:{' '}
              <span className="font-semibold text-[#191b23]">{currentTerminus}</span>
            </p>
          </div>
        </div>

        {/* GPS Live Tag */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#ededf8] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#39126b] border border-[#e1e1ed]">
          <span className="material-symbols-outlined text-[16px] text-[#00875a]">
            satellite_alt
          </span>
          <span>GPS Tracking Live</span>
        </div>
      </div>

      {/* 3-Bus Sequential Countdown Trio */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3.5 py-5">
        {nextBuses.slice(0, 3).map((bus, idx) => {
          const isNext = idx === 0;
          const is2nd = idx === 1;
          const orderLabel = isNext ? 'Next Bus' : is2nd ? '2nd Bus' : '3rd Bus';
          const cardStyle = getOccupancyBg(bus.occupancy);

          return (
            <div
              key={idx}
              className={`${cardStyle} border rounded-xl p-3 flex flex-col items-center justify-between text-center relative overflow-hidden transition-all hover:scale-[1.02]`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider">
                {orderLabel}
              </span>

              <div className="my-1.5 flex items-baseline justify-center gap-0.5">
                {bus.etaMinutes === 0 ? (
                  <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold tracking-tight animate-pulse">
                    Arr
                  </span>
                ) : (
                  <>
                    <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#191b23]">
                      {bus.etaMinutes}
                    </span>
                    <span className="text-xs text-[#4a4450] ml-0.5 font-medium">
                      min
                    </span>
                  </>
                )}
              </div>

              <div className="w-full pt-1.5 border-t border-black/10 flex items-center justify-center gap-1.5 text-xs text-[#191b23]">
                <span className="font-bold">{bus.deck}</span>
                <span>•</span>
                {bus.accessible && (
                  <span
                    className="material-symbols-outlined text-[14px]"
                    title="Wheelchair Accessible"
                  >
                    accessible
                  </span>
                )}
              </div>

              <span className="text-[10px] font-bold mt-1 tracking-tight">
                {bus.occupancyLabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mini Telemetry Progress Bar */}
      <div className="bg-[#f6f7fa] rounded-xl p-3.5 sm:p-4 border border-[#e4e7ed]">
        <div className="flex items-center justify-between text-xs text-[#4a4450] mb-2 font-medium">
          <span className="flex items-center gap-1.5 font-semibold text-[#191b23]">
            <span className="material-symbols-outlined text-[16px] text-[#39126b]">
              directions_bus
            </span>
            <span>Approaching Vehicle: {approachingVehicle.plateNumber}</span>
          </span>
          <span className="font-mono text-xs">Speed: {approachingVehicle.speedKmH} km/h</span>
        </div>

        {/* Live track */}
        <div className="relative py-2.5">
          <div className="h-2 w-full bg-[#e7e7f3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#39126b] rounded-full transition-all duration-700"
              style={{ width: `${approachingVehicle.progressPercent}%` }}
            ></div>
          </div>

          {/* Bus pin indicator */}
          <div
            className="absolute top-0 transition-all duration-700 -ml-3.5"
            style={{ left: `${approachingVehicle.progressPercent}%` }}
          >
            <div className="h-7 w-7 rounded-full bg-[#39126b] text-white flex items-center justify-center shadow-md border-2 border-white">
              <span className="material-symbols-outlined text-[15px]">
                directions_bus
              </span>
            </div>
          </div>
        </div>

        {/* Progress markers labels */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#4a4450] mt-2">
          <span className="truncate max-w-[130px]" title={approachingVehicle.fromStop}>
            {approachingVehicle.fromStop}
          </span>
          <span className="text-[#00875a] font-bold text-center px-1">
            {approachingVehicle.distanceMeters}m to stop
          </span>
          <span className="font-bold text-[#191b23] truncate max-w-[130px] text-right" title={approachingVehicle.toStop}>
            {approachingVehicle.toStop}
          </span>
        </div>
      </div>
    </div>
  );
};

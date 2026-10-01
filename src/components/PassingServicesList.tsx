import React from 'react';
import { BusService } from '../data/transitData';

interface PassingServicesListProps {
  services: BusService[];
  activeServiceNo: string;
  onSelectService: (serviceNo: string) => void;
}

export const PassingServicesList: React.FC<PassingServicesListProps> = ({
  services,
  activeServiceNo,
  onSelectService,
}) => {
  // Exclude current featured hero service
  const passingServices = services.filter((s) => s.serviceNo !== activeServiceNo);

  return (
    <div className="space-y-3.5">
      {/* List Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="font-['Space_Grotesk'] text-lg text-[#191b23] font-bold flex items-center gap-2">
          <span>Passing Services</span>
          <span className="px-2 py-0.5 rounded-full bg-[#eddcff] text-[#280056] text-xs font-bold">
            {services.length} Live
          </span>
        </h3>
        <span className="text-xs text-[#4a4450] font-medium">Sorted by ETA</span>
      </div>

      {/* Passing Service Cards */}
      {passingServices.map((svc) => {
        const nextBus = svc.nextBuses[0];
        const secondBus = svc.nextBuses[1];
        const terminus =
          svc.currentDirection === 1
            ? svc.terminals.dir1.terminus
            : svc.terminals.dir2.terminus;

        const isNextGreen = nextBus?.occupancy === 'seats';
        const isNextOrange = nextBus?.occupancy === 'standing';

        return (
          <div
            key={svc.serviceNo}
            onClick={() => onSelectService(svc.serviceNo)}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e7ed] hover:border-[#502d82]/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
          >
            {/* Bus Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#ededf8] group-hover:bg-[#39126b] group-hover:text-white transition-colors text-[#191b23] flex items-center justify-center font-['Space_Grotesk'] text-xl font-bold shrink-0 shadow-2xs">
                {svc.serviceNo}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-['Space_Grotesk'] text-base font-bold text-[#191b23]">
                    Bus {svc.serviceNo}
                  </span>
                  <span className="text-xs text-[#4a4450] bg-[#ededf8] px-1.5 py-0.5 rounded font-medium">
                    To {terminus.split(' via ')[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-0.5 text-xs text-[#4a4450]">
                  <span>
                    {nextBus?.deck === 'DD' ? 'Double Decker' : 'Single Decker'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px]">
                      accessible
                    </span>
                    <span>WAB</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Arrival countdown capsules */}
            <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
              {/* Next Bus */}
              {nextBus && (
                <div
                  className={`px-3 py-1.5 rounded-lg text-center min-w-[70px] border ${
                    isNextGreen
                      ? 'bg-[#e3fcef] border-[#00875a]/20 text-[#00875a]'
                      : isNextOrange
                      ? 'bg-[#fff0d6] border-[#f58220]/20 text-[#f58220]'
                      : 'bg-[#ffebe6] border-[#d32f2f]/20 text-[#d32f2f]'
                  }`}
                >
                  <span className="block text-[10px] uppercase font-bold tracking-wider">
                    Next
                  </span>
                  <div className="flex items-baseline justify-center">
                    <span className="font-['Space_Grotesk'] text-xl font-bold">
                      {nextBus.etaMinutes === 0 ? 'Arr' : nextBus.etaMinutes}
                    </span>
                    {nextBus.etaMinutes > 0 && (
                      <span className="text-[11px] text-[#4a4450] ml-0.5 font-medium">
                        m
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* 2nd Bus */}
              {secondBus && (
                <div className="bg-[#f6f7fa] border border-[#e4e7ed] px-3 py-1.5 rounded-lg text-center min-w-[70px]">
                  <span className="block text-[10px] uppercase font-bold text-[#4a4450] tracking-wider">
                    2nd
                  </span>
                  <div className="flex items-baseline justify-center">
                    <span className="font-['Space_Grotesk'] text-xl font-bold text-[#191b23]">
                      {secondBus.etaMinutes}
                    </span>
                    <span className="text-[11px] text-[#4a4450] ml-0.5 font-medium">
                      m
                    </span>
                  </div>
                </div>
              )}

              {/* Action Chevron */}
              <button
                type="button"
                className="p-2 text-[#4a4450] group-hover:text-[#39126b] rounded-lg group-hover:bg-[#ededf8] transition-colors"
                title="View Live Telemetry"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

import React, { useState } from 'react';
import { BusService } from '../data/transitData';

interface RouteSpatialRadarProps {
  service: BusService;
  onViewAllStops: () => void;
  onSelectMapTab: () => void;
}

export const RouteSpatialRadar: React.FC<RouteSpatialRadarProps> = ({
  service,
  onViewAllStops,
  onSelectMapTab,
}) => {
  const [mapMode, setMapMode] = useState<'static' | 'interactive'>('static');
  const [imgFailed, setImgFailed] = useState(false);

  const staticMapUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAJuVNxCT4OwHYGgMLHEPBJMQ49NoTuH4aR0QZHo53TCNEg1JJmhwVqZqY-7ZQ7UuKn5T5BTBpfcGaUWiY31l2w9aHQ4e9TdCtmuu8BHf-akec8xN-8xPfGSbVRbUSF-PnXeClaLR7zqh-jvX2EY1uSQRjTxfKHZi4t-PS1s-F9hdI1p7JIGBpppBGifGEYoeMrE-inOA2RxHZXjtLxIwhm9Foxj97agNKCkHkk17IxkXoYWzf_Bm6K';

  const stops = service.upcomingStops.slice(0, 5);
  const dirLabel =
    service.currentDirection === 1
      ? 'Dir 1'
      : 'Dir 2';

  const destinationName =
    service.currentDirection === 1
      ? service.terminals.dir1.terminus.split(' via ')[0]
      : service.terminals.dir2.terminus.split(' via ')[0];

  return (
    <div className="space-y-4">
      {/* Interactive Map Preview Card */}
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e7ed] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4a4450]">
              Live Spatial Radar
            </span>
            <h3 className="font-['Space_Grotesk'] text-lg text-[#191b23] font-bold">
              Route {service.serviceNo} Telemetry
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#00875a]/10 text-[#00875a] px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5 border border-[#00875a]/20">
              <span className="h-2 w-2 rounded-full bg-[#00875a] animate-ping"></span>
              <span>Live GPS</span>
            </span>
          </div>
        </div>

        {/* Static Map / Radar Graphic Container */}
        <div className="relative rounded-xl overflow-hidden shadow-inner border border-[#e4e7ed] bg-[#e7e7f3] group">
          {!imgFailed ? (
            <div
              className="w-full h-52 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url('${staticMapUrl}')`,
              }}
              onError={() => setImgFailed(true)}
            ></div>
          ) : (
            // Simulated interactive canvas/SVG fallback map of Singapore East-West corridor
            <div className="w-full h-52 bg-[#e8ecf4] relative flex items-center justify-center overflow-hidden">
              {/* SVG Route Corridor */}
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path
                  d="M 50,150 Q 150,120 220,90 T 350,50"
                  fill="none"
                  stroke="#39126b"
                  strokeWidth="4"
                  strokeDasharray="4 2"
                />
                <circle cx="50" cy="150" r="7" fill="#39126b" />
                <circle cx="140" cy="125" r="5" fill="#502d82" />
                <circle cx="220" cy="90" r="5" fill="#502d82" />
                <circle cx="310" cy="62" r="5" fill="#502d82" />
                <circle cx="350" cy="50" r="7" fill="#00875a" />
              </svg>
            </div>
          )}

          {/* Dynamic map overlay tag */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 text-xs font-semibold text-[#191b23] border border-white/40">
            <span className="h-2.5 w-2.5 rounded-full bg-[#39126b]"></span>
            <span>
              Bus {service.serviceNo}: {service.approachingVehicle.distanceMeters}m from Tampines Int
            </span>
          </div>

          {/* Expand to full map button */}
          <button
            type="button"
            onClick={onSelectMapTab}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#39126b] p-1.5 rounded-lg shadow-sm transition-all hover:scale-105 border border-white/50 cursor-pointer"
            title="Open Interactive Route Visualizer"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_full</span>
          </button>
        </div>

        {/* Sequential Upcoming Bus Stops Tracker */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-[#191b23]">
              Upcoming Stops ({dirLabel})
            </span>
            <span className="text-xs text-[#4a4450]">
              {stops.length} Stops Loaded
            </span>
          </div>

          <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-3 before:w-0.5 before:bg-[#e7e7f3]">
            {stops.map((stop, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={stop.id}
                  className="relative flex items-center justify-between group"
                >
                  {/* Pin Dot */}
                  {isFirst ? (
                    <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-[#39126b] border-4 border-white shadow-sm ring-2 ring-[#39126b]/30"></div>
                  ) : (
                    <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-[#e1e1ed] border-2 border-white group-hover:bg-[#39126b] transition-colors"></div>
                  )}

                  {/* Stop detail */}
                  <div>
                    <div className="text-xs font-bold text-[#191b23] flex items-center gap-1.5 flex-wrap">
                      <span className={isFirst ? 'text-[#39126b]' : 'text-[#191b23]'}>
                        {stop.name} ({stop.id})
                      </span>

                      {isFirst && (
                        <span className="px-1.5 py-0.5 bg-[#39126b]/10 text-[#39126b] text-[10px] rounded font-bold">
                          You are here
                        </span>
                      )}

                      {stop.mrtCode && (
                        <span className="px-1.5 py-0.5 rounded bg-[#e3dfff] text-[#181542] text-[9px] font-bold">
                          {stop.mrtCode}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#4a4450] mt-0.5">
                      {stop.road} {stop.berth ? `• ${stop.berth}` : ''}
                    </div>
                  </div>

                  {/* ETA offset */}
                  <span
                    className={`text-xs font-bold shrink-0 ml-2 ${
                      isFirst ? 'text-[#00875a]' : 'text-[#4a4450]'
                    }`}
                  >
                    {isFirst ? '0 min' : `+${stop.etaOffsetMinutes} mins`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Journey Duration Summary Card */}
        <div className="bg-[#f6f7fa] rounded-xl p-3.5 flex items-center justify-between border border-[#e4e7ed]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#39126b] text-[20px]">
              timelapse
            </span>
            <div>
              <span className="text-xs font-bold text-[#191b23] block">
                Total Trip to {destinationName}
              </span>
              <span className="text-xs text-[#4a4450]">
                {service.totalStops} stops • {service.totalDurationMins} mins approx
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewAllStops}
            className="text-xs text-[#39126b] font-bold hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>
      </div>

      {/* Transit Service Advisory / Alert Card */}
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e7ed] space-y-2">
        <div className="flex items-center gap-2 text-[#b51c00]">
          <span className="material-symbols-outlined text-[20px]">info</span>
          <span className="text-xs font-bold">{service.advisory.title}</span>
        </div>

        <p className="text-xs text-[#4a4450] leading-relaxed">
          {service.advisory.text}
        </p>

        <div className="pt-2 flex items-center justify-between text-xs text-[#4a4450] border-t border-[#f0f0fb]">
          <span className="font-medium">SBS Operations Control</span>
          <span className="text-[#191b23] font-semibold">
            {service.advisory.updatedAgo}
          </span>
        </div>
      </div>
    </div>
  );
};

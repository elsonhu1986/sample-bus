import React from 'react';
import { NEARBY_STOPS_LIST, TransitStopContext } from '../../data/transitData';

interface NearbyStopsViewProps {
  onSelectStop: (stop: TransitStopContext) => void;
  onSelectService: (svcNo: string) => void;
  onGoToArrivals: () => void;
}

export const NearbyStopsView: React.FC<NearbyStopsViewProps> = ({
  onSelectStop,
  onSelectService,
  onGoToArrivals,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e4e7ed] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#39126b] text-[28px]">
              near_me
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-[#191b23]">
              Nearby Bus Stops Around Tampines Central
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4a4450] mt-1">
            Real-time walking distance radar calculated from GPS geofence
          </p>
        </div>

        <button
          onClick={onGoToArrivals}
          className="self-start sm:self-auto px-4 py-2 bg-[#39126b] text-white rounded-lg text-xs font-bold hover:bg-[#502d82] transition-colors"
        >
          Back to Live Arrivals
        </button>
      </div>

      {/* Grid of Nearby Stops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {NEARBY_STOPS_LIST.map((stop) => (
          <div
            key={stop.id}
            className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${
              stop.isCurrent
                ? 'border-[#39126b] ring-2 ring-[#39126b]/15'
                : 'border-[#e4e7ed] hover:border-[#502d82]/40 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#191b23]">
                    {stop.name}
                  </h3>
                  {stop.isCurrent && (
                    <span className="text-[10px] bg-[#39126b] text-white px-2 py-0.5 rounded-full font-bold">
                      Current Stop
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#4a4450] mt-0.5">{stop.road}</div>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-bold text-[#39126b] bg-[#ededf8] px-2 py-0.5 rounded">
                  {stop.id}
                </span>
                <div className="text-[11px] font-semibold text-[#00875a] mt-1">
                  {stop.distance} • {stop.walkTime}
                </div>
              </div>
            </div>

            {/* Passing Services */}
            <div className="pt-3 border-t border-[#ededf8]">
              <span className="text-xs font-bold text-[#4a4450] uppercase tracking-wider block mb-2">
                Passing Services:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stop.services.map((svc) => (
                  <button
                    key={svc}
                    onClick={() => {
                      onSelectService(svc);
                      onGoToArrivals();
                    }}
                    className="px-2.5 py-1 rounded bg-[#ededf8] hover:bg-[#39126b] hover:text-white text-[#191b23] text-xs font-['Space_Grotesk'] font-bold transition-colors cursor-pointer"
                  >
                    {svc}
                  </button>
                ))}
              </div>
            </div>

            {/* Set as Active Stop Action */}
            {!stop.isCurrent && (
              <div className="mt-4 pt-3 border-t border-[#f0f0fb] flex justify-end">
                <button
                  onClick={() => {
                    onSelectStop({
                      id: stop.id,
                      name: stop.name,
                      berth: 'Roadside Bay',
                      locationDesc: stop.road,
                      mrtConnections: 'Tampines Hub Corridor',
                      distanceAway: stop.distance,
                      latitude: 1.353,
                      longitude: 103.945,
                    });
                    onGoToArrivals();
                  }}
                  className="text-xs font-bold text-[#39126b] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Track Arrivals Here</span>
                  <span className="material-symbols-outlined text-[15px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { BusService } from '../../data/transitData';

interface RouteMapViewProps {
  service: BusService;
  onSelectService: (serviceNo: string) => void;
}

export const RouteMapView: React.FC<RouteMapViewProps> = ({ service }) => {
  const [selectedStopIdx, setSelectedStopIdx] = useState<number>(0);

  const stops = service.upcomingStops;
  const currentStop = stops[selectedStopIdx] || stops[0];

  return (
    <div className="space-y-6">
      {/* Route Map Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e4e7ed] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-lg bg-[#39126b] text-white flex items-center justify-center font-['Space_Grotesk'] text-xl font-bold">
              {service.serviceNo}
            </span>
            <div>
              <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#191b23]">
                Route {service.serviceNo} Live GPS Spatial Radar
              </h2>
              <p className="text-xs text-[#4a4450]">
                {service.terminals.dir2.terminus} • 52 Stops Total
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-[#e3fcef] text-[#00875a] px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-[#00875a]/20">
            <span className="h-2 w-2 rounded-full bg-[#00875a] animate-ping"></span>
            <span>Real-Time LTA Telemetry Active</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Map & Route Track */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Spatial Map Canvas (Col 1-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 shadow-sm border border-[#e4e7ed] space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#4a4450]">
            <span>Singapore Islandwide Transit Overlay</span>
            <span className="text-[#39126b]">Tampines ➔ Orchard ➔ HarbourFront</span>
          </div>

          {/* Interactive Route Canvas */}
          <div className="relative w-full h-[400px] bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-700">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #0f172a 1px)',
                backgroundSize: '24px 24px',
              }}
            ></div>

            {/* SVG Transit Path */}
            <svg className="w-full h-full" viewBox="0 0 800 400">
              {/* Singapore coastline hint */}
              <path
                d="M 60,340 Q 250,300 420,330 T 740,240 Q 780,180 720,120 T 450,110 Q 300,100 120,150 Z"
                fill="#1e293b"
                opacity="0.6"
              />

              {/* Expressways */}
              <path
                d="M 100,180 L 700,190"
                stroke="#334155"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <path
                d="M 680,150 Q 500,280 200,320"
                stroke="#334155"
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* Bus 65 Line Route */}
              <path
                d="M 700,170 Q 560,190 420,240 T 260,280 Q 210,310 180,340"
                fill="none"
                stroke="#9333ea"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Pulse glow path */}
              <path
                d="M 700,170 Q 560,190 420,240 T 260,280 Q 210,310 180,340"
                fill="none"
                stroke="#c084fc"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Stop Markers along the line */}
              {[
                { x: 700, y: 170, id: '75009', name: 'Tampines Int' },
                { x: 620, y: 180, id: '76131', name: 'Century Sq' },
                { x: 550, y: 198, id: '75369', name: 'Bedok Res' },
                { x: 470, y: 225, id: '72031', name: 'Kaki Bukit' },
                { x: 380, y: 250, id: '70101', name: 'MacPherson' },
                { x: 290, y: 275, id: '09023', name: 'Orchard' },
                { x: 180, y: 340, id: '14009', name: 'HarbourFront' },
              ].map((pt, i) => (
                <g
                  key={pt.id}
                  onClick={() => setSelectedStopIdx(Math.min(i, stops.length - 1))}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={i === selectedStopIdx ? '8' : '5'}
                    fill={i === 0 ? '#10b981' : i === 6 ? '#ef4444' : '#ffffff'}
                    stroke="#502d82"
                    strokeWidth="2"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="11"
                    fontFamily="sans-serif"
                    fontWeight="600"
                  >
                    {pt.name}
                  </text>
                </g>
              ))}

              {/* Moving Bus Pin at Tampines */}
              <g transform="translate(680, 162)">
                <circle cx="12" cy="12" r="14" fill="#a855f7" opacity="0.4">
                  <animate
                    attributeName="r"
                    values="12;20;12"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="12" cy="12" r="10" fill="#39126b" stroke="#ffffff" strokeWidth="2" />
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9"
                  fontFamily="'Space Grotesk', sans-serif"
                  fontWeight="bold"
                >
                  65
                </text>
              </g>
            </svg>

            {/* Floating Live Telemetry HUD */}
            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-white text-xs max-w-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="material-symbols-outlined text-[15px]">sensors</span>
                <span>Approaching Vehicle: {service.approachingVehicle.plateNumber}</span>
              </div>
              <div className="text-slate-300">
                Speed: <span className="font-mono font-bold text-white">{service.approachingVehicle.speedKmH} km/h</span> • Distance to stop: <span className="font-mono font-bold text-emerald-400">{service.approachingVehicle.distanceMeters}m</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Next Waypoint: {service.approachingVehicle.toStop}
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedStopIdx(0)}
                className="bg-slate-900/90 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 cursor-pointer"
              >
                Center Tampines Int
              </button>
            </div>
          </div>
        </div>

        {/* Selected Stop Details Panel (Col 9-12) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-[#e4e7ed] space-y-4">
          <div className="border-b border-[#ededf8] pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4a4450]">
              Inspected Stop Node
            </span>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#191b23] mt-0.5">
              {currentStop.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-xs font-bold bg-[#ededf8] text-[#39126b] px-2 py-0.5 rounded">
                STOP ID: {currentStop.id}
              </span>
              {currentStop.mrtCode && (
                <span className="text-xs bg-[#e3dfff] text-[#181542] px-2 py-0.5 rounded font-bold">
                  {currentStop.mrtCode}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#7b7481] block">Road Corridor</span>
              <span className="font-semibold text-[#191b23]">{currentStop.road}</span>
            </div>
            <div>
              <span className="text-[#7b7481] block">Arrival Sequence</span>
              <span className="font-semibold text-[#00875a]">
                {selectedStopIdx === 0 ? 'Current Arrival (0m)' : `+${currentStop.etaOffsetMinutes} minutes from origin`}
              </span>
            </div>
            <div>
              <span className="text-[#7b7481] block">Berth Details</span>
              <span className="font-semibold text-[#191b23]">
                {currentStop.berth || 'Designated LTA Roadside Bay'}
              </span>
            </div>
          </div>

          {/* Quick stop selector buttons */}
          <div className="pt-3 border-t border-[#ededf8]">
            <span className="text-xs font-bold text-[#4a4450] block mb-2">
              Select Stop to Inspect:
            </span>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {stops.map((stop, idx) => (
                <button
                  key={stop.id}
                  onClick={() => setSelectedStopIdx(idx)}
                  className={`w-full text-left p-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    idx === selectedStopIdx
                      ? 'bg-[#39126b] text-white font-bold'
                      : 'hover:bg-[#f6f7fa] text-[#191b23]'
                  }`}
                >
                  <span className="truncate">{stop.name}</span>
                  <span className="font-mono text-[11px] opacity-80">
                    +{stop.etaOffsetMinutes}m
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

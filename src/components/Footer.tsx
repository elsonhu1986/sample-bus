import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f3f3fe] border-t border-[#e1e1ed] mt-12 shadow-[0_-1px_6px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Col 1: LTA DataMall */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00875a]"></span>
              <span className="text-xs font-bold text-[#191b23]">
                LTA DataMall API 2.0
              </span>
            </div>
            <p className="text-xs text-[#4a4450] leading-relaxed">
              Real-time transit telemetry streaming active. Synchronized with Singapore LTA Intelligent Transport Systems.
            </p>
          </div>

          {/* Col 2: Occupancy Telemetry */}
          <div>
            <div className="text-xs font-bold text-[#191b23] mb-2.5">
              Occupancy Telemetry
            </div>
            <ul className="space-y-2 text-xs text-[#4a4450]">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00875a]"></span>
                <span>Seats Available</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f58220]"></span>
                <span>Standing Available</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#d32f2f]"></span>
                <span>Limited Standing</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Accessibility & Fleet */}
          <div>
            <div className="text-xs font-bold text-[#191b23] mb-2.5">
              Accessibility &amp; Fleet
            </div>
            <ul className="space-y-2 text-xs text-[#4a4450]">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#39126b]">
                  accessible
                </span>
                <span>Wheelchair Accessible Bus (WAB)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#39126b]">
                  directions_bus
                </span>
                <span>Double Decker Transit Capacity</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#39126b]">
                  contactless
                </span>
                <span>Smart Contactless Fare Payment</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Transit Assistance */}
          <div>
            <div className="text-xs font-bold text-[#191b23] mb-2.5">
              Transit Assistance
            </div>
            <ul className="space-y-2 text-xs text-[#4a4450]">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#b51c00]">
                  phone
                </span>
                <span>SBS Transit Hotline: 1800-2872727</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#39126b]">
                  search
                </span>
                <span>Lost &amp; Found Central Desk</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#39126b]">
                  security
                </span>
                <span>Civil Transit Operations Center</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-6 border-t border-[#e1e1ed] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#4a4450]">
          <p>© 2025 SBS Transit Ltd. All rights reserved. Operating under Public Transport Council regulatory guidelines.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="hover:text-[#191b23] cursor-pointer">Terms of Transit</span>
            <span className="hover:text-[#191b23] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#191b23] cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

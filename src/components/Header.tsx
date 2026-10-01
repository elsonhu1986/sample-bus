import React from 'react';
import { SBSLogo } from './SBSLogo';

export type NavTab = 'bus-arrival' | 'route-map' | 'nearby-stops' | 'service-alerts';
export type Language = 'en' | 'zh' | 'ms' | 'ta';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentStopName: string;
  onOpenStopSelector: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenProfile: () => void;
  unreadAlertsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentStopName,
  onOpenStopSelector,
  language,
  onLanguageChange,
  onOpenProfile,
  unreadAlertsCount = 1,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e1e1ed]/50">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div 
          className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          onClick={() => onSelectTab('bus-arrival')}
        >
          <SBSLogo height="h-8" />
          <span className="font-['Space+Grotesk',sans-serif] font-bold text-lg text-[#39126b] tracking-tight hidden sm:inline">
            SBS Transit
          </span>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => onSelectTab('bus-arrival')}
            className={`transition-colors px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer ${
              currentTab === 'bus-arrival'
                ? 'bg-[#502d82] text-white font-bold shadow-sm'
                : 'text-[#4a4450] hover:text-[#191b23] hover:bg-[#e7e7f3]'
            }`}
          >
            Bus Arrival
          </button>
          <button
            onClick={() => onSelectTab('route-map')}
            className={`transition-colors px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer ${
              currentTab === 'route-map'
                ? 'bg-[#502d82] text-white font-bold shadow-sm'
                : 'text-[#4a4450] hover:text-[#191b23] hover:bg-[#e7e7f3]'
            }`}
          >
            Route Map
          </button>
          <button
            onClick={() => onSelectTab('nearby-stops')}
            className={`transition-colors px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer ${
              currentTab === 'nearby-stops'
                ? 'bg-[#502d82] text-white font-bold shadow-sm'
                : 'text-[#4a4450] hover:text-[#191b23] hover:bg-[#e7e7f3]'
            }`}
          >
            Nearby Stops
          </button>
          <button
            onClick={() => onSelectTab('service-alerts')}
            className={`relative transition-colors px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'service-alerts'
                ? 'bg-[#502d82] text-white font-bold shadow-sm'
                : 'text-[#4a4450] hover:text-[#191b23] hover:bg-[#e7e7f3]'
            }`}
          >
            <span>Service Alerts</span>
            {unreadAlertsCount > 0 && (
              <span className="h-2 w-2 rounded-full bg-[#df2e0c] animate-pulse"></span>
            )}
          </button>
        </nav>

        {/* Right utility items */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Geolocation stop pill */}
          <button
            onClick={onOpenStopSelector}
            type="button"
            className="hidden sm:inline-flex items-center gap-1 bg-[#ededf8] px-3 py-1.5 rounded-lg text-[#191b23] text-xs font-semibold hover:bg-[#e7e7f3] transition-colors border border-transparent hover:border-[#ccc3d2]"
            title="Click to change detected transit stop"
          >
            <span className="material-symbols-outlined text-[16px] text-[#39126b]">
              near_me
            </span>
            <span className="truncate max-w-[130px] lg:max-w-none">
              {currentStopName}
            </span>
          </button>

          {/* Language Selector */}
          <div className="relative inline-flex items-center bg-[#ededf8] rounded-lg px-2 py-1 border border-transparent hover:border-[#ccc3d2]">
            <span className="material-symbols-outlined text-[16px] text-[#4a4450] mr-1">
              translate
            </span>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-xs font-bold text-[#191b23] focus:outline-none cursor-pointer pr-1"
              aria-label="Language Selector"
            >
              <option value="en">EN</option>
              <option value="zh">中文</option>
              <option value="ms">Melayu</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>

          {/* Commuter profile avatar */}
          <button
            onClick={onOpenProfile}
            type="button"
            className="w-8 h-8 rounded-full bg-[#39126b] hover:bg-[#502d82] flex items-center justify-center text-white transition-transform active:scale-95 shadow-sm"
            title="EZ-Link / Commuter Profile"
            aria-label="Commuter Profile"
          >
            <span className="material-symbols-outlined text-white text-[18px]">
              person
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sub-navigation bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-1.5 border-t border-[#e1e1ed] bg-white">
        <button
          onClick={() => onSelectTab('bus-arrival')}
          className={`px-2 py-1 text-xs font-semibold rounded ${
            currentTab === 'bus-arrival' ? 'bg-[#502d82] text-white' : 'text-[#4a4450]'
          }`}
        >
          Arrivals
        </button>
        <button
          onClick={() => onSelectTab('route-map')}
          className={`px-2 py-1 text-xs font-semibold rounded ${
            currentTab === 'route-map' ? 'bg-[#502d82] text-white' : 'text-[#4a4450]'
          }`}
        >
          Route Map
        </button>
        <button
          onClick={() => onSelectTab('nearby-stops')}
          className={`px-2 py-1 text-xs font-semibold rounded ${
            currentTab === 'nearby-stops' ? 'bg-[#502d82] text-white' : 'text-[#4a4450]'
          }`}
        >
          Nearby
        </button>
        <button
          onClick={() => onSelectTab('service-alerts')}
          className={`relative px-2 py-1 text-xs font-semibold rounded ${
            currentTab === 'service-alerts' ? 'bg-[#502d82] text-white' : 'text-[#4a4450]'
          }`}
        >
          <span>Alerts</span>
          {unreadAlertsCount > 0 && (
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-[#df2e0c]"></span>
          )}
        </button>
      </div>
    </header>
  );
};

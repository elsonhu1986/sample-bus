/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BUS_SERVICES_DATABASE,
  TRANSIT_STOPS,
  BusService,
  TransitStopContext,
} from './data/transitData';
import { Header, NavTab, Language } from './components/Header';
import { TransitRibbon } from './components/TransitRibbon';
import { BentoHeader } from './components/BentoHeader';
import { DirectionSwitcher } from './components/DirectionSwitcher';
import { OccupancyLegendPanel } from './components/OccupancyLegendPanel';
import { HeroArrivalCard } from './components/HeroArrivalCard';
import { PassingServicesList } from './components/PassingServicesList';
import { RouteSpatialRadar } from './components/RouteSpatialRadar';
import { CommuterConvenienceStrip } from './components/CommuterConvenienceStrip';
import { Footer } from './components/Footer';

// Modals
import { StopSelectorModal } from './components/modals/StopSelectorModal';
import { AllStopsModal } from './components/modals/AllStopsModal';
import { FareCalculatorModal } from './components/modals/FareCalculatorModal';
import { WeatherModal } from './components/modals/WeatherModal';
import { HelplineModal } from './components/modals/HelplineModal';
import { ProfileModal } from './components/modals/ProfileModal';

// Alternative Views
import { RouteMapView } from './components/views/RouteMapView';
import { NearbyStopsView } from './components/views/NearbyStopsView';
import { ServiceAlertsView } from './components/views/ServiceAlertsView';

export default function App() {
  // Navigation & Location State
  const [currentTab, setCurrentTab] = useState<NavTab>('bus-arrival');
  const [currentStop, setCurrentStop] = useState<TransitStopContext>(TRANSIT_STOPS[0]);
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>('65');
  const [activeDirection, setActiveDirection] = useState<1 | 2>(2);
  const [language, setLanguage] = useState<Language>('en');

  // UI Panels & Modals State
  const [showOccupancyGuide, setShowOccupancyGuide] = useState<boolean>(false);
  const [isStopModalOpen, setIsStopModalOpen] = useState<boolean>(false);
  const [isAllStopsModalOpen, setIsAllStopsModalOpen] = useState<boolean>(false);
  const [isFareModalOpen, setIsFareModalOpen] = useState<boolean>(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState<boolean>(false);
  const [isHelplineModalOpen, setIsHelplineModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Live Auto-refresh and Telemetry Simulation
  const [countdown, setCountdown] = useState<number>(18);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isGpsLocating, setIsGpsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Commute Bookmarks (persisted)
  const [bookmarkedServices, setBookmarkedServices] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sbs_bookmarked_services');
      return saved ? JSON.parse(saved) : ['65'];
    } catch {
      return ['65'];
    }
  });

  // Dynamic Service Database State (for real-time simulated tick-downs)
  const [servicesDatabase, setServicesDatabase] = useState<Record<string, BusService>>(
    BUS_SERVICES_DATABASE
  );

  // Auto-refresh timer countdown (ticks down every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          triggerRefreshTelemetry();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Save bookmarks
  const toggleBookmark = (serviceNo: string) => {
    setBookmarkedServices((prev) => {
      const next = prev.includes(serviceNo)
        ? prev.filter((s) => s !== serviceNo)
        : [...prev, serviceNo];
      try {
        localStorage.setItem('sbs_bookmarked_services', JSON.stringify(next));
      } catch {
        // ignore
      }
      showToast(
        next.includes(serviceNo)
          ? `Saved Bus ${serviceNo} to My Commute`
          : `Removed Bus ${serviceNo} from My Commute`
      );
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Trigger telemetry refresh
  const triggerRefreshTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Update vehicle distance slightly to simulate movement
      setServicesDatabase((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          const s = next[key];
          if (s) {
            const newDist = Math.max(120, s.approachingVehicle.distanceMeters - 25);
            const newProgress = Math.min(96, s.approachingVehicle.progressPercent + 2);
            next[key] = {
              ...s,
              approachingVehicle: {
                ...s.approachingVehicle,
                distanceMeters: newDist === 120 ? 450 : newDist,
                progressPercent: newProgress === 96 ? 82 : newProgress,
              },
            };
          }
        });
        return next;
      });
    }, 800);
  };

  // GPS Relocate feedback
  const handleRefreshGps = () => {
    setIsGpsLocating(true);
    setTimeout(() => {
      setIsGpsLocating(false);
      showToast('GPS Geofence locked: Tampines Int (Berth B04)');
    }, 900);
  };

  // Active Service Lookup (fallback generated dynamically if user searches any custom bus service)
  const activeService: BusService =
    servicesDatabase[selectedServiceNo] || {
      serviceNo: selectedServiceNo,
      type: 'Trunk',
      terminals: {
        dir1: { name: `Dir 1: Tampines Int`, terminus: 'Tampines Int' },
        dir2: { name: `Dir 2: City Terminal`, terminus: 'Shenton Way via Marina' },
      },
      currentDirection: activeDirection,
      approachingVehicle: {
        plateNumber: `SBS ${(Math.floor(Math.random() * 8000) + 1000)} T`,
        speedKmH: 32,
        distanceMeters: 520,
        fromStop: 'Approaching Tampines Ave 5',
        toStop: currentStop.name,
        progressPercent: 78,
      },
      nextBuses: [
        { etaMinutes: 1, etaLabel: '1', deck: 'DD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
        { etaMinutes: 11, etaLabel: '11', deck: 'DD', accessible: true, occupancy: 'standing', occupancyLabel: 'Standing Avail' },
        { etaMinutes: 22, etaLabel: '22', deck: 'SD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
      ],
      upcomingStops: [
        { id: currentStop.id, name: currentStop.name, road: currentStop.locationDesc, berth: currentStop.berth, etaOffsetMinutes: 0, latitude: currentStop.latitude, longitude: currentStop.longitude },
        { id: '76131', name: 'Opp Century Sq', road: 'Tampines Ave 5', etaOffsetMinutes: 2, latitude: 1.3524, longitude: 103.9431 },
        { id: '76081', name: 'Blk 938', road: 'Tampines Ave 5', etaOffsetMinutes: 5, latitude: 1.3489, longitude: 103.9398 },
        { id: '75369', name: 'Bedok Reservoir Rd', road: 'Opp Blk 701', etaOffsetMinutes: 9, latitude: 1.3392, longitude: 103.9218 },
        { id: '72031', name: 'Kaki Bukit MRT Stn', road: 'Jalan Eunos Link', mrtCode: 'DT28', etaOffsetMinutes: 14, latitude: 1.3351, longitude: 103.9084 },
      ],
      totalStops: 45,
      totalDurationMins: 62,
      advisory: {
        title: 'Transit Advisory Notice',
        text: `Bus ${selectedServiceNo} operations running normally across transit corridors. Headway 7-10 minutes.`,
        updatedAgo: '2m ago',
      },
    };

  // List of all available primary passing services (65, 14, 28, 67, etc.)
  const allServicesList = [
    servicesDatabase['65'],
    servicesDatabase['14'],
    servicesDatabase['28'],
    servicesDatabase['67'],
  ].filter(Boolean) as BusService[];

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#191b23] flex flex-col font-['Inter',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#39126b] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-[16px] text-[#00875a]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentStopName={currentStop.name}
        onOpenStopSelector={() => setIsStopModalOpen(true)}
        language={language}
        onLanguageChange={setLanguage}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        unreadAlertsCount={1}
      />

      {/* Main Page Workspace */}
      <main className="w-full pt-16 flex-1 bg-[#faf8ff]">
        <div className="flex flex-col w-full">
          {/* Top Global Transit Status Ribbon */}
          <TransitRibbon
            countdownSeconds={countdown}
            isRefreshing={isRefreshing}
            onRefresh={() => {
              setCountdown(20);
              triggerRefreshTelemetry();
            }}
          />

          {/* Body Content Container */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
            {/* TAB 1: BUS ARRIVAL (Default Home View matching user screens) */}
            {currentTab === 'bus-arrival' && (
              <>
                {/* 1. Bento Header: Search + Geolocation Stop Context */}
                <BentoHeader
                  currentStop={currentStop}
                  selectedService={selectedServiceNo}
                  onSelectService={(svc) => {
                    setSelectedServiceNo(svc);
                  }}
                  onOpenStopSelector={() => setIsStopModalOpen(true)}
                  onRefreshGps={handleRefreshGps}
                  isGpsLocating={isGpsLocating}
                />

                {/* 2. Direction Switcher & Commuter Actions Bar */}
                <DirectionSwitcher
                  service={activeService}
                  activeDirection={activeDirection}
                  onDirectionChange={setActiveDirection}
                  isBookmarked={bookmarkedServices.includes(activeService.serviceNo)}
                  onToggleBookmark={() => toggleBookmark(activeService.serviceNo)}
                  onToggleOccupancyGuide={() =>
                    setShowOccupancyGuide((prev) => !prev)
                  }
                />

                {/* 3. Collapsible Occupancy Legend Panel */}
                {showOccupancyGuide && (
                  <OccupancyLegendPanel
                    onClose={() => setShowOccupancyGuide(false)}
                  />
                )}

                {/* 4. Main Two-Column Workspace: Arrivals + Spatial Telemetry */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column (Col 1-7): Hero Bus + Passing Services */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Featured Hero Card: Bus 65 (or selected) */}
                    <HeroArrivalCard
                      service={activeService}
                      onOpenDetails={() => setIsAllStopsModalOpen(true)}
                    />

                    {/* Secondary Passing Services */}
                    <PassingServicesList
                      services={allServicesList}
                      activeServiceNo={activeService.serviceNo}
                      onSelectService={(svcNo) => setSelectedServiceNo(svcNo)}
                    />
                  </div>

                  {/* Right Column (Col 8-12): Route Telemetry Radar + Stops Timeline */}
                  <div className="lg:col-span-5">
                    <RouteSpatialRadar
                      service={activeService}
                      onViewAllStops={() => setIsAllStopsModalOpen(true)}
                      onSelectMapTab={() => setCurrentTab('route-map')}
                    />
                  </div>
                </div>

                {/* 5. Commuter Convenience Strip */}
                <CommuterConvenienceStrip
                  onOpenFareCalculator={() => setIsFareModalOpen(true)}
                  onOpenWeatherModal={() => setIsWeatherModalOpen(true)}
                  onOpenHelplineModal={() => setIsHelplineModalOpen(true)}
                />
              </>
            )}

            {/* TAB 2: ROUTE MAP VIEW */}
            {currentTab === 'route-map' && (
              <RouteMapView
                service={activeService}
                onSelectService={(svc) => setSelectedServiceNo(svc)}
              />
            )}

            {/* TAB 3: NEARBY STOPS VIEW */}
            {currentTab === 'nearby-stops' && (
              <NearbyStopsView
                onSelectStop={(stop) => setCurrentStop(stop)}
                onSelectService={(svc) => setSelectedServiceNo(svc)}
                onGoToArrivals={() => setCurrentTab('bus-arrival')}
              />
            )}

            {/* TAB 4: SERVICE ALERTS VIEW */}
            {currentTab === 'service-alerts' && (
              <ServiceAlertsView
                onGoToArrivals={() => setCurrentTab('bus-arrival')}
              />
            )}
          </div>
        </div>
      </main>

      {/* Global Modals */}
      <StopSelectorModal
        isOpen={isStopModalOpen}
        onClose={() => setIsStopModalOpen(false)}
        currentStopId={currentStop.id}
        onSelectStop={(stop) => {
          setCurrentStop(stop);
          showToast(`Switched stop to ${stop.name} (${stop.id})`);
        }}
      />

      <AllStopsModal
        isOpen={isAllStopsModalOpen}
        onClose={() => setIsAllStopsModalOpen(false)}
        service={activeService}
      />

      <FareCalculatorModal
        isOpen={isFareModalOpen}
        onClose={() => setIsFareModalOpen(false)}
      />

      <WeatherModal
        isOpen={isWeatherModalOpen}
        onClose={() => setIsWeatherModalOpen(false)}
      />

      <HelplineModal
        isOpen={isHelplineModalOpen}
        onClose={() => setIsHelplineModalOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        savedRoutesCount={bookmarkedServices.length}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

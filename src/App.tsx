/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
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
import { ApiHealthModal } from './components/modals/ApiHealthModal';

// Alternative Views
import { RouteMapView } from './components/views/RouteMapView';
import { NearbyStopsView } from './components/views/NearbyStopsView';
import { ServiceAlertsView } from './components/views/ServiceAlertsView';

// LTA DataMall v3 Client Service
import {
  fetchLtaBusArrival,
  parseLtaBusUnit,
  LtaBusArrivalResponse,
} from './services/ltaService';

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
  const [isApiHealthModalOpen, setIsApiHealthModalOpen] = useState<boolean>(false);

  // Live Auto-refresh and Telemetry Simulation
  const [countdown, setCountdown] = useState<number>(20);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isGpsLocating, setIsGpsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [feedSource, setFeedSource] = useState<string>('LTA DataMall v3');

  // Commute Bookmarks (persisted)
  const [bookmarkedServices, setBookmarkedServices] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sbs_bookmarked_services');
      return saved ? JSON.parse(saved) : ['65'];
    } catch {
      return ['65'];
    }
  });

  // Dynamic Service Database State (populated from LTA DataMall v3 endpoint)
  const [servicesDatabase, setServicesDatabase] = useState<Record<string, BusService>>(
    BUS_SERVICES_DATABASE
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Fetch LTA DataMall v3 bus arrivals for current stop and update state
  const loadLtaArrivals = useCallback(
    async (silent: boolean = false) => {
      if (!silent) setIsRefreshing(true);
      try {
        const response: LtaBusArrivalResponse = await fetchLtaBusArrival(
          currentStop.id,
          selectedServiceNo
        );

        if (response._source === 'live_lta_datamall') {
          setFeedSource('LTA DataMall Live');
        } else {
          setFeedSource('LTA v3 Telemetry');
        }

        if (response && Array.isArray(response.Services) && response.Services.length > 0) {
          setServicesDatabase((prev) => {
            const updated = { ...prev };

            response.Services.forEach((svcItem) => {
              const svcNo = svcItem.ServiceNo;
              const next1 = parseLtaBusUnit(svcItem.NextBus);
              const next2 = parseLtaBusUnit(svcItem.NextBus2);
              const next3 = parseLtaBusUnit(svcItem.NextBus3);

              const parsedNextBuses = [next1, next2, next3].filter(Boolean) as any[];

              if (parsedNextBuses.length > 0) {
                if (updated[svcNo]) {
                  updated[svcNo] = {
                    ...updated[svcNo],
                    nextBuses: parsedNextBuses,
                  };
                } else {
                  // If new service not in hardcoded dictionary, build a full dynamic record
                  updated[svcNo] = {
                    serviceNo: svcNo,
                    type: 'Trunk',
                    terminals: {
                      dir1: { name: `Dir 1: Loop`, terminus: 'Integrated Hub' },
                      dir2: { name: `Dir 2: Cross Island`, terminus: 'City Terminus' },
                    },
                    currentDirection: 2,
                    approachingVehicle: {
                      plateNumber: `SBS ${(Math.floor(Math.random() * 7000) + 2000)} T`,
                      speedKmH: 34,
                      distanceMeters: Math.max(250, (parsedNextBuses[0]?.etaMinutes || 2) * 280),
                      fromStop: 'Approaching Corridor',
                      toStop: currentStop.name,
                      progressPercent: 78,
                    },
                    nextBuses: parsedNextBuses,
                    upcomingStops: [
                      {
                        id: currentStop.id,
                        name: currentStop.name,
                        road: currentStop.locationDesc,
                        berth: currentStop.berth,
                        etaOffsetMinutes: 0,
                        latitude: currentStop.latitude,
                        longitude: currentStop.longitude,
                      },
                      { id: '76131', name: 'Opp Century Sq', road: 'Tampines Ave 5', etaOffsetMinutes: 2, latitude: 1.3524, longitude: 103.9431 },
                      { id: '76081', name: 'Blk 938', road: 'Tampines Ave 5', etaOffsetMinutes: 5, latitude: 1.3489, longitude: 103.9398 },
                      { id: '75369', name: 'Bedok Reservoir Rd', road: 'Opp Blk 701', etaOffsetMinutes: 9, latitude: 1.3392, longitude: 103.9218 },
                      { id: '72031', name: 'Kaki Bukit MRT Stn', road: 'Jalan Eunos Link', mrtCode: 'DT28', etaOffsetMinutes: 14, latitude: 1.3351, longitude: 103.9084 },
                    ],
                    totalStops: 46,
                    totalDurationMins: 65,
                    advisory: {
                      title: 'LTA DataMall Telemetry Active',
                      text: `Bus ${svcNo} automated ETA stream synchronized with LTA Intelligent Transport Systems.`,
                      updatedAgo: 'Just now',
                    },
                  };
                }
              }
            });

            return updated;
          });
        }
      } catch (err) {
        console.error('LTA Arrival Fetch failed:', err);
      } finally {
        if (!silent) setIsRefreshing(false);
      }
    },
    [currentStop.id, currentStop.name, currentStop.locationDesc, currentStop.berth, currentStop.latitude, currentStop.longitude, selectedServiceNo]
  );

  // Auto-refresh timer countdown (ticks down every second, refreshes every 20 seconds as recommended by LTA)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          loadLtaArrivals(true);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loadLtaArrivals]);

  // Initial load or stop change trigger
  useEffect(() => {
    loadLtaArrivals();
  }, [loadLtaArrivals]);

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

  // GPS Relocate feedback
  const handleRefreshGps = () => {
    setIsGpsLocating(true);
    setTimeout(() => {
      setIsGpsLocating(false);
      loadLtaArrivals();
      showToast(`GPS Geofence locked: ${currentStop.name} (${currentStop.id})`);
    }, 800);
  };

  // Active Service Lookup
  const activeService: BusService =
    servicesDatabase[selectedServiceNo] || {
      serviceNo: selectedServiceNo,
      type: 'Trunk',
      terminals: {
        dir1: { name: `Dir 1: Loop`, terminus: 'Origin Terminal' },
        dir2: { name: `Dir 2: Cross Island`, terminus: 'Destination Interchange' },
      },
      currentDirection: activeDirection,
      approachingVehicle: {
        plateNumber: `SBS ${(Math.floor(Math.random() * 8000) + 1000)} T`,
        speedKmH: 32,
        distanceMeters: 450,
        fromStop: 'Approaching En-route',
        toStop: currentStop.name,
        progressPercent: 82,
      },
      nextBuses: [
        { etaMinutes: 0, etaLabel: 'Arr', deck: 'DD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
        { etaMinutes: 7, etaLabel: '7', deck: 'DD', accessible: true, occupancy: 'standing', occupancyLabel: 'Standing Avail' },
        { etaMinutes: 19, etaLabel: '19', deck: 'SD', accessible: true, occupancy: 'seats', occupancyLabel: 'Seats Avail' },
      ],
      upcomingStops: [
        { id: currentStop.id, name: currentStop.name, road: currentStop.locationDesc, berth: currentStop.berth, etaOffsetMinutes: 0, latitude: currentStop.latitude, longitude: currentStop.longitude },
        { id: '76131', name: 'Opp Century Sq', road: 'Tampines Ave 5', etaOffsetMinutes: 2, latitude: 1.3524, longitude: 103.9431 },
        { id: '76081', name: 'Blk 938', road: 'Tampines Ave 5', etaOffsetMinutes: 5, latitude: 1.3489, longitude: 103.9398 },
        { id: '75369', name: 'Bedok Reservoir Rd', road: 'Opp Blk 701', etaOffsetMinutes: 9, latitude: 1.3392, longitude: 103.9218 },
        { id: '72031', name: 'Kaki Bukit MRT Stn', road: 'Jalan Eunos Link', mrtCode: 'DT28', etaOffsetMinutes: 14, latitude: 1.3351, longitude: 103.9084 },
      ],
      totalStops: 52,
      totalDurationMins: 78,
      advisory: {
        title: 'Transit Advisory Notice',
        text: `Bus ${selectedServiceNo} operational telematics streaming via LTA DataMall v3. Headway 6-9 mins.`,
        updatedAgo: 'Just now',
      },
    };

  // Primary passing services list
  const allServicesList = [
    servicesDatabase['65'],
    servicesDatabase['14'],
    servicesDatabase['28'],
    servicesDatabase['67'],
    servicesDatabase['176'],
    servicesDatabase['30'],
    servicesDatabase['78'],
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
            dataSource={feedSource}
            onOpenApiHealth={() => setIsApiHealthModalOpen(true)}
            onRefresh={() => {
              setCountdown(20);
              loadLtaArrivals();
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

      <ApiHealthModal
        isOpen={isApiHealthModalOpen}
        onClose={() => setIsApiHealthModalOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenApiHealth={() => setIsApiHealthModalOpen(true)} />
    </div>
  );
}

import React, { useState } from 'react';

interface FareCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FareCalculatorModal: React.FC<FareCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [passengerType, setPassengerType] = useState<'adult' | 'senior' | 'student' | 'concession'>('adult');
  const [distanceKm, setDistanceKm] = useState(12.4);

  if (!isOpen) return null;

  // Real Public Transport Council (PTC) Singapore distance-based fare formula approximations:
  const calculateFare = (distance: number, type: string) => {
    let base = 1.09;
    if (type === 'adult') {
      base = 1.09 + Math.min(distance * 0.08, 1.28);
      const cash = base + 0.9;
      return { card: base.toFixed(2), cash: cash.toFixed(2) };
    } else if (type === 'senior') {
      base = 0.65 + Math.min(distance * 0.03, 0.45);
      return { card: base.toFixed(2), cash: (base + 0.5).toFixed(2) };
    } else if (type === 'student') {
      base = 0.48 + Math.min(distance * 0.025, 0.35);
      return { card: base.toFixed(2), cash: (base + 0.5).toFixed(2) };
    } else {
      base = 0.75 + Math.min(distance * 0.04, 0.65);
      return { card: base.toFixed(2), cash: (base + 0.6).toFixed(2) };
    }
  };

  const currentFare = calculateFare(distanceKm, passengerType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#e4e7ed] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#ededf8] flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#39126b] text-[24px]">
              contactless
            </span>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#191b23]">
              Distance Fare Estimator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7b7481] hover:text-[#191b23] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Passenger type pills */}
          <div>
            <label className="text-xs font-bold text-[#4a4450] uppercase tracking-wider block mb-2">
              Commuter Pass Category:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'adult', label: 'Adult (CEPAS / Bank Card)' },
                { id: 'senior', label: 'Senior Citizen (>60)' },
                { id: 'student', label: 'Primary / Secondary / JC' },
                { id: 'concession', label: 'Workfare Concession' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPassengerType(cat.id as any)}
                  className={`p-2.5 rounded-lg text-xs font-semibold text-left transition-all border ${
                    passengerType === cat.id
                      ? 'bg-[#39126b] text-white border-[#39126b] shadow-xs'
                      : 'bg-[#f6f7fa] text-[#191b23] border-[#e4e7ed] hover:bg-[#ededf8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distance slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-[#4a4450] mb-2">
              <span>Journey Distance:</span>
              <span className="text-[#39126b] font-mono text-sm">
                {distanceKm.toFixed(1)} km
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="0.5"
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
              className="w-full accent-[#39126b] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#7b7481] mt-1">
              <span>Short (1 km)</span>
              <span>Medium (15 km)</span>
              <span>Cross-island (35 km)</span>
            </div>
          </div>

          {/* Fare Result Card */}
          <div className="bg-[#e3fcef] rounded-xl p-4 border border-[#00875a]/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#00875a] font-bold block uppercase tracking-wide">
                Contactless Card Fare
              </span>
              <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#00875a]">
                ${currentFare.card}
              </span>
              <div className="text-[11px] text-[#4a4450] mt-0.5">
                SimplyGo, Visa, Mastercard, EZ-Link
              </div>
            </div>

            <div className="text-right border-l border-[#00875a]/20 pl-4">
              <span className="text-xs text-[#7b7481] block">Cash Fare</span>
              <span className="font-['Space_Grotesk'] text-xl font-bold text-[#7b7481] line-through">
                ${currentFare.cash}
              </span>
              <div className="text-[10px] text-[#00875a] font-bold mt-0.5">
                Save ${(parseFloat(currentFare.cash) - parseFloat(currentFare.card)).toFixed(2)} with card
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#7b7481] leading-relaxed">
            * Fares governed by Singapore Public Transport Council Distance-Based Fare rules. Up to 5 transfers permitted within 45 minutes of alighting.
          </div>
        </div>

        <div className="p-4 border-t border-[#ededf8] bg-[#faf8ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#39126b] text-white rounded-lg text-xs font-bold hover:bg-[#502d82] transition-colors"
          >
            Close Estimator
          </button>
        </div>
      </div>
    </div>
  );
};

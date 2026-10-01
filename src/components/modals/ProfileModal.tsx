import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedRoutesCount: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  savedRoutesCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#e4e7ed] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#ededf8] flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#39126b] text-[24px]">
              badge
            </span>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#191b23]">
              Commuter Transit Profile
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
          {/* Virtual EZ-Link / SimplyGo Card */}
          <div className="bg-gradient-to-tr from-[#39126b] via-[#502d82] to-[#c09bf8] p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <span className="font-['Space_Grotesk'] font-bold text-base tracking-wider">
                SimplyGo
              </span>
              <span className="material-symbols-outlined text-white/80 text-[24px]">
                contactless
              </span>
            </div>
            <div className="text-xs text-white/70">Card Balance</div>
            <div className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight">
              $24.80 SGD
            </div>
            <div className="mt-4 flex justify-between items-center text-[11px] text-white/80 font-mono">
              <span>CAN: 1000 8920 4421</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-sans font-bold">
                Auto-Topup ON
              </span>
            </div>
          </div>

          {/* Commuter stats */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#f6f7fa] rounded-xl border border-[#e4e7ed]">
              <span className="text-[#7b7481] block">Saved Commutes</span>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#39126b]">
                {savedRoutesCount} routes
              </span>
            </div>
            <div className="p-3 bg-[#f6f7fa] rounded-xl border border-[#e4e7ed]">
              <span className="text-[#7b7481] block">Transit Carbon Offset</span>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#00875a]">
                18.4 kg CO₂
              </span>
            </div>
          </div>

          {/* Quick toggles */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#faf8ff] border border-[#ededf8]">
              <span className="font-medium text-[#191b23]">
                Alighting Arrival Vibration Alert
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="accent-[#39126b] h-4 w-4 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#faf8ff] border border-[#ededf8]">
              <span className="font-medium text-[#191b23]">
                High Headway Audio Beep (&lt; 2 min)
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="accent-[#39126b] h-4 w-4 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#ededf8] bg-[#faf8ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#39126b] text-white rounded-lg text-xs font-bold hover:bg-[#502d82]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

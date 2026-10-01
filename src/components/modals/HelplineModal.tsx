import React, { useState } from 'react';

interface HelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelplineModal: React.FC<HelplineModalProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState('lost');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#e4e7ed] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#ededf8] flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b51c00] text-[24px]">
              support_agent
            </span>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#191b23]">
              SBS Transit Commuter Assistance
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
          {/* Toll Free Direct Action Card */}
          <div className="bg-[#ffebe6] p-4 rounded-xl border border-[#b51c00]/25 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#b51c00] font-bold block uppercase tracking-wide">
                24/7 Operations Command
              </span>
              <div className="font-['Space_Grotesk'] text-2xl font-bold text-[#b51c00]">
                1800-287-2727
              </div>
              <div className="text-xs text-[#4a4450]">Toll-Free within Singapore</div>
            </div>

            <a
              href="tel:18002872727"
              className="px-4 py-2.5 bg-[#b51c00] text-white rounded-lg text-xs font-bold hover:bg-[#df2e0c] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>Call Now</span>
            </a>
          </div>

          {/* Online Submission Form */}
          {submitted ? (
            <div className="bg-[#e3fcef] p-6 rounded-xl text-center space-y-2 border border-[#00875a]/30">
              <span className="material-symbols-outlined text-[#00875a] text-[36px]">
                check_circle
              </span>
              <div className="font-bold text-[#191b23] text-sm">
                Case Ticket Logged Successfully
              </div>
              <p className="text-xs text-[#4a4450]">
                SBS Operations Support will review your report shortly. Reference: #SBS-2025-0812
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#4a4450] block mb-1">
                  Assistance Category:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReportType('lost')}
                    className={`p-2 rounded-lg text-xs font-semibold border ${
                      reportType === 'lost'
                        ? 'bg-[#39126b] text-white border-[#39126b]'
                        : 'bg-[#f6f7fa] text-[#191b23] border-[#e4e7ed]'
                    }`}
                  >
                    Lost &amp; Found Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType('feedback')}
                    className={`p-2 rounded-lg text-xs font-semibold border ${
                      reportType === 'feedback'
                        ? 'bg-[#39126b] text-white border-[#39126b]'
                        : 'bg-[#f6f7fa] text-[#191b23] border-[#e4e7ed]'
                    }`}
                  >
                    Service Commendation / Feedback
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#4a4450] block mb-1">
                  Incident Details (Bus Service, Stop, Time):
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Left a blue umbrella on Bus 65 upper deck, boarded around 2:15 PM at Tampines Int..."
                  className="w-full p-2.5 bg-[#f6f7fa] rounded-lg text-xs border border-[#e4e7ed] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#502d82]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-transparent text-[#4a4450] text-xs font-semibold hover:bg-black/5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#39126b] text-white rounded-lg text-xs font-bold hover:bg-[#502d82] transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

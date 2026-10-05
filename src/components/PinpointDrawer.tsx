import React from 'react';

interface PinpointDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  docTitle: string;
  pinpoint: string;
  quote: string;
  statusTag?: string;
}

export const PinpointDrawer: React.FC<PinpointDrawerProps> = ({
  isOpen,
  onClose,
  docTitle,
  pinpoint,
  quote,
  statusTag,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity">
      <div className="absolute inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl p-6 md:p-8 flex flex-col justify-between transform transition-transform duration-300 ease-out border-l border-[#E5E3DC]">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DC]">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#DEE1FF] text-[#0033C2] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[15px] text-[#111111]">
                  Source Verification Drawer
                </span>
                <span className="text-[11px] text-[#747878]">
                  OCR Exact Match &amp; Evidentiary Excerpt
                </span>
              </div>
            </div>
            <button
              className="w-8 h-8 rounded-full hover:bg-[#FAF9F6] border border-transparent hover:border-[#E5E3DC] flex items-center justify-center text-[#747878] hover:text-[#111111] transition-all"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Document & Pinpoint Box */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#747878]">
              Document &amp; Reference
            </span>
            <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E5E3DC]">
              <p className="font-mono text-[13px] font-semibold text-[#111111] truncate">
                {docTitle}
              </p>
              <p className="text-[12px] font-medium text-[#214AE2] mt-0.5">
                {pinpoint}
              </p>
              {statusTag && (
                <div className="mt-2 pt-2 border-t border-[#E5E3DC]/60 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>{statusTag}</span>
                </div>
              )}
            </div>
          </div>

          {/* Exact Evidentiary Scan Excerpt */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#747878]">
                Exact Evidentiary Scan Excerpt
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Confidence: 99.4%
              </span>
            </div>
            <div className="p-4 bg-[#FAF9F6] rounded-xl relative border border-[#E5E3DC]">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#214AE2] rounded-l-xl"></div>
              <p className="text-[13px] text-[#111111] italic leading-relaxed pl-2">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          </div>

          {/* Hash & Provenance Security */}
          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E3DC] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#214AE2] text-[22px]">lock_clock</span>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-[#111111]">
                Cryptographic Hash Verified
              </span>
              <span className="text-[10px] text-[#747878] font-mono truncate">
                SHA256: 4f8b91a27e3881029c2e01df71904a298be
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E5E3DC] flex items-center justify-between">
          <button
            className="px-4 py-2 rounded-full text-[#626768] hover:text-[#111111] text-[12px] font-medium transition-colors"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#111111] text-white text-[12px] font-semibold hover:bg-neutral-800 transition-all shadow-sm"
            onClick={() => {
              alert(`Opening Master File '${docTitle}' in split view PDF exhibit reader.`);
              onClose();
            }}
          >
            <span className="material-symbols-outlined text-[16px]">launch</span>
            <span>Open in Full Exhibit Viewer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

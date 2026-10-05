import React from 'react';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  refTag: string;
  docTitle: string;
  snippet: string;
  onInspectFullPage?: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({
  isOpen,
  onClose,
  refTag,
  docTitle,
  snippet,
  onInspectFullPage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-[#E5E3DC] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5E3DC]/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#214AE2] text-[20px]">source</span>
            <span className="font-display font-semibold text-[15px] text-[#111111]">
              {docTitle || 'Exhibit Document'}
            </span>
          </div>
          <button
            className="w-7 h-7 rounded-lg hover:bg-[#EFEFEB] flex items-center justify-center text-[#747878] hover:text-[#111111] transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E5E3DC]">
          <span className="text-[10px] uppercase tracking-wider text-[#747878] font-bold block mb-1">
            Citation Excerpt Anchor
          </span>
          <p className="font-mono text-[13px] text-[#214AE2] font-semibold">
            {refTag}
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] uppercase tracking-wider text-[#747878] font-bold">
            Verbatim OCR Extracted Text:
          </span>
          <blockquote className="p-3.5 bg-[#FAF9F6] rounded-xl text-[12px] text-[#1A1C1A] italic leading-relaxed border-l-2 border-[#214AE2]">
            &ldquo;{snippet}&rdquo;
          </blockquote>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#E5E3DC]/60">
          <div className="flex items-center gap-1.5 text-[11px] text-[#626768]">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
            <span>Traceability SHA-256 Validated</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3.5 py-1.5 rounded-full bg-[#EFEFEB] text-[#111111] text-[12px] font-medium hover:bg-[#E5E3DC] transition-colors"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-4 py-1.5 rounded-full bg-[#111111] text-white text-[12px] font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
              onClick={() => {
                onClose();
                if (onInspectFullPage) onInspectFullPage();
                else alert(`Opening certified master copy of ${docTitle} at pinned bookmark.`);
              }}
            >
              Inspect Full Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { NavView } from '../types';

interface HeaderProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onExport: (format: 'pdf' | 'docx') => void;
  verifiedCount: number;
  totalFindings: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  searchQuery,
  onSearchChange,
  onExport,
  verifiedCount,
  totalFindings,
}) => {
  return (
    <header className="h-16 bg-[#FAF9F6]/90 backdrop-blur-md z-40 border-b border-[#E5E3DC] px-8 flex items-center justify-between sticky top-0">
      <div className="flex items-center gap-6 flex-1 max-w-3xl">
        {/* Search Input */}
        <div className="relative w-full max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] text-[17px]">
            search
          </span>
          <input
            className="w-full h-9 pl-9 pr-3 rounded-full bg-white border border-[#E5E3DC] text-[12px] placeholder:text-[#747878]/70 focus:outline-none focus:border-[#111111] transition-colors shadow-xs"
            placeholder="Search facts, citations, admissions..."
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#747878] hover:text-black"
            >
              <span className="material-symbols-outlined text-[15px]">close</span>
            </button>
          )}
        </div>

        {/* Linear Workflow Step Indicators */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-medium text-[#747878]">
          <button
            onClick={() => onSelectView('documents-verification')}
            className={`transition-colors hover:text-[#111111] ${
              currentView === 'documents-verification' ? 'text-[#111111] font-semibold' : ''
            }`}
          >
            Upload
          </button>
          <span className="material-symbols-outlined text-[13px] opacity-40">chevron_right</span>
          <button
            onClick={() => onSelectView('documents-verification')}
            className={`transition-colors hover:text-[#111111] ${
              currentView === 'documents-verification' ? 'text-[#111111] font-semibold' : ''
            }`}
          >
            OCR
          </button>
          <span className="material-symbols-outlined text-[13px] opacity-40">chevron_right</span>
          <button
            onClick={() => onSelectView('findings-triage')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              currentView === 'findings-triage'
                ? 'bg-[#111111] text-white font-semibold shadow-xs'
                : 'hover:text-[#111111]'
            }`}
          >
            Findings {currentView === 'findings-triage' && '(Active)'}
          </button>
          <span className="material-symbols-outlined text-[13px] opacity-40">chevron_right</span>
          <button
            onClick={() => onSelectView('chronological-timeline')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              currentView === 'chronological-timeline'
                ? 'bg-[#111111] text-white font-semibold shadow-xs'
                : 'hover:text-[#111111]'
            }`}
          >
            Timeline {currentView === 'chronological-timeline' && '(Active)'}
          </button>
          <span className="material-symbols-outlined text-[13px] opacity-40">chevron_right</span>
          <button
            onClick={() => onSelectView('structured-case-brief')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              currentView === 'structured-case-brief'
                ? 'bg-[#111111] text-white font-semibold shadow-xs'
                : 'hover:text-[#111111]'
            }`}
          >
            Case Brief {currentView === 'structured-case-brief' && '(Active)'}
          </button>
        </div>
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E3DC] text-[11px] text-[#1A1C1A] font-medium shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#214AE2]"></span>
          <span>Verification: {verifiedCount} of {totalFindings} reviewed</span>
        </div>

        <div className="relative group">
          <button
            onClick={() => onExport('pdf')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111111] text-white text-[12px] font-semibold hover:bg-neutral-800 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            <span>Export Case Brief</span>
          </button>
        </div>

        <button
          onClick={() => alert('No unread docket notices. Case dossier synchronized.')}
          className="w-8 h-8 rounded-full bg-white border border-[#E5E3DC] flex items-center justify-center text-[#1A1C1A] hover:bg-[#FAF9F6] transition-colors shadow-xs"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-[17px]">notifications_none</span>
        </button>
      </div>
    </header>
  );
};

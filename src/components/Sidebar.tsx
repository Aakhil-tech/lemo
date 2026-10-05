import React, { useState } from 'react';
import { NavView, Matter } from '../types';
import { mattersList } from '../data/mockData';

interface SidebarProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  activeMatter: Matter;
  onSelectMatter: (matter: Matter) => void;
  pendingFindingsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  activeMatter,
  onSelectMatter,
  pendingFindingsCount,
}) => {
  const [matterDropdownOpen, setMatterDropdownOpen] = useState(false);

  const navItems: { id: NavView; label: string; icon: string; badge?: string }[] = [
    { id: 'case-overview', label: 'Case Overview', icon: 'dashboard' },
    { id: 'documents-verification', label: 'Documents & Verification', icon: 'description' },
    {
      id: 'findings-triage',
      label: 'Findings & Triage',
      icon: 'fact_check',
      badge: pendingFindingsCount > 0 ? `${pendingFindingsCount} pending` : undefined,
    },
    { id: 'chronological-timeline', label: 'Chronological Timeline', icon: 'timeline' },
    { id: 'structured-case-brief', label: 'Structured Case Brief', icon: 'article' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#FAF9F6] border-r border-[#E5E3DC] flex flex-col justify-between h-full z-30 select-none p-4">
      <div className="flex flex-col flex-1">
        {/* Brand Lockup */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DC]/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-base shadow-sm">
              <span className="material-symbols-outlined text-[18px]">balance</span>
            </div>
            <div>
              <h1 className="text-[14px] font-display font-bold tracking-tight text-[#111111] leading-none">
                LegalMemo
              </h1>
              <p className="text-[10px] text-[#626768] font-semibold tracking-wider uppercase mt-0.5">
                Litigation Fact Intelligence
              </p>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#EFEFEB] text-[#626768] border border-[#E3E2DF]">
            v2.4
          </span>
        </div>

        {/* Active Matter Selector */}
        <div className="mt-4 mb-3 relative">
          <div
            onClick={() => setMatterDropdownOpen(!matterDropdownOpen)}
            className="bg-white rounded-xl p-2.5 border border-[#E5E3DC] shadow-sm hover:border-[#D0CDC5] transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#747878]">
                  Active Matter
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-[16px] text-[#747878] group-hover:text-black transition-transform duration-200 ${
                  matterDropdownOpen ? 'rotate-180 text-black' : ''
                }`}
              >
                unfold_more
              </span>
            </div>
            <p className="text-[12px] font-display font-bold text-[#111111] truncate group-hover:text-[#214AE2] transition-colors">
              {activeMatter.name}
            </p>
            <p className="text-[11px] text-[#747878] truncate mt-0.5">{activeMatter.suitNo}</p>
          </div>

          {/* Matter Switcher Dropdown */}
          {matterDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E5E3DC] rounded-xl shadow-lg z-50 p-1.5 space-y-1">
              <div className="px-2 py-1 text-[10px] uppercase font-bold text-[#747878] tracking-wider">
                Select Active Docket
              </div>
              {mattersList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    onSelectMatter(m);
                    setMatterDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col ${
                    m.id === activeMatter.id
                      ? 'bg-[#EFEFEB] text-[#111111] font-semibold'
                      : 'hover:bg-[#FAF9F6] text-[#626768] hover:text-[#111111]'
                  }`}
                >
                  <span className="truncate">{m.name}</span>
                  <span className="text-[10px] text-[#747878]">{m.suitNo}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Guided Review Flow Navigation */}
        <div className="pt-1">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#747878]">
              Guided Review Flow
            </span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] transition-all duration-200 group text-left ${
                    isActive
                      ? 'bg-[#EFEFEB] text-[#111111] font-semibold shadow-xs'
                      : 'font-medium text-[#626768] hover:text-[#111111] hover:bg-[#EFEFEB]/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`material-symbols-outlined text-[18px] transition-colors ${
                        isActive ? 'text-[#111111]' : 'text-[#747878] group-hover:text-black'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF2F2] text-[#BA1A1A] border border-[#FECACA] shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer & User Profile */}
      <div className="pt-3 mt-auto space-y-3">
        {/* Case Dossier OCR Meter */}
        <div className="bg-white rounded-xl p-2.5 border border-[#E5E3DC] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#747878] font-medium">Case Dossier OCR</span>
            <span className="text-[10px] font-bold text-[#111111]">82%</span>
          </div>
          <div className="w-full bg-[#EFEFEB] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#111111] h-full rounded-full transition-all duration-300" style={{ width: '82%' }}></div>
          </div>
          <p className="text-[9px] text-[#747878] mt-1 font-medium">184 of 224 exhibits indexed</p>
        </div>

        {/* User Profile */}
        <div className="pt-2 border-t border-[#E5E3DC]/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#111111] text-white text-[12px] font-bold flex items-center justify-center font-display">
              AV
            </div>
            <div className="leading-tight">
              <p className="text-[12px] font-semibold text-[#111111] truncate max-w-[110px]">
                Annette Vance
              </p>
              <p className="text-[10px] text-[#747878] truncate max-w-[110px]">
                Advocate on Record
              </p>
            </div>
          </div>
          <button
            className="w-7 h-7 rounded-lg hover:bg-[#EFEFEB] flex items-center justify-center text-[#626768] transition-colors"
            type="button"
            title="User Settings"
            onClick={() => alert('Annette Vance · Bar Council Enrolment #MAH/4021/2012 · Authenticated Session')}
          >
            <span className="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

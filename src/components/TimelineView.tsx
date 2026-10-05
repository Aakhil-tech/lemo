import React, { useState, useMemo } from 'react';
import { TimelineEvent } from '../types';
import { timelineEvents } from '../data/mockData';

interface TimelineViewProps {
  onOpenPinpoint: (docTitle: string, pinpoint: string, quote: string, statusTag?: string) => void;
  searchFilter: string;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  onOpenPinpoint,
  searchFilter,
}) => {
  const [docFilter, setDocFilter] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [localSearch, setLocalSearch] = useState<string>('');

  const combinedSearch = (searchFilter || localSearch).toLowerCase();

  const filteredEvents = useMemo(() => {
    let result = [...timelineEvents];

    if (combinedSearch) {
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(combinedSearch) ||
          e.description.toLowerCase().includes(combinedSearch) ||
          e.sourceDoc.toLowerCase().includes(combinedSearch) ||
          e.dateStr.toLowerCase().includes(combinedSearch)
      );
    }

    if (docFilter !== 'all') {
      result = result.filter((e) => e.sourceDoc.toLowerCase().includes(docFilter.toLowerCase()));
    }

    if (verifiedOnly) {
      result = result.filter((e) => e.badgeType === 'verified' || e.badgeType === 'payment');
    }

    if (sortOrder === 'desc') {
      result.reverse();
    }

    return result;
  }, [combinedSearch, docFilter, verifiedOnly, sortOrder]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header & Controls */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#747878] text-[11px] uppercase tracking-wider font-semibold">
              <span>Litigation Intelligence</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#214AE2]">Factual Chronology</span>
            </div>
            <h1 className="text-[26px] md:text-[30px] font-display font-bold text-[#111111] tracking-tight">
              Case Chronological Timeline
            </h1>
            <p className="text-[13px] text-[#626768] max-w-3xl leading-relaxed">
              Complete chronological sequence of material facts and events extracted across all pleadings
              and exhibits. Strict evidentiary traceability to registered deeds, receipts, and
              adversarial correspondence.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E5E3DC] text-[#111111] hover:bg-[#FAF9F6] text-[12px] font-semibold transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">print</span>
              <span>Print Docket</span>
            </button>
            <button
              onClick={() => alert('Scope settings: All exhibits cross-referenced. Pre-suit window 2021-2024 locked.')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] text-white hover:bg-neutral-800 text-[12px] font-semibold transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">filter_list</span>
              <span>Refine Scope</span>
            </button>
          </div>
        </div>

        {/* Filter Capsule Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E5E3DC] shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-64 md:w-80">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878] text-[17px]">
                search
              </span>
              <input
                className="w-full h-9 pl-9 pr-3 rounded-full bg-[#F4F3F0] text-[12px] text-[#1A1C1A] placeholder:text-[#747878] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#111111] transition-all"
                placeholder="Search facts, recitals, admissions..."
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>

            <div className="h-6 w-px bg-[#E5E3DC] mx-1 hidden md:block"></div>

            {/* Filter Pill: Source Document */}
            <div className="relative">
              <select
                className="h-9 pl-3.5 pr-8 rounded-full bg-[#F4F3F0] text-[12px] font-semibold text-[#1A1C1A] appearance-none focus:outline-none cursor-pointer hover:bg-[#EFEFEB] transition-colors"
                value={docFilter}
                onChange={(e) => setDocFilter(e.target.value)}
              >
                <option value="all">All Source Exhibits (6)</option>
                <option value="Sale_Agreement">03_Sale_Agreement_15Mar2022.pdf</option>
                <option value="Bank_Receipt">07_Bank_Receipt_RTGS.pdf</option>
                <option value="Plaint">01_Plaint_OS142_2024.pdf</option>
                <option value="Builder_Notice">04_Builder_Notice_11Mar2023.pdf</option>
                <option value="Legal_Notice">04_Legal_Notice_20Jan2023.pdf</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#747878] text-[18px]">
                expand_more
              </span>
            </div>

            {/* Filter Pill: Verified Only */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`h-9 px-4 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                verifiedOnly
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F4F3F0] text-[#1A1C1A] hover:bg-[#EFEFEB]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Verified Events Only</span>
            </button>
          </div>

          <div className="flex items-center gap-2 px-1">
            <span className="text-[11px] text-[#747878]">Sort:</span>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="text-[12px] text-[#1A1C1A] font-semibold hover:text-[#214AE2] flex items-center gap-1 cursor-pointer"
            >
              <span>{sortOrder === 'asc' ? 'Strict Chronological (Oldest First)' : 'Newest First'}</span>
              <span className="material-symbols-outlined text-[14px]">swap_vert</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scope Overview Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC] shadow-sm relative overflow-hidden">
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#747878] font-bold font-display">
              Chronological Scope &amp; Provenance
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DEE1FF] text-[#001257] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#214AE2]"></span>
              Judicial Timeline Ready
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 pt-1">
            <span className="text-[22px] md:text-[24px] font-display font-bold text-[#111111]">
              March 15, 2021
            </span>
            <span className="text-[20px] text-[#747878] font-normal">→</span>
            <span className="text-[22px] md:text-[24px] font-display font-bold text-[#111111]">
              January 20, 2024
            </span>
          </div>
          <p className="text-[13px] text-[#626768] max-w-2xl leading-relaxed">
            Spanning from the initial bilateral flat purchase agreement through payment execution,
            contractual deadline default, admitted equipment modification, and final statutory notice.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5 mt-4 border-t border-[#EFEFEB] relative z-10">
          <div className="flex flex-col">
            <span className="text-[24px] font-display font-bold text-[#111111]">18</span>
            <span className="text-[11px] text-[#747878] font-medium">Events Mapped</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[24px] font-display font-bold text-[#214AE2]">100%</span>
            <span className="text-[11px] text-[#747878] font-medium">Source Traced</span>
          </div>
          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-[24px] font-display font-bold text-[#111111]">1</span>
            <span className="text-[11px] text-[#747878] font-medium">Critical Default Event</span>
          </div>
        </div>

        {/* Ambient background watermark icon */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-4">
          <span className="material-symbols-outlined text-[160px] text-[#111111]">timeline</span>
        </div>
      </div>

      {/* Chronological Stream (Vertical Spine Layout) */}
      <div className="relative w-full my-4">
        {/* Continuous Spine Line */}
        <div className="absolute left-6 md:left-44 top-6 bottom-6 w-0.5 bg-[#E5E3DC]"></div>

        <div className="flex flex-col gap-6">
          {filteredEvents.map((event) => {
            const isCritical = event.isCritical;
            const isAdmission = event.badgeType === 'admission';

            return (
              <div
                key={event.id}
                className="relative flex flex-col md:flex-row items-start gap-4 md:gap-8 group"
              >
                {/* Date Pill on Rail */}
                <div className="w-full md:w-36 shrink-0 flex items-center md:justify-end pl-12 md:pl-0 pt-1">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                      isCritical
                        ? 'bg-[#FFDAD6] text-[#BA1A1A] font-bold'
                        : 'bg-[#F4F3F0] text-[#111111]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[14px] ${
                        isCritical ? 'text-[#BA1A1A]' : 'text-[#747878]'
                      }`}
                    >
                      {isCritical ? 'warning' : 'calendar_today'}
                    </span>
                    <span>{event.dateStr}</span>
                  </div>
                </div>

                {/* Spine Node Dot */}
                <div
                  className={`absolute left-6 md:left-44 -translate-x-1/2 top-3 w-4 h-4 rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-125 ${
                    isCritical
                      ? 'bg-[#BA1A1A] ring-4 ring-[#FFDAD6] border-2 border-white'
                      : isAdmission
                      ? 'bg-white ring-4 ring-[#FAF9F6] border-2 border-[#214AE2]'
                      : 'bg-white ring-4 ring-[#FAF9F6] border-2 border-[#111111]'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCritical ? 'bg-white' : isAdmission ? 'bg-[#214AE2]' : 'bg-[#111111]'
                    }`}
                  ></div>
                </div>

                {/* Event Content Card */}
                <div
                  className={`ml-12 md:ml-0 flex-1 bg-white rounded-2xl p-5 border transition-shadow shadow-xs hover:shadow-md ${
                    isCritical
                      ? 'border-[#BA1A1A]/40 ring-1 ring-[#BA1A1A]/10'
                      : 'border-[#E5E3DC]'
                  }`}
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F4F3F0] text-[11px] font-semibold text-[#111111]">
                          {event.eventNumber}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isCritical
                              ? 'bg-[#FFDAD6] text-[#BA1A1A]'
                              : isAdmission
                              ? 'bg-[#DEE1FF] text-[#001257]'
                              : event.badgeType === 'payment'
                              ? 'bg-[#EFEFEB] text-[#111111]'
                              : 'bg-[#DEE1FF] text-[#001257]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isCritical ? 'bg-[#BA1A1A]' : 'bg-[#214AE2]'
                            }`}
                          ></span>
                          {event.badgeLabel}
                        </span>
                      </div>

                      {event.currencyOrMetric && (
                        <span
                          className={`text-[11px] font-mono font-semibold ${
                            isCritical
                              ? 'text-[#BA1A1A] uppercase tracking-wider'
                              : isAdmission
                              ? 'text-[#214AE2]'
                              : 'text-[#626768]'
                          }`}
                        >
                          {event.currencyOrMetric}
                        </span>
                      )}
                      {event.timestampIso && !event.currencyOrMetric && (
                        <span className="text-[11px] text-[#747878] font-mono">
                          TS: {event.timestampIso}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3
                        className={`text-[16px] font-display font-bold tracking-tight ${
                          isCritical ? 'text-[#BA1A1A]' : 'text-[#111111]'
                        }`}
                      >
                        {event.title}
                      </h3>
                      <p className="text-[13px] text-[#626768] mt-1 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Pinpoint Source Citation & Evidence Capsule */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-1 border-t border-[#F4F3F0]">
                      <button
                        onClick={() =>
                          onOpenPinpoint(
                            event.sourceDoc,
                            event.pinpoint,
                            event.exactQuote,
                            event.statusTag
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F6] hover:bg-[#EFEFEB] text-[12px] font-medium text-[#111111] transition-colors cursor-pointer group/pin border border-[#E5E3DC]/60"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#214AE2] group-hover/pin:scale-110 transition-transform">
                          {event.badgeType === 'payment'
                            ? 'receipt_long'
                            : event.badgeType === 'notice'
                            ? 'drafts'
                            : 'description'}
                        </span>
                        <span className="font-mono font-semibold truncate max-w-[200px] sm:max-w-none">
                          {event.sourceDoc}
                        </span>
                        <span className="text-[#747878]">· {event.pinpoint}</span>
                        <span className="material-symbols-outlined text-[14px] text-[#747878] ml-0.5">
                          open_in_new
                        </span>
                      </button>

                      {event.statusTag && (
                        <div
                          className={`flex items-center gap-1 text-[11px] font-medium ${
                            isCritical ? 'text-[#BA1A1A] font-semibold' : 'text-[#626768]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isCritical
                              ? 'schedule'
                              : event.badgeType === 'payment'
                              ? 'check_circle'
                              : event.badgeType === 'notice'
                              ? 'markunread_mailbox'
                              : 'verified'}
                          </span>
                          <span>{event.statusTag}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="bg-white rounded-2xl p-8 border border-[#E5E3DC] text-center space-y-2">
              <span className="material-symbols-outlined text-[32px] text-[#747878]">search_off</span>
              <p className="font-display font-semibold text-[15px] text-[#111111]">
                No matching events found
              </p>
              <p className="text-[12px] text-[#626768]">
                Try adjusting your search criteria or resetting filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

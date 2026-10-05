import React, { useState, useEffect } from 'react';
import { briefSections } from '../data/mockData';
import { Matter } from '../types';

interface StructuredBriefViewProps {
  onOpenCitation: (ref: string, doc: string, snippet: string) => void;
  onExport: (format: 'pdf' | 'docx') => void;
  activeMatter: Matter;
}

export const StructuredBriefView: React.FC<StructuredBriefViewProps> = ({
  onOpenCitation,
  onExport,
  activeMatter,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-1');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id^="sec-"]');
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          setActiveSectionId(sec.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSectionId(id);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6">
      {/* Top Utility Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[#747878] text-[11px] uppercase tracking-wider font-semibold">
          <span>Arbitration Record</span>
          <span>/</span>
          <span className="text-[#214AE2]">PRD-Sec 14, 15, 16, 18, 19 Compliant</span>
        </div>

        {/* Export Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onExport('docx')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E5E3DC] text-[#111111] shadow-xs hover:bg-[#FAF9F6] transition-all text-[12px] font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">description</span>
            <span>Export Brief (.docx)</span>
          </button>
          <button
            onClick={() => onExport('pdf')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] text-white shadow-sm hover:bg-neutral-800 transition-all text-[12px] font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">picture_as_pdf</span>
            <span>Export Brief (PDF)</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[26px] md:text-[32px] font-display font-bold text-[#111111] tracking-tight">
          Structured Case Brief
        </h1>
        <p className="text-[13px] text-[#626768] leading-relaxed max-w-3xl">
          Comprehensive 15-section factual summary synthesized from verified docket documents and
          findings. Strict source traceability maintained for every point. Does not contain legal advice
          or drafted pleadings.
        </p>
      </div>

      {/* Docket Metadata Graphite Accent Box */}
      <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col justify-between gap-6">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#214AE2]"></span>
              Arbitral Tribunal Matter
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">
              Ref: COMM/ARB/2024/BOM-0142
            </span>
          </div>

          <h2 className="text-[22px] sm:text-[26px] font-display font-bold tracking-tight">
            Suresh Heights Arbitration
          </h2>
          <p className="text-[13px] text-neutral-300 mt-1">
            Commercial Suit No. 142/2024 • Sole Arbitrator / High Court of Bombay (Commercial Division)
          </p>

          {/* Parties Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-4 bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                Claimant
              </span>
              <span className="text-[15px] font-semibold text-white mt-0.5">
                {activeMatter.claimant}
              </span>
              <span className="text-[12px] text-neutral-300">{activeMatter.claimantRole}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                Respondent
              </span>
              <span className="text-[15px] font-semibold text-white mt-0.5">
                {activeMatter.respondent}
              </span>
              <span className="text-[12px] text-neutral-300">{activeMatter.respondentRole}</span>
            </div>
          </div>
        </div>

        {/* 4 Bottom Metric Slots */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div>
            <p className="text-[11px] text-neutral-400">Claim Amount</p>
            <p className="text-[15px] font-semibold text-white mt-0.5 font-display">
              {activeMatter.claimAmount}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-neutral-400">Paid Consideration</p>
            <p className="text-[15px] font-semibold text-white mt-0.5 font-display">
              {activeMatter.paidAmount}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-neutral-400">Citations Verified</p>
            <p className="text-[15px] font-semibold text-[#8EB0FF] mt-0.5 font-display">
              {activeMatter.citationsCount} Excerpts
            </p>
          </div>
          <div>
            <p className="text-[11px] text-neutral-400">Counsel on Record</p>
            <p className="text-[15px] font-semibold text-white mt-0.5 font-display">
              {activeMatter.counsel}
            </p>
          </div>
        </div>
      </div>

      {/* Main Brief Layout: Sticky Jump TOC + 15 Sections Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Sticky Outline Navigation (Left Rail, 3 Cols) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-20 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#E5E3DC] shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E3DC]/60">
              <span className="text-[10px] uppercase tracking-wider text-[#747878] font-bold">
                Brief Sections
              </span>
              <span className="text-[11px] text-[#214AE2] font-bold">15 Total</span>
            </div>

            <nav className="flex flex-col gap-0.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 no-scrollbar">
              {briefSections.map((sec) => {
                const isCurrent = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[12px] transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#EFEFEB] text-[#111111] font-semibold shadow-xs'
                        : 'text-[#626768] hover:bg-[#FAF9F6] hover:text-[#111111]'
                    }`}
                  >
                    <span className="truncate">
                      {sec.num}. {sec.title.split('&')[0]}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[14px] shrink-0 ml-1 ${
                        isCurrent ? 'text-[#214AE2]' : 'text-emerald-600'
                      }`}
                    >
                      check_circle
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Citation Guidance Notice */}
          <div className="bg-[#FAF9F6] rounded-2xl p-4 border border-[#E5E3DC] text-[#626768]">
            <div className="flex items-center gap-2 mb-1 text-[#111111] font-semibold text-[13px]">
              <span className="material-symbols-outlined text-[#214AE2] text-[18px]">
                verified_user
              </span>
              <span>Citation Flyout</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Click any underlined citation token to open the verbatim source document scan and OCR page
              preview.
            </p>
          </div>
        </div>

        {/* 15 Synthesized Sections Stream (Right Content, 9 Cols) */}
        <div className="lg:col-span-9 space-y-5">
          {briefSections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className="bg-white rounded-2xl p-6 border border-[#E5E3DC] shadow-sm scroll-mt-24 space-y-3"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between pb-1 border-b border-[#E5E3DC]/40 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#E5E3DC] flex items-center justify-center font-display font-bold text-[12px] text-[#111111]">
                    {sec.num}
                  </span>
                  <h3 className="font-display font-bold text-[16px] text-[#111111]">
                    {sec.title}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-[#626768] bg-[#FAF9F6] border border-[#E5E3DC] px-2.5 py-0.5 rounded-full">
                  {sec.tag}
                </span>
              </div>

              {/* Main Section Content */}
              <div className="space-y-3 text-[13px] text-[#1A1C1A] leading-relaxed">
                <p>
                  {sec.content}
                  {/* Inline citations if present */}
                  {sec.citations.slice(0, 2).map((cit) => (
                    <button
                      key={cit.token}
                      onClick={() => onOpenCitation(cit.ref, cit.doc, cit.snippet)}
                      className="inline-flex items-center gap-0.5 px-2 py-0.5 mx-1 rounded bg-[#EEF2FF] text-[#214AE2] font-semibold text-[11px] hover:bg-[#DEE1FF] transition-colors cursor-pointer"
                      title="Inspect Citation"
                    >
                      {cit.token}
                    </button>
                  ))}
                </p>

                {sec.subContent && (
                  <p>
                    {sec.subContent}
                    {sec.citations.slice(2).map((cit) => (
                      <button
                        key={cit.token}
                        onClick={() => onOpenCitation(cit.ref, cit.doc, cit.snippet)}
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 mx-1 rounded bg-[#EEF2FF] text-[#214AE2] font-semibold text-[11px] hover:bg-[#DEE1FF] transition-colors cursor-pointer"
                        title="Inspect Citation"
                      >
                        {cit.token}
                      </button>
                    ))}
                  </p>
                )}

                {/* Table for Section 6 Payments */}
                {sec.tableRows && (
                  <div className="overflow-x-auto mt-2 border border-[#E5E3DC] rounded-xl">
                    <table className="w-full text-left text-[12px]">
                      <thead className="bg-[#FAF9F6] text-[#747878] uppercase text-[10px] tracking-wider font-bold">
                        <tr>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Instrument / Tranche</th>
                          <th className="py-2.5 px-3">Amount</th>
                          <th className="py-2.5 px-3">Source Citation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E3DC]/60">
                        {sec.tableRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#FAF9F6]">
                            <td className="py-2.5 px-3 font-medium text-[#111111]">{row.date}</td>
                            <td className="py-2.5 px-3 text-[#626768]">{row.instrument}</td>
                            <td className="py-2.5 px-3 font-semibold text-[#111111]">{row.amount}</td>
                            <td className="py-2.5 px-3">
                              <button
                                onClick={() =>
                                  onOpenCitation(row.citation, 'Bank Ledger Exhibit', 'Disbursement authenticated.')
                                }
                                className="text-[#214AE2] font-semibold hover:underline cursor-pointer"
                              >
                                {row.citation}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* List items for Section 5 & Section 9 */}
                {sec.listItems && (
                  <div className="space-y-2 mt-2">
                    {sec.listItems.map((li, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E3DC]/60"
                      >
                        <span className="material-symbols-outlined text-[#214AE2] text-[18px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <div className="space-y-0.5">
                          <strong className="text-[#111111] font-semibold block">{li.title}</strong>
                          <p className="text-[12px] text-[#626768] leading-relaxed">{li.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

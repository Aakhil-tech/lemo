import React, { useState, useMemo } from 'react';
import { Finding } from '../types';

interface FindingsViewProps {
  findings: Finding[];
  onUpdateFindingStatus: (id: string, status: Finding['reviewStatus']) => void;
  searchFilter: string;
  initialHighlightId?: string;
}

export const FindingsView: React.FC<FindingsViewProps> = ({
  findings,
  onUpdateFindingStatus,
  searchFilter,
  initialHighlightId,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'conflicts' | 'admissions' | 'evidence'>('all');
  const [sortOption, setSortOption] = useState<string>('severity');
  const [inspectTarget, setInspectTarget] = useState<string | null>(initialHighlightId || 'statement-a');
  const [showCriteriaModal, setShowCriteriaModal] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

  // Inspector active data based on inspectTarget
  const inspectorData = useMemo(() => {
    switch (inspectTarget) {
      case 'statement-a':
      case 'finding-104':
        return {
          title: '02_Written_Statement_Defendant.pdf',
          page: 'Page 14 of 48 • Certified Copy',
          courtHeader: 'IN THE COURT OF SR. CIVIL JUDGE, BOMBAY',
          courtCase: 'C.S. 142/2024',
          lead: '18. The Defendant submits that all development schedule milestones were pursued diligently with commercial expedience.',
          para: 'Para 19',
          tag: 'Literal Disputed Citation',
          highlight:
            '“Unavoidable concrete pouring moratorium imposed by district administration caused severe cascading stoppage from March through July 2023, constituting a statutory force majeure event beyond the answering Defendant\'s reasonable contemplation.”',
          tail: '20. Consequently, invocation of Clause 14 liquidated damages is premature and untenable at law.',
          coords: 'Page 14, Paragraph 19',
          parity: '99.4%',
          findingId: '#CN-104',
          docName: '02_Written_Statement.pdf',
          pageNum: 'Page 14',
        };
      case 'statement-b':
        return {
          title: '05_Investor_Deck_FY23.pdf',
          page: 'Slide 18 • Public Corporate Presentation',
          courtHeader: 'INVESTOR UPDATE — Q2 FISCAL OVERVIEW',
          courtCase: 'SERIES-A CAPITAL ROUND',
          lead: 'Logistics Overview: Project Suresh Heights capitalized with 100% committed raw procurement.',
          para: 'Slide 18',
          tag: 'Contemporaneous Corporate Statement',
          highlight:
            '“Zero supply chain impediments; raw materials stockpiled 120 days in advance of monsoon cycle with zero delivery bottlenecks observed.”',
          tail: 'Execution tracking at least four months ahead of base contractual schedule.',
          coords: 'Slide 18, Exhibit C-11',
          parity: '98.7%',
          findingId: '#CN-104',
          docName: '05_Investor_Deck.pdf',
          pageNum: 'Slide 18',
        };
      case 'elevator-admission':
      case 'finding-309':
        return {
          title: '04_Reply_to_Notice_12Feb2023.pdf',
          page: 'Page 3 of 6 • Para 7',
          courtHeader: 'ADVOCATE SERVICE COPY — REPLY TO DISPUTE NOTICE',
          courtCase: 'FLAT #1402 BREACH COMPLAINT',
          lead: '6. Regarding amenity fixtures in Tower C lobby and shafts, developer encountered procurement delays.',
          para: 'Para 7',
          tag: 'Admitted Equipment Substitution',
          highlight:
            '“Due to cost escalation and vendor delay, developer substituted domestic lifts with comparable safety ratings without requiring additional consideration from allottees.”',
          tail: '8. Standard lift certification from state elevator inspectorate has been obtained.',
          coords: 'Page 3, Paragraph 7',
          parity: '99.8%',
          findingId: '#AD-309',
          docName: '04_Reply_to_Notice.pdf',
          pageNum: 'Page 3',
        };
      case 'rtgs-fact':
      case 'finding-082':
        return {
          title: 'Ex-P7_Bank_Ledger_Confirmation.pdf',
          page: 'Page 2 of 4 • Bank RTGS Record',
          courtHeader: 'HDFC BANK COMMERCIAL BANKING DIVISION',
          courtCase: 'ESCROW RECONCILIATION CERTIFICATE',
          lead: 'Client Account: Suresh Heights Master Real Estate Project Escrow 990142010.',
          para: 'Ref #92819',
          tag: 'Direct Financial Ledger Clearance',
          highlight:
            '“UTR #92819 credited INR 13,00,000/- to Escrow Account #400192 on 14-Aug-2022 towards Tower B Completion milestone.”',
          tail: 'Transaction final, non-recallable, audited under RBI Clearing Guidelines.',
          coords: 'Page 2, Record Row 14',
          parity: '100%',
          findingId: '#EV-082',
          docName: 'Ex-P7_Bank_Ledger.pdf',
          pageNum: 'Page 2',
        };
      default:
        return null;
    }
  }, [inspectTarget]);

  // Filtered findings list
  const filteredFindings = useMemo(() => {
    let list = [...findings];

    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      list = list.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.narrative.toLowerCase().includes(q) ||
          f.findingCode.toLowerCase().includes(q)
      );
    }

    if (activeTab === 'conflicts') {
      list = list.filter((f) => f.category === 'contradiction');
    } else if (activeTab === 'admissions') {
      list = list.filter((f) => f.category === 'admission');
    } else if (activeTab === 'evidence') {
      list = list.filter((f) => f.category === 'fact' || f.category === 'evidence');
    }

    return list;
  }, [findings, searchFilter, activeTab]);

  const verifiedCount = findings.filter((f) => f.reviewStatus === 'accepted').length;
  const pendingCount = findings.filter((f) => f.reviewStatus === 'pending').length;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Title & Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#747878]">
            <span>Litigation Intelligence</span>
            <span>•</span>
            <span className="text-[#111111] font-semibold">Matter #01: Suresh Heights</span>
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            Case Findings &amp; Verification
          </h1>
          <p className="text-[13px] text-[#626768]">
            Human-in-the-loop review of statement contradictions, adversary admissions, and key evidentiary facts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowCriteriaModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E3DC] text-[12px] font-medium text-[#111111] hover:bg-[#FAF9F6] transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#747878]">checklist</span>
            <span>Verification Criteria</span>
          </button>
          <button
            onClick={() => setShowAuditModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E3DC] text-[12px] font-medium text-[#111111] hover:bg-[#FAF9F6] transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#747878]">history</span>
            <span>Audit Log</span>
          </button>
        </div>
      </div>

      {/* Stats & Progress Card */}
      <div className="bg-white border border-[#E5E3DC] rounded-2xl p-5 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Progress Left */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-[#111111]">
                  11 of 15
                </span>
                <span className="text-[13px] font-semibold text-[#111111]">Findings Verified</span>
                <span className="text-[12px] text-[#747878] font-medium">(73%)</span>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                {pendingCount} Awaiting Counsel Review
              </span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#EFEFEB] overflow-hidden flex">
              <div
                className="h-full bg-[#111111] transition-all"
                style={{ width: '53%' }}
                title="8 Admissions Verified"
              ></div>
              <div
                className="h-full bg-[#8E908F] transition-all"
                style={{ width: '20%' }}
                title="3 Key Facts Verified"
              ></div>
              <div
                className="h-full bg-transparent transition-all"
                style={{ width: '27%' }}
                title="4 Pending Review"
              ></div>
            </div>

            {/* Progress Legend */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#747878]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
                <span>8 Admissions Verified</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8E908F]"></span>
                <span>3 Key Facts Verified</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E5E3DC]"></span>
                <span>{pendingCount} Awaiting Counsel Review</span>
              </span>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1 h-14 border-r border-[#E5E3DC] mx-auto"></div>

          {/* Quick Stats Right */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#BA1A1A]">
                Potential Conflicts
              </span>
              <span className="font-display text-xl font-bold text-[#111111] mt-0.5">3</span>
              <span className="text-[10px] text-[#747878]">Critical priority</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#214AE2]">
                Admissions
              </span>
              <span className="font-display text-xl font-bold text-[#111111] mt-0.5">8</span>
              <span className="text-[10px] text-[#747878]">High value</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#747878]">
                Core Facts
              </span>
              <span className="font-display text-xl font-bold text-[#111111] mt-0.5">4</span>
              <span className="text-[10px] text-[#747878]">Corroborated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pill Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="inline-flex flex-wrap items-center gap-1.5 p-1 bg-[#F4F3F0]/80 rounded-full border border-[#E5E3DC]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#626768] hover:text-[#111111]'
            }`}
          >
            All Findings <span className="ml-1 opacity-70 font-normal">15</span>
          </button>
          <button
            onClick={() => setActiveTab('conflicts')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              activeTab === 'conflicts'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#626768] hover:text-[#111111]'
            }`}
          >
            Potential Conflicts{' '}
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-[10px] font-semibold">
              3 pending
            </span>
          </button>
          <button
            onClick={() => setActiveTab('admissions')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              activeTab === 'admissions'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#626768] hover:text-[#111111]'
            }`}
          >
            Party Admissions{' '}
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#214AE2] text-[10px] font-semibold">
              8
            </span>
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              activeTab === 'evidence'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#626768] hover:text-[#111111]'
            }`}
          >
            Key Evidence <span className="ml-1 opacity-70">4</span>
          </button>
        </div>

        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="h-8 pl-3 pr-7 rounded-full bg-white border border-[#E5E3DC] text-[11px] font-medium text-[#111111] focus:outline-none appearance-none cursor-pointer shadow-xs"
          >
            <option value="severity">Sort by: Severity First</option>
            <option value="recent">Sort by: Most Recent Document</option>
            <option value="status">Sort by: Verification Status</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#747878] text-[15px] pointer-events-none">
            expand_more
          </span>
        </div>
      </div>

      {/* Main Content 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Findings Feed */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {filteredFindings.map((finding) => {
            const isContradiction = finding.category === 'contradiction';
            const isAdmission = finding.category === 'admission';
            const isFact = finding.category === 'fact';
            const isAccepted = finding.reviewStatus === 'accepted';
            const isDismissed = finding.reviewStatus === 'dismissed';

            return (
              <article
                key={finding.id}
                className={`bg-white rounded-2xl border p-6 shadow-sm flex flex-col gap-4 transition-all ${
                  inspectTarget === finding.id || inspectTarget === finding.findingCode
                    ? 'border-[#214AE2] ring-1 ring-[#214AE2]/30'
                    : 'border-[#E5E3DC]'
                }`}
                onMouseEnter={() => setInspectTarget(finding.id)}
              >
                {/* Header Tag & Identifier */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          isContradiction
                            ? 'bg-rose-50 text-rose-700 border-rose-100'
                            : isAdmission
                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isContradiction
                              ? 'bg-rose-500'
                              : isAdmission
                              ? 'bg-[#214AE2]'
                              : 'bg-emerald-600'
                          }`}
                        ></span>
                        {finding.impactBadge}
                      </span>

                      {isAccepted && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                          Accepted by Counsel
                        </span>
                      )}
                      {isDismissed && (
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-semibold">
                          Dismissed
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-[17px] text-[#111111] tracking-tight">
                      {finding.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-medium text-[#747878] bg-[#F4F3F0] px-2.5 py-1 rounded-full shrink-0">
                    Finding {finding.findingCode}
                  </span>
                </div>

                {/* Narrative */}
                <p className="text-[13px] text-[#1A1C1A] leading-relaxed">
                  {finding.narrative}
                </p>

                {/* Side-by-Side Comparison Container (for Contradictions) */}
                {finding.boxA && finding.boxB && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-[#F4F3F0]/50 p-3.5 rounded-xl border border-[#E5E3DC]/70">
                    {/* Box A */}
                    <div
                      className="bg-white rounded-xl p-3.5 border border-[#E5E3DC] flex flex-col justify-between gap-2.5 shadow-xs cursor-pointer hover:border-[#214AE2]/50 transition-colors"
                      onClick={() => setInspectTarget('statement-a')}
                      onMouseEnter={() => setInspectTarget('statement-a')}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#111111]">{finding.boxA.label}</span>
                          <span className="text-[#747878] text-[10px]">{finding.boxA.docName}</span>
                        </div>
                        <blockquote className="text-[12px] italic text-[#1A1C1A] bg-amber-50/60 p-2.5 rounded-lg border-l-2 border-amber-400">
                          {finding.boxA.quote}
                        </blockquote>
                      </div>
                      <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#214AE2] hover:underline self-start">
                        <span>View PDF Snippet</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    </div>

                    {/* Box B */}
                    <div
                      className="bg-white rounded-xl p-3.5 border border-[#E5E3DC] flex flex-col justify-between gap-2.5 shadow-xs cursor-pointer hover:border-[#214AE2]/50 transition-colors"
                      onClick={() => setInspectTarget('statement-b')}
                      onMouseEnter={() => setInspectTarget('statement-b')}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#111111]">{finding.boxB.label}</span>
                          <span className="text-[#747878] text-[10px]">{finding.boxB.docName}</span>
                        </div>
                        <blockquote className="text-[12px] italic text-[#1A1C1A] bg-amber-50/60 p-2.5 rounded-lg border-l-2 border-amber-400">
                          {finding.boxB.quote}
                        </blockquote>
                      </div>
                      <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#214AE2] hover:underline self-start">
                        <span>View PDF Snippet</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Legal Relevance Callout Box (for Admissions) */}
                {finding.legalRelevance && (
                  <div className="bg-[#FAF9F6] rounded-xl p-3.5 border border-[#E5E3DC]/80 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#214AE2] text-[20px] shrink-0 mt-0.5">
                      balance
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">
                        Legal Relevance
                      </span>
                      <p className="text-[12px] text-[#1A1C1A] leading-relaxed">
                        {finding.legalRelevance}
                      </p>
                    </div>
                  </div>
                )}

                {/* Mini Stat Blocks (for Facts) */}
                {finding.factDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E3DC]/70">
                      <span className="text-[10px] uppercase tracking-wider text-[#747878] font-semibold">
                        Instrument
                      </span>
                      <p className="text-[13px] font-semibold text-[#111111] mt-0.5">
                        {finding.factDetails.instrument}
                      </p>
                    </div>
                    <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E3DC]/70">
                      <span className="text-[10px] uppercase tracking-wider text-[#747878] font-semibold">
                        Source
                      </span>
                      <p className="text-[13px] font-semibold text-[#111111] mt-0.5">
                        {finding.factDetails.source}
                      </p>
                    </div>
                    <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E3DC]/70">
                      <span className="text-[10px] uppercase tracking-wider text-[#747878] font-semibold">
                        Cleared
                      </span>
                      <p className="text-[13px] font-semibold text-[#111111] mt-0.5">
                        {finding.factDetails.clearedDate}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Bar / Status Footer */}
                {isContradiction ? (
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E3DC]/60">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateFindingStatus(finding.id, 'accepted')}
                        className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors shadow-xs cursor-pointer ${
                          isAccepted
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#111111] text-white hover:bg-neutral-800'
                        }`}
                      >
                        {isAccepted ? 'Marked as Material Contradiction' : 'Mark as Material Contradiction (Accept)'}
                      </button>
                      <button
                        onClick={() => onUpdateFindingStatus(finding.id, 'contextual')}
                        className="px-4 py-1.5 rounded-full bg-white border border-[#E5E3DC] text-[#111111] text-[12px] font-medium hover:bg-[#FAF9F6] transition-colors shadow-xs cursor-pointer"
                      >
                        Contextual / Non-Material
                      </button>
                    </div>
                    <button
                      onClick={() => onUpdateFindingStatus(finding.id, 'dismissed')}
                      className="text-[12px] text-[#747878] hover:text-[#BA1A1A] transition-colors font-medium cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E3DC]/60 text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-[#747878]">
                      <span className="material-symbols-outlined text-[15px] text-emerald-600">
                        check_circle
                      </span>
                      <span>{finding.verifiedNote || 'Verified in official docket record'}</span>
                    </span>
                    <button
                      onClick={() => setInspectTarget(finding.id)}
                      className="inline-flex items-center gap-1 font-semibold text-[#214AE2] hover:underline cursor-pointer"
                    >
                      <span>Inspect Verified Citation</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Right Column: Sticky Source Document Inspector */}
        <div className="lg:col-span-4 sticky top-20 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#E5E3DC] p-5 shadow-sm flex flex-col gap-4">
            {/* Inspector Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#111111] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">find_in_page</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-[14px] text-[#111111]">
                    Source Document Inspector
                  </h4>
                  <p className="text-[10px] text-[#747878]">Literal source document audit</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>100% Provenance</span>
              </span>
            </div>

            {/* If Standby State */}
            {!inspectorData ? (
              <div className="py-10 px-4 rounded-xl border border-dashed border-[#E5E3DC] bg-[#FAF9F6]/50 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E3DC] flex items-center justify-center text-[#747878] shadow-xs">
                  <span className="material-symbols-outlined text-[24px] text-[#214AE2]">
                    document_scanner
                  </span>
                </div>
                <div className="max-w-[240px] space-y-1">
                  <p className="font-display font-semibold text-[13px] text-[#111111]">
                    Live Provenance Standby
                  </p>
                  <p className="text-[11px] text-[#747878] leading-relaxed">
                    Hover over any extracted fact, conflict, or source quotation on the left to inspect
                    literal document provenance in real time.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E3DC] text-[10px] font-medium text-[#747878] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#214AE2] animate-ping"></span>
                  <span>Hover to Inspect</span>
                </span>
              </div>
            ) : (
              /* Active Inspector State */
              <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                {/* Selected Source File Capsule */}
                <div className="bg-[#FAF9F6] rounded-xl p-3 border border-[#E5E3DC] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-[#214AE2] text-[20px]">
                      picture_as_pdf
                    </span>
                    <div className="truncate">
                      <p className="text-[12px] font-semibold text-[#111111] truncate">
                        {inspectorData.title}
                      </p>
                      <p className="text-[10px] text-[#747878]">{inspectorData.page}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Opening master file ${inspectorData.title} in split reader...`)}
                    className="text-[#747878] hover:text-[#111111] p-1 cursor-pointer"
                    title="Open in full reader"
                  >
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </button>
                </div>

                {/* Scanned Page Mockup with Yellow Highlight */}
                <div className="relative bg-[#FCFAF6] border border-[#E5E3DC] rounded-xl p-4 shadow-inner flex flex-col gap-2.5 text-[11px] text-neutral-800 select-none">
                  {/* Top Header Marker */}
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono border-b border-[#E5E3DC]/60 pb-1">
                    <span>{inspectorData.courtHeader}</span>
                    <span>{inspectorData.courtCase}</span>
                  </div>

                  {/* Prefix Para */}
                  {inspectorData.lead && (
                    <p className="text-neutral-400 leading-snug">{inspectorData.lead}</p>
                  )}

                  {/* Yellow Highlighted Box */}
                  <div className="p-2.5 rounded-lg bg-amber-100/90 border border-amber-300 transition-all shadow-xs ring-2 ring-[#214AE2]/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded">
                        {inspectorData.tag}
                      </span>
                      <span className="text-[9px] font-mono text-amber-800">
                        {inspectorData.para}
                      </span>
                    </div>
                    <p className="font-medium text-neutral-900 leading-relaxed text-[11px]">
                      {inspectorData.highlight}
                    </p>
                  </div>

                  {/* Tail Para */}
                  {inspectorData.tail && (
                    <p className="text-neutral-400 leading-snug">{inspectorData.tail}</p>
                  )}

                  {/* Footer Coordinates */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#E5E3DC]/60 text-[10px] text-neutral-500 font-mono">
                    <span>Coordinates: {inspectorData.coords}</span>
                    <span className="text-[#214AE2] font-semibold">
                      OCR Parity: {inspectorData.parity}
                    </span>
                  </div>
                </div>

                {/* Provenance Chain */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#747878]">
                    Provenance Chain
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#626768] bg-[#FAF9F6] p-2.5 rounded-xl border border-[#E5E3DC]/70 overflow-x-auto no-scrollbar">
                    <span className="font-semibold text-[#111111]">{inspectorData.findingId}</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_right_alt</span>
                    <span className="truncate max-w-[100px]">{inspectorData.docName}</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_right_alt</span>
                    <span className="font-semibold text-[#111111] shrink-0">
                      {inspectorData.pageNum}
                    </span>
                    <span className="material-symbols-outlined text-[13px]">arrow_right_alt</span>
                    <span className="text-emerald-700 font-semibold shrink-0">Courtroom Ready</span>
                  </div>
                </div>

                {/* Primary CTAs */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => alert(`Finding ${inspectorData.findingId} attached to cross-examination docket outline.`)}
                    className="w-full py-2 rounded-full bg-[#111111] text-white text-[12px] font-semibold hover:bg-neutral-800 transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">post_add</span>
                    <span>Attach to Cross-Exam Outline</span>
                  </button>
                  <button
                    onClick={() => alert(`Opening certified uncompressed raw scan of ${inspectorData.title}...`)}
                    className="w-full py-2 rounded-full bg-white border border-[#E5E3DC] text-[#111111] text-[12px] font-medium hover:bg-[#FAF9F6] transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">zoom_in</span>
                    <span>Inspect Original Scan</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Tip Card */}
          <div className="bg-white rounded-2xl border border-[#E5E3DC] p-4 flex items-center gap-3 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-[#FAF9F6] flex items-center justify-center text-[#747878] shrink-0 border border-[#E5E3DC]">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
            </div>
            <p className="text-[11px] text-[#626768] leading-relaxed">
              Accepted findings seamlessly populate the{' '}
              <strong className="text-[#111111]">Structured Case Brief</strong> draft and witness
              cross-examination folders.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Criteria Modal */}
      {showCriteriaModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-[#E5E3DC] shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E3DC]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#214AE2] text-[20px]">rule</span>
                <h3 className="font-display font-bold text-[16px] text-[#111111]">
                  Counsel Verification Protocol
                </h3>
              </div>
              <button
                onClick={() => setShowCriteriaModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-[#EFEFEB] flex items-center justify-center text-[#747878]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-2.5 text-[12px] text-[#626768]">
              <p>
                <strong>1. Evidentiary Traceability:</strong> Every extracted proposition must resolve to a
                page and paragraph inside a registered deed, filed pleading, or bank ledger.
              </p>
              <p>
                <strong>2. Contradiction Threshold:</strong> Factual conflicts are flagged only when two
                contemporaneous statements are mutually exclusive under Indian Evidence Act Sec 18-21.
              </p>
              <p>
                <strong>3. Non-Advisory Guarantee:</strong> Findings are strictly synthesized factual
                observations for advocate verification, omitting speculative legal drafting.
              </p>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowCriteriaModal(false)}
                className="px-4 py-1.5 rounded-full bg-[#111111] text-white text-[12px] font-semibold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-[#E5E3DC] shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E3DC]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#214AE2] text-[20px]">history</span>
                <h3 className="font-display font-bold text-[16px] text-[#111111]">
                  Docket Audit Trail
                </h3>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-[#EFEFEB] flex items-center justify-center text-[#747878]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-[12px]">
              <div className="p-2.5 bg-[#FAF9F6] rounded-xl border border-[#E5E3DC] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#111111]">#AD-309 verified by Annette Vance</p>
                  <p className="text-[10px] text-[#747878]">Oct 12, 2024 · 16:32 IST</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Confirmed
                </span>
              </div>
              <div className="p-2.5 bg-[#FAF9F6] rounded-xl border border-[#E5E3DC] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#111111]">#EV-082 reconciled against Bank Ex-P7</p>
                  <p className="text-[10px] text-[#747878]">Oct 12, 2024 · 14:10 IST</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Reconciled
                </span>
              </div>
              <div className="p-2.5 bg-[#FAF9F6] rounded-xl border border-[#E5E3DC] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#111111]">12 Docket Exhibits OCR Scanned (99.4% parity)</p>
                  <p className="text-[10px] text-[#747878]">Oct 11, 2024 · 09:45 IST</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Indexed
                </span>
              </div>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-1.5 rounded-full bg-[#111111] text-white text-[12px] font-semibold"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

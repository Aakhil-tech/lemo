import React from 'react';
import { NavView, Matter } from '../types';

interface CaseOverviewViewProps {
  onNavigate: (view: NavView, findingId?: string) => void;
  activeMatter: Matter;
  onExport: (format: 'pdf' | 'docx') => void;
}

export const CaseOverviewView: React.FC<CaseOverviewViewProps> = ({
  onNavigate,
  activeMatter,
  onExport,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Case Header */}
      <section className="space-y-4">
        <div>
          <button
            onClick={() => alert('Viewing all active litigation dockets in Chamber registry.')}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#747878] hover:text-[#111111] transition-colors mb-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            All Cases
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-[26px] font-display font-bold text-[#111111] tracking-tight">
                Suresh Builders v. Rajesh Nair
              </h1>
              <p className="text-[13px] text-[#626768] mt-0.5 flex items-center gap-2 flex-wrap">
                <span>Civil Litigation</span>
                <span className="opacity-40">·</span>
                <span>12 documents</span>
                <span className="opacity-40">·</span>
                <span>Updated today</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onExport('pdf')}
                className="h-9 px-4 rounded-full bg-[#111111] text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-sm hover:bg-black/85 transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">ios_share</span>
                Export Dossier
              </button>
              <button
                onClick={() => alert('Docket Options: Share Exhibit Room, Generate Redacted Bundle, Audit History.')}
                className="w-9 h-9 rounded-full bg-white border border-[#E5E3DC] text-[#626768] hover:text-[#111111] hover:bg-[#FAF9F6] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                type="button"
                title="More case actions"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Summary Card & Stat Capsules */}
      <section className="space-y-3">
        <div className="bg-white rounded-2xl p-5 border border-[#E5E3DC] shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
            <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#747878]">
              CASE SUMMARY
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4F3F0] border border-[#E3E2DF] text-[11px] font-semibold text-[#626768]">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
              Source-backed summary · 12 documents referenced
            </span>
          </div>
          <p className="text-[13px] text-[#1A1C1A] leading-relaxed">
            The dispute concerns delayed possession of an apartment purchased from Suresh Builders in
            Suresh Heights. The agreement specified possession by December 2022, while the parties
            provide differing explanations for the subsequent delay and handover milestones.
          </p>
        </div>

        {/* Horizontal Metric Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white border border-[#E5E3DC] text-[11px] font-semibold text-[#1A1C1A] shadow-xs">
            12 Documents
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#E5E3DC] text-[11px] font-semibold text-[#1A1C1A] shadow-xs">
            96 Pages
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#E5E3DC] text-[11px] font-semibold text-[#1A1C1A] shadow-xs">
            126 Facts
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#E5E3DC] text-[11px] font-semibold text-[#1A1C1A] shadow-xs">
            38 Events
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[11px] font-semibold text-[#BA1A1A] shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]"></span>
            4 Conflicts
          </span>
          <span className="px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[11px] font-semibold text-[#214AE2] shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#214AE2]"></span>
            12 Admissions
          </span>
        </div>
      </section>

      {/* Review Status Banner */}
      <section className="bg-white rounded-2xl p-6 border border-[#E5E3DC] shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div>
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#747878]">
                REVIEW STATUS
              </span>
              <h2 className="text-[18px] font-display font-bold text-[#111111] mt-0.5">
                9 of 12 important findings reviewed (75%)
              </h2>
            </div>
            <p className="text-[12px] text-[#626768]">
              3 items require counsel verification before brief finalization.
            </p>
          </div>
          <button
            onClick={() => onNavigate('findings-triage')}
            className="h-10 px-5 rounded-full bg-[#111111] text-white text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-black/85 transition-all shadow-sm flex-shrink-0 self-start sm:self-center cursor-pointer"
          >
            <span>Continue Review</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
        <div className="mt-4">
          <div className="w-full h-2 rounded-full bg-[#EFEFEB] overflow-hidden">
            <div
              className="h-full bg-[#111111] rounded-full transition-all duration-500"
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>
      </section>

      {/* Requires Review Section (3 Cards) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#747878]">
            REQUIRES REVIEW
          </span>
          <span className="text-[12px] text-[#626768] font-medium">
            3 action items pending counsel review
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1: Contradiction */}
          <div className="bg-white rounded-2xl p-4 border border-[#E5E3DC] shadow-sm hover:border-[#BA1A1A]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[10px] font-bold uppercase tracking-wide text-[#BA1A1A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]"></span>
                  Contradiction · High Priority
                </span>
              </div>
              <h3 className="text-[13px] font-display font-bold text-[#111111] leading-snug">
                Possession date contradiction
              </h3>
              <p className="text-[12px] text-[#626768] leading-relaxed">
                Defendant&apos;s written statement claims possession handover was extended by mutual
                oral understanding, whereas the registered Sale Agreement (Clause 4.2) and Legal
                Notice mandate strict handover by 31 December 2022.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F4F3F0] flex items-center justify-between">
              <span className="text-[10px] text-[#747878] truncate max-w-[140px]">
                2 sources · 3 statements · Ex-A1 vs WS Para 19
              </span>
              <button
                onClick={() => onNavigate('findings-triage', 'finding-105')}
                className="text-[12px] font-bold text-[#111111] hover:text-[#214AE2] flex items-center gap-0.5 flex-shrink-0 cursor-pointer"
              >
                <span>Review Finding</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 2: Admission */}
          <div className="bg-white rounded-2xl p-4 border border-[#E5E3DC] shadow-sm hover:border-[#214AE2]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[10px] font-bold uppercase tracking-wide text-[#B45309]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]"></span>
                  Admission · High Value
                </span>
              </div>
              <h3 className="text-[13px] font-display font-bold text-[#111111] leading-snug">
                Developer conceded agreed handover deadline
              </h3>
              <p className="text-[12px] text-[#626768] leading-relaxed">
                Developer acknowledged in formal correspondence dated 15 Jan 2023 that the agreed
                contractual handover date was 31 December 2022.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F4F3F0] flex items-center justify-between">
              <span className="text-[10px] text-[#747878] truncate max-w-[140px]">
                Agreement · p.4 · Legal Notice Reply
              </span>
              <button
                onClick={() => onNavigate('findings-triage', 'finding-309')}
                className="text-[12px] font-bold text-[#111111] hover:text-[#214AE2] flex items-center gap-0.5 flex-shrink-0 cursor-pointer"
              >
                <span>Review Finding</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 3: Evidence Verification */}
          <div className="bg-white rounded-2xl p-4 border border-[#E5E3DC] shadow-sm hover:border-[#626768]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F4F3F0] border border-[#E3E2DF] text-[10px] font-bold uppercase tracking-wide text-[#626768]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#626768]"></span>
                  Evidence Verification
                </span>
              </div>
              <h3 className="text-[13px] font-display font-bold text-[#111111] leading-snug">
                Postal acknowledgment slip receipt
              </h3>
              <p className="text-[12px] text-[#626768] leading-relaxed">
                Faint postal stamp on Speed Post acknowledgment requires counsel sign-off to cure
                pre-suit statutory notice compliance under Clause 18.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F4F3F0] flex items-center justify-between">
              <span className="text-[10px] text-[#747878] truncate max-w-[140px]">
                Ex-P14 · Postal Ack Slip
              </span>
              <button
                onClick={() => onNavigate('documents-verification')}
                className="text-[12px] font-bold text-[#111111] hover:text-[#214AE2] flex items-center gap-0.5 flex-shrink-0 cursor-pointer"
              >
                <span>Verify Item</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-right pt-0.5">
          <button
            onClick={() => onNavigate('findings-triage')}
            className="inline-flex items-center gap-1 text-[12px] font-bold text-[#111111] hover:text-[#214AE2] transition-colors cursor-pointer"
          >
            <span>View all 12 findings</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Case Story Timeline (4 Decisive Milestones) */}
      <section className="bg-white rounded-2xl p-6 border border-[#E5E3DC] shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#747878]">
            CASE STORY
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#EFEFEB] text-[11px] font-semibold text-[#626768] border border-[#E3E2DF]">
            4 Decisive Milestones
          </span>
        </div>

        <div className="relative py-2">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-7 left-6 right-6 h-0.5 bg-[#E5E3DC] z-0"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {/* Milestone 1 */}
            <div className="flex flex-col items-start">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center shadow-xs mb-3 text-[12px] font-bold text-[#111111]">
                1
              </div>
              <span className="text-[11px] font-semibold text-[#747878]">12 Jul 2021</span>
              <h4 className="text-[13px] font-display font-bold text-[#111111] mt-0.5">
                Agreement signed
              </h4>
              <p className="text-[11px] text-[#626768] mt-1 leading-snug">
                Building plan approved, registered sale agreement executed
              </p>
            </div>

            {/* Milestone 2 */}
            <div className="flex flex-col items-start">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center shadow-xs mb-3 text-[12px] font-bold text-[#111111]">
                2
              </div>
              <span className="text-[11px] font-semibold text-[#747878]">20 Dec 2022</span>
              <h4 className="text-[13px] font-display font-bold text-[#111111] mt-0.5">
                Payment made
              </h4>
              <p className="text-[11px] text-[#626768] mt-1 leading-snug">
                Third installment of ₹13,00,000 paid via RTGS
              </p>
            </div>

            {/* Milestone 3 - Warning */}
            <div className="flex flex-col items-start">
              <div className="w-8 h-8 rounded-full bg-[#FEF2F2] border-2 border-[#BA1A1A] text-[#BA1A1A] flex items-center justify-center shadow-xs mb-3 text-[12px] font-bold">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
              </div>
              <span className="text-[11px] font-semibold text-[#BA1A1A]">31 Dec 2022</span>
              <h4 className="text-[13px] font-display font-bold text-[#BA1A1A] mt-0.5">
                ⚠ Possession deadline
              </h4>
              <p className="text-[11px] text-[#626768] mt-1 leading-snug">
                Contractual handover deadline expired without possession
              </p>
            </div>

            {/* Milestone 4 */}
            <div className="flex flex-col items-start">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center shadow-xs mb-3 text-[12px] font-bold text-[#111111]">
                4
              </div>
              <span className="text-[11px] font-semibold text-[#747878]">15 Jan 2023</span>
              <h4 className="text-[13px] font-display font-bold text-[#111111] mt-0.5">
                Possession disputed
              </h4>
              <p className="text-[11px] text-[#626768] mt-1 leading-snug">
                Formal legal notice issued claiming breach
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-[#F4F3F0] flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] text-[#747878]">
            Full chronological sequence derived from 12 verified exhibits
          </span>
          <button
            onClick={() => onNavigate('chronological-timeline')}
            className="inline-flex items-center gap-1 text-[12px] font-bold text-[#111111] hover:text-[#214AE2] transition-colors cursor-pointer"
          >
            <span>View full timeline (38 events)</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Bottom 2 Cards (Case Brief & Documents) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
        {/* Case Brief Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E3DC] shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#747878]">
                CASE BRIEF
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#DEE1FF] text-[#0033C2] text-[11px] font-semibold">
                9 of 15 reviewed
              </span>
            </div>
            <h3 className="text-[15px] font-display font-bold text-[#111111]">
              15 sections generated · 9 sections counsel-reviewed
            </h3>
            <p className="text-[12px] text-[#626768] leading-relaxed">
              Factual synopsis, uncontested admissions, and statutory citations linked directly to
              verified record exhibits.
            </p>
          </div>
          <div className="pt-4 mt-3 border-t border-[#F4F3F0] flex items-center justify-between">
            <span className="text-[11px] text-[#747878]">Last generated today at 16:40</span>
            <button
              onClick={() => onNavigate('structured-case-brief')}
              className="h-8 px-4 rounded-full bg-[#111111] text-white text-[11px] font-semibold flex items-center gap-1.5 hover:bg-black/85 transition-all shadow-xs cursor-pointer"
            >
              <span>Continue Case Brief</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Documents Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E3DC] shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#747878]">
                DOCUMENTS
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#B45309] text-[11px] font-semibold border border-[#FDE68A]">
                1 pending triage
              </span>
            </div>
            <h3 className="text-[15px] font-display font-bold text-[#111111]">
              12 documents catalogued · 96 pages processed
            </h3>
            <p className="text-[12px] text-[#626768] leading-relaxed">
              Pleadings, agreements, legal notices, and postal service exhibits.
            </p>
          </div>
          <div className="pt-4 mt-3 border-t border-[#F4F3F0] flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[11px] text-[#626768] font-medium">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
              11 of 12 verified
            </span>
            <button
              onClick={() => onNavigate('documents-verification')}
              className="h-8 px-4 rounded-full bg-[#111111] text-white text-[11px] font-semibold flex items-center gap-1.5 hover:bg-black/85 transition-all shadow-xs cursor-pointer"
            >
              <span>View Documents</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

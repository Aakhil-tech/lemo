/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { NavView, Matter, Finding } from './types';
import { mattersList, initialFindings } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CaseOverviewView } from './components/CaseOverviewView';
import { TimelineView } from './components/TimelineView';
import { FindingsView } from './components/FindingsView';
import { StructuredBriefView } from './components/StructuredBriefView';
import { DocumentsView } from './components/DocumentsView';
import { PinpointDrawer } from './components/PinpointDrawer';
import { CitationModal } from './components/CitationModal';
import { ExportToast } from './components/ExportToast';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('case-overview');
  const [activeMatter, setActiveMatter] = useState<Matter>(mattersList[0]);
  const [findings, setFindings] = useState<Finding[]>(initialFindings);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [targetHighlightId, setTargetHighlightId] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pinpoint Drawer State (for Timeline)
  const [pinpointState, setPinpointState] = useState<{
    isOpen: boolean;
    docTitle: string;
    pinpoint: string;
    quote: string;
    statusTag?: string;
  }>({
    isOpen: false,
    docTitle: '',
    pinpoint: '',
    quote: '',
  });

  // Citation Modal State (for Brief)
  const [citationState, setCitationState] = useState<{
    isOpen: boolean;
    refTag: string;
    docTitle: string;
    snippet: string;
  }>({
    isOpen: false,
    refTag: '',
    docTitle: '',
    snippet: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleExport = (format: 'pdf' | 'docx') => {
    if (format === 'pdf') {
      showToast('Generating Case Brief PDF with preserved verbatim citations...');
    } else {
      showToast('Exporting Structured Brief to Word (.docx) with active hyperlinked exhibits...');
    }
  };

  const handleUpdateFindingStatus = (id: string, status: Finding['reviewStatus']) => {
    setFindings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, reviewStatus: status } : f))
    );
    if (status === 'accepted') {
      showToast(`Finding ${id} marked as Material Contradiction and verified.`);
    } else if (status === 'dismissed') {
      showToast(`Finding ${id} dismissed from immediate counsel review.`);
    } else {
      showToast(`Finding ${id} noted as Contextual / Non-Material.`);
    }
  };

  const handleNavigate = (view: NavView, findingId?: string) => {
    setCurrentView(view);
    if (findingId) {
      setTargetHighlightId(findingId);
    }
  };

  const verifiedCount = findings.filter((f) => f.reviewStatus === 'accepted').length;
  const pendingCount = findings.filter((f) => f.reviewStatus === 'pending').length;

  return (
    <div className="flex h-screen w-full bg-[#FAF9F6] text-[#1A1C1A] overflow-hidden antialiased font-body selection:bg-neutral-200">
      {/* Primary Sidebar (matches first screen role model) */}
      <Sidebar
        currentView={currentView}
        onSelectView={(v) => {
          setCurrentView(v);
          setTargetHighlightId(undefined);
        }}
        activeMatter={activeMatter}
        onSelectMatter={(m) => {
          setActiveMatter(m);
          showToast(`Switched active docket to ${m.name}`);
        }}
        pendingFindingsCount={pendingCount}
      />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          currentView={currentView}
          onSelectView={setCurrentView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExport={handleExport}
          verifiedCount={verifiedCount + 8} // realistic docket total
          totalFindings={15}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 bg-[#FAF9F6]">
          {currentView === 'case-overview' && (
            <CaseOverviewView
              onNavigate={handleNavigate}
              activeMatter={activeMatter}
              onExport={handleExport}
            />
          )}

          {currentView === 'chronological-timeline' && (
            <TimelineView
              onOpenPinpoint={(docTitle, pinpoint, quote, statusTag) => {
                setPinpointState({
                  isOpen: true,
                  docTitle,
                  pinpoint,
                  quote,
                  statusTag,
                });
              }}
              searchFilter={searchQuery}
            />
          )}

          {currentView === 'findings-triage' && (
            <FindingsView
              findings={findings}
              onUpdateFindingStatus={handleUpdateFindingStatus}
              searchFilter={searchQuery}
              initialHighlightId={targetHighlightId}
            />
          )}

          {currentView === 'structured-case-brief' && (
            <StructuredBriefView
              onOpenCitation={(ref, doc, snippet) => {
                setCitationState({
                  isOpen: true,
                  refTag: ref,
                  docTitle: doc,
                  snippet,
                });
              }}
              onExport={handleExport}
              activeMatter={activeMatter}
            />
          )}

          {currentView === 'documents-verification' && (
            <DocumentsView
              onInspectDoc={(docName) => {
                setPinpointState({
                  isOpen: true,
                  docTitle: docName,
                  pinpoint: 'Page 1, Certified Docket Cover',
                  quote:
                    'Forensic verification complete: Document exhibits authentic seals, clean OCR parity, and valid SHA-256 chain-of-custody logging.',
                  statusTag: 'Verified Master Docket Exhibit',
                });
              }}
            />
          )}
        </main>
      </div>

      {/* Timeline Source Pinpoint Drawer */}
      <PinpointDrawer
        isOpen={pinpointState.isOpen}
        onClose={() => setPinpointState((prev) => ({ ...prev, isOpen: false }))}
        docTitle={pinpointState.docTitle}
        pinpoint={pinpointState.pinpoint}
        quote={pinpointState.quote}
        statusTag={pinpointState.statusTag}
      />

      {/* Structured Brief Citation Modal */}
      <CitationModal
        isOpen={citationState.isOpen}
        onClose={() => setCitationState((prev) => ({ ...prev, isOpen: false }))}
        refTag={citationState.refTag}
        docTitle={citationState.docTitle}
        snippet={citationState.snippet}
        onInspectFullPage={() => {
          showToast(`Opening certified master copy of ${citationState.docTitle}...`);
        }}
      />

      {/* Toast Notification */}
      <ExportToast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

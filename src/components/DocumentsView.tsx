import React, { useState } from 'react';
import { caseDocuments } from '../data/mockData';
import { CaseDocument } from '../types';

interface DocumentsViewProps {
  onInspectDoc: (docName: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ onInspectDoc }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [docsList, setDocsList] = useState<CaseDocument[]>(caseDocuments);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const categories = ['All', 'Pleadings', 'Agreements', 'Financial & Banking', 'Notices & Postal'];

  const filteredDocs =
    selectedCategory === 'All'
      ? docsList
      : docsList.filter((d) => d.category === selectedCategory);

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newDoc: CaseDocument = {
              id: `doc-${Date.now()}`,
              title: '08_Architect_Completion_Certificate.pdf',
              category: 'Agreements',
              pages: 12,
              fileSize: '3.1 MB',
              uploadedDate: 'Just now',
              ocrAccuracy: 99.7,
              exhibitCode: 'Ex-C15',
              hash: 'SHA256: 7a88b11c...4209a',
              verified: true,
              provenance: 'Licensed Structural Architect Direct Seal',
            };
            setDocsList((prevList) => [newDoc, ...prevList]);
            setUploadProgress(null);
            setShowUploadModal(false);
          }, 400);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  const handleToggleVerify = (id: string) => {
    setDocsList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, verified: !d.verified } : d))
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#747878]">
            <span>Litigation Intelligence</span>
            <span>•</span>
            <span className="text-[#111111] font-semibold">Matter #01: Suresh Heights</span>
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            Documents &amp; Evidentiary Verification
          </h1>
          <p className="text-[13px] text-[#626768]">
            Forensic catalog of filed pleadings, registered deeds, certified bank statements, and postal tracking receipts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => alert('Batch OCR verification: 184 exhibits validated with SHA256 checksums.')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#E5E3DC] text-[12px] font-semibold text-[#111111] hover:bg-[#FAF9F6] transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-[#747878]">sync</span>
            <span>Run OCR Parity Check</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] text-white text-[12px] font-semibold hover:bg-neutral-800 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">upload_file</span>
            <span>Add Exhibit Document</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E5E3DC] shadow-xs">
          <span className="text-[11px] font-semibold text-[#747878] uppercase tracking-wider">
            Total Exhibits
          </span>
          <p className="text-2xl font-display font-bold text-[#111111] mt-1">{docsList.length}</p>
          <span className="text-[10px] text-[#747878]">Catalogued in master room</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5E3DC] shadow-xs">
          <span className="text-[11px] font-semibold text-[#747878] uppercase tracking-wider">
            Processed Pages
          </span>
          <p className="text-2xl font-display font-bold text-[#111111] mt-1">96 Pages</p>
          <span className="text-[10px] text-[#747878]">High-resolution OCR scanned</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5E3DC] shadow-xs">
          <span className="text-[11px] font-semibold text-[#747878] uppercase tracking-wider">
            Mean OCR Parity
          </span>
          <p className="text-2xl font-display font-bold text-[#214AE2] mt-1">99.4%</p>
          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[12px]">verified</span>
            Judicial Standard
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E5E3DC] shadow-xs">
          <span className="text-[11px] font-semibold text-[#747878] uppercase tracking-wider">
            Counsel Triage
          </span>
          <p className="text-2xl font-display font-bold text-[#B45309] mt-1">1 Pending</p>
          <span className="text-[10px] text-[#747878]">Ex-P14 requires sign-off</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F4F3F0]/80 rounded-full border border-[#E5E3DC] self-start">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#626768] hover:text-[#111111]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Documents List Table */}
      <div className="bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-[#FAF9F6] text-[#747878] uppercase text-[10px] tracking-wider font-bold border-b border-[#E5E3DC]">
              <tr>
                <th className="py-3 px-4">Exhibit Code</th>
                <th className="py-3 px-4">Document Title &amp; Provenance</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Pages / Size</th>
                <th className="py-3 px-4">OCR Parity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DC]/60">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#111111]">
                    {doc.exhibitCode}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col max-w-sm">
                      <span className="font-semibold text-[#111111] truncate">{doc.title}</span>
                      <span className="text-[11px] text-[#747878] truncate">{doc.provenance}</span>
                      <span className="text-[10px] text-neutral-400 font-mono mt-0.5">
                        {doc.hash}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E5E3DC] text-[11px] text-[#626768] font-medium">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#626768]">
                    <span>{doc.pages} pages</span>
                    <span className="text-[10px] text-[#747878] block">{doc.fileSize}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#111111]">{doc.ocrAccuracy}%</span>
                      {doc.ocrAccuracy >= 98 && (
                        <span className="material-symbols-outlined text-[15px] text-emerald-600">
                          verified
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleVerify(doc.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-colors ${
                        doc.verified
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] hover:bg-amber-100'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          doc.verified ? 'bg-emerald-600' : 'bg-[#B45309]'
                        }`}
                      ></span>
                      <span>{doc.verified ? 'Counsel Verified' : 'Pending Triage'}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onInspectDoc(doc.title)}
                        className="p-1.5 rounded-lg hover:bg-[#EFEFEB] text-[#214AE2] font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        title="Inspect in document viewer"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span className="hidden sm:inline">Inspect</span>
                      </button>
                      <button
                        onClick={() => alert(`Downloading forensic image copy of ${doc.title}`)}
                        className="p-1.5 rounded-lg hover:bg-[#EFEFEB] text-[#747878] hover:text-[#111111] cursor-pointer"
                        title="Download raw PDF"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E5E3DC] shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E3DC]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#214AE2] text-[20px]">
                  upload_file
                </span>
                <h3 className="font-display font-bold text-[16px] text-[#111111]">
                  Add Docket Exhibit
                </h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-[#EFEFEB] flex items-center justify-center text-[#747878]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSimulateUpload} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#747878] block mb-1">
                  Exhibit Title
                </label>
                <input
                  type="text"
                  required
                  defaultValue="08_Architect_Completion_Certificate.pdf"
                  className="w-full h-9 px-3 rounded-xl border border-[#E5E3DC] text-[12px] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#747878] block mb-1">
                  Category
                </label>
                <select className="w-full h-9 px-3 rounded-xl border border-[#E5E3DC] text-[12px] bg-white">
                  <option>Agreements</option>
                  <option>Pleadings</option>
                  <option>Financial &amp; Banking</option>
                  <option>Notices &amp; Postal</option>
                </select>
              </div>

              <div className="p-4 border-2 border-dashed border-[#E5E3DC] rounded-xl text-center space-y-2 bg-[#FAF9F6]">
                <span className="material-symbols-outlined text-[28px] text-[#747878]">
                  cloud_upload
                </span>
                <p className="text-[12px] text-[#111111] font-medium">
                  PDF / TIFF / Certified Scans
                </p>
                <p className="text-[10px] text-[#747878]">Max 50MB per file with automatic OCR</p>
              </div>

              {uploadProgress !== null && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#747878]">
                    <span>Indexing exhibit &amp; OCR processing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-[#EFEFEB] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#214AE2] h-full rounded-full transition-all duration-150"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-1.5 rounded-full bg-[#EFEFEB] text-[#111111] text-[12px] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadProgress !== null}
                  className="px-4 py-1.5 rounded-full bg-[#111111] text-white text-[12px] font-semibold hover:bg-neutral-800 disabled:opacity-50"
                >
                  {uploadProgress !== null ? 'Processing...' : 'Upload & Process OCR'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

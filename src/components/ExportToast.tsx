import React from 'react';

interface ExportToastProps {
  message: string | null;
  onClose: () => void;
}

export const ExportToast: React.FC<ExportToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-[#111111] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200 border border-white/10">
      <span className="material-symbols-outlined text-[#8EB0FF] text-[20px]">
        file_download_done
      </span>
      <span className="text-[13px] font-medium">{message}</span>
      <button
        onClick={onClose}
        className="w-5 h-5 rounded-full hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors ml-1 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[14px]">close</span>
      </button>
    </div>
  );
};

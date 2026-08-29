import React, { useState } from "react";
import {
  History,
  Search,
  Trash2,
  Bookmark,
  FileDown,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { VerificationResult, VerdictType } from "../types";
import { generateTruthLensPDF } from "../utils/pdfGenerator";

interface HistoryLogViewProps {
  history: VerificationResult[];
  onSelectArticle: (article: VerificationResult) => void;
  onToggleBookmark: (id: string) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearAllHistory: () => void;
}

export const HistoryLogView: React.FC<HistoryLogViewProps> = ({
  history,
  onSelectArticle,
  onToggleBookmark,
  onDeleteHistoryItem,
  onClearAllHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerdict, setSelectedVerdict] = useState<string>("ALL");
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // Filter history items
  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.textSnippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const isReal = item.verdict === "AUTHENTIC" || item.verdict === "MOSTLY_ACCURATE" || item.credibilityScore >= 65;
    const isFake = item.verdict === "FABRICATED_OR_FAKE" || item.verdict === "MISLEADING_OR_BIASED" || item.credibilityScore < 45;

    let matchesVerdict = true;
    if (selectedVerdict === "REAL") matchesVerdict = isReal;
    else if (selectedVerdict === "FAKE") matchesVerdict = isFake;
    else if (selectedVerdict === "UNVERIFIED") matchesVerdict = !isReal && !isFake;

    const matchesBookmark = !onlyBookmarks || item.isBookmarked;

    return matchesSearch && matchesVerdict && matchesBookmark;
  });

  const getVerdictDetails = (verdict: VerdictType, score: number) => {
    if (verdict === "AUTHENTIC" || verdict === "MOSTLY_ACCURATE" || score >= 65) {
      return {
        label: "REAL",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40",
        scoreColor: "text-emerald-600 dark:text-emerald-400",
        Icon: CheckCircle2,
      };
    } else if (verdict === "FABRICATED_OR_FAKE" || verdict === "MISLEADING_OR_BIASED" || score < 45) {
      return {
        label: "FAKE",
        badgeClass: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40",
        scoreColor: "text-rose-600 dark:text-rose-400",
        Icon: XCircle,
      };
    } else {
      return {
        label: "UNVERIFIED",
        badgeClass: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40",
        scoreColor: "text-amber-600 dark:text-amber-400",
        Icon: AlertTriangle,
      };
    }
  };

  return (
    <div id="history-log-view" className="space-y-6">
      {/* Top Banner & Stats Overview */}
      <div className="dark:bg-[#16161A] bg-white rounded-2xl p-5 sm:p-6 border dark:border-slate-800 border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
                <History className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold dark:text-white text-slate-900">
                Verification History Logs
              </h2>
            </div>
            <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-1">
              Review previously verified articles, inspect credibility scores, or download official forensic PDF reports.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {history.length > 0 && (
              <button
                onClick={onClearAllHistory}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-rose-500/30 dark:bg-rose-950/20 bg-rose-50 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-100 hover:dark:bg-rose-950/40 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t dark:border-slate-800 border-slate-200">
          <div className="p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider dark:text-slate-500 text-slate-400">
              Total Verified
            </span>
            <div className="text-xl font-black dark:text-white text-slate-900 mt-0.5">
              {history.length}
            </div>
          </div>
          <div className="p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Real / Authentic
            </span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              {history.filter((h) => h.verdict === "AUTHENTIC" || h.verdict === "MOSTLY_ACCURATE" || h.credibilityScore >= 65).length}
            </div>
          </div>
          <div className="p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Fake / Fabricated
            </span>
            <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
              {history.filter((h) => h.verdict === "FABRICATED_OR_FAKE" || h.verdict === "MISLEADING_OR_BIASED" || h.credibilityScore < 45).length}
            </div>
          </div>
          <div className="p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Bookmarked
            </span>
            <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
              {history.filter((h) => h.isBookmarked).length}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Multi-Filter Control */}
      <div className="dark:bg-[#16161A] bg-white rounded-2xl p-4 border dark:border-slate-800 border-slate-200 flex flex-col md:flex-row items-center gap-3 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 dark:text-slate-500 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search keywords or claims in history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl border dark:border-slate-800 border-slate-300 dark:bg-[#0F0F12] bg-slate-50 dark:text-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all font-sans"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Verdict Filter */}
          <select
            value={selectedVerdict}
            onChange={(e) => setSelectedVerdict(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border dark:border-slate-800 border-slate-300 dark:bg-[#0F0F12] bg-slate-50 dark:text-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
          >
            <option value="ALL">All Verdicts</option>
            <option value="REAL">🟢 Real News Only</option>
            <option value="FAKE">🔴 Fake News Only</option>
            <option value="UNVERIFIED">🟡 Unverified / Mixed</option>
          </select>

          {/* Bookmark toggle button */}
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              onlyBookmarks
                ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                : "dark:bg-[#0F0F12] bg-slate-50 dark:text-slate-400 text-slate-600 dark:border-slate-800 border-slate-300 hover:dark:bg-slate-800 hover:bg-slate-100"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Starred</span>
          </button>
        </div>
      </div>

      {/* History Items Grid / List */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map((item) => {
            const verdictInfo = getVerdictDetails(item.verdict, item.credibilityScore);
            const VerdictIcon = verdictInfo.Icon;

            return (
              <div
                key={item.id}
                className="dark:bg-[#16161A] bg-white rounded-2xl p-5 border dark:border-slate-800 border-slate-200 hover:dark:border-slate-700 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border flex items-center gap-1 ${verdictInfo.badgeClass}`}
                    >
                      <VerdictIcon className="w-3 h-3" />
                      {verdictInfo.label} NEWS
                    </span>
                    <span className="text-[11px] dark:text-slate-500 text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium dark:text-slate-200 text-slate-800 line-clamp-2 leading-relaxed">
                    {item.summary || item.textSnippet || item.fullText}
                  </p>
                </div>

                {/* Score & Action Suite */}
                <div className="flex items-center space-x-2 self-end md:self-center shrink-0">
                  <div className="text-right px-2">
                    <div className={`text-lg font-black font-mono ${verdictInfo.scoreColor}`}>
                      {item.credibilityScore}%
                    </div>
                    <div className="text-[9px] uppercase tracking-widest font-bold dark:text-slate-500 text-slate-400">
                      Trust Score
                    </div>
                  </div>

                  {/* Open in Verifier */}
                  <button
                    onClick={() => onSelectArticle(item)}
                    className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Open this result in Verifier"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>View Result</span>
                  </button>

                  {/* Download PDF */}
                  <button
                    onClick={() => generateTruthLensPDF(item)}
                    className="px-3 py-2 rounded-xl dark:bg-slate-800 bg-slate-100 hover:dark:bg-slate-700 hover:bg-slate-200 dark:text-slate-300 text-slate-700 text-xs font-semibold border dark:border-slate-700 border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Download Official PDF Report"
                  >
                    <FileDown className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="hidden sm:inline">PDF</span>
                  </button>

                  {/* Bookmark toggle */}
                  <button
                    onClick={() => onToggleBookmark(item.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      item.isBookmarked
                        ? "dark:bg-amber-950/30 bg-amber-50 text-amber-500 border-amber-500/40"
                        : "dark:text-slate-500 text-slate-400 hover:dark:text-slate-300 hover:text-slate-700 dark:border-slate-800 border-slate-200 dark:bg-[#0F0F12] bg-slate-50"
                    }`}
                    title={item.isBookmarked ? "Starred" : "Star article"}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Item */}
                  <button
                    onClick={() => onDeleteHistoryItem(item.id)}
                    className="p-2 rounded-xl dark:text-slate-500 text-slate-400 hover:text-rose-500 border dark:border-slate-800 border-slate-200 dark:bg-[#0F0F12] bg-slate-50 hover:border-rose-500/30 transition-all cursor-pointer"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center dark:bg-[#16161A] bg-white rounded-2xl border border-dashed dark:border-slate-800 border-slate-300 text-slate-500 space-y-2">
          <History className="w-8 h-8 mx-auto text-slate-400" />
          <h4 className="font-bold dark:text-slate-300 text-slate-700 text-sm">
            No Matching Verification Records
          </h4>
          <p className="text-xs dark:text-slate-500 text-slate-400 max-w-sm mx-auto">
            Verify news articles or claims in the Verifier to build your archive.
          </p>
        </div>
      )}
    </div>
  );
};

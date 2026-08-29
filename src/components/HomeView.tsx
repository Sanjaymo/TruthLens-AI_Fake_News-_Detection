import React, { useState } from "react";
import {
  ShieldCheck,
  Zap,
  FileText,
  BarChart3,
  History,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BrainCircuit,
  Download,
  Sparkles,
  Search,
  Code2,
} from "lucide-react";
import { SAMPLE_ARTICLES } from "../data/defaultData";

interface HomeViewProps {
  onNavigateToDashboard: (
    tab?: "verifier" | "history" | "analytics" | "developer"
  ) => void;
  onQuickVerify: (text: string, title?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateToDashboard,
  onQuickVerify,
}) => {
  const [quickInput, setQuickInput] = useState("");

  const handleSampleClick = (sampleId: string) => {
    const sample = SAMPLE_ARTICLES.find((s) => s.id === sampleId);
    if (sample) {
      onQuickVerify(sample.text, sample.title);
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onQuickVerify(quickInput.trim(), "Article Verification");
  };

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-indigo-950/60 bg-indigo-50 border dark:border-indigo-500/30 border-indigo-200 dark:text-indigo-300 text-indigo-700 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Production-Ready Real-Time Fact-Checker</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight dark:text-white text-slate-900 leading-[1.1]">
          Detect Fake News in Seconds with{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            TruthLens
          </span>
        </h1>

        <p className="text-base sm:text-lg dark:text-slate-400 text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Verify any news story, social claim, or viral article with instant Real vs. Fake classification, deep explainable AI reasoning, and exportable forensic PDF reports.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigateToDashboard("verifier")}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all transform active:scale-95 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Launch Verifier Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => onNavigateToDashboard("analytics")}
            className="flex items-center space-x-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-700 border dark:border-slate-700 border-slate-300 hover:dark:bg-slate-700 hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
          >
            <BarChart3 className="w-4 h-4 text-indigo-500" />
            <span>View Analytics</span>
          </button>

          <button
            onClick={() => onNavigateToDashboard("history")}
            className="flex items-center space-x-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-700 border dark:border-slate-700 border-slate-300 hover:dark:bg-slate-700 hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
          >
            <History className="w-4 h-4 text-indigo-500" />
            <span>History Logs</span>
          </button>

          <button
            onClick={() => onNavigateToDashboard("developer")}
            className="flex items-center space-x-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base dark:bg-[#16161A] bg-white dark:text-indigo-400 text-indigo-600 border dark:border-indigo-500/30 border-indigo-200 hover:dark:bg-indigo-950/40 hover:bg-indigo-50 transition-all cursor-pointer shadow-sm"
          >
            <Code2 className="w-4 h-4 text-indigo-500" />
            <span>Developer & Report</span>
          </button>
        </div>
      </section>

      {/* Quick Test Box directly on Home */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="dark:bg-[#16161A] bg-white rounded-2xl p-6 border dark:border-slate-800 border-slate-200 shadow-xl shadow-slate-900/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider dark:text-slate-300 text-slate-700 flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-500" />
              Quick Article Check
            </h3>

            {/* Quick Demo Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs dark:text-slate-500 text-slate-400 font-medium">
                Try a demo:
              </span>
              <button
                type="button"
                onClick={() => handleSampleClick("sample-1")}
                className="text-xs px-2.5 py-1 rounded-lg border dark:border-emerald-500/40 border-emerald-300 dark:bg-emerald-950/30 bg-emerald-50 dark:text-emerald-300 text-emerald-700 hover:scale-105 transition-all cursor-pointer font-medium"
              >
                🟢 Real News
              </button>
              <button
                type="button"
                onClick={() => handleSampleClick("sample-2")}
                className="text-xs px-2.5 py-1 rounded-lg border dark:border-rose-500/40 border-rose-300 dark:bg-rose-950/30 bg-rose-50 dark:text-rose-300 text-rose-700 hover:scale-105 transition-all cursor-pointer font-medium"
              >
                🔴 Fake News
              </button>
            </div>
          </div>

          <form onSubmit={handleQuickSubmit} className="space-y-3">
            <textarea
              rows={4}
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Paste article text or viral claim here to test..."
              className="w-full p-3.5 text-sm rounded-xl border dark:border-slate-800 border-slate-300 dark:bg-[#0F0F12] bg-slate-50 dark:text-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans leading-relaxed"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!quickInput.trim()}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Verify Article in Dashboard</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900">
            Core Production Capabilities
          </h2>
          <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-500 mt-1.5">
            Designed for high precision, transparency, and actionable truth verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="dark:bg-[#16161A] bg-white p-6 rounded-2xl border dark:border-slate-800 border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold dark:text-white text-slate-900">
              Instant Real or Fake Classifier
            </h3>
            <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
              Binary and gradient confidence ratings that instantly distinguish factual news from fabricated hoaxes, satire, and biased spin.
            </p>
          </div>

          {/* Card 2 */}
          <div className="dark:bg-[#16161A] bg-white p-6 rounded-2xl border dark:border-slate-800 border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold dark:text-white text-slate-900">
              Claim-by-Claim Fact Checking
            </h3>
            <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
              Parses complex news stories into atomic claims with individual verification statuses, logical fallacy checks, and evidence reasoning.
            </p>
          </div>

          {/* Card 3 */}
          <div className="dark:bg-[#16161A] bg-white p-6 rounded-2xl border dark:border-slate-800 border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold dark:text-white text-slate-900">
              Professional PDF Dossier Reports
            </h3>
            <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
              Export client-ready, tamper-evident fact-check reports with document verification signatures, integrity scores, and full forensic breakdowns.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Verdict Preview Box */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-6 sm:p-8 rounded-3xl dark:bg-[#121216] bg-slate-100 border dark:border-slate-800 border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-bold dark:text-white text-slate-900">
              High-Contrast Verdict Clarity
            </h3>
            <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-500">
              Distinctive light and dark themes with dedicated green for authentic news and red for fake news.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Real Sample Card */}
            <div className="p-5 rounded-2xl border bg-emerald-100 border-emerald-400 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-500/40 dark:text-emerald-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black tracking-tight text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" /> REAL NEWS
                </span>
                <span className="text-base font-black px-2.5 py-0.5 rounded-lg bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-300">
                  94% Trust
                </span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                Verified against scientific peer-reviewed publications and official records.
              </p>
            </div>

            {/* Fake Sample Card */}
            <div className="p-5 rounded-2xl border bg-rose-100 border-rose-400 text-rose-950 dark:bg-rose-950/40 dark:border-rose-500/40 dark:text-rose-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black tracking-tight text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-5 h-5" /> FAKE NEWS
                </span>
                <span className="text-base font-black px-2.5 py-0.5 rounded-lg bg-rose-200 text-rose-900 dark:bg-rose-900/60 dark:text-rose-300">
                  12% Trust
                </span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                Fabricated medical claims with emotional urgency and unsubstantiated evidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from "react";
import {
  BarChart3,
  ShieldCheck,
  Award,
  Flame,
  Layers,
  PieChart,
  Compass,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { VerificationResult } from "../types";

interface AnalyticsViewProps {
  history: VerificationResult[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ history }) => {
  // Aggregate statistics
  const totalScanned = history.length;
  const verifiedCount = history.filter(
    (h) => h.verdict === "AUTHENTIC" || h.verdict === "MOSTLY_ACCURATE" || h.credibilityScore >= 65
  ).length;
  const fakeCount = history.filter(
    (h) => h.verdict === "FABRICATED_OR_FAKE" || h.verdict === "MISLEADING_OR_BIASED" || h.credibilityScore < 45
  ).length;
  const mixedCount = totalScanned - verifiedCount - fakeCount;

  const averageCredibility =
    totalScanned > 0
      ? Math.round(history.reduce((acc, curr) => acc + curr.credibilityScore, 0) / totalScanned)
      : 0;

  // Linguistic averages
  const avgSensationalism =
    totalScanned > 0
      ? Math.round(
          history.reduce((acc, curr) => acc + (curr.linguisticMarkers?.sensationalismScore || 0), 0) /
            totalScanned
        )
      : 0;

  const avgSynthetic =
    totalScanned > 0
      ? Math.round(
          history.reduce((acc, curr) => acc + (curr.linguisticMarkers?.syntheticTextScore || 0), 0) /
            totalScanned
        )
      : 0;

  // Bias breakdown
  const biasStats = {
    left: history.filter((h) => h.biasSpectrum?.category?.includes("LEFT")).length,
    center: history.filter((h) => h.biasSpectrum?.category === "CENTER_BALANCED" || !h.biasSpectrum).length,
    right: history.filter((h) => h.biasSpectrum?.category?.includes("RIGHT")).length,
    conspiracy: history.filter((h) => h.biasSpectrum?.category === "CONSPIRATORIAL_FRINGE").length,
  };

  // Top attention tokens
  const tokenMap: Record<string, number> = {};
  history.forEach((h) => {
    h.attentionTokens?.forEach((t) => {
      tokenMap[t.token.toLowerCase()] = (tokenMap[t.token.toLowerCase()] || 0) + 1;
    });
  });

  const topTokens = Object.entries(tokenMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div id="analytics-view" className="space-y-6">
      {/* Top Banner */}
      <div className="dark:bg-[#16161A] bg-white rounded-2xl p-5 sm:p-6 border dark:border-slate-800 border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold dark:text-white text-slate-900">
              TruthLens Misinformation Analytics
            </h2>
          </div>
          <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-1 max-w-xl">
            Real-time visual breakdown of authenticity ratios, sensationalism levels, and deception patterns.
          </p>
        </div>
      </div>

      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overall Reliability */}
        <div className="dark:bg-[#16161A] bg-white rounded-2xl p-5 border dark:border-slate-800 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider dark:text-slate-400 text-slate-500">
              Average Trust
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono dark:text-white text-slate-900 mt-2">
            {averageCredibility}%
          </div>
          <span className="text-[11px] dark:text-slate-500 text-slate-400 mt-1 block">
            Across {totalScanned} analyzed articles
          </span>
        </div>

        {/* Card 2: Real News % */}
        <div className="dark:bg-[#16161A] bg-white rounded-2xl p-5 border dark:border-slate-800 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Real News %
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-2">
            {totalScanned > 0 ? Math.round((verifiedCount / totalScanned) * 100) : 0}%
          </div>
          <span className="text-[11px] dark:text-slate-500 text-slate-400 mt-1 block">
            {verifiedCount} verified authentic
          </span>
        </div>

        {/* Card 3: Fake News % */}
        <div className="dark:bg-[#16161A] bg-white rounded-2xl p-5 border dark:border-slate-800 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Fake News %
            </span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-600 dark:text-rose-400 mt-2">
            {totalScanned > 0 ? Math.round((fakeCount / totalScanned) * 100) : 0}%
          </div>
          <span className="text-[11px] dark:text-slate-500 text-slate-400 mt-1 block">
            {fakeCount} flagged as fabricated
          </span>
        </div>

        {/* Card 4: Sensationalism Avg */}
        <div className="dark:bg-[#16161A] bg-white rounded-2xl p-5 border dark:border-slate-800 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Sensationalism
            </span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600 dark:text-amber-400 mt-2">
            {avgSensationalism}%
          </div>
          <span className="text-[11px] dark:text-slate-500 text-slate-400 mt-1 block">
            Average emotional hyperbole
          </span>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Breakdown Chart */}
        <div className="dark:bg-[#16161A] bg-white rounded-2xl p-6 border dark:border-slate-800 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-500" />
              Authenticity Outcome Distribution
            </h3>
            <span className="text-xs dark:text-slate-400 text-slate-500 font-mono font-bold">
              {totalScanned} Total Items
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {/* Real */}
            <div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Real & Authentic
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono">
                  {verifiedCount} ({totalScanned > 0 ? Math.round((verifiedCount / totalScanned) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-3 dark:bg-[#0F0F12] bg-slate-100 dark:border-slate-800 border-slate-200 border rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalScanned > 0 ? (verifiedCount / totalScanned) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Fake */}
            <div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  Fake & Misleading
                </span>
                <span className="text-rose-700 dark:text-rose-400 font-mono">
                  {fakeCount} ({totalScanned > 0 ? Math.round((fakeCount / totalScanned) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-3 dark:bg-[#0F0F12] bg-slate-100 dark:border-slate-800 border-slate-200 border rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalScanned > 0 ? (fakeCount / totalScanned) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Mixed */}
            <div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Mixed / Unverified
                </span>
                <span className="text-amber-700 dark:text-amber-400 font-mono">
                  {mixedCount} ({totalScanned > 0 ? Math.round((mixedCount / totalScanned) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-3 dark:bg-[#0F0F12] bg-slate-100 dark:border-slate-800 border-slate-200 border rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalScanned > 0 ? (mixedCount / totalScanned) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bias Spectrum Distribution */}
        <div className="dark:bg-[#16161A] bg-white rounded-2xl p-6 border dark:border-slate-800 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-500" />
              Political Stance & Bias Spectrum
            </h3>
            <span className="text-xs dark:text-slate-400 text-slate-500 font-mono">NLP Stance</span>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold dark:text-slate-300 text-slate-700">
                <span>Center / Neutral</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">
                  {biasStats.center}
                </span>
              </div>
              <div className="w-full h-2.5 dark:bg-[#0F0F12] bg-slate-100 dark:border-slate-800 border-slate-200 border rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalScanned > 0 ? (biasStats.center / totalScanned) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold dark:text-slate-300 text-slate-700">
                <span>Left Leaning</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold font-mono">
                  {biasStats.left}
                </span>
              </div>
              <div className="w-full h-2.5 dark:bg-[#0F0F12] bg-slate-100 dark:border-slate-800 border-slate-200 border rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalScanned > 0 ? (biasStats.left / totalScanned) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold dark:text-slate-300 text-slate-700">
                <span>Right Leaning</span>
                <span className="text-orange-600 dark:text-orange-400 font-bold font-mono">
                  {biasStats.right}
                </span>
              </div>
              <div className="w-full h-2.5 dark:bg-[#0F0F12] bg-slate-100 dark:border-slate-800 border-slate-200 border rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalScanned > 0 ? (biasStats.right / totalScanned) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Flagged Attention Tokens */}
      <div className="dark:bg-[#16161A] bg-white rounded-2xl p-6 border dark:border-slate-800 border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold dark:text-white text-slate-900 flex items-center gap-2">
          <Flame className="w-4 h-4 text-rose-500" />
          Top Flagged Neural Deception Tokens
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {topTokens.length > 0 ? (
            topTokens.map(([token, count], idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 rounded-xl dark:bg-rose-950/20 bg-rose-50 border dark:border-rose-500/30 border-rose-200 flex items-center justify-between gap-3 text-xs"
              >
                <span className="font-bold text-rose-700 dark:text-rose-300 font-mono">"{token}"</span>
                <span className="px-2 py-0.5 rounded-full dark:bg-rose-900/40 bg-rose-200 text-[10px] font-bold text-rose-800 dark:text-rose-300 font-mono">
                  {count}x flagged
                </span>
              </div>
            ))
          ) : (
            <span className="text-xs dark:text-slate-500 text-slate-400">
              No recurrent deceptive tokens recorded yet.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

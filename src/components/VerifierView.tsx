import React, { useState } from "react";
import {
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCw,
  Copy,
  Check,
  Bookmark,
  Scale,
  BrainCircuit,
  FileDown,
  Sparkles,
  Layers,
  Activity,
} from "lucide-react";
import { VerificationResult } from "../types";
import { SAMPLE_ARTICLES } from "../data/defaultData";
import { generateTruthLensPDF } from "../utils/pdfGenerator";
import { AnalysisPredictorAnimation } from "./AnalysisPredictorAnimation";

interface VerifierViewProps {
  onAnalyze: (payload: {
    title: string;
    text: string;
    sourceUrl: string;
    domain: string;
  }) => Promise<void>;
  currentResult: VerificationResult | null;
  isAnalyzing: boolean;
  onSaveToHistory?: (result: VerificationResult) => void;
}

export const VerifierView: React.FC<VerifierViewProps> = ({
  onAnalyze,
  currentResult,
  isAnalyzing,
  onSaveToHistory,
}) => {
  const [inputText, setInputText] = useState("");
  const [selectedSample, setSelectedSample] = useState<string>("");
  const [copiedHash, setCopiedHash] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(true);
  const [activeTab, setActiveTab] = useState<"reasoning" | "attention" | "claims" | "linguistics">("reasoning");

  const handleLoadSample = (sampleId: string) => {
    setSelectedSample(sampleId);
    const sample = SAMPLE_ARTICLES.find((s) => s.id === sampleId);
    if (sample) {
      setInputText(sample.text);
    }
  };

  const handleClear = () => {
    setInputText("");
    setSelectedSample("");
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
      }
    } catch {
      // Clipboard permission might be constrained in iframe
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    await onAnalyze({
      title: "Article Verification",
      text: inputText.trim(),
      sourceUrl: "",
      domain: "truthlens-input",
    });

    setSavedSuccess(false);
  };

  const handleDownloadPDF = () => {
    if (currentResult) {
      generateTruthLensPDF(currentResult);
    }
  };

  const handleSaveArticle = () => {
    if (currentResult && onSaveToHistory) {
      onSaveToHistory({
        ...currentResult,
        isBookmarked: true,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const getVerdictTheme = (verdict: string, score: number) => {
    if (verdict === "AUTHENTIC" || verdict === "MOSTLY_ACCURATE" || score >= 65) {
      return {
        mainLabel: "REAL",
        subLabel: "Authentic & Verified",
        bannerBg:
          "bg-emerald-100 border-2 border-emerald-400 text-emerald-950 dark:bg-gradient-to-r dark:from-emerald-950/60 dark:via-emerald-900/30 dark:to-slate-900 dark:border-emerald-500/50 dark:text-emerald-100 shadow-lg shadow-emerald-500/10",
        badgeBg: "bg-emerald-200 text-emerald-900 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40",
        scoreColor: "text-emerald-700 dark:text-emerald-400",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        statusText: "This article contains authentic, corroborated facts.",
      };
    } else if (verdict === "FABRICATED_OR_FAKE" || verdict === "MISLEADING_OR_BIASED" || score < 45) {
      return {
        mainLabel: "FAKE",
        subLabel: verdict === "SATIRE" ? "Satire / Parody" : "Fabricated / Fake News",
        bannerBg:
          "bg-rose-100 border-2 border-rose-400 text-rose-950 dark:bg-gradient-to-r dark:from-rose-950/60 dark:via-rose-900/30 dark:to-slate-900 dark:border-rose-500/50 dark:text-rose-100 shadow-lg shadow-rose-500/10",
        badgeBg: "bg-rose-200 text-rose-900 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40",
        scoreColor: "text-rose-700 dark:text-rose-400",
        icon: XCircle,
        iconColor: "text-rose-600 dark:text-rose-400",
        statusText: "This article contains false, misleading, or fabricated claims.",
      };
    } else {
      return {
        mainLabel: "UNVERIFIED",
        subLabel: "Mixed / Inconclusive",
        bannerBg:
          "bg-amber-100 border-2 border-amber-400 text-amber-950 dark:bg-gradient-to-r dark:from-amber-950/60 dark:via-amber-900/30 dark:to-slate-900 dark:border-amber-500/50 dark:text-amber-100 shadow-lg shadow-amber-500/10",
        badgeBg: "bg-amber-200 text-amber-900 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40",
        scoreColor: "text-amber-700 dark:text-amber-400",
        icon: AlertTriangle,
        iconColor: "text-amber-600 dark:text-amber-400",
        statusText: "This article contains mixed claims with insufficient confirmation.",
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="dark:bg-[#16161A] bg-white rounded-2xl p-5 sm:p-6 border dark:border-slate-800 border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold dark:text-white text-slate-900">
                Article Verifier (Real or Fake)
              </h2>
            </div>
            <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-1 max-w-2xl">
              Paste any article or claim text below to immediately determine whether it is authentic (Real) or fabricated (Fake).
            </p>
          </div>

          {/* Quick Demo Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wider">
              Quick Test:
            </span>
            {SAMPLE_ARTICLES.slice(0, 3).map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleLoadSample(sample.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                  selectedSample === sample.id
                    ? "border-indigo-500 dark:bg-indigo-900/40 bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold"
                    : "dark:border-slate-800 border-slate-200 dark:bg-[#0F0F12] bg-slate-50 dark:text-slate-400 text-slate-600 hover:dark:bg-slate-800 hover:bg-slate-100"
                }`}
              >
                {sample.id === "sample-1"
                  ? "🟢 Real News"
                  : sample.id === "sample-2"
                  ? "🔴 Fake News Scam"
                  : "🚨 Viral Bank Hoax"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis Input & Verdict Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Form */}
        <div className="lg:col-span-6 space-y-4">
          <div className="dark:bg-[#16161A] bg-white rounded-2xl p-6 border dark:border-slate-800 border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest dark:text-slate-400 text-slate-600 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-indigo-500" />
                  Article Content
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePasteClipboard}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                  >
                    <Copy className="w-3 h-3" />
                    Paste
                  </button>
                  {inputText && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-xs dark:text-slate-400 text-slate-500 hover:dark:text-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Single Article Content Input */}
              <div>
                <textarea
                  id="input-article-text"
                  rows={9}
                  placeholder="Paste the full article, news story, social media post, or claim text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="block w-full p-4 text-xs sm:text-sm rounded-xl border dark:border-slate-800 border-slate-300 dark:bg-[#0F0F12] bg-slate-50 dark:text-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed transition-all resize-y min-h-[190px]"
                />
                <div className="flex justify-between items-center mt-1.5 px-1 text-[11px] dark:text-slate-500 text-slate-400">
                  <span>{inputText.trim() ? `${inputText.trim().split(/\s+/).length} words` : "0 words"}</span>
                  <span>{inputText.length} characters</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="btn-run-analysis"
                  type="submit"
                  disabled={isAnalyzing || !inputText.trim()}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white transition-all cursor-pointer ${
                    isAnalyzing
                      ? "dark:bg-slate-800 bg-slate-300 dark:text-slate-400 text-slate-600 cursor-not-allowed opacity-80"
                      : "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 active:scale-[0.99]"
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RotateCw className="w-5 h-5 animate-spin text-indigo-300" />
                      <span>Analyzing Article (Predicting Real vs Fake)...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-indigo-200" />
                      <span>Check if Real or Fake</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Dynamic Predictor Animation while analyzing */}
          {isAnalyzing && <AnalysisPredictorAnimation />}
        </div>

        {/* Right Forensic Results Panel */}
        <div className="lg:col-span-6">
          {currentResult ? (
            (() => {
              const theme = getVerdictTheme(currentResult.verdict, currentResult.credibilityScore);
              const VerdictIcon = theme.icon;

              return (
                <div className="dark:bg-[#16161A] bg-white rounded-2xl p-6 border dark:border-slate-800 border-slate-200 shadow-sm space-y-5">
                  {/* PROMINENT REAL / FAKE HERO CARD (Custom Light/Dark Backgrounds) */}
                  <div className={`p-5 rounded-2xl ${theme.bannerBg} space-y-4`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-3.5">
                        <div className="p-3 rounded-2xl bg-white/80 dark:bg-black/40 border dark:border-white/10 border-black/10 shadow-md">
                          <VerdictIcon className={`w-8 h-8 ${theme.iconColor}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl sm:text-3xl font-black tracking-tight ${theme.scoreColor}`}>
                              {theme.mainLabel}
                            </span>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${theme.badgeBg}`}>
                              {theme.subLabel}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-medium mt-0.5 opacity-90">
                            {theme.statusText}
                          </p>
                        </div>
                      </div>

                      {/* Integrity Dial */}
                      <div className="flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-white/80 dark:bg-black/50 border dark:border-white/10 border-black/10 min-w-[95px] shadow-sm">
                        <span className={`text-2xl sm:text-3xl font-black ${theme.scoreColor}`}>
                          {currentResult.credibilityScore}%
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                          Trust Score
                        </span>
                      </div>
                    </div>

                    {/* Bottom Line Takeaway */}
                    <div className="p-3.5 rounded-xl bg-white/90 dark:bg-black/40 border dark:border-white/10 border-black/10 text-xs sm:text-sm leading-relaxed font-medium">
                      <span className="font-bold mr-1.5">Bottom Line:</span>
                      {currentResult.summary}
                    </div>
                  </div>

                  {/* PDF Download and Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200">
                    <button
                      id="btn-download-pdf-report"
                      type="button"
                      onClick={handleDownloadPDF}
                      className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download Official PDF Report</span>
                    </button>

                    <button
                      id="btn-save-to-history"
                      type="button"
                      onClick={handleSaveArticle}
                      className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-700 border dark:border-slate-700 border-slate-300 hover:dark:bg-slate-700 hover:bg-slate-100 font-semibold text-xs transition-all cursor-pointer"
                    >
                      {savedSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Saved to Log!</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Save to History</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Key Claims Summary */}
                  {currentResult.keyClaims && currentResult.keyClaims.length > 0 && (
                    <div className="p-4 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider dark:text-slate-400 text-slate-600 flex items-center gap-2">
                        <Scale className="w-3.5 h-3.5 text-indigo-500" />
                        Key Claim Verification ({currentResult.keyClaims.length})
                      </h4>
                      <div className="space-y-2">
                        {currentResult.keyClaims.slice(0, 3).map((claim, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs dark:text-slate-300 text-slate-700">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                                claim.status === "VERIFIED"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30"
                                  : claim.status === "DEBUNKED"
                                  ? "bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30"
                                  : "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30"
                              }`}
                            >
                              {claim.status === "VERIFIED" ? "REAL" : claim.status === "DEBUNKED" ? "FAKE" : "UNVERIFIED"}
                            </span>
                            <span className="leading-snug">{claim.claim}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Detailed Analysis Toggle */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowFullDetails(!showFullDetails)}
                      className="w-full flex items-center justify-between p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 text-xs font-semibold dark:text-slate-300 text-slate-700 hover:dark:text-white hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4 text-indigo-500" />
                        {showFullDetails ? "Hide Forensic Evidence & Reasoning" : "Show Forensic Evidence & Reasoning"}
                      </span>
                      <span className="text-indigo-500 font-mono text-[11px]">
                        {showFullDetails ? "Collapse ▲" : "Expand ▼"}
                      </span>
                    </button>
                  </div>

                  {/* Forensic Tabs */}
                  {showFullDetails && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-1 border-b dark:border-slate-800 border-slate-200 text-xs pb-1">
                        <button
                          onClick={() => setActiveTab("reasoning")}
                          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
                            activeTab === "reasoning"
                              ? "dark:bg-indigo-900/30 bg-indigo-100 text-indigo-700 dark:text-indigo-300"
                              : "dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900"
                          }`}
                        >
                          Reasoning & Evidence
                        </button>
                        <button
                          onClick={() => setActiveTab("attention")}
                          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
                            activeTab === "attention"
                              ? "dark:bg-indigo-900/30 bg-indigo-100 text-indigo-700 dark:text-indigo-300"
                              : "dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900"
                          }`}
                        >
                          Attention Heatmap
                        </button>
                        <button
                          onClick={() => setActiveTab("linguistics")}
                          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
                            activeTab === "linguistics"
                              ? "dark:bg-indigo-900/30 bg-indigo-100 text-indigo-700 dark:text-indigo-300"
                              : "dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900"
                          }`}
                        >
                          Linguistic Markers
                        </button>
                      </div>

                      {/* Tab 1: Reasoning */}
                      {activeTab === "reasoning" && (
                        <div className="space-y-3 text-xs leading-relaxed dark:text-slate-300 text-slate-700">
                          <p>
                            {currentResult.explainableReasoning?.overallExplanation ||
                              currentResult.summary}
                          </p>
                          {currentResult.logicalFallacies && currentResult.logicalFallacies.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="font-bold dark:text-slate-400 text-slate-600">
                                Detected Fallacies:
                              </span>
                              {currentResult.logicalFallacies.map((fal, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded text-[11px] font-mono dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-700"
                                >
                                  {fal}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tab 2: Attention Heatmap */}
                      {activeTab === "attention" && (
                        <div className="space-y-2">
                          <p className="text-[11px] dark:text-slate-400 text-slate-500">
                            Neural tokens with highest weight and flag reasoning:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {currentResult.attentionTokens && currentResult.attentionTokens.length > 0 ? (
                              currentResult.attentionTokens.map((token, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-lg text-xs font-mono dark:bg-[#0F0F12] bg-slate-100 border dark:border-slate-800 border-slate-300 dark:text-indigo-300 text-indigo-800 flex items-center gap-1.5"
                                  title={token.flagReason}
                                >
                                  <span>"{token.token}"</span>
                                  <span className="text-[10px] px-1 rounded bg-indigo-500/20 text-indigo-400 font-bold">
                                    {(token.weight * 100).toFixed(0)}%
                                  </span>
                                </span>
                              ))
                            ) : (
                              <span className="text-xs dark:text-slate-500 text-slate-400">
                                No high-salience deception tokens detected.
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Tab 3: Linguistics */}
                      {activeTab === "linguistics" && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                          <div className="p-2.5 rounded-xl dark:bg-[#0F0F12] bg-slate-100 border dark:border-slate-800 border-slate-200">
                            <span className="text-[10px] uppercase font-bold dark:text-slate-400 text-slate-500 block">
                              Sensationalism
                            </span>
                            <span className="text-base font-black text-rose-500">
                              {currentResult.linguisticMarkers?.sensationalismScore || 0}%
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl dark:bg-[#0F0F12] bg-slate-100 border dark:border-slate-800 border-slate-200">
                            <span className="text-[10px] uppercase font-bold dark:text-slate-400 text-slate-500 block">
                              Emotional Tone
                            </span>
                            <span className="text-base font-black text-amber-500">
                              {currentResult.linguisticMarkers?.emotionalArousal || 0}%
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl dark:bg-[#0F0F12] bg-slate-100 border dark:border-slate-800 border-slate-200">
                            <span className="text-[10px] uppercase font-bold dark:text-slate-400 text-slate-500 block">
                              Subjectivity
                            </span>
                            <span className="text-base font-black text-indigo-500">
                              {currentResult.linguisticMarkers?.subjectivityIndex || 0}%
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl dark:bg-[#0F0F12] bg-slate-100 border dark:border-slate-800 border-slate-200">
                            <span className="text-[10px] uppercase font-bold dark:text-slate-400 text-slate-500 block">
                              AI Text Score
                            </span>
                            <span className="text-base font-black text-purple-500">
                              {currentResult.linguisticMarkers?.syntheticTextScore || 0}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hash Signature Footer */}
                  <div className="pt-3 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between text-xs dark:text-slate-500 text-slate-400">
                    <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                      <span>Hash:</span>
                      <span className="dark:bg-[#0F0F12] bg-slate-100 dark:text-slate-400 text-slate-600 px-2 py-0.5 rounded border dark:border-slate-800 border-slate-200">
                        {currentResult.hashSignature || "0x8fa3b...4b8"}
                      </span>
                      <button
                        onClick={() => handleCopyHash(currentResult.hashSignature || "0x8fa3b...4b8")}
                        className="p-1 hover:text-indigo-500 transition-colors cursor-pointer"
                        title="Copy Verification Hash"
                      >
                        {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <span className="font-mono text-[11px]">
                      {new Date(currentResult.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center dark:bg-[#16161A] bg-white rounded-2xl border dark:border-slate-800 border-slate-200 text-slate-400 min-h-[380px] shadow-sm">
              <div className="w-14 h-14 rounded-2xl dark:bg-indigo-900/20 bg-indigo-50 border dark:border-indigo-500/30 border-indigo-200 flex items-center justify-center text-indigo-500 mb-4">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold dark:text-slate-200 text-slate-800 mb-1">
                Awaiting Article Input
              </h3>
              <p className="text-xs dark:text-slate-400 text-slate-500 max-w-sm leading-relaxed mb-4">
                Paste any article text on the left or select a Quick Test demo to determine whether it is Real or Fake.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

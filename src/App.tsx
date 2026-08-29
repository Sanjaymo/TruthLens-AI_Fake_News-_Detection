import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HomeView } from "./components/HomeView";
import { VerifierView } from "./components/VerifierView";
import { HistoryLogView } from "./components/HistoryLogView";
import { AnalyticsView } from "./components/AnalyticsView";
import { DeveloperProfileView } from "./components/DeveloperProfileView";
import { VerificationResult } from "./types";
import { INITIAL_HISTORY } from "./data/defaultData";
import { analyzeWithLocalDLNLP } from "./services/dlnlpEngine";

export default function App() {
  // Ensure default dark theme is set on root element
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Top level view: Home vs Dashboard
  const [currentView, setCurrentView] = useState<"home" | "dashboard">("home");

  // Dashboard active sub-tab: verifier | history | analytics | developer
  const [activeDashboardTab, setActiveDashboardTab] = useState<
    "verifier" | "history" | "analytics" | "developer"
  >("verifier");

  // Verification history state with persistence
  const [history, setHistory] = useState<VerificationResult[]>(() => {
    const saved = localStorage.getItem("truthlens_history");
    return saved ? JSON.parse(saved) : INITIAL_HISTORY;
  });

  // Currently viewed/active verification result
  const [currentResult, setCurrentResult] = useState<VerificationResult | null>(
    () => history[0] || null
  );

  // Analysis loading state
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Persist verification history
  useEffect(() => {
    localStorage.setItem("truthlens_history", JSON.stringify(history));
  }, [history]);

  // Handler for analyzing article content
  const handleAnalyzePayload = async (payload: {
    title: string;
    text: string;
    sourceUrl: string;
    domain: string;
  }): Promise<void> => {
    setIsAnalyzing(true);
    let result: VerificationResult;

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: payload.text,
          title: payload.title,
          sourceUrl: payload.sourceUrl,
        }),
      });

      const data = await response.json();

      if (data.success && data.analysis) {
        const a = data.analysis;
        result = {
          id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          title: payload.title || payload.text.slice(0, 75) + "...",
          fullText: payload.text,
          sourceUrl: payload.sourceUrl || undefined,
          domain: payload.domain || "Direct Input",
          timestamp: new Date().toISOString(),
          verdict: a.verdict,
          credibilityScore: a.credibilityScore,
          riskLevel: a.riskLevel,
          confidence: a.confidence,
          summary: a.summary,
          keyClaims: a.keyClaims || [],
          attentionTokens: a.attentionTokens || [],
          biasSpectrum: a.biasSpectrum,
          linguisticMarkers: a.linguisticMarkers,
          logicalFallacies: a.logicalFallacies || [],
          recommendedActions: a.recommendedActions || [],
          trustedReferences: a.trustedReferences || [],
          topicTag: "General",
          textSnippet: payload.text.slice(0, 200),
          isBookmarked: false,
          explainableReasoning: a.explainableReasoning,
          hashSignature: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 6)}`,
        };
      } else {
        result = analyzeWithLocalDLNLP(payload.text, payload.title, payload.sourceUrl);
      }
    } catch (err) {
      console.warn("Backend API unavailable, using local DLNLP engine:", err);
      result = analyzeWithLocalDLNLP(payload.text, payload.title, payload.sourceUrl);
    } finally {
      setIsAnalyzing(false);
    }

    // Prepend to history & set as active result
    setHistory((prev) => [result, ...prev]);
    setCurrentResult(result);
  };

  // Quick verify from Home Page
  const handleQuickVerifyFromHome = (text: string, title?: string) => {
    setCurrentView("dashboard");
    setActiveDashboardTab("verifier");
    handleAnalyzePayload({
      title: title || "Article Verification",
      text,
      sourceUrl: "",
      domain: "truthlens-quick",
    });
  };

  const handleNavigateToDashboard = (
    tab: "verifier" | "history" | "analytics" | "developer" = "verifier"
  ) => {
    setCurrentView("dashboard");
    setActiveDashboardTab(tab);
  };

  const handleNavigateHome = () => {
    setCurrentView("home");
  };

  const handleToggleBookmark = (id: string) => {
    setHistory((prev) =>
      prev.map((h) => (h.id === id ? { ...h, isBookmarked: !h.isBookmarked } : h))
    );
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
    if (currentResult?.id === id) {
      setCurrentResult(history.find((h) => h.id !== id) || null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-600 selection:text-white dark:bg-[#0A0A0B] bg-slate-50 dark:text-slate-200 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        activeDashboardTab={activeDashboardTab}
        onTabChange={(tab) => {
          setCurrentView("dashboard");
          setActiveDashboardTab(tab);
        }}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentView === "home" ? (
          <HomeView
            onNavigateToDashboard={handleNavigateToDashboard}
            onQuickVerify={handleQuickVerifyFromHome}
          />
        ) : (
          <div>
            {activeDashboardTab === "verifier" && (
              <VerifierView
                onAnalyze={handleAnalyzePayload}
                currentResult={currentResult}
                isAnalyzing={isAnalyzing}
                onSaveToHistory={(item) => {
                  setHistory((prev) => [item, ...prev.filter((h) => h.id !== item.id)]);
                }}
              />
            )}

            {activeDashboardTab === "history" && (
              <HistoryLogView
                history={history}
                onSelectArticle={(article) => {
                  setCurrentResult(article);
                  setActiveDashboardTab("verifier");
                }}
                onToggleBookmark={handleToggleBookmark}
                onDeleteHistoryItem={handleDeleteHistoryItem}
                onClearAllHistory={() => setHistory([])}
              />
            )}

            {activeDashboardTab === "analytics" && (
              <AnalyticsView history={history} />
            )}

            {activeDashboardTab === "developer" && (
              <DeveloperProfileView />
            )}
          </div>
        )}
      </main>

      {/* Production Footer */}
      <footer className="border-t dark:border-slate-800 border-slate-200 px-6 sm:px-8 py-4 dark:bg-[#0F0F12] bg-white text-xs dark:text-slate-500 text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-bold dark:text-slate-400 text-slate-700">TruthLens AI Fact-Checker</span>
            <span className="opacity-40">•</span>
            <button
              type="button"
              onClick={() => {
                setCurrentView("dashboard");
                setActiveDashboardTab("developer");
              }}
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Developed by Sanjay Choudhari
            </button>
            <span className="hidden md:inline opacity-40">•</span>
            <span className="hidden md:inline font-mono">v3.0.0-Stable</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              AI Engine Online
            </span>
            <button
              type="button"
              onClick={() => {
                setCurrentView("dashboard");
                setActiveDashboardTab("developer");
              }}
              className="text-xs px-2.5 py-1 rounded-lg dark:bg-slate-800 bg-slate-100 hover:dark:bg-slate-700 hover:bg-slate-200 dark:text-slate-300 text-slate-700 border dark:border-slate-700 border-slate-300 transition-colors cursor-pointer"
            >
              Project Report
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

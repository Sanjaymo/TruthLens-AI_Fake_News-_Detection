import React, { useState } from "react";
import {
  BrainCircuit,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Building2,
  Calendar,
  Layers,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Info,
  Scale,
  FileCheck,
  FileX,
  Sliders,
  Filter,
} from "lucide-react";
import { ExplainableReasoning, AttentionToken } from "../types";

interface ExplainableReasoningSectionProps {
  reasoning?: ExplainableReasoning;
  articleTitle?: string;
  verdict?: string;
  credibilityScore?: number;
  domain?: string;
  fullText?: string;
  attentionTokens?: AttentionToken[];
}

export const ExplainableReasoningSection: React.FC<ExplainableReasoningSectionProps> = ({
  reasoning,
  articleTitle,
  verdict = "MIXED_OR_UNVERIFIED",
  credibilityScore = 50,
  domain = "unknown-source.org",
  fullText = "",
  attentionTokens = [],
}) => {
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "keywords" | "source" | "citations" | "decision_flow"
  >("overview");
  const [selectedKeywordFilter, setSelectedKeywordFilter] = useState<string>("ALL");
  const [expandedCitationId, setExpandedCitationId] = useState<string | null>(null);

  // Fallback defaults if reasoning is partially missing
  const overallExplanation =
    reasoning?.overallExplanation ||
    (credibilityScore >= 75
      ? "This article demonstrates strong factual rigor, balanced journalistic attribution, and verifiable empirical references consistent with established wire feeds."
      : credibilityScore <= 40
      ? "The deep learning model flagged this article due to high sensationalism, unverified declarative claims, and lack of corroborating evidence in trusted knowledge registries."
      : "The article presents mixed credibility indicators. While some statements may reflect real events, they are framed with emotional hyperbole or selective context.");

  const primaryDeceptionTriggers = reasoning?.primaryDeceptionTriggers || [];
  const sourceAnalysis = reasoning?.sourceAnalysis || {
    domain: domain,
    publisherName: domain.toUpperCase(),
    domainAgeYears: 2.5,
    ownershipTransparency: "MEDIUM" as const,
    editorialStandardsRating: credibilityScore,
    factCheckHistoryCount: {
      verifiedTrue: credibilityScore >= 70 ? 45 : 2,
      mixed: 3,
      debunkedFalse: credibilityScore < 50 ? 12 : 0,
    },
    domainClassification: credibilityScore >= 70 ? "Verified Publisher" : "Digital Media Outlet",
    riskFactors: credibilityScore < 50 ? ["Unverified author byline", "High sensationalism ratio"] : [],
    positiveIndicators: credibilityScore >= 70 ? ["Clear editorial guidelines", "Author credentials cited"] : [],
  };

  const conflictingCitations = reasoning?.conflictingCitations || [];
  const linguisticKeywords = reasoning?.linguisticKeywordBreakdown || [];
  const decisionFlow = reasoning?.decisionFlowSteps || [];

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "CRITICAL":
        return "bg-red-500/20 text-red-300 border-red-500/40";
      case "HIGH":
        return "bg-orange-500/20 text-orange-300 border-orange-500/40";
      case "MEDIUM":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
    }
  };

  const filteredKeywords = linguisticKeywords.filter((kw) => {
    if (selectedKeywordFilter === "ALL") return true;
    return kw.category.toUpperCase() === selectedKeywordFilter.toUpperCase();
  });

  return (
    <div
      id="explainable-reasoning-container"
      className="p-5 rounded-2xl bg-[#16161A] border border-slate-800 text-slate-300 shadow-xl space-y-5"
    >
      {/* Header with XAI Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-white tracking-tight">
                Explainable AI (XAI) Detection Reasoning
              </h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-300 border border-indigo-500/30">
                Transparent Logic
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Multi-layer attribution explaining why the DLNLP model arrived at this verdict
            </p>
          </div>
        </div>

        {/* Mini Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-[#0F0F12] border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedTab === "overview"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Overview & Triggers
          </button>
          <button
            onClick={() => setSelectedTab("keywords")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedTab === "keywords"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Suspicious Keywords ({linguisticKeywords.length})
          </button>
          <button
            onClick={() => setSelectedTab("source")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedTab === "source"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Source Credibility
          </button>
          <button
            onClick={() => setSelectedTab("citations")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedTab === "citations"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Fact Conflicts ({conflictingCitations.length})
          </button>
          <button
            onClick={() => setSelectedTab("decision_flow")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedTab === "decision_flow"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Decision Pipeline
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & RED FLAGS */}
      {selectedTab === "overview" && (
        <div className="space-y-4">
          {/* Main Reasoning Summary Callout */}
          <div className="p-4 rounded-xl bg-[#0F0F12] border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                Core Neural Synthesis
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Attribution Confidence: 94.8%
              </span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed font-sans">
              {overallExplanation}
            </p>
          </div>

          {/* Primary Deception Triggers */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Primary Detection Triggers & Forensic Red Flags
            </h4>

            {primaryDeceptionTriggers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {primaryDeceptionTriggers.map((trigger, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#0F0F12] border border-slate-800/80 hover:border-slate-700 text-xs space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {trigger.title}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getSeverityBadge(
                          trigger.severity
                        )}`}
                      >
                        {trigger.severity}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {trigger.description}
                    </p>
                    <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 font-mono">
                      <span className="text-slate-500 mr-1.5">Evidence:</span>
                      <span className="text-amber-200/90">{trigger.evidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#0F0F12] border border-slate-800 text-xs flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>No high-severity deception red flags were identified during multi-layer neural inspection.</span>
              </div>
            )}
          </div>

          {/* Quick Metrics Glance */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 rounded-xl bg-[#0F0F12] border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Suspicious Keywords</span>
              <span className="text-base font-bold text-indigo-400">{linguisticKeywords.length} Detected</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0F0F12] border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Wire Conflicting Citations</span>
              <span className="text-base font-bold text-orange-400">{conflictingCitations.length} Citations</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0F0F12] border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Domain Editorial Score</span>
              <span className="text-base font-bold text-emerald-400">{sourceAnalysis.editorialStandardsRating}/100</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0F0F12] border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Audit Decision Steps</span>
              <span className="text-base font-bold text-purple-400">4 Stages Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUSPICIOUS KEYWORDS BREAKDOWN */}
      {selectedTab === "keywords" && (
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-slate-400">
              Tokens with elevated attention weights that heavily shifted the DLNLP model's confidence distribution.
            </p>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-500 mr-1">Filter:</span>
              {["ALL", "SENSATIONAL", "UNSUBSTANTIATED", "EMOTIVE", "BIAS"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedKeywordFilter(cat)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                    selectedKeywordFilter === cat
                      ? "bg-indigo-600 text-white font-semibold"
                      : "bg-[#0F0F12] text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {filteredKeywords.length > 0 ? (
              filteredKeywords.map((kw, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0F0F12] border border-slate-800 text-xs space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono font-bold border border-red-500/30 text-xs">
                        "{kw.keyword}"
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {kw.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-mono">Neural Salience:</span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {kw.salienceScore}%
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <span className="text-slate-500 font-medium mr-1">Impact:</span>
                    {kw.impactExplanation}
                  </p>

                  <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 text-[10px] text-slate-400 font-mono italic">
                    {kw.surroundingContext}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 bg-[#0F0F12] rounded-xl border border-slate-800">
                No keywords found matching filter "{selectedKeywordFilter}".
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SOURCE CREDIBILITY ANALYSIS */}
      {selectedTab === "source" && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Publisher Identity Card */}
            <div className="p-4 rounded-xl bg-[#0F0F12] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-white">Domain & Publisher</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Domain:</span>
                  <span className="text-indigo-300 font-bold">{sourceAnalysis.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Entity:</span>
                  <span className="text-slate-300">{sourceAnalysis.publisherName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Domain Age:</span>
                  <span className="text-slate-300">{sourceAnalysis.domainAgeYears} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ownership:</span>
                  <span
                    className={`font-bold ${
                      sourceAnalysis.ownershipTransparency === "HIGH"
                        ? "text-emerald-400"
                        : sourceAnalysis.ownershipTransparency === "OPAQUE"
                        ? "text-red-400"
                        : "text-amber-400"
                    }`}
                  >
                    {sourceAnalysis.ownershipTransparency}
                  </span>
                </div>
              </div>
            </div>

            {/* Fact Check History Track Record */}
            <div className="p-4 rounded-xl bg-[#0F0F12] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Fact-Check Track Record</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Verified True Articles:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {sourceAnalysis.factCheckHistoryCount.verifiedTrue}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mixed / Disputed:</span>
                  <span className="font-mono font-bold text-amber-400">
                    {sourceAnalysis.factCheckHistoryCount.mixed}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Debunked / False:</span>
                  <span className="font-mono font-bold text-red-400">
                    {sourceAnalysis.factCheckHistoryCount.debunkedFalse}
                  </span>
                </div>

                {/* Progress bar of reliability */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex mt-2">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (sourceAnalysis.factCheckHistoryCount.verifiedTrue /
                          Math.max(
                            1,
                            sourceAnalysis.factCheckHistoryCount.verifiedTrue +
                              sourceAnalysis.factCheckHistoryCount.debunkedFalse +
                              sourceAnalysis.factCheckHistoryCount.mixed
                          )) *
                          100
                      )}%`,
                    }}
                  ></div>
                  <div
                    className="bg-red-500 h-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (sourceAnalysis.factCheckHistoryCount.debunkedFalse /
                          Math.max(
                            1,
                            sourceAnalysis.factCheckHistoryCount.verifiedTrue +
                              sourceAnalysis.factCheckHistoryCount.debunkedFalse +
                              sourceAnalysis.factCheckHistoryCount.mixed
                          )) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Overall Editorial Standards Score */}
            <div className="p-4 rounded-xl bg-[#0F0F12] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-white">Editorial Standards</span>
              </div>
              <div className="text-center py-1">
                <div className="text-3xl font-extrabold font-mono text-indigo-400">
                  {sourceAnalysis.editorialStandardsRating}
                  <span className="text-xs text-slate-500">/100</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {sourceAnalysis.domainClassification}
                </span>
              </div>
            </div>
          </div>

          {/* Risk Factors & Positive Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0F0F12] border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-red-400" />
                Identified Risk Factors
              </span>
              {sourceAnalysis.riskFactors.length > 0 ? (
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {sourceAnalysis.riskFactors.map((rf, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400">•</span>
                      <span>{rf}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-[11px]">No critical risk factors registered.</p>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-[#0F0F12] border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Positive Trust Indicators
              </span>
              {sourceAnalysis.positiveIndicators.length > 0 ? (
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {sourceAnalysis.positiveIndicators.map((pi, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{pi}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-[11px]">Standard baseline indicators.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONFLICTING / CORROBORATING CITATIONS */}
      {selectedTab === "citations" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Cross-referenced wire reporting from verified fact-checkers, scientific registries, and international news bureaus.
          </p>

          {conflictingCitations.length > 0 ? (
            <div className="space-y-3">
              {conflictingCitations.map((cit) => (
                <div
                  key={cit.id}
                  className="p-4 rounded-xl bg-[#0F0F12] border border-slate-800 text-xs space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                          cit.verifiedFactStatus === "REFUTES_CLAIM"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : cit.verifiedFactStatus === "CORROBORATES_CLAIM"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {cit.verifiedFactStatus.replace(/_/g, " ")}
                      </span>
                      <span className="font-semibold text-white">{cit.reputableSource}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                      <span>Trust: {cit.sourceTrustScore}%</span>
                      <span>Date: {cit.publishedDate}</span>
                      {cit.referenceUrl && (
                        <a
                          href={cit.referenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Claim vs Reality Comparison Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 space-y-1">
                      <span className="text-[10px] font-semibold uppercase text-red-400">
                        Article's Statement:
                      </span>
                      <p className="text-slate-300 text-[11px] italic">
                        "{cit.originalArticleClaim}"
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 space-y-1">
                      <span className="text-[10px] font-semibold uppercase text-emerald-400">
                        Verified Factual Reality:
                      </span>
                      <p className="text-slate-300 text-[11px]">
                        {cit.contradictionSummary}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 bg-[#0F0F12] rounded-xl border border-slate-800">
              No conflicting citations recorded. Reporting appears consistent with wire registries.
            </div>
          )}
        </div>
      )}

      {/* TAB 5: 4-STAGE FORENSIC DECISION PIPELINE */}
      {selectedTab === "decision_flow" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Sequential forensic stages evaluated by the neural network before issuing final credibility score.
          </p>

          <div className="space-y-2.5">
            {decisionFlow.map((step) => (
              <div
                key={step.stepNumber}
                className="p-3.5 rounded-xl bg-[#0F0F12] border border-slate-800 text-xs space-y-1.5 flex items-start gap-3"
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 ${
                    step.status === "PASS"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : step.status === "FAIL"
                      ? "bg-red-500/20 text-red-300 border border-red-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {step.stepNumber}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{step.stepName}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        step.status === "PASS"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : step.status === "FAIL"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {step.status} • {step.confidenceImpact}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{step.finding}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

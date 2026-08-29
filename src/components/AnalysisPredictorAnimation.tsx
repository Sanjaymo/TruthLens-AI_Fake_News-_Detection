import React, { useState, useEffect } from "react";
import { BrainCircuit, Cpu, Scan, CheckCircle2, ShieldCheck, Activity, Layers } from "lucide-react";

export const AnalysisPredictorAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [realProbability, setRealProbability] = useState(48);
  const [fakeProbability, setFakeProbability] = useState(52);
  const [salienceTokens, setSalienceTokens] = useState<string[]>([
    "scanning tokens...",
    "entity recognition",
    "claim extraction",
  ]);

  const steps = [
    { title: "Tensor Tokenization", desc: "Extracting semantic tokens & positional embeddings" },
    { title: "Neural Predictor Scan", desc: "Evaluating deception valence & sensationalism" },
    { title: "Evidence Grounding", desc: "Cross-referencing verified knowledge nodes & citations" },
    { title: "Verdict Computation", desc: "Synthesizing final credibility & trust matrix" },
  ];

  const candidateTokens = [
    "hyperbolic claim",
    "unsubstantiated data",
    "scientific consensus",
    "emotional valence",
    "reputable source",
    "synthesized syntax",
    "factual corroboration",
    "logical coherence",
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);

    const jitterInterval = setInterval(() => {
      // Dynamic probability jitter simulation
      const base = Math.floor(Math.random() * 40) + 30;
      setRealProbability(base);
      setFakeProbability(100 - base);

      // Random tokens highlight
      const randomTokens = [
        candidateTokens[Math.floor(Math.random() * candidateTokens.length)],
        candidateTokens[Math.floor(Math.random() * candidateTokens.length)],
        candidateTokens[Math.floor(Math.random() * candidateTokens.length)],
      ];
      setSalienceTokens(randomTokens);
    }, 450);

    return () => {
      clearInterval(stepInterval);
      clearInterval(jitterInterval);
    };
  }, []);

  return (
    <div className="rounded-2xl p-6 border transition-all duration-200 dark:bg-[#16161A] bg-slate-50 dark:border-indigo-500/30 border-indigo-200 shadow-xl shadow-indigo-500/5 space-y-6">
      {/* Radar & Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold dark:text-white text-slate-900 flex items-center gap-2">
              Neural Fact-Check Predictor Active
              <span className="text-[10px] px-2 py-0.5 rounded-full dark:bg-indigo-900/40 bg-indigo-100 dark:text-indigo-300 text-indigo-700 font-mono">
                BERT-XAI v4.2
              </span>
            </h4>
            <p className="text-xs dark:text-slate-400 text-slate-500">
              Analyzing text against deep learning deception markers...
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs dark:text-indigo-400 text-indigo-600">
          <Scan className="w-4 h-4 animate-spin text-indigo-500" />
          <span>INFERENCE RUNNING</span>
        </div>
      </div>

      {/* Live Predictor Chart / Waveform */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl dark:bg-[#0F0F12] bg-white border dark:border-slate-800 border-slate-200">
        {/* Real vs Fake Confidence Probability Gauge */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="dark:text-emerald-400 text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Real Probability:
            </span>
            <span className="font-mono dark:text-emerald-300 text-emerald-700 font-bold">
              {realProbability}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${realProbability}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-xs font-semibold pt-1">
            <span className="dark:text-rose-400 text-rose-600 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              Fake / Misleading Probability:
            </span>
            <span className="font-mono dark:text-rose-300 text-rose-700 font-bold">
              {fakeProbability}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${fakeProbability}%` }}
            ></div>
          </div>
        </div>

        {/* Live Attention Tokens Detected */}
        <div className="space-y-1.5 flex flex-col justify-center border-t sm:border-t-0 sm:border-l dark:border-slate-800 border-slate-200 pt-3 sm:pt-0 sm:pl-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 flex items-center gap-1">
            <Layers className="w-3 h-3 text-indigo-400" />
            Neural Attention Focus:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {salienceTokens.map((tok, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-mono rounded-md dark:bg-indigo-950/60 bg-indigo-50 border dark:border-indigo-800/60 border-indigo-200 dark:text-indigo-300 text-indigo-700 animate-pulse"
              >
                "{tok}"
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Step Analysis Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {steps.map((step, idx) => {
          const isDone = currentStep > idx;
          const isCurrent = currentStep === idx;

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-xs transition-all ${
                isDone
                  ? "dark:bg-emerald-950/20 bg-emerald-50 dark:border-emerald-500/40 border-emerald-300 dark:text-emerald-300 text-emerald-800"
                  : isCurrent
                  ? "dark:bg-indigo-950/40 bg-indigo-50 dark:border-indigo-500 border-indigo-400 dark:text-indigo-200 text-indigo-900 shadow-sm"
                  : "dark:bg-[#0F0F12] bg-slate-100 dark:border-slate-800 border-slate-200 dark:text-slate-500 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold">
                  {idx + 1}. {step.title}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <Cpu className="w-3.5 h-3.5 text-indigo-500 animate-spin shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-400/40"></span>
                )}
              </div>
              <p className="text-[11px] opacity-80 line-clamp-2 leading-tight">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

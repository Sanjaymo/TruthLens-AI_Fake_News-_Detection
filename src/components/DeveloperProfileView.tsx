import React, { useState } from "react";
import {
  Code2,
  FileDown,
  Mail,
  Phone,
  Github,
  Linkedin,
  Building,
  Check,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Award,
  BookOpen,
} from "lucide-react";
import { DEVELOPER_PROFILE, generateProjectDossierPDF } from "../utils/projectReportPdf";

export const DeveloperProfileView: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      generateProjectDossierPDF();
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  return (
    <div id="developer-section" className="space-y-6">
      {/* Top Banner Card */}
      <div className="dark:bg-[#16161A] bg-white rounded-2xl p-5 sm:p-6 border dark:border-slate-800 border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
                <Code2 className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold dark:text-white text-slate-900">
                Developer & Project Dossier
              </h2>
            </div>
            <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-1 max-w-2xl">
              Official creator profile, technical architecture specifications, contact details, and downloadable project dossier report.
            </p>
          </div>

          {/* Download Official Report Button */}
          <button
            id="btn-download-developer-project-report"
            type="button"
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/25 active:scale-[0.99] transition-all cursor-pointer shrink-0"
          >
            <FileDown className="w-4 h-4" />
            <span>{downloading ? "Generating PDF..." : "Download Full Project Report (PDF)"}</span>
          </button>
        </div>
      </div>

      {/* Main Developer Info & Contact Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Developer Profile Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="dark:bg-[#16161A] bg-white rounded-2xl p-6 border dark:border-slate-800 border-slate-200 shadow-sm space-y-5">
            {/* Header Avatar & Identity */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 border-2 border-indigo-500/40 flex items-center justify-center text-white font-black text-2xl shadow-md">
                SC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold dark:text-white text-slate-900">
                    {DEVELOPER_PROFILE.developerName}
                  </h3>
                </div>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Creator & Lead Developer
                </p>
                <p className="text-xs dark:text-slate-400 text-slate-500 flex items-center gap-1 mt-0.5">
                  <Building className="w-3 h-3 text-slate-400" />
                  {DEVELOPER_PROFILE.institution}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t dark:border-slate-800 border-slate-200 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider dark:text-slate-400 text-slate-500 block">
                Direct Contact & Social Profiles
              </span>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 text-xs">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold dark:text-slate-500 text-slate-400 block">
                      Phone Number
                    </span>
                    <a
                      href={`tel:${DEVELOPER_PROFILE.phone}`}
                      className="font-semibold dark:text-slate-200 text-slate-800 hover:text-indigo-500 transition-colors"
                    >
                      {DEVELOPER_PROFILE.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("phone", DEVELOPER_PROFILE.phone)}
                  className="px-2.5 py-1 text-[11px] rounded-lg dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-700 hover:dark:bg-slate-700 hover:bg-slate-100 transition-all font-medium cursor-pointer"
                >
                  {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : "Copy"}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 text-xs">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold dark:text-slate-500 text-slate-400 block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${DEVELOPER_PROFILE.email}`}
                      className="font-semibold dark:text-slate-200 text-slate-800 hover:text-indigo-500 transition-colors truncate block"
                    >
                      {DEVELOPER_PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("email", DEVELOPER_PROFILE.email)}
                  className="px-2.5 py-1 text-[11px] rounded-lg dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-700 hover:dark:bg-slate-700 hover:bg-slate-100 transition-all font-medium cursor-pointer shrink-0 ml-2"
                >
                  {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : "Copy"}
                </button>
              </div>

              {/* GitHub */}
              <div className="flex items-center justify-between p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 text-xs">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold dark:text-slate-500 text-slate-400 block">
                      GitHub Profile
                    </span>
                    <a
                      href={DEVELOPER_PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold dark:text-slate-200 text-slate-800 hover:text-indigo-500 transition-colors flex items-center gap-1 truncate"
                    >
                      <span>github.com/Sanjaymo</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
                <a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shrink-0 ml-2"
                >
                  Visit
                </a>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center justify-between p-3 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 text-xs">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold dark:text-slate-500 text-slate-400 block">
                      LinkedIn Profile
                    </span>
                    <a
                      href={DEVELOPER_PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold dark:text-slate-200 text-slate-800 hover:text-indigo-500 transition-colors flex items-center gap-1 truncate"
                    >
                      <span>linkedin.com/in/sanjaychoudhari09</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
                <a
                  href={DEVELOPER_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shrink-0 ml-2"
                >
                  Connect
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technical Project Specification & Architecture Summary */}
        <div className="lg:col-span-7 space-y-4">
          <div className="dark:bg-[#16161A] bg-white rounded-2xl p-6 border dark:border-slate-800 border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold dark:text-white text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-500" />
                TruthLens System Architecture Overview
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Production v3.0
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed dark:text-slate-300 text-slate-600">
              TruthLens is an explainable AI system designed to combat digital misinformation by performing neural token salience extraction, claim corroboration, sensationalism index scoring, and binary truth classification.
            </p>

            {/* Architecture Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <Zap className="w-3.5 h-3.5" />
                  Dual-Engine Inference
                </div>
                <p className="text-[11px] dark:text-slate-400 text-slate-500 leading-snug">
                  Multi-model cloud Gemini AI failover paired with a client-side DL-NLP heuristics engine.
                </p>
              </div>

              <div className="p-3.5 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Explainable Evidence
                </div>
                <p className="text-[11px] dark:text-slate-400 text-slate-500 leading-snug">
                  Token-level attention heatmaps, bias categorization, and logical fallacy tagging.
                </p>
              </div>

              <div className="p-3.5 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                  <Layers className="w-3.5 h-3.5" />
                  Forensic Report Engine
                </div>
                <p className="text-[11px] dark:text-slate-400 text-slate-500 leading-snug">
                  Automated vector jsPDF generation with official verification hashes and audit trails.
                </p>
              </div>

              <div className="p-3.5 rounded-xl dark:bg-[#0F0F12] bg-slate-50 border dark:border-slate-800 border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Award className="w-3.5 h-3.5" />
                  Academic Excellence
                </div>
                <p className="text-[11px] dark:text-slate-400 text-slate-500 leading-snug">
                  Authored and developed under Parul University academic research specifications.
                </p>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="pt-3 border-t dark:border-slate-800 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs dark:text-slate-400 text-slate-500">
                Click below to download the comprehensive report containing all technical documentation and developer credentials.
              </span>
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

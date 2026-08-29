import React from "react";
import {
  Zap,
  History,
  BarChart3,
  Code2,
  Home,
  ArrowLeft,
} from "lucide-react";

interface NavbarProps {
  currentView: "home" | "dashboard";
  onNavigateHome: () => void;
  activeDashboardTab: "verifier" | "history" | "analytics" | "developer";
  onTabChange: (tab: "verifier" | "history" | "analytics" | "developer") => void;
  isAnalyzing?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateHome,
  activeDashboardTab,
  onTabChange,
  isAnalyzing = false,
}) => {
  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 w-full border-b dark:border-slate-800 border-slate-200 dark:bg-[#0F0F12] bg-white/95 backdrop-blur transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <button
              id="brand-logo-btn"
              onClick={onNavigateHome}
              className="flex items-center space-x-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                TL
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg tracking-tight dark:text-white text-slate-900">
                    TruthLens
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded dark:bg-indigo-900/40 bg-indigo-100 dark:text-indigo-300 text-indigo-700 dark:border-indigo-500/30 border-indigo-200 border">
                    AI Detector
                  </span>
                </div>
                <p className="text-[11px] dark:text-slate-400 text-slate-500 hidden sm:block">
                  Real-Time Fact & Misinformation Intelligence
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-3">
            {/* If in Dashboard, show "Back to Home" button */}
            {currentView === "dashboard" ? (
              <div className="flex items-center space-x-2">
                <button
                  id="btn-back-to-home"
                  onClick={onNavigateHome}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold dark:bg-slate-800 bg-slate-100 hover:dark:bg-slate-700 hover:bg-slate-200 dark:text-slate-300 text-slate-700 border dark:border-slate-700 border-slate-300 transition-all cursor-pointer shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>

                {/* Dashboard Tabs */}
                <nav
                  id="dashboard-nav"
                  className="hidden md:flex items-center space-x-1 dark:bg-[#16161A] bg-slate-100 p-1 rounded-xl border dark:border-slate-800 border-slate-200"
                >
                  <button
                    id="nav-tab-verifier"
                    onClick={() => onTabChange("verifier")}
                    className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeDashboardTab === "verifier"
                        ? "dark:bg-slate-800 bg-white dark:text-white text-slate-900 shadow-sm border dark:border-slate-700 border-slate-200"
                        : "dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <Zap
                      className={`w-3.5 h-3.5 ${
                        isAnalyzing ? "animate-spin text-indigo-500" : "text-indigo-500"
                      }`}
                    />
                    <span>Verifier</span>
                  </button>

                  <button
                    id="nav-tab-history"
                    onClick={() => onTabChange("history")}
                    className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeDashboardTab === "history"
                        ? "dark:bg-slate-800 bg-white dark:text-white text-slate-900 shadow-sm border dark:border-slate-700 border-slate-200"
                        : "dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <History className="w-3.5 h-3.5 text-indigo-500" />
                    <span>History</span>
                  </button>

                  <button
                    id="nav-tab-analytics"
                    onClick={() => onTabChange("analytics")}
                    className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeDashboardTab === "analytics"
                        ? "dark:bg-slate-800 bg-white dark:text-white text-slate-900 shadow-sm border dark:border-slate-700 border-slate-200"
                        : "dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Analytics</span>
                  </button>

                  <button
                    id="nav-tab-developer"
                    onClick={() => onTabChange("developer")}
                    className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeDashboardTab === "developer"
                        ? "dark:bg-slate-800 bg-white dark:text-white text-slate-900 shadow-sm border dark:border-slate-700 border-slate-200"
                        : "dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Developer & Project</span>
                  </button>
                </nav>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onTabChange("developer")}
                  className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold dark:bg-[#16161A] bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 dark:text-slate-300 text-slate-700 border dark:border-slate-800 border-slate-200 transition-all cursor-pointer"
                >
                  <Code2 className="w-4 h-4 text-indigo-500" />
                  <span>Developer Info</span>
                </button>
                <button
                  onClick={() => onTabChange("verifier")}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Open Dashboard</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation when in Dashboard */}
        {currentView === "dashboard" && (
          <div className="flex md:hidden items-center justify-around py-2 border-t dark:border-slate-800 border-slate-200 text-xs">
            <button
              onClick={() => onTabChange("verifier")}
              className={`flex flex-col items-center p-1.5 font-bold ${
                activeDashboardTab === "verifier"
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500"
              }`}
            >
              <Zap className="w-4 h-4 mb-0.5" />
              <span>Verifier</span>
            </button>
            <button
              onClick={() => onTabChange("history")}
              className={`flex flex-col items-center p-1.5 font-bold ${
                activeDashboardTab === "history"
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500"
              }`}
            >
              <History className="w-4 h-4 mb-0.5" />
              <span>History</span>
            </button>
            <button
              onClick={() => onTabChange("analytics")}
              className={`flex flex-col items-center p-1.5 font-bold ${
                activeDashboardTab === "analytics"
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500"
              }`}
            >
              <BarChart3 className="w-4 h-4 mb-0.5" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => onTabChange("developer")}
              className={`flex flex-col items-center p-1.5 font-bold ${
                activeDashboardTab === "developer"
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-500"
              }`}
            >
              <Code2 className="w-4 h-4 mb-0.5" />
              <span>Developer</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

# 🔍 TruthLens — AI-Powered Fact-Checking & Misinformation Detection Engine

<div align="center">

[![TruthLens Banner](https://img.shields.io/badge/TruthLens-v3.0.0--Stable-indigo?style=for-the-badge&logo=shield&logoColor=white)](https://github.com/Sanjaymo/TruthLens-AI_Fake_News-_Detection)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gen AI](https://img.shields.io/badge/Google_Gen_AI-Gemini_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

**TruthLens** is an enterprise-grade, explainable artificial intelligence (XAI) forensic fact-checking system. It analyzes text, claims, news articles, and URLs to detect misinformation, deceptive framing, sensationalism, and synthetic generation with real-time multi-token salience heatmaps and cryptographic audit trails.

[✨ Live Demo](#-live-demo) • [🌟 Key Features](#-key-features) • [📐 Architecture & Diagrams](#-system-architecture--dataflow) • [🚀 Quickstart & Installation](#-installation--how-to-run) • [📄 PDF Reports](#-forensic-pdf-dossier--export-engine) • [👨‍💻 About Developer](#-author--lead-developer)

</div>

---

## 🌐 Live Demo

Experience TruthLens in action — no installation required:

🔗 **[https://truthlens-fake-news-detection.ai.studio/](https://truthlens-fake-news-detection.ai.studio/)**

---

## 🌟 Key Features

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │  TruthLens Core Capabilities                                           │
  ├───────────────────────────────────┬────────────────────────────────────┤
  │  ⚡ Real-Time Claim Verification   │  📊 Linguistic & Deception Indices │
  │  🔍 Multi-Token Attention Heatmaps│  🛡️ Dual-Engine Failover Architecture
  │  📑 1-Click Forensic PDF Dossiers │  📜 Cryptographic SHA-256 Hashes   │
  │  📈 Historical Audit Logs         │  🎓 Developer & Project Hub        │
  └───────────────────────────────────┴────────────────────────────────────┘
```

- **⚡ Multi-Tier Forensic Verification**: Instant classification into **Real**, **Fake**, or **Unverified** with a 0–100 Credibility Score and automated Risk Level stratification (`Low`, `Medium`, `High`, `Critical`).
- **🔍 Explainable Token-Level Attention**: Color-coded salience highlighting distinguishing corroborating factual tokens from deceptive, emotionally loaded trigger words.
- **📊 6-Dimensional Deception Forensics**:
  - **Sensationalism Index** (Clickbait & hyperbole detection)
  - **Emotional Arousal** (Linguistic sentiment intensity)
  - **Subjectivity Ratio** (Fact vs. opinion separation)
  - **AI Synthetic Probability** (Automated content marker identification)
  - **Bias Leaning Spectrum** (Left, Center, Right, Unbiased)
  - **Logical Fallacy Tagging** (Ad Hominem, Straw Man, False Equivalence, etc.)
- **🛡️ Resilient Dual-Engine Inference**:
  - **Cloud Primary**: Gemini Flash models (`gemini-3.1-flash-lite`, `gemini-flash-latest`, `gemini-3.7-flash`) with automatic fast retries and backoff.
  - **Local Heuristics Fallback**: Client-side Deep-Learning NLP heuristics engine (`dlnlpEngine.ts`) guaranteeing 100% uptime even in offline or rate-limited environments.
- **📄 Cryptographic PDF Dossier Generation**: Vectorized, printable forensic fact-checking reports powered by `jsPDF` complete with developer attribution, timestamped audit seals, and unique SHA-256 verification signatures.

---

## 📐 System Architecture & Dataflow

### High-Level Architecture Diagram

```
                              ┌────────────────────────────────────────┐
                              │           USER / WEB CLIENT            │
                              │    (React 19 + TypeScript + Motion)    │
                              └───────────────────┬────────────────────┘
                                                  │
                                   HTTP POST /api/verify
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │         EXPRESS API MIDDLEWARE         │
                              │       (Node.js ESM + Rate-Limit)       │
                              └───────────────────┬────────────────────┘
                                                  │
                         ┌────────────────────────┴────────────────────────┐
                         │                                                 │
                         ▼                                                 ▼
        ┌──────────────────────────────────┐             ┌──────────────────────────────────┐
        │       PRIMARY CLOUD ENGINE       │             │       LOCAL NEURAL HEURISTIC     │
        │      Google Gen AI (Gemini)      │   FAILOVER  │           FALLBACK ENGINE        │
        │  Structured JSON Forensic Schema │ ──────────> │   Lexical, Salience & Fallacy    │
        │  Multi-Model Automatic Retries   │             │          Classification          │
        └────────────────┬─────────────────┘             └────────────────┬─────────────────┘
                         │                                                 │
                         └────────────────────────┬────────────────────────┘
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │       FORENSIC SYNTHESIS LAYER         │
                              │   • Credibility Score (0 - 100%)       │
                              │   • Token Salience Heatmap Calculation │
                              │   • SHA-256 Hash Signature Stamp       │
                              │   • jsPDF Vector Report Generator      │
                              └────────────────────────────────────────┘
```

### Verification Pipeline Sequence

```
User Input ──> Text Preprocessing ──> Tokenization & Entity Extraction
                     │
                     ├──> Cloud Inference (Gemini API) ──[Success]──> Structured Verdict
                     │          │
                     │       [503 / 429 Failover]
                     │          ▼
                     └──> DL-NLP Heuristic Analyzer ───────────────> Local Verdict
                                                                            │
                                                                            ▼
                                                     Compute Salience & Confidence Weights
                                                                            │
                                                                            ▼
                                                       Render Live UI + Export PDF Dossier
```

---

## 💻 Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript | Type-safe declarative UI components |
| **Styling & Layout** | Tailwind CSS v4 | Responsive high-contrast design system |
| **Server & API** | Express.js 4.21 + Node.js | Microservice API proxy & static delivery |
| **AI Inference** | `@google/genai` (Gemini API) | Deep semantic claim analysis & reasoning |
| **Local NLP Engine** | Custom DL-NLP Heuristics | Zero-downtime offline fallback pipeline |
| **Report Generation**| `jsPDF` v4 | Vectorized client-side PDF fact-checking reports |
| **Icons & Visuals** | `lucide-react` | Clean, accessible iconography |
| **Build Tooling** | Vite 6 + `esbuild` + `tsx` | Instant HMR development and CJS production bundling |

---

## 🚀 Installation & How to Run

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher (comes bundled with Node.js)
- **Git**: ([Download Git](https://git-scm.com/))
- *(Optional)* A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

---

### 2. Clone the Repository

```bash
# Clone the repository via HTTPS
git clone https://github.com/Sanjaymo/TruthLens-AI_Fake_News-_Detection.git

# Navigate into the project root directory
cd TruthLens-AI_Fake_News-_Detection
```

---

### 3. Install Dependencies

```bash
# Install all required npm packages
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy example configuration if available, or create directly:
touch .env
```

Add your Google Gemini API Key to `.env`:

```env
# Google Gemini API Key for server-side AI analysis
GEMINI_API_KEY=your_gemini_api_key_here
```

> 💡 *Note: If no API key is provided, TruthLens will automatically and seamlessly utilize its built-in local Deep Learning NLP Heuristics engine without crashing.*

---

### 5. Launch Development Server

```bash
# Starts both the Express backend and Vite frontend
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

### 6. Production Build & Deployment

To compile the application for production deployment:

```bash
# Build the Vite frontend and bundle the backend with esbuild
npm run build

# Start the optimized production server
npm start
```

---

## 📁 Project Directory Structure

```
truthlens/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                # Top navigation & tab switcher
│   │   ├── HomeView.tsx              # Landing interface & quick verification
│   │   ├── VerifierView.tsx          # Real-time text & URL claim analyzer
│   │   ├── HistoryLogView.tsx        # Searchable logs & audit trails
│   │   ├── AnalyticsView.tsx         # Aggregate metrics & risk distributions
│   │   └── DeveloperProfileView.tsx  # Developer credentials & dossier hub
│   ├── data/
│   │   └── defaultData.ts            # Seeded demo claims & initial state
│   ├── services/
│   │   └── dlnlpEngine.ts            # Offline Deep-Learning NLP fallback engine
│   ├── utils/
│   │   ├── pdfGenerator.ts           # Fact-check forensic report PDF builder
│   │   └── projectReportPdf.ts       # Developer & Project Dossier PDF generator
│   ├── types.ts                      # Shared TypeScript data models
│   ├── App.tsx                       # Primary state router & controller
│   ├── main.tsx                      # React DOM entry point
│   └── index.css                     # Global styles & Tailwind v4 imports
├── server.ts                         # Express server with Gemini API integration
├── metadata.json                     # Application manifest & capabilities
├── package.json                      # Dependencies and scripts
├── vite.config.ts                    # Vite configuration
└── README.md                         # Comprehensive documentation
```

---

## 📑 Forensic PDF Dossier & Export Engine

TruthLens generates two types of tamper-evident PDF reports using vector graphics:

1. **Claim Fact-Check Dossier (`pdfGenerator.ts`)**:
   - Executive verdict stamp (Real vs. Fake)
   - Trust and risk score progress bars
   - Token attention heatmap breakdown
   - Linguistic dimension metrics (Sensationalism, Subjectivity, AI Probability)
   - SHA-256 Verification seal & Developer attribution footer
2. **Comprehensive Project Dossier (`projectReportPdf.ts`)**:
   - Creator academic background and contact credentials
   - Architectural specifications & dual-engine failover documentation
   - Technology stack breakdown

---

## 👨‍💻 Author & Lead Developer

<div align="center">

### Sanjay Choudhari
**Parul University**

[![Email](https://img.shields.io/badge/Email-2303031240034%40paruluniversity.ac.in-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:2303031240034@paruluniversity.ac.in)
[![Phone](https://img.shields.io/badge/Phone-+91_9963785768-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:+919963785768)
[![GitHub](https://img.shields.io/badge/GitHub-Sanjaymo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sanjaymo)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sanjaychoudhari09-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sanjaychoudhari09)

</div>

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute for academic and professional applications.

---

<div align="center">
  <sub>Built with ❤️ and precision by <b>Sanjay Choudhari</b> • Parul University • 2026</sub>
</div>

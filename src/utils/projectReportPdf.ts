import jsPDF from "jspdf";

export interface ProjectReportData {
  developerName: string;
  phone: string;
  phoneRaw?: string;
  email: string;
  github: string;
  githubUsername?: string;
  linkedin: string;
  linkedinUsername?: string;
  institution: string;
  projectTitle: string;
  version: string;
  releaseDate: string;
}

export const DEVELOPER_PROFILE: ProjectReportData = {
  developerName: "Sanjay Choudhari",
  phone: "+91 9963785768",
  phoneRaw: "9963785768",
  email: "2303031240034@paruluniversity.ac.in",
  github: "https://github.com/Sanjaymo",
  githubUsername: "github.com/Sanjaymo",
  linkedin: "https://linkedin.com/in/sanjaychoudhari09",
  linkedinUsername: "linkedin.com/in/sanjaychoudhari09",
  institution: "Parul University",
  projectTitle: "TruthLens — AI Fact-Checking & Misinformation Detection Engine",
  version: "v3.0.0-Stable",
  releaseDate: "2026-08-28",
} as any;

/**
 * Generates an official, comprehensive Multi-Page Technical Project & Developer Dossier PDF Report.
 */
export function generateProjectDossierPDF(): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  // --- PAGE 1: TITLE & EXECUTIVE DEVELOPER SUMMARY ---
  // Top Modern Dark Header
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("TruthLens — Official Project Dossier", margin, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("AI Fact-Checking, Deception Forensic Analysis & Neural Verification Engine", margin, 23);

  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text("SYSTEM ARCHITECTURE & CREATOR DOSSIER", pageWidth - margin, 15, { align: "right" });
  doc.text("Release: v3.0.0-Stable • 2026", pageWidth - margin, 22, { align: "right" });

  y = 40;

  // 1. Lead Developer & Creator Information Card
  doc.setFillColor(241, 245, 249); // slate-100
  doc.setDrawColor(99, 102, 241); // indigo-500
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, contentWidth, 54, 3, 3, "FD");

  // Accent Tag
  doc.setFillColor(99, 102, 241);
  doc.rect(margin + 5, y + 5, 34, 5.5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("LEAD DEVELOPER", margin + 7, y + 9);

  // Name & Title
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(DEVELOPER_PROFILE.developerName, margin + 5, y + 19);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Lead Software Architect & AI Systems Developer • ${DEVELOPER_PROFILE.institution}`, margin + 5, y + 25);

  // 2-Column Developer Details Table
  const col1X = margin + 5;
  const col2X = margin + (contentWidth / 2) + 2;
  const row1Y = y + 34;
  const row2Y = y + 43;

  doc.setFontSize(8.5);

  // Phone
  doc.setFont("helvetica", "bold");
  doc.setTextColor(51, 65, 85);
  doc.text("Phone / Mobile:", col1X, row1Y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(99, 102, 241);
  doc.text(DEVELOPER_PROFILE.phone, col1X + 25, row1Y);

  // Email
  doc.setFont("helvetica", "bold");
  doc.setTextColor(51, 65, 85);
  doc.text("Email ID:", col1X, row2Y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(DEVELOPER_PROFILE.email, col1X + 18, row2Y);

  // GitHub
  doc.setFont("helvetica", "bold");
  doc.setTextColor(51, 65, 85);
  doc.text("GitHub:", col2X, row1Y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(99, 102, 241);
  doc.text(DEVELOPER_PROFILE.githubUsername, col2X + 15, row1Y);

  // LinkedIn
  doc.setFont("helvetica", "bold");
  doc.setTextColor(51, 65, 85);
  doc.text("LinkedIn:", col2X, row2Y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(99, 102, 241);
  doc.text(DEVELOPER_PROFILE.linkedinUsername, col2X + 16, row2Y);

  y += 62;

  // 2. Project Executive Overview
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.text("PROJECT OVERVIEW & CORE OBJECTIVES", margin, y);
  y += 5;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const overviewText = [
    "TruthLens is an enterprise-grade misinformation detection and fact-verification platform engineered by Sanjay Choudhari. The application employs multi-stage neural natural language processing to dissect complex news articles, claims, and social media narratives, categorizing them into verifiable authentic news (Real), fabricated disinformation (Fake), or unverified reports.",
    "The system combines state-of-the-art Generative AI with a resilient client-side neural NLP fallback engine, ensuring uninterrupted zero-downtime forensic analysis, attention token heatmaps, linguistic sensationalism indices, and instant cryptographic hash tracking."
  ];
  const splitOverview = doc.splitTextToSize(overviewText.join("\n\n"), contentWidth - 8);
  doc.text(splitOverview, margin + 4, y + 6);

  y += 40;

  // 3. Technical Core Capabilities & Modules
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.text("CORE SYSTEM MODULES & ARCHITECTURE", margin, y);
  y += 5;

  const modules = [
    {
      title: "1. Real-Time Forensic Verifier",
      desc: "Instant binary and granular verdict classification (Real vs Fake) with multi-token attention weighting, claim extraction, and trust score computation.",
    },
    {
      title: "2. Dual-Engine Resilient Pipeline",
      desc: "Full-stack cloud Gemini AI multi-model failover paired seamlessly with an offline DL-NLP heuristics engine for zero-failure reliability.",
    },
    {
      title: "3. Linguistic & Deception Analytics",
      desc: "Evaluates sensationalism, emotional arousal, subjective opinion loading, political bias spectrum, and synthetic AI-generated content probability.",
    },
    {
      title: "4. History Logging & Audit Trails",
      desc: "Persistent verification logs with search, multi-verdict filters, starred bookmarks, SHA-256 cryptographic hashes, and 1-click forensic PDF exports.",
    },
  ];

  modules.forEach((mod) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(99, 102, 241);
    doc.text(mod.title, margin + 4, y + 5.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(71, 85, 105);
    doc.text(mod.desc, margin + 4, y + 10.5);

    y += 16.5;
  });

  y += 4;

  // 4. Technology Stack Summary Table
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("TECHNICAL SPECIFICATIONS & STACK", margin, y);
  y += 5;

  const techWidth = (contentWidth - 6) / 3;

  // Box 1: Frontend
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, techWidth, 22, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("Frontend / UI", margin + 4, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("• React 18 & TypeScript\n• Tailwind CSS Styling\n• Lucide Icons & Canvas", margin + 4, y + 10.5);

  // Box 2: Backend
  doc.roundedRect(margin + techWidth + 3, y, techWidth, 22, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("Backend & APIs", margin + techWidth + 7, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("• Express & Node.js ESM\n• Google Gen AI SDK\n• Structured JSON Schema", margin + techWidth + 7, y + 10.5);

  // Box 3: Verification
  doc.roundedRect(margin + (techWidth + 3) * 2, y, techWidth, 22, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("Forensics & Security", margin + (techWidth + 3) * 2 + 4, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("• jsPDF Engine v4\n• SHA-256 Hash Seals\n• Client LocalStorage Cache", margin + (techWidth + 3) * 2 + 4, y + 10.5);

  // Page 1 Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `TruthLens Project Report • Developer: Sanjay Choudhari • ${DEVELOPER_PROFILE.email}`,
    margin,
    pageHeight - 9
  );
  doc.text("Page 1 of 1 • Official Verified Dossier", pageWidth - margin, pageHeight - 9, {
    align: "right",
  });

  // Save the PDF
  const filename = `TruthLens_Project_Report_Sanjay_Choudhari.pdf`;
  doc.save(filename);
}

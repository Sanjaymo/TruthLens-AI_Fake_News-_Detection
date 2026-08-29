import jsPDF from "jspdf";
import { VerificationResult } from "../types";

/**
 * Generates and triggers download of a comprehensive, professional
 * TruthLens Fact-Checking Forensic PDF Report.
 */
export function generateTruthLensPDF(result: VerificationResult): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  const isReal =
    result.verdict === "AUTHENTIC" ||
    result.verdict === "MOSTLY_ACCURATE" ||
    result.credibilityScore >= 65;
  const isFake =
    result.verdict === "FABRICATED_OR_FAKE" ||
    result.verdict === "MISLEADING_OR_BIASED" ||
    result.credibilityScore < 45;

  // 1. Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, "F");

  // TruthLens Logo & Brand
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("TruthLens", margin, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("AI Misinformation & Fact-Checking Forensic Dossier", margin, 21);

  // Document Timestamp & ID on right
  doc.setFontSize(8);
  doc.text(`Report ID: ${result.id}`, pageWidth - margin, 12, { align: "right" });
  doc.text(
    `Date: ${new Date(result.timestamp).toLocaleDateString()} ${new Date(
      result.timestamp
    ).toLocaleTimeString()}`,
    pageWidth - margin,
    18,
    { align: "right" }
  );
  doc.text(`Hash: ${result.hashSignature || "0x7b4a8e29f1"}`, pageWidth - margin, 24, {
    align: "right",
  });

  y = 36;

  // 2. Verdict & Integrity Card Banner
  if (isReal) {
    doc.setFillColor(236, 253, 245); // emerald-50
    doc.setDrawColor(16, 185, 129); // emerald-500
    doc.rect(margin, y, contentWidth, 24, "FD");

    doc.setTextColor(6, 95, 70); // emerald-800
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("VERDICT: REAL & AUTHENTIC NEWS", margin + 6, y + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(4, 120, 87);
    doc.text("Claims in this article align with verified factual records and reputable sources.", margin + 6, y + 17);

    // Score on right
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(5, 150, 105);
    doc.text(`${result.credibilityScore}%`, pageWidth - margin - 8, y + 13, { align: "right" });
    doc.setFontSize(8);
    doc.text("TRUST SCORE", pageWidth - margin - 8, y + 19, { align: "right" });
  } else if (isFake) {
    doc.setFillColor(254, 242, 242); // rose-50
    doc.setDrawColor(239, 68, 68); // red-500
    doc.rect(margin, y, contentWidth, 24, "FD");

    doc.setTextColor(153, 27, 27); // red-800
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("VERDICT: FAKE / MISLEADING CONTENT", margin + 6, y + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(185, 28, 28);
    doc.text("Warning: Contains fabricated claims, deceptive rhetoric, or unsubstantiated data.", margin + 6, y + 17);

    // Score on right
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(220, 38, 38);
    doc.text(`${result.credibilityScore}%`, pageWidth - margin - 8, y + 13, { align: "right" });
    doc.setFontSize(8);
    doc.text("TRUST SCORE", pageWidth - margin - 8, y + 19, { align: "right" });
  } else {
    doc.setFillColor(254, 243, 199); // amber-50
    doc.setDrawColor(245, 158, 11); // amber-500
    doc.rect(margin, y, contentWidth, 24, "FD");

    doc.setTextColor(146, 64, 14); // amber-800
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("VERDICT: UNVERIFIED / MIXED CLAIMS", margin + 6, y + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(180, 83, 9);
    doc.text("Contains disputed assertions or insufficient verifiable evidence.", margin + 6, y + 17);

    // Score on right
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(217, 119, 6);
    doc.text(`${result.credibilityScore}%`, pageWidth - margin - 8, y + 13, { align: "right" });
    doc.setFontSize(8);
    doc.text("TRUST SCORE", pageWidth - margin - 8, y + 19, { align: "right" });
  }

  y += 30;

  // 3. Article Under Investigation
  doc.setTextColor(30, 41, 59); // slate-800
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("ARTICLE TEXT UNDER INVESTIGATION", margin, y);
  y += 5;

  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  const sampleExcerpt = result.fullText || result.textSnippet || result.title;
  const wrappedArticleLines = doc.splitTextToSize(
    sampleExcerpt.length > 500 ? sampleExcerpt.slice(0, 500) + "..." : sampleExcerpt,
    contentWidth - 8
  );
  const articleBoxHeight = Math.min(wrappedArticleLines.length * 4.5 + 8, 38);
  doc.rect(margin, y, contentWidth, articleBoxHeight, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(wrappedArticleLines.slice(0, 6), margin + 4, y + 6);

  y += articleBoxHeight + 8;

  // 4. Executive Summary
  doc.setTextColor(30, 41, 59);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("EXECUTIVE FORENSIC SUMMARY", margin, y);
  y += 5;

  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  const wrappedSummary = doc.splitTextToSize(result.summary, contentWidth - 8);
  const summaryBoxHeight = wrappedSummary.length * 4.5 + 8;
  doc.rect(margin, y, contentWidth, summaryBoxHeight, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(wrappedSummary, margin + 4, y + 6);

  y += summaryBoxHeight + 8;

  // 5. Key Claims Analysis Table
  if (result.keyClaims && result.keyClaims.length > 0) {
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`KEY CLAIMS FACT-CHECK BREAKDOWN (${result.keyClaims.length})`, margin, y);
    y += 5;

    result.keyClaims.slice(0, 4).forEach((claim) => {
      if (y > 255) {
        doc.addPage();
        y = 20;
      }

      const isClaimVerified = claim.status === "VERIFIED";
      const isClaimDebunked = claim.status === "DEBUNKED";

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, y, contentWidth, 16, "FD");

      // Status Pill
      if (isClaimVerified) {
        doc.setFillColor(16, 185, 129);
        doc.rect(margin + 3, y + 3, 22, 5, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.text("REAL / TRUE", margin + 5, y + 6.8);
      } else if (isClaimDebunked) {
        doc.setFillColor(239, 68, 68);
        doc.rect(margin + 3, y + 3, 22, 5, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.text("FAKE / FALSE", margin + 5, y + 6.8);
      } else {
        doc.setFillColor(245, 158, 11);
        doc.rect(margin + 3, y + 3, 22, 5, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.text("UNVERIFIED", margin + 5, y + 6.8);
      }

      // Claim text
      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      const shortClaim = claim.claim.length > 85 ? claim.claim.slice(0, 85) + "..." : claim.claim;
      doc.text(shortClaim, margin + 28, y + 6.8);

      // Explanation
      doc.setTextColor(100, 116, 139);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      const shortExpl =
        claim.explanation.length > 115 ? claim.explanation.slice(0, 115) + "..." : claim.explanation;
      doc.text(shortExpl, margin + 5, y + 12);

      y += 18;
    });
  }

  // 6. Linguistic & Bias Metrics
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  doc.setTextColor(30, 41, 59);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("LINGUISTIC & FORENSIC METRICS", margin, y);
  y += 5;

  const colWidth = (contentWidth - 6) / 3;

  // Metric 1: Sensationalism
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, colWidth, 18, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Sensationalism", margin + 4, y + 6);
  doc.setFontSize(12);
  doc.setTextColor(
    (result.linguisticMarkers?.sensationalismScore || 0) > 50 ? 220 : 16,
    (result.linguisticMarkers?.sensationalismScore || 0) > 50 ? 38 : 185,
    (result.linguisticMarkers?.sensationalismScore || 0) > 50 ? 38 : 129
  );
  doc.text(`${result.linguisticMarkers?.sensationalismScore || 0}%`, margin + 4, y + 14);

  // Metric 2: Subjectivity
  doc.setFillColor(248, 250, 252);
  doc.rect(margin + colWidth + 3, y, colWidth, 18, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Subjectivity / Opinion", margin + colWidth + 7, y + 6);
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  doc.text(`${result.linguisticMarkers?.subjectivityIndex || 0}%`, margin + colWidth + 7, y + 14);

  // Metric 3: AI Synthetic Likelihood
  doc.setFillColor(248, 250, 252);
  doc.rect(margin + (colWidth + 3) * 2, y, colWidth, 18, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Synthetic AI Score", margin + (colWidth + 3) * 2 + 4, y + 6);
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  doc.text(`${result.linguisticMarkers?.syntheticTextScore || 0}%`, margin + (colWidth + 3) * 2 + 4, y + 14);

  y += 24;

  // 7. Footer Seal & Disclaimer (with Developer Sanjay Choudhari attribution)
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, 276, pageWidth - margin, 276);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("TruthLens AI Fact-Checking Engine • Developed by Sanjay Choudhari", margin, 281);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text("Email: 2303031240034@paruluniversity.ac.in • Mob: +91 9963785768 • github.com/Sanjaymo", margin, 286);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(`Verification Hash: ${result.hashSignature || "0x8fa3b48"}`, pageWidth - margin, 281, {
    align: "right",
  });
  doc.text("Page 1 of 1 • Parul University", pageWidth - margin, 286, {
    align: "right",
  });

  // Save the document
  const filename = `TruthLens_Verification_${result.id.slice(0, 10)}_${isReal ? "REAL" : isFake ? "FAKE" : "REPORT"}.pdf`;
  doc.save(filename);
}

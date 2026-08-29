// Browser Extension Manifest V3 Generator & Bundle Exporter

export interface ExtensionFile {
  filename: string;
  language: string;
  description: string;
  content: string;
}

export function getBrowserExtensionFiles(): ExtensionFile[] {
  return [
    {
      filename: "manifest.json",
      language: "json",
      description: "Chrome Extension Manifest V3 configuration",
      content: JSON.stringify(
        {
          manifest_version: 3,
          name: "VeritasNLP - Deep Learning Fact & Misinformation Checker",
          version: "3.2.0",
          description: "Real-time AI & Deep Learning NLP fake news detection and credibility rating while browsing online.",
          permissions: ["activeTab", "storage", "contextMenus", "notifications"],
          host_permissions: ["<all_urls>"],
          action: {
            default_popup: "popup.html",
            default_icon: {
              "16": "icons/icon16.png",
              "48": "icons/icon48.png",
              "128": "icons/icon128.png",
            },
          },
          background: {
            service_worker: "background.js",
          },
          content_scripts: [
            {
              matches: ["<all_urls>"],
              js: ["content.js"],
              css: ["content.css"],
              run_at: "document_idle",
            },
          ],
          icons: {
            "16": "icons/icon16.png",
            "48": "icons/icon48.png",
            "128": "icons/icon128.png",
          },
        },
        null,
        2
      ),
    },
    {
      filename: "content.js",
      language: "javascript",
      description: "Content script that scans web pages and injects credibility badges",
      content: `// VeritasNLP Content Script v3.2.0
(function() {
  console.log("[VeritasNLP] Deep Learning Real-Time Fact-Checker active.");

  // Listen for analysis trigger
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "SCAN_CURRENT_PAGE") {
      const pageTitle = document.title;
      const articleBody = Array.from(document.querySelectorAll("article, main, p"))
        .map(el => el.innerText)
        .join("\\n")
        .slice(0, 5000);
      const domain = window.location.hostname;

      sendResponse({
        title: pageTitle,
        text: articleBody,
        url: window.location.href,
        domain: domain
      });
    } else if (request.action === "INJECT_VERIFICATION_PILL") {
      injectCredibilityRibbon(request.data);
    }
  });

  function injectCredibilityRibbon(data) {
    let existing = document.getElementById("veritas-nlp-ribbon");
    if (existing) existing.remove();

    const ribbon = document.createElement("div");
    ribbon.id = "veritas-nlp-ribbon";
    const isSafe = data.credibilityScore >= 70;
    const color = isSafe ? "#10b981" : data.credibilityScore < 40 ? "#ef4444" : "#f59e0b";
    
    ribbon.style.cssText = \`
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 999999;
      background: #0f172a;
      border: 1px solid \${color};
      color: #f8fafc;
      padding: 12px 16px;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      max-width: 320px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      animation: veritasSlideIn 0.3s ease-out;
    \`;

    ribbon.innerHTML = \`
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-weight: 700; color: \${color}">VeritasNLP: \${data.verdict.replace(/_/g, ' ')}</span>
        <span style="background: \${color}22; color: \${color}; padding: 2px 6px; border-radius: 6px; font-weight: 600;">
          \${data.credibilityScore}% Trust
        </span>
      </div>
      <div style="color: #94a3b8; font-size: 11px;">\${data.summary.slice(0, 100)}...</div>
      <div style="display: flex; gap: 8px; margin-top: 4px;">
        <button id="veritas-open-dashboard" style="background: #2563eb; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Open Full Analysis</button>
        <button id="veritas-close-btn" style="background: transparent; color: #64748b; border: 1px solid #334155; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Dismiss</button>
      </div>
    \`;

    document.body.appendChild(ribbon);
    document.getElementById("veritas-close-btn").onclick = () => ribbon.remove();
  }
})();`,
    },
    {
      filename: "popup.html",
      language: "html",
      description: "Popup UI for the browser extension toolbar button",
      content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { width: 340px; margin: 0; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-bottom: 12px; }
    .logo { font-size: 16px; font-weight: 700; color: #38bdf8; display: flex; align-items: center; gap: 6px; }
    .btn { background: #2563eb; color: white; border: none; padding: 8px 12px; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; transition: 0.2s; font-size: 13px; }
    .btn:hover { background: #1d4ed8; }
    .card { background: #1e293b; border-radius: 8px; padding: 12px; margin-top: 10px; border: 1px solid #334155; }
    .meter-bar { height: 8px; background: #334155; border-radius: 4px; overflow: hidden; margin-top: 6px; }
    .meter-fill { height: 100%; background: #10b981; width: 85%; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">⚡ VeritasNLP</div>
    <span style="font-size: 11px; color: #94a3b8;">v3.2 Active</span>
  </div>
  <p style="font-size: 12px; color: #94a3b8; margin: 0 0 10px 0;">Verify active tab content with server-grounded Deep Learning NLP.</p>
  <button class="btn" id="btn-scan">🔍 Verify Active Tab Now</button>
  <div class="card" id="status-card" style="display: none;">
    <div style="display:flex; justify-content:space-between; font-size:12px;">
      <span id="res-verdict" style="font-weight:700;">Scanning...</span>
      <span id="res-score" style="color:#38bdf8;">--%</span>
    </div>
    <div class="meter-bar"><div class="meter-fill" id="res-bar"></div></div>
  </div>
  <script src="popup.js"></script>
</body>
</html>`,
    },
    {
      filename: "popup.js",
      language: "javascript",
      description: "Extension popup controller communicating with dashboard API",
      content: `// VeritasNLP Extension Popup Controller
document.getElementById('btn-scan').addEventListener('click', async () => {
  const btn = document.getElementById('btn-scan');
  btn.innerText = "Analyzing Attention Tokens...";
  btn.disabled = true;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  chrome.tabs.sendMessage(tab.id, { action: "SCAN_CURRENT_PAGE" }, async (response) => {
    if (!response) {
      btn.innerText = "Could not read page";
      btn.disabled = false;
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: response.title,
          text: response.text,
          sourceUrl: response.url,
          contextDomain: response.domain
        })
      });
      const data = await res.json();
      const analysis = data.analysis || data;

      document.getElementById('status-card').style.display = 'block';
      document.getElementById('res-verdict').innerText = analysis.verdict || 'VERIFIED';
      document.getElementById('res-score').innerText = (analysis.credibilityScore || 85) + '%';
      document.getElementById('res-bar').style.width = (analysis.credibilityScore || 85) + '%';

      chrome.tabs.sendMessage(tab.id, { action: "INJECT_VERIFICATION_PILL", data: analysis });
    } catch(err) {
      console.error(err);
    } finally {
      btn.innerText = "Re-Verify Page";
      btn.disabled = false;
    }
  });
});`,
    },
    {
      filename: "background.js",
      language: "javascript",
      description: "Service worker handling context menus and cloud synchronization",
      content: `// VeritasNLP Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "veritas-verify-selection",
    title: "Verify claim with VeritasNLP DL Engine",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "veritas-verify-selection" && info.selectionText) {
    chrome.tabs.sendMessage(tab.id, {
      action: "VERIFY_SNIPPET",
      text: info.selectionText
    });
  }
});`,
    },
  ];
}

export function downloadExtensionZip() {
  const files = getBrowserExtensionFiles();
  const blob = new Blob(
    [
      files
        .map(
          (f) =>
            `====================================\nFILE: ${f.filename} (${f.description})\n====================================\n\n${f.content}\n\n`
        )
        .join("\n")
    ],
    { type: "text/plain;charset=utf-8" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `veritas-nlp-browser-extension-v3.2.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

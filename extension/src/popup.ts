import { API_BASE } from "./config";

const $ = (id: string) => document.getElementById(id)!;

async function getToken(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get("authToken", (result) => {
      resolve(result.authToken ?? null);
    });
  });
}

async function getCurrentTab(): Promise<chrome.tabs.Tab | null> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab ?? null;
}

function showMessage(text: string, type: "success" | "error" | "info") {
  const el = $("message");
  el.textContent = text;
  el.className = `message ${type}`;
  el.style.display = "block";
}

function setStatus(state: "online" | "offline" | "loading") {
  const dot = $("status-dot");
  dot.className = `status-dot ${state === "online" ? "" : state}`;
}

async function init() {
  const token = await getToken();
  const tab = await getCurrentTab();

  if (!token) {
    setStatus("offline");
    $("not-logged-in").style.display = "block";
    $("logged-in").style.display = "none";
    $("link-signout").style.display = "none";
    return;
  }

  setStatus("online");
  $("not-logged-in").style.display = "none";
  $("logged-in").style.display = "block";

  if (tab) {
    const url = tab.url ?? "";
    const title = tab.title ?? url;
    ($("page-url") as HTMLElement).textContent = new URL(url).hostname;
    ($("page-title") as HTMLElement).textContent = title;
  }
}

async function saveDocument() {
  const btn = $("btn-save") as HTMLButtonElement;
  const token = await getToken();
  const tab = await getCurrentTab();

  if (!token || !tab?.id) return;

  btn.disabled = true;
  btn.textContent = "Extracting...";
  showMessage("Reading page content...", "info");

  try {
    // Ask content script to extract the text
    const response = await chrome.tabs.sendMessage(tab.id, { type: "EXTRACT_TEXT" });

    if (!response?.text || response.text.length < 200) {
      showMessage("Couldn't find T&C text on this page. Try selecting the text manually.", "error");
      return;
    }

    btn.textContent = "Saving...";

    const res = await fetch(`${API_BASE}/api/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: tab.url,
        title: tab.title,
        text: response.text,
        wordCount: response.wordCount,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? `HTTP ${res.status}`);
    }

    showMessage("Saved! View it in your archive.", "success");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    showMessage(`Failed to save: ${msg}`, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Save this T&C";
  }
}

function openDashboard() {
  chrome.tabs.create({ url: `${API_BASE}/dashboard` });
}

function openLogin() {
  const extId = chrome.runtime.id;
  chrome.tabs.create({ url: `${API_BASE}/login?from=extension&ext=${extId}` });
}

async function signOut() {
  await chrome.storage.local.remove("authToken");
  window.location.reload();
}

// Wire up events
document.addEventListener("DOMContentLoaded", () => {
  init();

  $("btn-save").addEventListener("click", saveDocument);
  $("btn-dashboard").addEventListener("click", openDashboard);
  $("btn-login").addEventListener("click", openLogin);
  $("link-dashboard").addEventListener("click", (e) => { e.preventDefault(); openDashboard(); });
  $("link-signout").addEventListener("click", (e) => { e.preventDefault(); signOut(); });
});

import { Readability } from "@mozilla/readability";

function extractText(): { text: string; wordCount: number } {
  // Clone the document so Readability doesn't mutate the live DOM
  const documentClone = document.cloneNode(true) as Document;
  const reader = new Readability(documentClone);
  const article = reader.parse();

  let text = "";

  if (article?.textContent && article.textContent.trim().length > 300) {
    text = article.textContent.trim();
  } else {
    // Fallback: find the longest block of text on the page
    text = longestTextBlock();
  }

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return { text, wordCount };
}

function longestTextBlock(): string {
  // Walk all block-level elements and return the one with the most text
  const candidates = document.querySelectorAll(
    "article, main, [class*='terms'], [class*='policy'], [class*='legal'], [class*='content'], section, div"
  );

  let best = "";
  for (const el of candidates) {
    const text = (el as HTMLElement).innerText ?? "";
    if (text.length > best.length) {
      best = text;
    }
  }

  // Last resort: body text
  if (best.length < 500) {
    best = document.body.innerText ?? "";
  }

  return best.trim();
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "EXTRACT_TEXT") {
    try {
      const result = extractText();
      sendResponse(result);
    } catch (err) {
      sendResponse({ text: "", wordCount: 0, error: String(err) });
    }
    return true; // keep channel open for async response
  }
});

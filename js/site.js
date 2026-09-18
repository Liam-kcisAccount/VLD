/* ============================================================
   Small fetch-and-render helpers.
   Every page fetches its own /content/*.json file at load time
   and renders it into the page. Editing content = editing that
   JSON file through the /admin CMS, which commits the change and
   Netlify rebuilds automatically. No build step, no framework.
   ============================================================ */

async function loadJSON(path) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.error("Could not load", path, err);
    return null;
  }
}

function escapeHTML(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Renders \n\n paragraph breaks in freeform text fields as <p> tags.
function paragraphs(text) {
  if (!text) return "";
  return escapeHTML(text)
    .split(/\n\s*\n/)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function emptyState(msg) {
  return `<div class="empty-state">${escapeHTML(msg)}</div>`;
}

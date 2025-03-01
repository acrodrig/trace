export const LEGEND = `
  <div class="trace-bar" trace="">
    <span style="color: var(--trace-blocks);">Blocks</span> /
    <span style="color: var(--trace-heading);">Headings</span> /
    <span style="color: var(--trace-inline);">Inline</span> /
    <span style="color: var(--trace-image);">Image</span> /
    <span style="color: var(--trace-object);">Canvas &amp; Video</span>
  </div>`;

const NS = (location?.pathname ?? "") + "/";

// On document load init script
addEventListener("domcontentloaded", () => {
  const link = document.head.appendChild(document.createElement("link"));
  link.setAttribute("href", new URL("trace.css", import.meta.url).href);
  const legend = document.body.appendChild(document.createElement("div"));
  legend.outerHTML = LEGEND;
});

// Listener for dblclick (tracer)
addEventListener("dblclick", () => {
  localStorage.setItem(NS + "trace", document.body.toggleAttribute("trace").toString());
});

// Listener for click + ⌘ + ⇧ (advanced)
addEventListener("click", (ev) => {
  if (!ev.metaKey || !ev.shiftKey) return;
  localStorage.setItem(NS + "advanced", document.body.toggleAttribute("advanced").toString());
  return ev.preventDefault();
});

// Set advanced and trace to the current value in localStorage
if (localStorage.getItem(NS + "trace") && typeof document !== "undefined") document.body.setAttribute("trace", "true");
if (localStorage.getItem(NS + "advanced") && typeof document !== "undefined") document.body.setAttribute("advanced", "true");

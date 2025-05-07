// The actual CSS will be loaded into this variable
const CSS = `/* CSS */`;

// An HTML snippet
const LEGEND = `
  <div class="trace-bar" trace="">
    <span style="color: var(--trace-blocks);">Blocks</span> /
    <span style="color: var(--trace-heading);">Headings</span> /
    <span style="color: var(--trace-inline);">Inline</span> /
    <span style="color: var(--trace-image);">Image</span> /
    <span style="color: var(--trace-object);">Canvas &amp; Video</span>
  </div>`;

const NS = (location?.pathname ?? "") + "/";
const DEBUG = location?.hash?.toLowerCase() === "#debug";

export function init() {
  if (DEBUG) console.debug("trace: init");
  if (typeof document === "undefined") return;
  if (localStorage.getItem(NS + "advanced")) document.body.setAttribute("trace", "true");
  if (localStorage.getItem(NS + "advanced")) document.body.setAttribute("advanced", "true");
}

function addLink() {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", new URL("trace.css", import.meta.url).href);
  if (DEBUG) console.debug("trace: addLink", link.href);
  return link;
}

function addStyle() {
  const style = document.createElement("style");
  style.textContent = CSS;
  if (DEBUG) console.debug("trace: addStyle");
  return style;
}

// On document load init script
addEventListener("DOMContentLoaded", () => {
  document.head.appendChild(CSS === "/* CSS */" ? addLink() : addStyle());
  if (DEBUG) console.debug("trace: DOMContentLoaded", CSS === "/* CSS */" ? "addLink" : "addStyle");
  const legend = document.body.appendChild(document.createElement("div"));
  legend.outerHTML = LEGEND;
});

// Listener for dblclick (tracer)
addEventListener("dblclick", () => {
  if (DEBUG) console.debug("trace: dblclick");
  localStorage.setItem(NS + "trace", document.body.toggleAttribute("trace").toString());
});

// Listener for click + ⌘ + ⇧ (advanced)
addEventListener("click", (ev) => {
  if (DEBUG) console.debug("trace: click");
  if (!ev.metaKey || !ev.shiftKey) return;
  localStorage.setItem(NS + "advanced", document.body.toggleAttribute("advanced").toString());
  return ev.preventDefault();
});

// Set advanced and trace to the current value in localStorage
init();

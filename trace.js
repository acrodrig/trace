// The actual CSS will be loaded into this variable
const CSS = `
/** Declare a CSS color variable for blocks */
:root {
  --trace-file: darkorange;
  --trace-blocks: red;
  --trace-heading: grey;
  --trace-inline: green;
  --trace-image: blue;
  --trace-object: purple;
}

/* Make everything invisible by default */
body:not([advanced]) *[advanced] {
  display: none;
}

body:not([trace]) *[trace] {
  display: none;
}

/* Show elements under trace */
body[trace] {
  .trace-bar {
    background-color: #bbbbbb;
    bottom: 0;
    font: bold 10pt system-ui;
    padding: 10px;
    position: fixed;
    outline: 1px solid #bbbbbb !important;
  }

  main, div, aside, section {
    outline: 1px solid var(--trace-blocks);
  }

  h1, h2, h3, h4, h5, h6 {
    outline: 1px solid var(--trace-heading);
  }

  img, i[class^="bi-"], svg {
    outline: 1px solid var(--trace-image);
  }

  canvas, video {
    outline: 1px solid var(--trace-object);
  }

  *[data-file] {
    position: relative;

    &:hover {
      outline: 3px solid var(--trace-file) !important;
    }

    &:hover::after {
      opacity: 1;
    }

    &::after {
      background-color: var(--trace-file);
      content: attr(data-file);
      color: white;
      position: absolute;
      right: 0;
      bottom: 0;
      border-left: 5px solid orangered;
      font: bold 10pt system-ui;
      padding: 2px 5px;
      opacity: 0.5;
      min-width: 10em;
    }
  }
}
`;

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

function init() {
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

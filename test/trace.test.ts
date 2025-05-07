#!/usr/bin/env -S deno test -A

import { assertEquals } from "jsr:@std/assert@^1";
import { DOMParser } from "jsr:@b-fuze/deno-dom@^0";

// Set mock document ad its body as the root
const html = "<html><body>Hello!</body></html>";
const document = new DOMParser().parseFromString(html, "text/html");

// Copied and pasted from trace.ts
const LEGEND = `
  <div class="trace-bar" trace="">
    <span style="color: var(--trace-blocks);">Blocks</span> /
    <span style="color: var(--trace-heading);">Headings</span> /
    <span style="color: var(--trace-inline);">Inline</span> /
    <span style="color: var(--trace-image);">Image</span> /
    <span style="color: var(--trace-object);">Canvas &amp; Video</span>
  </div>`;

// Clear localStorage and setup root
Object.assign(globalThis, { document });
localStorage.clear();

// Importing the library simulates having the code ready to be initialized
import "../src/trace.ts";

Deno.test("init", () => {
  // assertEquals(document.body.outerHTML, "<body>Hello!</body>");
  dispatchEvent(new Event("DOMContentLoaded"));
  const href = new URL("../src/trace.css", import.meta.url).href;
  assertEquals(document.head.outerHTML, '<head><link rel="stylesheet" href="' + href + '"></head>');
  assertEquals(document.body.outerHTML, "<body>Hello!" + LEGEND + "</body>");
});

Deno.test("trace", () => {
  assertEquals(document.body.hasAttribute("trace"), false);
  dispatchEvent(new CustomEvent("dblclick"));
  assertEquals(document.body.hasAttribute("trace"), true);
});

Deno.test("advanced", () => {
  assertEquals(document.body.hasAttribute("advanced"), false);
  dispatchEvent(new CustomEvent("click"));
  assertEquals(document.body.hasAttribute("advanced"), false);
  dispatchEvent(Object.assign(new CustomEvent("click"), { metaKey: true }));
  assertEquals(document.body.hasAttribute("advanced"), false);
  dispatchEvent(Object.assign(new CustomEvent("click"), { shiftKey: true }));
  assertEquals(document.body.hasAttribute("advanced"), false);
  dispatchEvent(Object.assign(new CustomEvent("click"), { metaKey: true, shiftKey: true }));
  assertEquals(document.body.hasAttribute("advanced"), true);
});

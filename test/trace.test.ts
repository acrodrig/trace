#!/usr/bin/env -S deno test -A

import { assertEquals } from "jsr:@std/assert@^1";
import { DOMParser } from "jsr:@b-fuze/deno-dom@^0";
import { LEGEND } from "../src/trace.ts";

// Set mock document ad its body as the root
const html = "<html><body>Hello!</body></html>";
const document = new DOMParser().parseFromString(html, "text/html");

// Clear localStorage ad setup root
Object.assign(globalThis, { document: document });
localStorage.clear();

Deno.test("init", () => {
  dispatchEvent(new Event("domcontentloaded"));
  const href = new URL("../src/trace.css", import.meta.url).href;
  assertEquals(document.head.outerHTML, '<head><link href="' + href + '"></head>');
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

#!/usr/bin/env -S deno run -A

// Read files
const ts = Deno.readTextFileSync(import.meta.dirname + "/src/trace.ts");
const css = Deno.readTextFileSync(import.meta.dirname + "/src/trace.css");

// Remove all 'export' statements and replace CSS with style content
Deno.writeTextFileSync("trace.js", ts
  .replace(/export\s+/, "")
  .replace("import.meta.url", "document.currentScript.src")
  .replace("/* CSS */", "\n" + css)
);

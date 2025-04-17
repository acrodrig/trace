#!/usr/bin/env -S deno run -A

const ts = Deno.readTextFileSync(import.meta.dirname + "/src/trace.ts");
const css = Deno.readTextFileSync(import.meta.dirname + "/src/trace.css");
Deno.writeTextFileSync("trace.js", ts.replace("/* CSS */", "\n" + css));

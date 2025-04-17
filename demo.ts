#!/usr/bin/env -S deno run -A

// Small web server that whenever it receives a request it reposnds with a raw file from github

const URL = "https://raw.githubusercontent.com/adamerose/compare-classless-css/refs/heads/master/src/demo.html";
const THEME = "https://cdn.jsdelivr.net/npm/water.css@2/out/light.css";
const DEMO = await fetch(URL).then((r) => r.text());

Deno.serve(() => {
  const ts = Deno.readTextFileSync("src/trace.ts");
  const css = Deno.readTextFileSync("src/trace.css");
  const html = `
    <html>
      <head><link rel="stylesheet" href="${THEME}"/></head>
      <body>${DEMO}<script type="module">${ts.replace("/* CSS */", css)}</script></body>
    </html>`;
  return new Response(html, { headers: { "Content-Type": "text/html" } });
});

console.info("Navigate to server root and double click to see demo!");

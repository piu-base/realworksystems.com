import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("script.js", "utf8");
const stripeLinks = JSON.parse(readFileSync("stripe-links.json", "utf8"));

const requiredHtml = [
  "Real Work Systems",
  "Real systems",
  "for real work.",
  "Get an AI Fix Review",
  "$200k+",
  "$10k+",
  "AI Build Rescue",
  "AI Workflow Fix",
  "No curiosity calls.",
  "Systems over advice.",
  "AI stays practical.",
  "$1,000",
  "$2,500",
  "$4,000",
];

for (const text of requiredHtml) {
  if (!html.includes(text)) {
    throw new Error(`Missing required HTML text: ${text}`);
  }
}

for (const item of Object.values(stripeLinks)) {
  if (!html.includes(item.url)) {
    throw new Error(`Missing Stripe link in HTML: ${item.url}`);
  }
}

if (!css.includes("@media (max-width: 640px)")) {
  throw new Error("Missing mobile CSS breakpoint.");
}

if (!css.includes("@media (prefers-reduced-motion: reduce)")) {
  throw new Error("Missing reduced-motion CSS.");
}

if (!css.includes(":focus-visible")) {
  throw new Error("Missing visible keyboard focus styles.");
}

if (/letter-spacing:\s*-[^;]+;/.test(css)) {
  throw new Error("Negative letter spacing is not allowed.");
}

if (/font-size:\s*[^;]*vw[^;]*;/.test(css)) {
  throw new Error("Font size must not scale with viewport width.");
}

if (js.includes("mailto:")) {
  throw new Error("Mailto flow should not be used for paid entry.");
}

console.log("Site check passed.");

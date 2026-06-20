import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const terms = readFileSync("terms.html", "utf8");
const privacy = readFileSync("privacy.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const stripeLinks = JSON.parse(readFileSync("stripe-links.json", "utf8"));

const requiredHtml = [
  "Real Work Systems",
  "More revenue.",
  "Less manual work.",
  "See the Fix Review",
  "Recover revenue leaks",
  "$10k",
  "From stuck work to working system",
  "Revenue capture",
  "Operating leverage",
  "Code rescue",
  "Payback first.",
  "Engagement model",
  "Turn one valuable problem into a decision and a working fix.",
  "Read Jose's work",
  "Know what is broken before you pay for a build.",
  "Delivered in 5 business days",
  "Business first.",
  "Systems first.",
  "privacy.html",
  "terms.html",
  "assets/logo-mark.svg",
  "$1,000",
  "$2,500",
  "$4,000",
];

for (const text of requiredHtml) {
  if (!html.includes(text)) {
    throw new Error(`Missing required HTML text: ${text}`);
  }
}

for (const text of ["Terms and Conditions", "Privacy Policy", "hello@realworksystems.com"]) {
  if (!terms.includes(text) && !privacy.includes(text)) {
    throw new Error(`Missing legal text: ${text}`);
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

if (html.includes("mailto:") || terms.includes("mailto:") || privacy.includes("mailto:")) {
  throw new Error("Mailto flow should not be used for paid entry.");
}

console.log("Site check passed.");

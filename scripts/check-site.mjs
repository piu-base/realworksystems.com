import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const codeRescue = readFileSync("code-rescue.html", "utf8");
const revenueCapture = readFileSync("revenue-capture.html", "utf8");
const operatingLeverage = readFileSync("operating-leverage.html", "utf8");
const terms = readFileSync("terms.html", "utf8");
const privacy = readFileSync("privacy.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const processFlow = readFileSync("assets/hero-process-flow.svg", "utf8");
const stripeLinks = JSON.parse(readFileSync("stripe-links.json", "utf8"));

const requiredHtml = [
  "Real Work Systems",
  "More revenue.",
  "Less manual work.",
  "Start with a review",
  "Pick your lane",
  "assets/hero-operations-calm.jpg",
  "assets/hero-process-flow.svg",
  "Bring in missed customers",
];

const requiredProcessFlow = [
  "Bring in",
  "Missed customers",
  "Too much admin",
  "Broken build",
  "Through",
  "Get out",
  "Recover revenue leaks",
  "Cut operating drag",
  "Free team capacity",
];

const requiredMainHtml = [
  "Revenue capture",
  "Operating leverage",
  "Code rescue",
  "Where to start",
  "Engagement model",
  "Start with one problem. Leave with the next move.",
  "Read Jose's work",
  "Know what is broken before you pay for a build.",
  "Delivered in 5 business days",
  "code-rescue.html",
  "revenue-capture.html",
  "operating-leverage.html",
  "privacy.html",
  "terms.html",
  "assets/logo-mark.svg",
  "$1,000",
  "$2,500",
  "$4,000",
];

for (const text of [...requiredHtml, ...requiredMainHtml]) {
  if (!html.includes(text)) {
    throw new Error(`Missing required HTML text: ${text}`);
  }
}

for (const text of requiredProcessFlow) {
  if (!processFlow.includes(text)) {
    throw new Error(`Missing process flow text: ${text}`);
  }
}

const laneRequirements = [
  [codeRescue, "Your AI-built app looked close. Now it needs to actually work.", "Start Code Rescue"],
  [revenueCapture, "Stop losing customers because the follow-up is slow or broken.", "Start Revenue Review"],
  [operatingLeverage, "Give the team hours back from work that keeps repeating.", "Start Operations Review"],
];

for (const [page, headline, cta] of laneRequirements) {
  for (const text of [headline, cta, "Start a Fix Review", "https://buy.stripe.com/aFa5kD4lG5JW7uf0ZWejK06"]) {
    if (!page.includes(text)) {
      throw new Error(`Missing lane page text: ${text}`);
    }
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

if ([html, codeRescue, revenueCapture, operatingLeverage, terms, privacy].some((page) => page.includes("mailto:"))) {
  throw new Error("Mailto flow should not be used for paid entry.");
}

console.log("Site check passed.");

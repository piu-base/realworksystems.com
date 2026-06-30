import { readFileSync, existsSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const codeRescue = readFileSync("code-rescue.html", "utf8");
const revenueCapture = readFileSync("revenue-capture.html", "utf8");
const operatingLeverage = readFileSync("operating-leverage.html", "utf8");
const terms = readFileSync("terms.html", "utf8");
const privacy = readFileSync("privacy.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const stripeLinks = JSON.parse(readFileSync("stripe-links.json", "utf8"));

const allPages = {
  "index.html": html,
  "revenue-capture.html": revenueCapture,
  "operating-leverage.html": operatingLeverage,
  "code-rescue.html": codeRescue,
  "privacy.html": privacy,
  "terms.html": terms,
};

const requiredSeoTags = [
  'rel="canonical"',
  'property="og:title"',
  'property="og:image"',
  'content="https://realworksystems.com/assets/og-image.png"',
  'name="twitter:card"',
  'content="summary_large_image"',
  'rel="apple-touch-icon"',
  "https://www.clarity.ms/tag/",
  '"xfag0tc0kf"',
];

for (const [name, page] of Object.entries(allPages)) {
  for (const tag of requiredSeoTags) {
    if (!page.includes(tag)) {
      throw new Error(`Missing SEO tag ${tag} in ${name}`);
    }
  }
}

if (!html.includes("application/ld+json") || !html.includes('"ProfessionalService"')) {
  throw new Error("Missing JSON-LD structured data on homepage.");
}

for (const file of ["robots.txt", "sitemap.xml", "assets/og-image.png", "apple-touch-icon.png"]) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const sitemap = readFileSync("sitemap.xml", "utf8");
for (const loc of [
  "https://realworksystems.com/",
  "https://realworksystems.com/revenue-capture",
  "https://realworksystems.com/operating-leverage",
  "https://realworksystems.com/code-rescue",
]) {
  if (!sitemap.includes(`<loc>${loc}</loc>`)) {
    throw new Error(`Missing sitemap entry: ${loc}`);
  }
}

if (!readFileSync("robots.txt", "utf8").includes("Sitemap: https://realworksystems.com/sitemap.xml")) {
  throw new Error("robots.txt missing sitemap reference.");
}

const requiredHtml = [
  "Real Work Systems",
  "More revenue.",
  "Less manual work.",
  "Start with a review",
  "Pick your lane",
  "assets/hero-operations-calm.jpg",
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
  "within 5 business days",
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

const laneRequirements = [
  [codeRescue, "Your AI-built app looked close. Now it needs to actually work.", "Start Code Rescue"],
  [revenueCapture, "Stop losing customers because the follow-up is slow or broken.", "Start Revenue Review"],
  [operatingLeverage, "Give the team hours back from work that keeps repeating.", "Start Operations Review"],
];

for (const [page, headline, cta] of laneRequirements) {
  for (const text of [headline, cta, "Start a Fix Review", "/#fix-review", "/#start"]) {
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

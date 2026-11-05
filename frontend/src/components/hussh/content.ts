/** Window event the hero quick-links fire to spotlight one product card (detail = card id). */
export const HIGHLIGHT_EVENT = "hussh:highlight-product";

export const IMAGES = {
  heroMascot:
    "https://static.prod-images.emergentagent.com/jobs/052e123a-4925-4f69-99f0-defbab7c7653/images/463c95f5cafe1de96239ad21a0de0b959cac9b4bf3fa8a9b7b44dfd6c4558220.jpeg",
  mascotPastel:
    "https://static.prod-images.emergentagent.com/jobs/052e123a-4925-4f69-99f0-defbab7c7653/images/867a216309c7e4496b5c54e7ddd19e0ab1c732cd47d055af9eaf4cb59a9444a3.jpeg",
  mascotVault:
    "https://static.prod-images.emergentagent.com/jobs/052e123a-4925-4f69-99f0-defbab7c7653/images/1a64bd22364b61d99d3b1f9f7ebf451a464731944e347bbe6a8a481847902cba.jpeg",
  agentOne:
    "https://static.prod-images.emergentagent.com/jobs/052e123a-4925-4f69-99f0-defbab7c7653/images/14d899734afcf7b14f0fc655cc1bb465c21674f6d56dad831c12b673f5b0f471.jpeg",
  puppyOne:
    "https://static.prod-images.emergentagent.com/jobs/052e123a-4925-4f69-99f0-defbab7c7653/images/451d77a2eee3bcc77735e2b361b8524852e0eb099c81f4f981060f2920adcc20.jpeg",
  puppyWag:
    "https://static.prod-images.emergentagent.com/jobs/052e123a-4925-4f69-99f0-defbab7c7653/images/60a2dbc866f3b8daa98cbb5769047769cb6c8d423ffbc13d81f61cb147308cc8.jpeg",
  tagOne:
    "https://static.prod-images.emergentagent.com/jobs/052e123a-4925-4f69-99f0-defbab7c7653/images/fad90907e236b1e176cfd54ed140ce1094aff59730084a4411b5d31072e74787.jpeg",
};

export interface NavLink {
  label: string;
  desc: string;
  href: string;
  badge?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  blurb: string;
  links: NavLink[];
}

export const NAV: NavGroup[] = [
  {
    id: "agent-one",
    label: "Agent One",
    blurb: "Your private assistant. Runs on your device, answers only to you.",
    links: [
      { label: "Overview", desc: "What Agent One does for you, every day", href: "#products" },
      { label: "Morning Brief", desc: "Your day, summarised before coffee", href: "#how-it-works" },
      { label: "On-device vault", desc: "Encrypted storage only you can open", href: "#products", badge: "Private" },
      { label: "Download", desc: "macOS, iOS, Windows and Android", href: "#get-started" },
    ],
  },
  {
    id: "products",
    label: "Products",
    blurb: "Hardware and software built to keep your life yours.",
    links: [
      { label: "Agent One", desc: "Free AI assistant, on your device", href: "#products" },
      { label: "Puppy One", desc: "A small computer that runs Agent One at home", href: "#products" },
      { label: "Tag One", desc: "A wearable for the people you look out for", href: "#tag-one", badge: "Soon" },
      { label: "hussh Shop", desc: "Devices and accessories", href: "#products" },
    ],
  },
  {
    id: "marketplace",
    label: "Marketplace",
    blurb: "Companies already profit from your data. Now you can too.",
    links: [
      { label: "How it works", desc: "Share, price, approve, get paid", href: "#marketplace" },
      { label: "Set your price", desc: "You decide what your info is worth", href: "#marketplace" },
      { label: "Verified buyers", desc: "Only approved partners can ask", href: "#marketplace" },
    ],
  },
  {
    id: "business",
    label: "For Business",
    blurb: "Private AI for teams — without sending data to someone else's cloud.",
    links: [
      { label: "hussh for teams", desc: "Deploy on-device AI across your org", href: "#ecosystem" },
      { label: "Developers & MCP", desc: "Build on the hussh protocol", href: "#ecosystem" },
      { label: "Partner portal", desc: "Integrate, resell, collaborate", href: "#ecosystem" },
      { label: "Book a demo", desc: "Talk to our team", href: "#get-started" },
    ],
  },
  {
    id: "company",
    label: "Company",
    blurb: "We believe your intelligence should belong to you.",
    links: [
      { label: "About hussh", desc: "Our mission and the people behind it", href: "#footer" },
      { label: "Learn: Blog", desc: "Notes on privacy, AI and ownership", href: "#footer" },
      { label: "Learn: Guide", desc: "Set up and get the most from hussh", href: "#footer" },
      { label: "Careers", desc: "Help build sovereign intelligence", href: "#footer" },
      { label: "Contact", desc: "Press, partners and support", href: "#footer" },
    ],
  },
];

export const FOOTER_GROUPS: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Agent One", "Puppy One", "Tag One", "The One Card", "iWinny", "The Podcast", "The hussh Stories", "hussh Shop"] },
  { title: "Directory", links: ["Businesses", "People", "Find an Expert", "Live Feed"] },
  { title: "Enterprise", links: ["For Business", "RIA Wealth", "Developers & MCP", "Partner Portal"] },
  { title: "Knowledge", links: ["Guide", "Blog", "Podcasts & Transcripts", "System Architecture"] },
  { title: "Company", links: ["About hussh", "Leadership & Team", "Media", "Careers", "Contact"] },
  { title: "Trust & Rights", links: ["PCHP Protocol", "Data Rights Ledger", "The Case for Rights", "Gratitude", "Champions of the Community", "Security"] },
];

// Logos: @lobehub/icons-static-svg (MIT), served from /public/brands. Siri uses the Apple mark.
export const AI_BRANDS = [
  { name: "Gemini", logo: "/brands/gemini.svg" },
  { name: "Siri", logo: "/brands/siri.svg" },
  { name: "ChatGPT", logo: "/brands/chatgpt.svg" },
  { name: "Claude", logo: "/brands/claude.svg" },
  { name: "Grok", logo: "/brands/grok.svg" },
  { name: "Meta AI", logo: "/brands/meta-ai.svg" },
  { name: "Copilot", logo: "/brands/copilot.svg" },
];

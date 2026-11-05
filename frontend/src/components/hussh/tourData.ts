import { Cpu, Radio, Sparkles } from "lucide-react";
import { IMAGES } from "./content";

// Product quick-links and comparison rows for the landing page.

export const SHOWROOM = [
  {
    id: "agent-one", name: "Agent One", tag: "Free app", Icon: Sparkles, img: IMAGES.agentOne,
    bg: "bg-butter/45", ring: "ring-butter", dot: "bg-butter",
    headline: "Your private assistant.",
    body: "It keeps track of your schedule, bills and inbox — and only sees what you choose to connect.",
    features: [
      ["Morning brief", "Your day in three lines, every morning at 7."],
      ["Money watch", "Catches forgotten subscriptions and surprise charges."],
      ["Drafts, not sends", "Replies in your voice. You always press send."],
    ],
    specs: ["macOS", "iOS", "Windows", "Android"],
    cta: "Get Agent One — free",
  },
  {
    id: "puppy-one", name: "Puppy One", tag: "Your own computer", Icon: Cpu, img: IMAGES.puppyOne,
    bg: "bg-sky/45", ring: "ring-sky", dot: "bg-sky",
    headline: "A private cloud for your home.",
    body: "A laptop, Apple Silicon Mac, Dell or Acer — paired with Agent One so your assistant runs 24/7 without leaving the house.",
    features: [
      ["Always on", "Agent One keeps working while your phone sleeps."],
      ["Faster answers", "Bigger models, running on your own hardware."],
      ["Stays in the room", "No data centre. No middleman. Just your desk."],
    ],
    specs: ["Apple Silicon", "Arm & x86", "Wi-Fi 6", "Plug & play"],
    cta: "Explore Puppy One",
  },
  {
    id: "tag-one", name: "Tag One", tag: "Coming soon", Icon: Radio, img: IMAGES.tagOne,
    bg: "bg-bubble/45", ring: "ring-bubble", dot: "bg-bubble",
    headline: "Look out for the people you love.",
    body: "A small wearable that shares where someone is only when they agree — and only with your trusted circle.",
    features: [
      ["Consent first", "Nothing is shared without a yes from the wearer."],
      ["Trusted circle", "Pick exactly who can see — nobody else ever can."],
      ["Data expires", "Location history deletes itself on your schedule."],
    ],
    specs: ["Wearable", "Weeks of battery", "Water resistant", "Encrypted"],
    cta: "",
  },
] as const;

export type Cell = boolean | string;
export const ROWS: { label: string; hussh: Cell; cloud: Cell }[] = [
  { label: "Where your data lives", hussh: "Your device", cloud: "Their servers" },
  { label: "Who can read it", hussh: "Only you", cloud: "The company, its partners, maybe more" },
  { label: "Trains their models on your life", hussh: false, cloud: true },
  { label: "Shows you ads based on it", hussh: false, cloud: true },
  { label: "You can sell your own data", hussh: true, cloud: false },
  { label: "Price", hussh: "Free for life", cloud: "Free, because you are the product" },
];

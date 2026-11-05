import { ArrowUp } from "lucide-react";
import { Logo } from "./Brand";
import { FOOTER_GROUPS } from "./content";

export function Footer() {
  return (
    <footer id="footer" data-testid="site-footer" className="border-t border-white/[0.06] bg-[#18181b] pb-10 pt-[60px] text-[#f5f2ec] sm:pt-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-5 max-w-[240px] text-sm leading-relaxed text-white/70">Sovereign intelligence. Personal supercomputing, owned by you.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
            {FOOTER_GROUPS.map((g) => (
              <div key={g.title}>
                <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-gold/80">{g.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#footer"
                        data-testid={`footer-link-${l.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="text-[13px] text-white/70 transition-colors duration-150 hover:text-gold"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p data-testid="footer-legal-note" className="mt-16 text-[12px] leading-relaxed text-white/70">
          Private Agent One is free for every American citizen. We do not sell your data, your attention or your contacts. Optional first-party usage analytics only if you allow them under Privacy Choices. Google Analytics and Tag Manager are paused. Our search keywords stay on our own search queries and answers. Collection details and the event schema remain available in the Agent One privacy center. Company and product names describe technology interoperability and do not imply endorsement.
        </p>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/70" data-testid="footer-copyright">
            © 2026 Hussh Technologies Corporation, Wilmington, DE. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/70">
            {["Privacy Choices", "Privacy Policy", "Terms of Use", "Your Data Rights", "Accessibility", "Sitemap"].map((l) => (
              <a key={l} href="#footer" className="transition-colors duration-150 hover:text-gold">
                {l}
              </a>
            ))}
            <a
              href="#top"
              aria-label="Back to top"
              data-testid="footer-back-to-top"
              className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

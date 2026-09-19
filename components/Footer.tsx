import Link from "next/link";
import { site } from "@/lib/data/site";
import { LogoMark } from "./Logo";
const groups = [
  {
    title: "What I build",
    links: [
      ["Websites & 3D", "/web-design-development"],
      ["Apps & software", "/custom-ai-app-development"],
      ["AI & automation", "/done-for-you-ai-automation"],
      ["AI receptionists", "/ai-receptionist-for-contractors"],
      ["All services", "/services"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["Try the text demo", "/demo"],
      ["Free tools", "/tools"],
      ["Pricing", "/pricing"],
      ["About Pavneet", "/about"],
      ["Start a project", "/create"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Industries", "/industries"],
      ["Local services", "/locations"],
      ["Guides", "/resources"],
      ["Comparisons", "/compare"],
      ["For creators", "/creators"],
      ["AI systems", "/shop"],
    ],
  },
];
export default function Footer() {
  return (
    <footer className="studio-footer">
      <div className="studio-container">
        <div className="studio-footer-top">
          <div className="studio-footer-intro">
            <Link href="/" className="studio-brand">
              <LogoMark />
              Handbuilt AI
            </Link>
            <p>
              Websites, apps and AI systems, thoughtfully built with you. An
              independent studio in Surrey, British Columbia.
            </p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="studio-footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name} · Built by {site.founder}{" "}
            · Prices in CAD
          </span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href={site.social.github}>GitHub</a>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

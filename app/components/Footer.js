import Link from "next/link";
import { SiInstagram, SiSubstack } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--gray-900)",
        color: "var(--gray-400)",
        padding: "3rem 1.25rem 2rem",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: "72rem", marginInline: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "white",
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Elsie
              <span style={{ fontWeight: 400, fontStyle: "italic" }}>
                The
              </span>
              Explorer
            </p>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
              Exploring everything and everything in between.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--gray-500)",
                marginBottom: "0.875rem",
              }}
            >
              Navigate
            </p>

            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {[
                { href: "/blog", label: "Blog" },
                { href: "/projects", label: "Projects" },
                { href: "/photography", label: "Photography" },
                { href: "/about", label: "About" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--gray-500)",
                marginBottom: "0.875rem",
              }}
            >
              Find me online
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
              }}
            >
              {[
                {
                  icon: SiInstagram,
                  label: "Instagram",
                  href: "https://instagram.com/4kewii",
                },
                {
                  icon: BsLinkedin,
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/elsieokon/",
                },
                {
                  icon: SiSubstack,
                  label: "Substack",
                  href: "https://overlady.substack.com",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.625rem",
                  }}
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.8125rem",
          }}
        >
          <p style={{ margin: 0 }}>
            © {year} ElsieTheExplorer. All rights reserved.
          </p>
          <p style={{ margin: 0 }}>Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
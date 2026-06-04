'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/",           label: "Home" },
  { href: "/blog",       label: "Blog" },
  { href: "/projects",   label: "Projects" },
  { href: "/photography",label: "Photography" },
  { href: "/about",      label: "About" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "rgba(253,245,245,0.92)" : "var(--brand-500)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-soft)" : "none",
        transition: "background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "72rem",
          marginInline: "auto",
          paddingInline: "1.25rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "1.125rem",
            color: scrolled ? "var(--brand-700)" : "white",
            letterSpacing: "-0.02em",
            transition: "color 300ms ease",
            textDecoration: "none",
            lineHeight: 1,
          }}
        >
          Elsie<span style={{ fontWeight: 400, fontStyle: "italic" }}>The</span>Explorer
        </Link>

        {/* Desktop nav */}
        <ul
          style={{
            display: "none",
            alignItems: "center",
            gap: "0.25rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.375rem 0.875rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9375rem",
                    fontWeight: isActive ? 600 : 400,
                    color: scrolled
                      ? (isActive ? "var(--brand-700)" : "var(--gray-600)")
                      : (isActive ? "white" : "rgba(255,255,255,0.8)"),
                    backgroundColor: isActive
                      ? (scrolled ? "var(--brand-100)" : "rgba(255,255,255,0.15)")
                      : "transparent",
                    textDecoration: "none",
                    transition: "all 200ms ease",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = scrolled
                        ? "var(--brand-50)"
                        : "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = scrolled ? "var(--brand-600)" : "white";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = scrolled
                        ? "var(--gray-600)"
                        : "rgba(255,255,255,0.8)";
                    }
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-md)",
            border: "none",
            cursor: "pointer",
            background: scrolled ? "var(--brand-50)" : "rgba(255,255,255,0.15)",
            color: scrolled ? "var(--brand-700)" : "white",
            transition: "all 200ms ease",
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          style={{
            background: "var(--bg-surface)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "0.75rem 1.25rem 1rem",
            boxShadow: "var(--shadow-lg)",
            animation: "fadeIn 180ms ease",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {navLinks.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      display: "block",
                      padding: "0.625rem 0.875rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "1rem",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--brand-700)" : "var(--gray-700)",
                      backgroundColor: isActive ? "var(--brand-50)" : "transparent",
                      textDecoration: "none",
                      transition: "all 150ms ease",
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
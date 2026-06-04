import Link from "next/link";
import Image from "next/image";
import { SiInstagram, SiSubstack } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import ContactForm from "../components/ContactForm";
import { ArrowRight } from "lucide-react";

const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/4kewii", icon: SiInstagram },
  { name: "LinkedIn", url: "https://linkedin.com/in/elsieokon/", icon: BsLinkedin },
  { name: "Substack", url: "https://overlady.substack.com", icon: SiSubstack },
];

const interests = [
  "Music (trumpet, piano, production)",
  "Rugby",
  "Long walks",
  "Computer science",
  "Chemistry",
  "Travel",
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "56rem", marginInline: "auto", padding: "3rem 1.25rem 5rem" }}>
      {/* Hero */}
      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "center",
          marginBottom: "3rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <div
            style={{
              position: "relative",
              width: 160,
              height: 160,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid var(--brand-200)",
              boxShadow: "0 8px 24px rgba(197,100,98,0.2)",
            }}
          >
            <Image
              src="/photos/aboutPic/about.jpg"
              alt="Elsie"
              fill
              sizes="160px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: "220px" }}>
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--brand-500)",
              marginBottom: "0.625rem",
            }}
          >
            Hello, world!
          </p>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.875rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--gray-900)",
              letterSpacing: "-0.025em",
              marginBottom: "1rem",
            }}
          >
            I&apos;m Elsie
          </h1>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--gray-600)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            I was born to Nigerian parents in Bristol, England, moved to Manchester when I was 7, and spent the last few years in Southern California studying Computer Science and Chemistry at{" "}
            <Link
              href="https://www.pomona.edu"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--brand-600)", fontWeight: 500 }}
            >
              Pomona College
            </Link>
            . Along the way, I&apos;ve worn a lot of different hats: researcher, teaching assistant, rugby player, mentor, musician, student leader. 
            This blog is a place for the things I find interesting. Some of that is technical - software, systems, projects, and the occasional deep dive into a topic that catches my attention. But you&apos;ll also find reflections on books, travel, sport, learning, and whatever else happens to be occupying my mind at the time.
            I&apos;ve always admired people who are curious about many things and willing to follow that curiosity wherever it leads. This space is my attempt to do the same: a collection of notes, ideas, projects, and stories gathered along the way.
            If something here resonates with you, I&apos;m glad you found it.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        <section
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xl)",
            padding: "1.75rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--gray-900)",
              marginBottom: "1rem",
            }}
          >
            About me
          </h2>

          <div
            style={{
              fontSize: "0.95rem",
              color: "var(--gray-600)",
              lineHeight: 1.7,
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            <p style={{ margin: 0 }}>
              I make music — trumpet, piano, and production. I play rugby
              (badly). I walk long distances from wherever I happen to be.
              Beyond that, I&apos;m always down to try something new.
            </p>

            <p style={{ margin: 0 }}>
              I&apos;m currently working on a few personal{" "}
              <Link
                href="/projects"
                style={{ color: "var(--brand-600)", fontWeight: 500 }}
              >
                projects
              </Link>{" "}
              — nothing crazy, just gaining hands-on experience in the tech
              world.
            </p>
          </div>
        </section>

        <section
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xl)",
            padding: "1.75rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--gray-900)",
              marginBottom: "1rem",
            }}
          >
            Interests
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {interests.map((i) => (
              <span key={i} className="tag">
                {i}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section
        style={{
          background:
            "linear-gradient(135deg, var(--brand-500) 0%, var(--brand-700) 100%)",
          borderRadius: "var(--radius-xl)",
          padding: "2rem",
          marginBottom: "1.25rem",
          boxShadow: "var(--shadow-brand)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.375rem",
            fontWeight: 700,
            color: "white",
            marginBottom: "0.5rem",
          }}
        >
          Let&apos;s connect
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "0.9375rem",
            marginBottom: "1.5rem",
          }}
        >
          Find me on social media or send a message below.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.625rem",
            marginBottom: "1.5rem",
          }}
        >
          {socialLinks.map(({ name, url, icon: Icon }) => (
            <Link
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                color: "white",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <Icon size={16} />
              {name}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.5625rem 1.125rem",
              background: "white",
              color: "var(--brand-700)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Read my blog <ArrowRight size={15} />
          </Link>

          <Link
            href="/projects"
            className="secondary-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.5625rem 1.125rem",
              color: "white",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            View projects
          </Link>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
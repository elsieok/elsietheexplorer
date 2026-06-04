'use client'
import { useState, useEffect } from 'react'
import Link from "next/link"
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { components } from "@/mdx-components"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(async data => {
        const serialized = await Promise.all(
          data.map(async p => ({ ...p, mdxContent: await serialize(p.content) }))
        )
        setProjects(serialized)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const toggle = (slug) => setExpandedId(expandedId === slug ? null : slug)

  if (loading) {
    return (
      <div style={{ maxWidth: "52rem", marginInline: "auto", padding: "3rem 1.25rem" }}>
        <div className="skeleton" style={{ height: "2.25rem", width: "200px", marginBottom: "0.75rem" }} />
        <div className="skeleton" style={{ height: "1rem", width: "300px", marginBottom: "2.5rem" }} />
        {[1, 2, 3].map(i => (
          <div key={i} style={{ marginBottom: "1rem", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "1.5rem" }}>
            <div className="skeleton" style={{ height: "1.375rem", width: "200px", marginBottom: "0.75rem" }} />
            <div className="skeleton" style={{ height: "0.875rem", width: "80%", marginBottom: "0.875rem" }} />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div className="skeleton" style={{ height: "1.5rem", width: "60px", borderRadius: "var(--radius-full)" }} />
              <div className="skeleton" style={{ height: "1.5rem", width: "80px", borderRadius: "var(--radius-full)" }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "52rem", marginInline: "auto", padding: "3rem 1.25rem 5rem" }}>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.025em", marginBottom: "0.5rem" }}>
          Projects
        </h1>
        <p style={{ color: "var(--gray-500)", fontSize: "1.0625rem", margin: 0 }}>
          Things I&apos;ve built. Also on{' '}
          <Link href="https://github.com/elsieok" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--brand-600)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "0.25rem", verticalAlign: "middle" }}>
            GitHub <SiGithub size={14} />
          </Link>
          .
        </p>
      </div>

      {projects.length === 0 ? (
        <div
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xl)",
          }}
        >
          <p style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔧</p>
          <p style={{ fontWeight: 600, color: "var(--gray-800)", marginBottom: "0.375rem" }}>Nothing here yet</p>
          <p style={{ color: "var(--gray-500)", fontSize: "0.9rem", margin: 0 }}>Still tinkering away…</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {projects.map(project => {
            const isOpen = expandedId === project.slug
            return (
              <div
                key={project.slug}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid",
                  borderColor: isOpen ? "var(--brand-200)" : "var(--border-subtle)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-sm)",
                  transition: "border-color 200ms ease, box-shadow 200ms ease",
                }}
              >
                {/* Header button */}
                <button
                  onClick={() => toggle(project.slug)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    padding: "1.5rem",
                    textAlign: "left",
                    background: isOpen ? "var(--brand-50)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "var(--gray-50)" }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.5rem" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontWeight: 600,
                            fontSize: "1.1875rem",
                            color: "var(--gray-900)",
                            margin: 0,
                            letterSpacing: "-0.015em",
                          }}
                        >
                          {project.name}
                        </h3>
                      </div>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--gray-500)",
                          margin: "0 0 0.875rem",
                          lineHeight: 1.55,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {project.excerpt || project.content?.split('\n')[0]}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                        {project.tech?.map(t => (
                          <span key={t} className="tag tag-gray">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div
                      style={{
                        color: "var(--brand-400)",
                        flexShrink: 0,
                        marginTop: "0.125rem",
                        transition: "transform 200ms ease",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown size={20} strokeWidth={2} />
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div
                    style={{
                      borderTop: "1px solid var(--border-subtle)",
                      padding: "1.5rem",
                      animation: "fadeIn 200ms ease",
                    }}
                  >
                    <div
                      className="prose"
                      style={{
                        marginBottom: "1.5rem",
                        maxWidth: "none",
                        fontSize: "0.9375rem",
                      }}
                    >
                      <MDXRemote {...project.mdxContent} components={components} />
                    </div>

                    <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm"
                          style={{
                            background: "var(--brand-500)",
                            color: "white",
                            border: "none",
                            boxShadow: "var(--shadow-brand)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.5rem 1rem",
                            borderRadius: "var(--radius-md)",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            textDecoration: "none",
                            transition: "background 150ms ease",
                          }}
                        >
                          <ExternalLink size={14} />
                          View site
                        </Link>
                      )}
                      {project.source && (
                        <Link
                          href={project.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.4875rem 0.9375rem",
                            borderRadius: "var(--radius-md)",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            textDecoration: "none",
                            border: "1px solid var(--border-soft)",
                            color: "var(--gray-700)",
                            background: "var(--bg-surface)",
                            transition: "all 150ms ease",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "var(--gray-50)"; e.currentTarget.style.borderColor = "var(--gray-300)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-surface)"; e.currentTarget.style.borderColor = "var(--border-soft)"; }}
                        >
                          <SiGithub size={14} />
                          Source code
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
'use client'
import { useState, useEffect } from 'react'
import Link from "next/link"
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons';
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { components } from "@/mdx-components"

export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [expandedId, setExpandedId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch projects from your MDX files
        fetch('/api/projects')
            .then(res => res.json())
            .then(async data => {
                // Serialize MDX content for each project
                const serializedProjects = await Promise.all(
                    data.map(async project => ({
                        ...project,
                        mdxContent: await serialize(project.content)
                    }))
                )
                setProjects(serializedProjects)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch projects:', err)
                setLoading(false)
            })
    }, [])

    const toggleProject = (slug) => {
        setExpandedId(expandedId === slug ? null : slug)
    }

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center">
                    <p className="text-gray-900">Loading projects...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Page header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    My Projects
                </h1>
                <p className="text-gray-900 text-lg">Check out my stuff!</p> 
                <p className="text-gray-900 text-lg"> 
                    You can also visit my{' '}
                    <Link 
                        href="https://github.com/elsieok" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#803635] hover:text-[#6B2D2C] hover:underline inline-flex items-center gap-1"
                    >
                        GitHub <SiGithub size={16} />
                    </Link>
                    {' '}for source code.
                </p>
            </div>

            {/* Projects list */}
            {projects.length === 0 ? (
                <div className="text-center py-12 bg-[#E2B9B8] rounded-lg">
                    <p className="text-gray-900">
                        Nothing here yet, still tinkering away!
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div
                            key={project.slug}
                            className={`bg-white rounded-lg shadow-md border border-[#E2B9B8] overflow-hidden transition-all duration-300 ${
                                expandedId === project.slug ? 'shadow-xl' : 'hover:shadow-lg'
                            }`}
                        >
                            {/* Card Header - Always Visible */}
                            <button
                                onClick={() => toggleProject(project.slug)}
                                className="w-full p-6 text-left hover:bg-[#F5E6E6] transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                            {project.name}
                                            {expandedId === project.slug ? (
                                                <ChevronUp className="text-[#C56462]" size={24} />
                                            ) : (
                                                <ChevronDown className="text-[#C56462]" size={24} />
                                            )}
                                        </h3>
                                        
                                        {/* Brief description - extract first line or use excerpt */}
                                        <p className="text-gray-700 line-clamp-2">
                                            {project.excerpt || project.content.split('\n')[0]}
                                        </p>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {project.tech?.map((tech) => (
                                                <span 
                                                    key={tech} 
                                                    className="bg-[#E2B9B8] text-gray-800 text-xs px-3 py-1 rounded-full font-semibold"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {/* Expanded Content */}
                            <div
                                className={`transition-all duration-300 ease-in-out ${
                                    expandedId === project.slug
                                        ? 'max-h-[2000px] opacity-100'
                                        : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 pb-6 border-t border-[#E2B9B8]">
                                    {/* Full description */}
                                    <div className="mt-6 mb-6 bg-[#F5E6E6] rounded-lg p-6">
                                        <div className="prose prose-sm max-w-none text-gray-800">
                                            <MDXRemote {...project.mdxContent} components={components} />
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-3 flex-wrap">
                                        {project.link && (
                                            <Link
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-[#64D4E2] text-white px-4 py-2 rounded-lg hover:bg-[#22A1B2] transition-colors font-semibold shadow-md"
                                            >
                                                <ExternalLink size={16} />
                                                View Website
                                            </Link>
                                        )}
                                        {project.source && (
                                            <Link
                                                href={project.source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-[#803635] text-white px-4 py-2 rounded-lg hover:bg-[#6B2D2C] transition-colors font-semibold shadow-md"
                                            >
                                                <SiGithub size={16} />
                                                View Source
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
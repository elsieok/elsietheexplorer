import Link from "next/link";
import ContentClient from "./PostContentClient";

export default function ProjectCard({ project }) {
    return (
        <article className="bg-[#E2B9B8]/90 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">

                {/* Project.title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {project.title}
                </h3>

                {/** Project content */}
                {/* MDX Content rendered on the client */}
                <ContentClient source={project.content} />

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech?.map((tech) => (
                        <span key={tech} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links and source */}
                <ul className="flex space-x-4">
                    <li>
                        <Link href="https://example.com" className="text-gray-900 hover:underline">
                        Website
                        </Link>
                    </li>
                    <li>
                        <Link href="https://example.com" className="text-gray-900 hover:underline">
                        Source
                        </Link>
                    </li>
                </ul>
            </div>
        </article>
    )
}
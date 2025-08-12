import { getAllProjects } from "@/lib/mdx";
import ProjectCard from "../components/ProjectCard";
import Link from "next/link";

export default async function ProjectsPage() {
    const projects = []
    // const projects = await getAllProjects()

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/** Page header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    My Projects
                </h1>
                <p className="text-gray-900 text-lg">Check out my stuff!</p> 
                <p className="text-gray-900 text-lg"> You can also visit my <Link href={'https://github.com/elsieok'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#803635] hover:[#6B2D2C] hover:underline"> GitHub</Link> for any source code.
                </p>
            </div>

            {/** Projects grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => 
                <ProjectCard key={project.slug} project={project}/>
                )}
            </div>

            {/** Empty state */}
            {projects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-900">
                        Nothing here yet, still tinkering away!
                    </p>
                </div>
            )}
        </div>
    )

    // return (
    //     <div className="text-center py-12">
    //        <p className="text-gray-900">
    //         Nothing here yet, still tinkering away!
    //        </p>
    //     </div>
    // );
}

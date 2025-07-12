import { getAllProjects } from "@/lib/md";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
    // const projects = getAllProjects()

    // return (
    //     <div className="max-w-6xl mx-auto px-4 py-12">
    //         {/** Page header */}
    //         <div className="text-center mb-12">
    //             <h1 className="text-4xl font-bold mb-4 text-gray-900">
    //                 My Projects
    //             </h1>
    //             <p className="text-gray-900 text-lg">
    //                 Check out my work!
    //             </p>
    //         </div>

    //         {/** Projects grid */}
    //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    //             {projects.map((project) => 
    //             <ProjectCard key={project.slug} project={project}/>
    //             )}
    //         </div>

    //         {/** Empty state */}
    //         {projects.length === 0 && (
    //             <div className="text-center py-12">
    //                 <p className="text-gray-500">
    //                     Nothing here yet, still tinkering away!
    //                 </p>
    //             </div>
    //         )}
    //     </div>
    // )

    return (
        <div className="text-center py-12">
           <p className="text-gray-900">
            Nothing here yet, still tinkering away!
           </p>
        </div>
    );
}

import { useState } from "react";
import { Clients } from "../components/layout/home/Clients";
import { CaseStudyCarousel } from "../components/ui/casestudy-carousel";
import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "../components/ui/project-card";
import ButtonPortfolio from "@/components/ui/button-portfolio";
import { FeaturedImage } from "@/components/ui/featured-image";
import Hero from "@/components/ui/hero";


function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const uniqueTypes = ["All", ...new Set(projects?.map((p) => p.project_type))];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects?.filter((p) => p.project_type === activeFilter);

  if (isLoading) return <p>Loading projects...</p>


  return (
    <div className="w-full overflow-x-hidden text-white px-2 lg:px-25 flex flex-col space-y-10">


      {/* <Hero
        title={<>/Projects</>}
        description="Located in the Makati, Philippines, our Agency is dedicated to crafting robust and renowned brands."
      /> */}

      {/* <div className="-mt-20 lg:-mt-32 space-y-5 font-body">
        <FeaturedImage section="project_top" imgClassName="h-160" />

        <div className="flex justify-between">
          <p>Located in the Makati, Philippines, our Agency is dedicated to <br /> crafting robust and renowned brands.</p>
          <span>24 Jan 2024</span>
        </div>
      </div> */}

      <img src="/projects.gif" alt="project" className="w-250 mx-auto block mt-15" />



      <ButtonPortfolio
        types={uniqueTypes}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredProjects?.map(project => (
          <ProjectCard
            key={project.project_id}
            project={project}
            linkPrefix="/projects/"
          />
        ))}
      </div>

      {/* <div className="mt-40">
        <Clients />
      </div>
      <CaseStudyCarousel /> */}
    </div>
  )
}
export default Projects
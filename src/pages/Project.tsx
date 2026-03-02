import { Clients } from "../components/layout/home/Clients";
import { CaseStudyCarousel } from "../components/ui/casestudy-carousel";
import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "../components/ui/project-card";
import { FeaturedImage } from "@/components/ui/featured-image";
import Hero from "@/components/ui/hero";

function Projects() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) return <p>Loading projects...</p>


  return (
    <div className="w-full overflow-x-hidden text-white px-2 lg:px-25 flex flex-col space-y-10 lg:space-y-42">

      <Hero
        title={<>/Projects</>}
        description="Located in the Makati, Philippines, our Agency is dedicated to crafting robust and renowned brands."
      />

      <div className="-mt-20 lg:-mt-32 space-y-5 font-body">
        <FeaturedImage section="project_top" imgClassName="h-160" />

        <div className="flex justify-between">
          <p>Located in the Makati, Philippines, our Agency is dedicated to <br /> crafting robust and renowned brands.</p>
          <span>24 Jan 2024</span>
        </div>
      </div>

      {projects?.map(project => (
        <ProjectCard
          key={project.project_id}
          project={project}
          linkPrefix="/projects/"
          className="mb-8"
        />
      ))}


      <Clients />
      <CaseStudyCarousel />
    </div>
  )
}
export default Projects
import { Clients } from "../components/layout/home/Clients";
import { CaseStudyCarousel } from "../components/ui/casestudy-carousel";
import ProjectCard from "../components/ui/project-card";

function Projects() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Project Card Section */}
        <ProjectCard />
        <Clients />
        <CaseStudyCarousel />
    </div>
  )
}
export default Projects
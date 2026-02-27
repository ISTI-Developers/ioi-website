import { Link } from "react-router-dom";
import { FeaturedImage } from "./featured-image";

interface Project {
    slug: string;
    date: string;
    title: string;
    image: string;
  }
  
  const projects: Project[] = [
    {
      slug: "omron-celebrity-endorser-campaign",
      date: "OCTOBER 2024",
      title: "OMRON CELEBRITY ENDORSER CAMPAIGN",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop",
    },
    {
      slug: "omoda-jaecoo-ph-social-media-leads-gen",
      date: "SEPTEMBER 2024",
      title: "OMODA | JAECOO PH SOCIAL MEDIA LEADS GEN",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=700&fit=crop",
    },
    {
      slug: "cln-kol-marketing",
      date: "AUGUST 2024",
      title: "CLN | KOL MARKETING",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=700&fit=crop",
    },
    {
      slug: "royal-duty-free-social-media",
      date: "OCTOBER 2024",
      title: "ROYAL DUTY FREE SOCIAL MEDIA",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop",
    },
    {
      slug: "kubota-social-media-awareness",
      date: "SEPTEMBER 2024",
      title: "KUBOTA SOCIAL MEDIA AWARENESS",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=700&fit=crop",
    },
    {
      slug: "kalbe-influencer-marketing",
      date: "SEPTEMBER 2024",
      title: "KALBE INFLUENCER MARKETING",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=700&fit=crop",
    },
    {
      slug: "haier-production-launch",
      date: "SEPTEMBER 2024",
      title: "HAIER PRODUCTION LAUNCH",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=700&fit=crop",
    },
    {
      slug: "viu-x-innovation-one-partnership",
      date: "SEPTEMBER 2024",
      title: "VIU X INNOVATION ONE PARTNERSHIP",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=700&fit=crop",
    },
  ]; 
 
 export function ProjectCard() {
  return (
    <div className="max-w-6xl mx-auto w-full">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
              /Projects
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 sm:text-right max-w-xs">
              Located in the Makati, Philippines, our Agency is dedicated to crafting robust and renowned brands.
            </p>
          </div>
            <FeaturedImage section="project_top" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs sm:text-sm text-gray-400">
            <p>Located in the Makati, our studio is dedicated to <br></br> crafting robust and renowned brands.</p>
            <p className="sm:text-right">24 Jan 2024</p>
          </div>
        </div>
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <p className="text-orange-500 text-xs sm:text-sm mb-2">//Projects</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Recent Projects</h2>
            </div>
            <button className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors self-start sm:self-auto">
              More +500
            </button>
          </div>
          <div>
            {projects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-w-[398px] sm:max-w-[1632px] h-auto aspect-[398/558] sm:aspect-[1632/1200] object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-1 sm:mb-2">
                          {project.date}
                        </p>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      <span className="flex items-center gap-2 text-xs sm:text-sm hover:text-orange-500 transition-colors">
                        <span className="leading-tight">
                          EXPLORE<br />PROJECTS
                        </span>
                        <span className="text-xl sm:text-2xl">↗</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
  )
}
export default ProjectCard
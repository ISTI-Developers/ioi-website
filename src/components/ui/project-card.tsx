
import { Link } from "react-router-dom";
import { API_BASE_URL } from "@/hooks/api/config";





export interface ProjectCardProps {
  project: {
    project_id?: number;
    project_name: string;
    project_type: string;
    start_date: string;
    end_date?: string;
    project_category: string;
    company_description: string;
    brand_positioning: string;
    file?: string | string[];

  };
  linkPrefix?: string;
  className?: string;
}


export default function ProjectCard({ project, linkPrefix = "/", className = "" }: ProjectCardProps) {

  const baseUrl = API_BASE_URL;



  return (
    <Link
      to={`${linkPrefix}${project.project_id}`}
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer ${className}`}
    >
      <img
        src={`${baseUrl}/${project.file}`}
        alt={project.project_name}
        className="w-full h-full object-cover rounded-3xl"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
          <div>
            <p className="text-xs text-gray-400 mb-1 sm:mb-2">{project.start_date}</p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
              {project.project_name}
            </h3>
          </div>
          <span className="flex items-center gap-2 text-xs sm:text-sm hover:text-orange-500 transition-colors">
            <span className="leading-tight">EXPLORE<br />PROJECTS</span>
            <span className="text-xl sm:text-2xl">↗</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
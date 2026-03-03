import { useParams } from "react-router-dom";
import { Clients } from "../components/layout/home/Clients";
import { ContactForm } from "../components/pages/forms/contact";
import ProjectLayout from "@/components/layout/project/Layout/ProjectLayout";
import { useProjectByPoints } from "@/hooks/useProjects";


export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  const { data : project, isLoading } = useProjectByPoints(projectId);

  if(isLoading) return <p className="text-white p-10">Loading....</p>;



  return (
    <div className="w-full overflow-x-hidden text-white px-2 lg:px-25 flex flex-col space-y-10 lg:space-y-42">
      <ProjectLayout />
      <Clients />
      <ContactForm />
    </div>
  );
}
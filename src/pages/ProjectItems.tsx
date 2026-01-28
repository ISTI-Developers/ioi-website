import { useParams } from "react-router-dom";

export function ProjectItem() {
  const params = useParams();

  return (
    <>
      <p className="font-semibold">Project Details</p>
      <p>
        <span>Title:</span>
        <span>{params.title}</span>
      </p>
    </>
  );
}

export default ProjectItem;
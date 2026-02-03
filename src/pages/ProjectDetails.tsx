import { useParams } from "react-router-dom";
import { OmronLayout } from "../components/layout/project/OmronLayout";
import { OmodaLayout } from "../components/layout/project/OmodaLayout";


export default function ProjectDetails() {
  const { title } = useParams<{ title: string }>();

  switch (title) {
    case "omron-celebrity-endorser-campaign":
      return <OmronLayout />;

    case "omoda-jaecoo-ph-social-media-leads-gen":
      return <OmodaLayout />;


    case "team-collaboration":
      return <div className="p-10 text-white">Team Collaboration Layout</div>;

    default:
      return (
        <div className="p-10 text-white">
          <h1 className="text-2xl font-bold">Project not found</h1>
        </div>
      );
  }
}

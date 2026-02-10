import { useParams } from "react-router-dom";
import { OmronLayout } from "../components/layout/project/OmronLayout";
import { OmodaLayout } from "../components/layout/project/OmodaLayout";
import { CLNLayout } from "../components/layout/project/CLNLayout";
import { RoyalLayout } from "../components/layout/project/RoyalLayout";
import { KubotaLayout } from "../components/layout/project/KubotaLayout";
import { Clients } from "../components/layout/home/Clients";
import { ContactForm } from "../components/pages/forms/contact";
import { HaierLayout } from "../components/layout/project/HaierLayout";

export default function ProjectDetails() {
  const { title } = useParams<{ title: string }>();

  const content = (() => {
    switch (title) {
      case "omron-celebrity-endorser-campaign":
        return <OmronLayout />;

      case "omoda-jaecoo-ph-social-media-leads-gen":
        return <OmodaLayout />;

      case "cln-kol-marketing":
        return <CLNLayout />;

      case "royal-duty-free-social-media":
        return <RoyalLayout />;

      case "kubota-social-media-awareness":
        return <KubotaLayout />

      case "haier-production-launch":
        return <HaierLayout />

      default:
        return (
          <div className="p-10 text-white">
            <h1 className="text-2xl font-bold">Project not found</h1>
          </div>
        );
    }
  })();

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-4 md:py-6">
      {content}
      <Clients />
      <ContactForm />
    </div>
  );
}
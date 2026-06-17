import Hero from "@/components/ui/hero";
import FirebaseMedia from "@/components/ui/firebase-media";
import Video from "@/components/pages/projects/projectdetails/Video";
import Gallery from "@/components/pages/projects/projectdetails/Gallery";

// ✅ IMPORTANT: match what your API hook actually returns
import type { ProjectWithPointsAndProse } from "@/hooks/useProjects";

type Point = {
  point_id: number;
  type: "problem" | "solution" | "service" | "result";
  content: string;
};

type Prose = {
  prose_id: number;
  content: string;
};

interface ProjectLayoutProps {
  project: ProjectWithPointsAndProse;
}

export default function ProjectLayout({ project }: ProjectLayoutProps) {
  if (!project) return null;

  const points = (project.points ?? []) as Point[];
  const proseList = (project.prose ?? []) as Prose[];

  const problems = points.filter((p) => p.type === "problem");
  const solutions = points.filter((p) => p.type === "solution");
  const services = points.filter((p) => p.type === "service");
  const results = points.filter((p) => p.type === "result");

  const hasPoints =
    problems.length > 0 ||
    solutions.length > 0 ||
    services.length > 0 ||
    results.length > 0;

  return (
    <>
      <div>
        <Hero title={<>{project.project_name}</>} />

        <FirebaseMedia
          path={
            project.file
              ? Array.isArray(project.file)
                ? project.file[0]
                : project.file
              : undefined
          }
          alt="Banner"
          className="w-full h-full object-top rounded-2xl mt-10"
        />
      </div>

      <div className="space-y-24 lg:space-y-40">
        {hasPoints ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-50">
              <div className="space-y-8 max-w-3xl">
                <div className="flex gap-2 text-primary">
                  <h2>{project.project_category}</h2> /{" "}
                  <h2>{project.project_type}</h2>
                </div>

                <h1 className="text-2xl lg:text-4xl font-semibold uppercase">
                  About
                </h1>

                <p className="text-lg lg:text-2xl text-lightgray">
                  {project.company_description}
                </p>

                <p className="text-lg lg:text-2xl text-lightgray">
                  {project.brand_positioning}
                </p>
              </div>

              <div className="mt-14">
                <h1 className="text-2xl lg:text-4xl font-semibold uppercase mb-8">
                  Services Rendered
                </h1>

                <div className="flex flex-wrap gap-3 text-xl">
                  {services.map((p) => (
                    <span
                      key={p.point_id}
                      className="text-white bg-primary rounded-lg px-3 py-1"
                    >
                      {p.content}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Video
              projectId={project.project_id ?? 0}
              height="h-160"
              showAdd={false}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-50">
              <div className="space-y-8 max-w-3xl">
                <h1 className="text-2xl lg:text-4xl uppercase">Opportunity</h1>

                <ul className="list-disc ml-5">
                  {problems.map((p) => (
                    <li key={p.point_id}>{p.content}</li>
                  ))}
                </ul>

                <h1 className="text-2xl lg:text-4xl uppercase">Solution</h1>

                <ul className="list-disc ml-5">
                  {solutions.map((p) => (
                    <li key={p.point_id}>{p.content}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h1 className="text-2xl lg:text-4xl uppercase">Key Results</h1>

                <ul className="list-decimal ml-5 mt-4">
                  {results.map((p) => (
                    <li key={p.point_id}>{p.content}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <Video
              projectId={project.project_id ?? 0}
              height="h-160"
              showAdd={false}
            />

            {proseList.map((p) => (
              <p
                key={p.prose_id}
                className="text-lg lg:text-xl whitespace-pre-wrap"
              >
                {p.content}
              </p>
            ))}
          </div>
        )}

        <div className="mb-30">
          <Gallery projectId={project.project_id ?? 0} showAdd={false} />
        </div>
      </div>
    </>
  );
}

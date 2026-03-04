import { useParams } from "react-router-dom";
import Hero from "@/components/ui/hero";
import { groupGalleryItems, getGridCols, getGridHeights } from "@/lib/galleryUtils";
import { useGallery } from "@/hooks/useGallery";
import FirebaseMedia from "@/components/ui/firebase-media";
import { useProjectByPoints } from "@/hooks/useProjects";
import { formatMonthYear } from "@/lib/dateUtils";


export default function ProjectLayout() {
    const { id } = useParams<{ id: string }>();
    const projectId = Number(id);

    const { data: project, isLoading } = useProjectByPoints(projectId);

    if (isLoading) return <p>Loading...</p>;
    if (!project) return <p>Project not found</p>;

    const { data: galleryData, isLoading: loadingGallery } = useGallery(projectId);
    if (loadingGallery) return <p>Loading gallery...</p>;
    const galleryArray = Array.isArray(galleryData?.gallery) ? galleryData.gallery : [];

    const groupedGallery = groupGalleryItems(galleryArray);


    const points = project?.points ?? [];

    const problems = points.filter((p) => p.type === "problem");
    const solutions = points.filter((p) => p.type === "solution");
    const services = points.filter((p) => p.type === "service");
    const results = points.filter((p) => p.type === "result");

    return (
        <div>
            <Hero
                title={<>{project?.project_name}</>}
                description={"We're located in Makati City, \n Philippines"}
            />

            <FirebaseMedia
                key={project.project_id}
                path={project.file}
                alt="Banner"
                className="w-full h-full object-cover rounded-3xl"

            />


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm lg:text-lg text-primary mb-12 sm:mb-16 mt-10">
                <div>{project.project_category}</div>
                <div className="sm:text-center">
                    {formatMonthYear(project.start_date)} - {formatMonthYear(project.end_date)}
                </div>
                <div className="sm:text-right">{project.project_type}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
                <div>
                    {project.company_description}
                </div>
                <div className="sm:text-center lg:text-2xl">
                    001
                </div>
                <div className="sm:text-right">
                    {project.brand_positioning}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-31 mt-20">

                {/* left */}
                <div className="lg:col-span-8 space-y-20">
                    <h1 className="font-semibold mb-4 text-xl sm:text-2xl">
                        The Problem:
                    </h1>
                    <ul className="list-disc ml-5 lg:text-3xl">
                        {problems.map((p) => (
                            <li key={p.point_id}>{p.content}</li>
                        ))}
                    </ul>

                    <h1 className="font-semibold mb-4 text-xl sm:text-2xl">
                        The Solution:
                    </h1>

                    <ul className="list-disc ml-5 lg:text-3xl">
                        {solutions.map((p) => (
                            <li key={p.point_id}>{p.content}</li>
                        ))}
                    </ul>
                </div>


                {/* right */}
                <div className="lg:col-span-3">
                    <h1 className="text-5xl sm:text-2xl lg:text-5xl font-medium mb-6">
                        Services <br />Rendered:
                    </h1>
                    <ul className="list-decimal ml-12 text-5xl">
                        {services.map((p) => (
                            <li key={p.point_id}>{p.content}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-20">
                <h1 className="text-5xl sm:text-2xl lg:text-5xl font-medium mb-6">
                    Key Results:
                </h1>

                <div className="lg:col-span-1">
                    <ul className="list-decimal ml-12 text-5xl">
                        {results.map((p) => (
                            <li key={p.point_id}>{p.content}</li>
                        ))}

                    </ul>
                </div>

            </div>

            <div className="mt-20 space-y-8">
                {Object.values(groupedGallery).map((group, idx) => {
                    const columns = group[0]?.columns || 1;
                    return (
                        <div key={idx} className={`grid ${getGridCols(columns)} gap-5`}>
                            {group.map(item => {
                                const files: string[] = Array.isArray(item.file) ? item.file : [item.file].filter(Boolean) as string[];

                                return files.map((filePath: string, i: number) => (
                                    <FirebaseMedia
                                        key={`${item.gallery_id}-${i}`}
                                        path={filePath}
                                        alt="Gallery"
                                        className={`w-full ${getGridHeights(columns)} rounded-lg`}
                                    />
                                ));
                            })}
                        </div>
                    );
                })}
            </div>




        </div>
    );
}
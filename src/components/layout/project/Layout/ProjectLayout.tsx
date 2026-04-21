import { useParams } from "react-router-dom";
import Hero from "@/components/ui/hero";
import { useGallery } from "@/hooks/useGallery";
import FirebaseMedia from "@/components/ui/firebase-media";
import { useProjectByIdWithPointsAndProse } from "@/hooks/useProjects";
import { formatMonthYear } from "@/lib/dateUtils";
import Video from "@/components/pages/projects/projectdetails/Video";
import { useVideo } from "@/hooks/useVideo";
import Gallery from "@/components/pages/projects/projectdetails/Gallery";


export default function ProjectLayout() {
    const { id } = useParams<{ id: string }>();
    const projectId = Number(id);

    const { data: project, isLoading } = useProjectByIdWithPointsAndProse(projectId);
    const { data: videoData, isLoading: isLoadingVideo } = useVideo(projectId);
    const { data: galleryData, isLoading: loadingGallery } = useGallery(projectId);


    if (isLoading) return <p>Loading...</p>;
    if (!project) return <p>Project not found</p>;

    if (loadingGallery) return <p>Loading gallery...</p>;


    const galleryArray = Array.isArray(galleryData?.gallery) ? galleryData.gallery : [];
    // const groupedGallery = groupGalleryItems(galleryArray);

    const videos = videoData?.video ?? [];



    const points = project.points ?? [];
    const proseList = project.prose ?? [];

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
                <Hero
                    title={
                        <>
                            {project.project_name?.split(" ").map((word, index, words) => {
                                if (index === 0) {
                                    return word + "\u00A0";
                                }

                                if (words[1] === "&") {
                                    if (index === 1) return word + "\u00A0";
                                    if (index === 2) return word;
                                }

                                if (index === 1) {
                                    return word;
                                }

                                return " " + word;
                            }).join("")}
                        </>
                    }

                    description={"We're located in Makati City, \n Philippines"}
                />

            
                        <FirebaseMedia
                            key={project.project_id}
                            path={project.file}
                            alt="Banner"
                            className="max-w-full h-auto object-top rounded-md mt-10"

                        />
                    </div>

                <div className="space-y-40">


                    {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm lg:text-lg text-primary mb-12 sm:mb-16 mt-10">
                <div>{project.project_category}</div>
                <div className="sm:text-center">
                    {formatMonthYear(project.start_date)} - {formatMonthYear(project.end_date) || "On-going"}
                </div>
                <div className="sm:text-right">{project.project_type}</div>
            </div> */}

                    <div className="grid grid-rows-1 lg:grid-cols-2 gap-x-50">
                        <div className="space-y-8 max-w-3xl">
                            <div className="flex gap-2 text-primary ">
                                <h2>{project.project_category}</h2>
                                /
                                <h2>{project.project_type}</h2>
                            </div>
                            <h1 className="text-4xl font-semibold uppercase">About</h1>
                            <p className="text-2xl text-lightgray">
                                {project.company_description}
                            </p>

                            <p className="text-2xl text-lightgray">
                                {project.brand_positioning}
                            </p>
                        </div>

                        <div className="mt-14">
                            <h1 className="sm:text-2xl lg:text-4xl font-semibold mb-8 uppercase">
                                Services Rendered
                            </h1>
                            <div className="flex flex-wrap gap-3 text-xl leading-relaxed">
                                {services.map((p) => (
                                    <span
                                        key={p.point_id}
                                        className="inline-block text-center text-white bg-primary rounded-lg px-3 py-1"
                                    >
                                        {p.content}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>

                    <Video projectId={projectId} height="h-160" showAdd={false} />

                    {hasPoints ? (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-50 ">

                                {/* Left side: Problem & Solution */}
                                <div className="space-y-8 max-w-3xl">
                                    <h1 className="font-semibold mb-4 sm:text-xl lg:text-4xl uppercase">Opportunity</h1>
                                    <ul className="list-disc ml-5 lg:text-2xl text-lightgray">
                                        {problems.map(p => <li key={p.point_id}>{p.content}</li>)}
                                    </ul>

                                    <h1 className="font-semibold mb-4 sm:text-xl lg:text-4xl uppercase">Solution</h1>
                                    <ul className="list-disc ml-5 lg:text-2xl text-lightgray">
                                        {solutions.map(p => <li key={p.point_id}>{p.content}</li>)}
                                    </ul>
                                </div>

                                {/* Right side: Services */}
                                <div>
                                    <h1 className="sm:text-2xl lg:text-4xl font-semibold uppercase">Key Results</h1>
                                    <ul className="list-decimal mt-4 ml-12 text-2xl">
                            {results.map(p => <li key={p.point_id}>{p.content}</li>)}
                        </ul> 
                                </div>
                            </div>

                        </>
                    ) : (
                        // If no points, render prose as section
                        <div className=" space-y-8">
                            {proseList.map(p => (
                                <p key={p.prose_id} className="whitespace-pre-wrap text-lg lg:text-xl">
                                    {p.content}
                                </p>
                            ))}
                        </div>
                    )}

                    <div className="mb-30">
                        <Gallery projectId={projectId} showAdd={false} />
                    </div>
                </div>
            </>
            );
}
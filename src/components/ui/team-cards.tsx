import type { TeamMember } from "@/data/types";
import { useState, useEffect, useRef } from "react";

interface TeamCardProps {
    members: TeamMember[] | undefined;
}

interface ImageCyclerProps {
    images: string[];
    alt: string;
    className?: string;
}

function ImageCycler({ images, alt, className }: ImageCyclerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isHovered && images.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }, 800);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setCurrentIndex(0);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHovered, images.length]);

    return (
        <div
            className="relative shrink-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={images[currentIndex]}
                alt={alt}
                className={className}
            />
        </div>
    );
}

export default function TeamCards({ members }: TeamCardProps) {
    if (!members) return null;

    return (
        <div className="flex flex-col">
            {members
                .filter((member): member is TeamMember & { file: string[] } =>
                    Array.isArray(member.file) && member.file.length > 0
                )
                .map((member, index, filtered) => (
                    <div key={member.team_id}>
                        <article className="flex flex-col lg:flex-row gap-6 items-end mb-4">
                            <ImageCycler
                                images={member.file}
                                alt={`${member.first_name} ${member.last_name}`}
                                className="w-80 h-80 object-cover rounded-3xl"
                            />
                            <div className="flex flex-col mt-6 text-left">
                                <p className="lg:text-[1.2rem] text-gray-300 mb-8 min-h-20">
                                    {member.quote}
                                </p>
                                <h3 className="lg:text-[1.6rem] font-semibold">
                                    {member.first_name} {member.last_name}
                                </h3>
                                <p className="text-sm text-gray-400">{member.position}</p>
                            </div>
                        </article>

                        {index !== filtered.length - 1 && (
                            <div className="my-12 w-full border-b border-white/20" />
                        )}
                    </div>
                ))}
        </div>
    );
}
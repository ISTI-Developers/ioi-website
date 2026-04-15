import type { TeamMember } from "@/data/types";
import { useState, useEffect, useRef } from "react";

interface TeamCardProps {
    members: TeamMember[] | undefined;
    cols?: number;
    imgClassName?: string;
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
            setCurrentIndex((prev) => (prev + 1) % images.length);
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

const colsMap: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
};

export default function TeamCards({
    members,
    cols,
    imgClassName = "w-full object-cover rounded-2xl",
}: TeamCardProps) {
    if (!members) return null;

    const filtered = members.filter(
        (member): member is TeamMember & { file: string[] } =>
            Array.isArray(member.file) && member.file.length > 0
    );

if (cols) {
    return (
        <div className={`grid ${colsMap[cols] ?? "grid-cols-2 lg:grid-cols-3"} gap-6 `}>
            {filtered.map((member) => (
                <div key={member.team_id} className="flex flex-col items-center text-center">
                    <div className="w-full">
                        <ImageCycler
                            images={member.file}
                            alt={`${member.first_name} ${member.last_name}`}
                            className={imgClassName}
                        />
                    </div>
                    <h3 className="font-bold text-2xl lg:text-3xl text-primary mt-3">
                        {member.first_name} {member.last_name}
                    </h3>
                    <p className="text-white-400 text-lg lg:text-xl font-normal">{member.position}</p>
                    {member.quote && (
                        <p className="text-gray-400 text-base italic leading-snug px-2">"{member.quote}"</p>
                    )}
                    
                </div>
            ))}
        </div>
    );
}
}
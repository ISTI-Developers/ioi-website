import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatMonthYear } from "@/lib/dateUtils";
import FirebaseMedia from "@/components/ui/firebase-media";

export interface Project {
  project_id?: number;
  project_name: string;
  file?: string;
  start_date?: string;
}

export interface HomeCarouselProps {
  projects: Project[];
}

export const HomeCarousel: React.FC<HomeCarouselProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const n = projects.length;

  const desktopOffsets = [0, 440, 800, 1100];
  const mobileOffsets = [0, 220, 400, 550];
  const slideWidth = isMobile ? 270 : 500;

  const getOffset = (slotIndex: number) =>
    -(isMobile ? mobileOffsets[slotIndex] : desktopOffsets[slotIndex]);

  return (
    <div className="relative w-full h-[500px] lg:h-[800px] flex items-center justify-end overflow-hidden"
    >
      {[3, 2, 1, 0].map((slotIndex) => {
        const projectIndex = (activeIndex + slotIndex) % n;
        const project = projects[projectIndex];
        const isActive = slotIndex === 0;

        const scale = 1 - slotIndex * 0.15;

        return (
          <div className="relative z-0">
          <motion.div
            key={project.project_id}
            className="absolute top-1/2 -translate-y-1/2 cursor-pointer select-none origin-center"
            style={{ width: slideWidth }}
            initial={false}
            animate={{
              x: getOffset(slotIndex),
              scale: scale,
              opacity: 1 - slotIndex * 0,
              filter: `blur(${slotIndex * 0}px)`,
              zIndex: 100 - slotIndex,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 25,
              mass: 0.8,
            }}
            onClick={() => setActiveIndex(projectIndex)}
          >
            <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/10 ring-1 ring-white/10">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.5 }}
              >
                <FirebaseMedia
                  path={project.file ?? `projects/${project.project_id}.jpg`}
                  alt={project.project_name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              className="absolute top-[105%] left-0 w-full text-left px-2"
              animate={{ opacity: isActive ? 1 : 0.6 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-zinc-500 sm:text-[11px] lg:text-[20px] font-bold">
                {formatMonthYear(project.start_date)}
              </p>
              <h3 className="text-white font-bold tracking-tighter leading-none lg:text-2xl sm:text-xl">
                {project.project_name}
              </h3>
            </motion.div>
          </motion.div>
          </div>
        );
      })}
    </div>
  );
};
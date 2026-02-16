import { motion, MotionConfig } from "framer-motion";


interface HamburgerProps {
    active: boolean;
    setActive: (active: boolean) => void;
}


export default function Hamburger({ active, setActive }: HamburgerProps) {
    return (
        <MotionConfig
            transition={{
                duration: 0.3,
                ease: "easeInOut",

            }}
        >
            <motion.button
                onClick={() => setActive(!active)}
                className="relative h-10 w-20 cursor-pointer"
                animate={active ? "open" : "closed"}
            >

                <motion.span
                    style={{
                        left: '30%',
                        top: '50%',
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-8 w-0.5 bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "50deg"],
                            left: ["30%", "50%"],
                            backgroundColor: "rgba(255, 255, 255)",
                        },
                        closed: {
                            rotate: ["50deg", "0deg", "0deg"],

                        },
                    }}
                />

                <motion.span
                    style={{
                        left: '40%',
                        top: '50%',
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-8 w-0.5 bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "50deg"],
                            left: ["40%", "50%"],
                            backgroundColor: "rgba(255, 255, 255)",

                        },
                        closed: {
                            rotate: ["50deg", "0deg", "0deg"],
                        },
                    }}
                />

                <motion.span
                    style={{
                        left: '50%',
                        top: '50%',
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-8 w-0.5  bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "50deg"],
                            backgroundColor: "rgba(255, 255, 255)",

                        },
                        closed: {
                            rotate: ["50deg", "0deg", "0deg"],
                        },
                    }}
                />

                <motion.span
                    style={{
                        left: '60%',
                        top: '50%',
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-8 w-0.5  bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "-50deg"],
                            left: ["60%", "50%"],
                            backgroundColor: "rgba(255, 255, 255)",


                        },
                        closed: {
                            rotate: ["-50deg", "0deg", "0deg"],
                        },
                    }}
                />

                <motion.span
                    style={{
                        left: '70%',
                        top: '50%',
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-8 w-0.5  bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "-50deg"],
                            left: ["70%", "50%"],
                            backgroundColor: "rgba(255, 255, 255)",


                        },
                        closed: {
                            rotate: ["-50deg", "0deg", "0deg"],
                        },
                    }}
                />
            </motion.button>

        </MotionConfig>
    )
} 

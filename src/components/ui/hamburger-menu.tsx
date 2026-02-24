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
                className="relative h-10 w-20 cursor-pointer flex items-center justify-between px-2"

                animate={active ? "open" : "closed"}
            >

                <motion.span
                    style={{
                        left: '60%',
                        top: '50%',
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-8 w-0.5 bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "50deg"],
                            left: ["60%", "80%"],
                       
                            backgroundColor: "rgba(255, 255, 255)",
                        },
                        closed: {
                            rotate: ["50deg", "0deg", "0deg"],

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
                    className="absolute h-8 w-0.5 bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "50deg"],
                            left: ["70%", "80%"],
                            backgroundColor: "rgba(255, 255, 255)",

                        },
                        closed: {
                            rotate: ["50deg", "0deg", "0deg"],
                        },
                    }}
                />

                <motion.span
                    style={{
                        left: '80%',
                        top: '50%',
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-8 w-0.5  bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "50deg"],
                            left: ["80%", "80%"],
                            backgroundColor: "rgba(255, 255, 255)",

                        },
                        closed: {
                            rotate: ["50deg", "0deg", "0deg"],
                        },
                    }}
                />

                <motion.span
                    style={{
                        left: '90%',
                        top: '50%',
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-8 w-0.5  bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "-50deg"],
                            left: ["90%", "80%"],
                            backgroundColor: "rgba(255, 255, 255)",


                        },
                        closed: {
                            rotate: ["-50deg", "0deg", "0deg"],
                        },
                    }}
                />

                <motion.span
                    style={{
                        left: '100%',
                        top: '50%',
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-8 w-0.5  bg-orange-500"
                    variants={{
                        open: {
                            rotate: ["0deg", "0deg", "-50deg"],
                            left: ["100%", "80%"],
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

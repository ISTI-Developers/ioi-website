// components/ui/Hamburger.tsx
import { motion } from "framer-motion";

interface HamburgerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Hamburger({ open, setOpen }: HamburgerProps) {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="relative w-12 h-12 flex items-center justify-center focus:outline-none"
    >
      {/* LEFT LINE */}
      <motion.span
        initial={false}
        className="absolute h-1 w-8 bg-primary rounded"
        animate={
          open
            ? { x: ["-10px", "0px"], rotate: [0, 45], opacity: [1, 1, 0] }
            : { x: ["0px", "-10px"], rotate: [45, 0], opacity: [0, 1, 1] }
        }
        transition={{ duration: 0.4 }}
      />

      {/* CENTER LINE */}
      <motion.span
        initial={false}
        className="absolute h-1 w-8 bg-primary rounded"
        animate={
          open
            ? { scaleX: [1, 0.2], rotate: [0, 45] }
            : { scaleX: [0.2, 1], rotate: [45, 0] }
        }
        style={{ originX: 0.5 }}
        transition={{ duration: 0.4 }}
      />

      {/* RIGHT LINE */}
      <motion.span
        initial={false}
        className="absolute h-1 w-8 bg-primary rounded"
        animate={
          open
            ? { x: ["10px", "0px"], rotate: [0, -45], opacity: [1, 1, 0] }
            : { x: ["0px", "10px"], rotate: [-45, 0], opacity: [0, 1, 1] }
        }
        transition={{ duration: 0.4 }}
      />

      {/* SECOND ARM of X */}
      <motion.span
        initial={false}
        className="absolute h-1 w-8 bg-primary rounded"
        animate={
          open
            ? { rotate: [-45, -45], opacity: [0, 1] }
            : { rotate: [-45, 0], opacity: [1, 0] }
        }
        transition={{ duration: 0.4 }}
      />
    </button>
  );
}

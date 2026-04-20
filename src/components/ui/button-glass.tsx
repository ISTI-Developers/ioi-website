import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassIconButton({ children, className, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "backdrop-blur-md bg-white/20 border border-white/30 shadow-md rounded-full p-3 flex items-center justify-center text-white transition hover:bg-white/30 hover:scale-110 cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}
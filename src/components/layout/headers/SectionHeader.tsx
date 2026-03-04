

interface SectionHeaderProps {
    category: string | React.ReactNode;
    description?: string;
    noMarginTop?: boolean;
}


export default function SectionHeader({
    category,
    description,
    noMarginTop = false
}: SectionHeaderProps) {
    return (
        <section className={`text-lightgray ${noMarginTop ? "":  "mt-50"}`}>
            <div className="flex flex-col ">
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                   Current Openings | {category}
                </h2>
        
                <p className="mt-4 text-sm md:text-base max-w-md">
                    {description}
                </p>
            </div>
        </section>
    );
}



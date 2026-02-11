

interface SectionHeaderProps {
    category: string | React.ReactNode;
    description?: string;
}


export default function SectionHeader({
    category,
    description
}: SectionHeaderProps) {
    return (
        <section className=" text-lightgray  mt-20">
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



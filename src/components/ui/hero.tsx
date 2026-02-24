
interface HeroProps {
    title: string | React.ReactNode;
    description?: string;
    isHome?: boolean;
}

export default function Hero({
    title,
    description,
    isHome = false
}: HeroProps) { 
    return (
        <div className="w-full text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-30 items-end py-10">
                <h1 className={`font-heading font-semibold lg:col-span-8
                    ${isHome ? 
                        "text-[2.4rem]/12 lg:text-[7.2rem] lg:leading-[0.9] lg-tracking-tighter lg:justify-start" : 
                        "text-4xl lg:text-[5.5rem] justify-end lg:justify-end"}
                `}>
                    {title}
                </h1>

                <div className={`flex items-end
                    ${isHome ? "lg:justify-start lg:col-span-4" : "lg:justify-between lg:col-span-4"}
                `}>

                    {description && (
                    <p className="whitespace-pre-line text-gray-400 text-md lg:text-xl max-w-80 ml-auto text-left font-semibold">
                        {description}
                    </p>
                    )}
                </div>

            </div>
        </div>
    );
}
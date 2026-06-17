
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
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-2 items-end pt-20">
                
                <h1 className={`font-heading font-semibold 
                    ${isHome ? 
                        "text-[2.4rem]/12 lg:text-[6rem] lg:leading-[0.9] lg-tracking-tighter" : 
                        "text-4xl lg:text-[6rem]"}
                `}>
                    {title}
                </h1>

                <div className={`flex ${isHome ? "lg:justify-start" : "lg:justify-end"}`}>
                    {description && (
                        <p className="whitespace-pre-line text-gray-400 text-md lg:text-lg max-w-80 ml-auto  text-left font-semibold">
                            {description}
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}
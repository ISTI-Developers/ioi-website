
import test from "@/assets/test.jpg";

export function FeaturedImage() {
    return (
        <div className="h-auto w-full mt-25 flex items-center justify-center lg:py-10">
            <div className="relative w-full lg:max-w-7xl 
                h-112.5 lg:h-auto 
                lg:aspect-video 
                overflow-hidden">
                <img src={test} alt= "Team Picture" className="w-full h-full object-cover rounded-3xl" />
            
            <div className="absolute inset-0 lg:flex justify-between p-14 text-white hidden">
                <span className="text-md ">2024</span>
                <span className="text-md  ">innovationone.com.ph</span>
            </div>
            </div>
           
        </div>
    );
};
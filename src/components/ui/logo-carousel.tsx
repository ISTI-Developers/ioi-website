import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'


export function LogoCarousel() {
    const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      dragFree: false,
      containScroll: false
    },
    [AutoScroll({ 
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false
    })]
  )


    return(
<div className="relative w-screen left-1/2 -ml-[50vw] overflow-hidden">
        <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {/* Duplicate slides for seamless infinite scroll */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex">
              <div className="flex-[0_0_auto] pr-8">
                <div className="w-[300px] h-[90px] overflow-hidden">
                  <img 
                    src="https://capitaltractor.com/wp-content/uploads/2025/03/Kubota-Emblem.png" 
                    alt="Kubota Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className="flex-[0_0_auto] pr-8">
                <div className="w-[300px] h-[90px] overflow-hidden">
                  <img 
                    src="https://imagegroup1.haier.com/global/images/hg2020_header_logo_w_2024.png" 
                    alt="Haier Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className="flex-[0_0_auto] pr-8">
                <div className="w-[300px] h-[90px] overflow-hidden">
                  <img 
                    src="https://cdn.prod.website-files.com/6529003b937ddaacc193c04f/65b98e18415e9f6fa8a7d5c5_Logo%20tcm%20no%20trademark-04.png" 
                    alt="Transcycle" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className="flex-[0_0_auto] pr-8">
                <div className="w-[300px] h-[90px] overflow-hidden">
                  <img 
                    src="https://logos-world.net/wp-content/uploads/2024/01/Play-Doh-Logo.png" 
                    alt="Play-Doh" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-[0_0_auto] pr-8">
                <div className="w-[300px] h-[90px] rounded-2xl overflow-hidden">
                  <img 
                    src="https://cdn.brandfetch.io/idg-aVndVk/w/131/h/50/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B" 
                    alt="CLN" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-[0_0_auto] pr-8">
                <div className="w-[300px] h-[90px] rounded-2xl overflow-hidden">
                  <img 
                    src="https://info.airlinehyd.com/hubfs/omron-logo-white.png" 
                    alt="Omron" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-[0_0_auto] pr-8">
                <div className="w-[300px] h-[90px] rounded-2xl overflow-hidden">
                  <img 
                    src="https://omodajaecoosprings.co.za/wp-content/uploads/2023/10/omoda-logo-white.png" 
                    alt="Omoda" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-[0_0_auto] pr-2">
                <div className="w-[300px] h-[90px] rounded-2xl overflow-hidden">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Yale_Logo_Primary_RGB.png" 
                    alt="Yale" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-[0_0_auto] pr-8">
                <div className="w-[300px] h-[90px] rounded-2xl overflow-hidden">
                  <img 
                    src="https://d2ur52ppwp0us4.cloudfront.net/assets/img/smac_logo.png" 
                    alt="SMAC" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
}
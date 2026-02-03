import OmronImageGrid from "./OmronGrid";

export function OmodaLayout() {
    return (
      <section className="min-h-screen bg-black text-white px-4 sm:px-8 lg:px-20 py-12 sm:py-16">
  
        <header className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 sm:mb-16">
          <div className="sm:col-span-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Omoda & Jaecoo  <br /> Philippines
            </h1>
          </div>
  
          <div className="hidden sm:block text-xs text-right text-gray-400 self-start">
            We’re located in Makati City, <br />
            Philippines
          </div>
        </header>
  
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden mb-2 sm:mb-6">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop"
            alt="Omron Celebrity Endorser"
            className="w-full h-[50vh] sm:h-[55vh] lg:h-[80vh] object-cover"
          />
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#FF6014] mb-12 sm:mb-16">
          <div>Campaign & Content Development</div>
          <div className="sm:text-center">December 2024 – December 2025</div>
          <div className="sm:text-right">Campaign</div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 text-sm text-gray-600 mb-12">
          <div className="sm:col-span-5">
            OMODA | JAECOO, the two sister brands of the Chery Group, officially launched 
            in the Philippines last February 2025, positioned towards a more modern, lifestyle 
            oriented market for both city-driving and off-road capabilities.
          </div>
          <div className="sm:col-span-2 text-center font-light text-gray-500">
            001
          </div>
          <div className="sm:col-span-5">
            Omoda focuses on stylish, tech-forward vehicles, while Jaecoo targets a premium off-road 
            SUV market, blending urban sophistication with off-road capability - but also prides itself 
            on global credibility and accreditation on the technology it offers.
          </div>
        </div>
  

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-semibold mb-4 text-xl sm:text-2xl">
              The Problem :
            </h2>
            <ul className="list-disc pl-4 space-y-3 text-sm text-gray-300 mb-10 sm:mb-16">
              <li>
                While the OMODA | JAECOO brand is positioned towards the evolving 
                needs of modern drivers and consumers, they are facing a challenge 
                to introduce itself into an aggressively growing albeit saturated 
                automotive market, with particular opportunity focus on the rise of 
                demand for EVs.
              </li>
              <li>
                There is also a challenge to bridge the gap in terms of leads generation 
                through online platforms, given that the brand has a limited dealership 
                network and a high sales volume target.
              </li>
            </ul>
  
            <h2 className="font-semibold mb-4 text-xl sm:text-2xl">
              The Solution :
            </h2>
            <ul className="list-disc pl-4 space-y-3 text-sm text-gray-300">
              <li>
                <span>
                  AWARENESS & LEADS GEN CAMPAIGN
                </span>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Drive digital awareness to support on-ground efforts</li>
                  <li>Leads Gen Test & Learn</li>
                  <li>Retargeting and Remarketing</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium mb-6">
              Services Rendered:
            </h2>
            <ol className="list-decimal pl-8 space-y-3 text-lg sm:text-3xl">
              <li>Ads Management</li>
              <li>Campaign & Content Development</li>
              <li>Community Management </li>
            </ol>
          </div>
        </div>
  
  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-3 font-semibold text-3xl md:text-4xl">
              Key Results:
            </div>
          <div className="lg:col-span-3">
            <ol
              className="pl-5 text-base sm:text-lg lg:text-xl list-decimal">
              <li> 864% Increase in Average Monthly Leads </li>
              <li> -91% Reduction in Cost per Lead </li>
              <li> 25% Increase in Follwer Growth </li>
              <li> +17pts in Positive Comment Share </li>
            </ol>
          </div>
      </div>
      <OmronImageGrid />
      </section>
    );
  }
  
import CLNImageGrid from "../Grid/CLNGrid";

export function CLNLayout() {
    return (
      <section className="min-h-screen bg-black text-white px-4 sm:px-8 lg:px-20 py-12 sm:py-16">
  
        {/* HEADER */}
        <header className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 sm:mb-16">
          <div className="sm:col-span-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              CLN KOL <br /> Campaign
            </h1>
          </div>
  
          <div className="hidden sm:block text-xs text-right text-gray-400 self-start">
            We’re located in Makati City, <br />
            Philippines
          </div>
        </header>
  
        {/* HERO IMAGE */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden mb-2 sm:mb-6">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop"
            alt="Omron Celebrity Endorser"
            className="w-full h-[50vh] sm:h-[55vh] lg:h-[80vh] object-cover"
          />
        </div>
  
        {/* META INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-400 mb-12 sm:mb-16">
          <div>Celebrity Endorser Collaboration</div>
          <div className="sm:text-center">November 2024 – December 2025</div>
          <div className="sm:text-right">Campaign</div>
        </div>
  
        {/* INTRO TEXT */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 text-sm text-gray-400 mb-12">
          <div className="sm:col-span-5">
            OMRON Healthcare stands as the premier provider of healthcare
            electronics in the Philippines, dedicated to making personal
            healthcare accessible to everyone through innovative and digital
            solutions.
          </div>
  
          <div className="sm:col-span-2 text-center font-light text-gray-500">
            001
          </div>
  
          <div className="sm:col-span-5">
            This heritage brand prides itself on products that are durable,
            accessible, and accurate — making healthcare a proactive solution
            readily accessible for the evolving needs of Filipinos.
          </div>
        </div>
  
        {/* PROBLEM / SOLUTION + SERVICES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
  
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7">
            <h2 className="font-semibold mb-4 text-xl sm:text-2xl">
              The Problem :
            </h2>
  
            <ul className="list-disc pl-4 space-y-3 text-sm text-gray-300 mb-10 sm:mb-16">
              <li>
                There is a lack of awareness and understanding of accuracy and reliability of 
                health devices limits purchase behavior to cost considerations alone, making the 
                brand promise & USP harder to understand for the average Juan.
              </li>
              <li>
                Counterfeit OMRON products have also been on the rise, harming brand equity and consumer
                trust of the market leader brand.
              </li>
            </ul>
  
            <h2 className="font-semibold mb-4 text-xl sm:text-2xl">
              The Solution :
            </h2>
  
            <ul className="list-disc pl-4 space-y-3 text-sm text-gray-300">
              <li>
                To strengthen the connection between the brand and consumers, 
                while upholding OMRON's commitment to trust, accuracy, and reliability 
                within its target market, we enlisted Jolina Magdangal as OMRON's brand ambassador.
              </li>
              <li>
                We successfully balanced trends, nostalgia, and brand communications in a year-long 
                campaign for a popular icon resonating with millennials and early GenX audiences.
              </li>
            </ul>
          </div>
  
          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium mb-6">
              Services Rendered:
            </h2>
  
            <ol className="list-decimal pl-8 space-y-3 text-lg sm:text-3xl">
              <li>Influencer Management</li>
              <li>Content Development</li>
              <li>Ads Management</li>
              <li>Community Management & Social Listening</li>
            </ol>
          </div>
        </div>

  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div className="lg:col-span-3 font-semibold text-3xl md:text-4xl">
      Key Results:
    </div>
  
    <div className="lg:col-span-3">
      <ol
        className="pl-5 space-y-4 text-base sm:text-lg lg:text-xl"
        style={{ listStyleType: "lower-alpha", margin: 0 }}
      >
        <li>
          <span className="font-medium text-white">
            6.5% Organic Engagement Rate (Influencer)
          </span>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>10× above Meta Average</li>
            <li>4× above TikTok Average</li>
          </ul>
        </li>
  
        <li className="font-medium text-white">
          70% Increase in High Quality Inquiries & Advocacy Engagements
        </li>
  
        <li className="font-medium text-white">
          Significant behavior change from 80% reactive counterfeit concerns
          to 70% proactive awareness & inquiries
        </li>
  
        <li>
          <span className="font-medium text-white">
            Ecommerce Consideration & Conversion Lift
          </span>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>43% Lift in CTR</li>
            <li>79% Consideration (Add to Cart)</li>
            <li>112% Conversion (Purchase) Rate</li>
          </ul>
        </li>
      </ol>
    </div>
  </div>
          <CLNImageGrid />
      </section>
    );
  }
  
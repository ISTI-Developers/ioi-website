import ViuImageGrid from "../Grid/ViuGrid";

export function ViuLayout() {
    return (
      <section className="min-h-screen bg-black text-white px-4 sm:px-8 lg:px-20 py-12 sm:py-16">
  
        {/* HEADER */}
        <header className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 sm:mb-16">
          <div className="sm:col-span-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              VIU X IOI <br /> PARTNERSHIP
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

        <p className="text-base md:text-lg lg:text-xl whitespace-pre-line"> 
            In a world where brands aim to create a lasting impact, InnovationOne, Inc. (IOI), 
            United Neon Advertising Group's (UNMG) dedicated digital arm, and VIU, one of Asia's 
            Leading over-the-top (OTT) streaming platforms, solidified their partnership on November 12, 2025. 
            <br></br> <br></br>
            The goal? To bring brands to the hearts of the audience with a dedicated vision to "meet audiences 
            at the height of emotional engagement."
            <br></br> <br></br>
            VIU is home to various titles, from Korean dramas to regionally-produced titles, and have since made 
            their mark in both local and international streaming scene. Partnering with IOI allows them to engage 
            with an audience made up of young, digital-first, and highly receptive individuals, and gives brands an 
            avenue to creating more storytelling-led campaigns.
            <br></br> <br></br>
            But with such a saturated industry, what makes this partnership a cut above the rest?
            "Filipinos are among the world's biggest consumers of Korean and Asian Entertainment," shares Raphael Layosa, 
            Managing Director of IOI. "This engagement gives brands an unmatched opportunity: to appear alongside content 
            that audiences are emotionally invested in - just as they're streaming, binge-watching, and talking about it online."
            <br></br> <br></br>
            Layosa stresses that partaking in any series takes a level of emotional investment. And with the reach VIU holds as 
            one of Asia’s top OTT streaming platforms, brands can extend their reach to a wider audience through different executions.
            <br></br> <br></br>
            Benjamin Lim, Deputy COO of UNMG and CEO of IOI, also shares that this arrangement aligns with the company's mission to push 
            the boundaries of modern advertising. Streaming has become the new primetime, and brands need to show up where culture is being 
            shaped in real time.
            <br></br> <br></br>
            He further mentions that advertisers are given not just media space, but cultural access - powered by data, content, and a deep 
            understanding of what audiences love.
            <br></br> <br></br>
            InnovationOne and VIU share a vision to create brand love amongst not only their clients, but also a growing audience. This philosophy 
            is sure to take any brand to their new digital era.
            <br></br> <br></br><br></br>
            What can YOU get from this opportunity? 
            <br></br><br></br>
            <ol className="list-decimal pl-5">
                <li>Ad Placement on Viu Platform</li>
                <li>Ad Placement in Viu Original TV series </li>
                <li>Ad Placement on Social Media</li>
                <li>Ad Placement on OOH UNMG Sites</li>
                <li>Event Sponsorship in Major cities AND nationwide </li>
            </ol>
            <br></br>
            Interested in learn more? Want to know more opportunities? 
            <br></br>
            Contact: <a href="tel:09171120767" className="hover:underline text-orange-500">09171120767</a> or{' '}
            <a href="mailto:jquinajon@innovationone.com.ph" className="hover:underline text-orange-500">
            jquinajon@innovationone.com.ph
            </a>
        </p>
        <ViuImageGrid />

      </section>
    );
  }
  
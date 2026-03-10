export function ContactForm() {
    return (
        <div className="max-w-4xl mx-auto w-full ">
        <header className="text-lightgray mb-10 lg:mb-20 space-y-4 leading-6 max-w-212 mx-auto px-4 text-left">
            <h1 className="font-heading text-[2.8rem] md:text-7xl lg:text-[7rem] font-semibold">Contact us</h1>
            <p className="text-[0.9rem]/5 lg:text-[1.63rem]">Our clients are more than just collaborators—they are visionaries <br/>who inspire us to push the boundaries of design and innovation.</p>
        </header>
            <div className="space-y-5 lg:space-y-6 mb-5 lg:mb-16 max-w-212 mx-auto ">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full bg-transparent border-b border-gray-700 py-5  px-4  sm:text-xs lg:text-2xl  text-white placeholder-text-darkgray focus:outline-none focus:border-orange-500 transition-colors"
                    />
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full bg-transparent border-b border-gray-700 py-5  px-4 sm:text-xs lg:text-2xl text-white placeholder-text-darkgray focus:outline-none focus:border-orange-500 transition-colors"
                    />
                </div>

                <div>
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows={1}
                        className="w-full bg-transparent border-b border-gray-700 py-5  px-4 sm:text-xs lg:text-2xl  text-white placeholder-text-darkgray focus:outline-none focus:border-orange-500 transition-colors resize-none h-40"
                    />
                    
                </div>

                <button
                    className="w-full bg-linear-to-l from-dark to-light text-white  py-5  px-4 transition-colors flex items-center justify-between group text-md sm:text-xs lg:text-2xl"
                >
                    <span>Send Message</span>
                    <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform">|||||</span>
                </button>
            </div>
        </div>
    );


}
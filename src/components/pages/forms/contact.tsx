export function ContactForm() {
    return (
        <div className="max-w-3xl mx-auto w-full ">
        <header className="text-lightgray mb-10 lg:mb-20 space-y-4 leading-6">
            <h1 className="text-[2.8rem] md:text-7xl lg:text-8xl font-semibold">Contact us</h1>
            <p className="text-[0.9rem]/5 lg:text-[1rem]">Our clients are more than just collaborators—they are visionaries <br/>who inspire us to push the boundaries of design and innovation.</p>
        </header>
            <div className="space-y-5 lg:space-y-6 mb-5 lg:mb-16 max-w-2xl  mx-auto ">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full bg-transparent border-b border-gray-700 py-2  px-4  sm:text-xs lg:text-lg  text-white placeholder-text-darkgray focus:outline-none focus:border-orange-500 transition-colors"
                    />
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full bg-transparent border-b border-gray-700 py-2  px-4 sm:text-xs lg:text-lg text-white placeholder-text-darkgray focus:outline-none focus:border-orange-500 transition-colors"
                    />
                </div>

                <div>
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows={1}
                        className="w-full bg-transparent border-b border-gray-700 py-2 px-4 sm:text-xs lg:text-lg  text-white placeholder-text-darkgray focus:outline-none focus:border-orange-500 transition-colors resize-none mt-24"
                    />
                    
                </div>

                <button
                    className="w-full bg-linear-to-l from-dark to-light text-white  py-3  px-4 transition-colors flex items-center justify-between group text-md sm:text-xs lg:text-lg"
                >
                    <span>Send Message</span>
                    <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform">|||||</span>
                </button>
            </div>
        </div>
    );


}
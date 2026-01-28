

export default function Services() {

  const services = [
    { id: '/01', category: 'Campaigns', title: '360 Campaign Projects', desc: 'Transform your website into a user-friendly and visually appealing platform with our UX design expertise.' },
    { id: '/02', category: 'Content', title: 'Multimedia Creation', desc: 'Enhance your brand\'s visual appeal with our top-notch multi media design services.' },
    { id: '/03', category: 'Branding', title: 'Branding Communication', desc: 'Elevate your brand\'s image, communication and identity with our comprehensive branding strategies.' },
    { id: '/04', category: 'SEO/SEM', title: 'Digital Advertisement', desc: 'Elevate your brand\'s image and identity with our comprehensive branding strategies.' },
    { id: '/05', category: 'UI/UX', title: 'Website Development', desc: 'Transform your website into a user-friendly and visually appealing platform with our UX design expertise.' },
    { id: '/06', category: 'Research', title: 'Marketing Strategy', desc: 'Transform your website into a user-friendly and visually appealing platform with our UX design expertise.' },
  ];

  return (
    <div className="w-full ">
      <h2 className="text-primary text-sm uppercase">//Services</h2>
      <p className="text-white text-3xl w-full max-w-[90vw] md:max-w-[20rem] lg:max-w-140">
        By harnessing both creativity and strategy, we turn visions into actuality!
      </p>

      <section className="text-white py-10 lg:py-20 w-full ">
        <div className="flex justify-start md:justify-end w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 gap-x-12 gap-y-10
          lg:gap-y-40 max-w-7xl">
            {services.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 w-full">
                <div>
                  <span className="text-xl text-gray  ">{item.id}</span>
                  <h2 className="text-3xl text-white mb-30 lg:mb-40">{item.category}</h2>
                </div>

                <h3 className="text-xl text-white">{item.title}</h3>

                <p className="text-md text-[#777777] leading-relaxed sm:w-full lg:w-68">{item.desc}</p>

                <hr className="border-t border-white/20 sm:hidden w-full" />

              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

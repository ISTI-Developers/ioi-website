import test from "@/assets/test.jpg";

export default function TeamMembers() {
  return (
    <section className="py-20 text-white mb-100">
      <div className="max-w-6xl px-2 sm:px-8 lg:px-24">
        <header className="ml-auto w-full lg:w-2/3 mb-20">
          <span className="block text-sm text-primary mb-2">
            // Our awesome team
          </span>
          <h1 className="text-2xl lg:text-7xl font-bold max-w-xl">
            Team members
          </h1>
        </header>

        <div className="flex items-end relative gap-x-12 w-full">
          <div className="flex items-end">
            <span className="uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-[12rem] font-bold">
              Mancomm
            </span>
          </div>

          <div className="flex flex-col">
            <article className="flex gap-6 items-end">
              <img
                src={test}
                alt="Francis Ceruma"
                className="w-80 h-80 object-cover rounded-3xl"
              />

              <div className="mt-6 text-left ">
                <p className="text-sm text-gray-300 mb-8">
                  Our leadership team is driven by a clear vision and unwavering commitment to our mission.
                </p>

                <h3 className="font-semibold">Francis Ceruma</h3>
                <p className="text-sm text-gray-400">
                  Accounts Management Head
                </p>
              </div>
            </article>

            <div className="my-8 w-full border-b border-white/20" />

            <img src={test} alt="" className="w-full h-80 object-cover rounded-3xl" />
            <div className="my-8 w-full border-b border-white/20" />
            <img src={test} alt="" className="w-full h-80 object-cover rounded-3xl" />
            <div className="my-8 w-full border-b border-white/20" />
            <img src={test} alt="" className="w-full h-80 object-cover rounded-3xl" />

          </div>
        </div>
      </div>
    </section>
  );
}

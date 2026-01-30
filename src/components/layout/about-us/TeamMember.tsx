import TeamCards from "../../ui/team-cards";

export default function TeamMembers() {
  return (
    <section className="py-20 text-white overflow-x-hidden">
      <div className="max-w-6xl px-2 sm:px-8 lg:px-24">
        
        
        <header className="ml-auto w-full lg:w-2/3 mb-20">
          <span className="block text-sm text-primary mb-2">
            // Our awesome team
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold max-w-xl">
            Team members
          </h1>
        </header>

        <div className="flex items-end relative lg:gap-x-12 w-full">
          <div className="flex items-end">
            <span className="hidden lg:block uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-[12rem] font-bold">
              Mancomm
            </span>
          </div>

          <div className="flex flex-col">
            <TeamCards />
          </div>
        </div>


         <header className="ml-auto w-full lg:w-2/3 mb-20 mt-40">
          <span className="block text-sm text-primary mb-2">
            // Our awesome team
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold max-w-xl">
            Accounts members
          </h1>
        </header>

          <div className="flex items-end relative lg:gap-x-12 w-full">
          <div className="flex items-end">
            <span className="invisible hidden lg:block uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-[12rem] font-bold">
              Mancomm
            </span>
          </div>

          <div className="flex flex-col">
            <TeamCards />
          </div>
        </div>


        
      </div>
    </section>
  );
}

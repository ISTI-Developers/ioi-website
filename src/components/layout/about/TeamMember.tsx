import TeamCards from "../../ui/team-cards";
import { useTeams } from "@/hooks/useTeam";


export default function TeamMembers() {

  const { data: teamMembers, isLoading } = useTeams();

  if (isLoading) return <p>Loading...</p>;

  const mancommMembers = teamMembers?.filter(
    (teamMembers) => teamMembers.is_mancomm === 1
  );

  const accountMembers = teamMembers?.filter(
    (teamMembers) => teamMembers.role_id === 1)
    .sort((a, b) => {

      if (a.is_mancomm !== b.is_mancomm) {
        return b.is_mancomm - a.is_mancomm;
      }

      return a.role_id - b.role_id

    });


  const creativeMembers = teamMembers?.filter(
    (teamMembers) => teamMembers.role_id === 2)
    .sort((a, b) => {

      if (a.is_mancomm !== b.is_mancomm) {
        return b.is_mancomm - a.is_mancomm;
      }

      return a.role_id - b.role_id

    });


  const strategyMembers = teamMembers?.filter(
    (teamMembers) => teamMembers.role_id === 3)
    .sort((a, b) => {

      if (a.is_mancomm !== b.is_mancomm) {
        return b.is_mancomm - a.is_mancomm;
      }

      return a.role_id - b.role_id

    });


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
            <TeamCards members={mancommMembers} />
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

        <div className="flex items-start relative lg:gap-x-12 w-full">
          <div className="flex items-start">
            <span className="invisible hidden lg:block uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-[12rem] font-bold">
              Mancomm
            </span>
          </div>

          <div className="flex flex-col">
            <TeamCards members={accountMembers} />

          </div>
        </div>

        <header className="ml-auto w-full lg:w-2/3 mb-20 mt-40">
          <span className="block text-sm text-primary mb-2">
            // Our awesome team
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold max-w-xl">
            Creative members
          </h1>
        </header>

        <div className="flex items-start relative lg:gap-x-12 w-full">
          <div className="flex items-start">
            <span className="invisible hidden lg:block uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-[12rem] font-bold">
              Mancomm
            </span>
          </div>

          <div className="flex flex-col">
            <TeamCards members={creativeMembers} />

          </div>
        </div>



        <header className="ml-auto w-full lg:w-2/3 mb-20 mt-40">
          <span className="block text-sm text-primary mb-2">
            // Our awesome team
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold max-w-xl">
            Strategy members
          </h1>
        </header>

        <div className="flex items-start relative lg:gap-x-12 w-full">
          <div className="flex items-start">
            <span className="invisible hidden lg:block uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-[12rem] font-bold">
              Mancomm
            </span>
          </div>

          <div className="flex flex-col">
            <TeamCards members={strategyMembers} />

          </div>
        </div>



      </div>
    </section>
  );
}

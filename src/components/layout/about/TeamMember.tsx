import TeamCards from "../../ui/team-cards";
import { useTeams } from "@/hooks/useTeam";


export default function TeamMembers() {

  const { data: teamMembers, isLoading } = useTeams();

  if (isLoading) return <p>Loading...</p>;

  const mancommMembers = teamMembers?.filter(
    (teamMembers: { is_mancomm: number; }) => teamMembers.is_mancomm === 1
  );

  const accountMembers = teamMembers?.filter(
    (teamMembers: { role_id: number; }) => teamMembers.role_id === 1)
    .sort((a: { is_mancomm: number; role_id: number; }, b: { is_mancomm: number; role_id: number; }) => {

      if (a.is_mancomm !== b.is_mancomm) {
        return b.is_mancomm - a.is_mancomm;
      }

      return a.role_id - b.role_id

    });


  const creativeMembers = teamMembers?.filter(
    (teamMembers: { role_id: number; }) => teamMembers.role_id === 2)
    .sort((a: { is_mancomm: number; role_id: number; }, b: { is_mancomm: number; role_id: number; }) => {

      if (a.is_mancomm !== b.is_mancomm) {
        return b.is_mancomm - a.is_mancomm;
      }

      return a.role_id - b.role_id

    });


  const strategyMembers = teamMembers?.filter(
    (teamMembers: { role_id: number; }) => teamMembers.role_id === 3)
    .sort((a: { is_mancomm: number; role_id: number; }, b: { is_mancomm: number; role_id: number; }) => {

      if (a.is_mancomm !== b.is_mancomm) {
        return b.is_mancomm - a.is_mancomm;
      }

      return a.role_id - b.role_id

    });


  return (
    <section className="py-20 text-white overflow-x-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <header className="w-full lg:ml-45 mb-30">
          <span className="block text-sm lg:text-2xl text-primary mb-2">
            // Our awesome team
          </span>
          <h1 className="font-heading text-5xl lg:text-7xl font-bold max-w-xl ">
            Team members
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end w-full ">
          <div className="flex items-end">
            <span className="hidden lg:block uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180 text-[12rem] lg:text-[20rem]  font-bold tracking-tighter ">
              Mancomm
            </span>
          </div>

          <div>
            <TeamCards members={mancommMembers} />
          </div>

        </div>


        <header className="w-full lg:ml-45 mb-30 mt-80">
          <span className="block text-sm lg:text-2xl text-primary mb-2">
          // Our awesome team
          </span>
          <h1 className="font-heading text-5xl lg:text-7xl font-bold max-w-xl">
            Accounts members
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-start w-full">


          <div className="hidden lg:block w-120" />

          <div>
            <TeamCards members={accountMembers} />
          </div>
        </div>



        <header className="w-full lg:ml-45 mb-30 mt-40">
          <span className="block text-sm lg:text-2xl text-primary mb-2">
          // Our awesome team
          </span>
          <h1 className="font-heading text-5xl lg:text-7xl font-bold max-w-xl">
            Creative members
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-start w-full">

          <div className="hidden lg:block w-120" />

          <div>
            <TeamCards members={creativeMembers} />
          </div>
        </div>




        <header className="w-full lg:ml-45 mb-30 mt-40">
          <span className="block text-sm lg:text-2xl text-primary mb-2">
          // Our awesome team
          </span>
          <h1 className="font-heading text-5xl lg:text-7xl font-bold max-w-xl">
            Strategy members
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-start w-full">
          <div className="hidden lg:block w-120" />
          <div>
            <TeamCards members={strategyMembers} />
          </div>
        </div>



      </div>
    </section>
  );
}

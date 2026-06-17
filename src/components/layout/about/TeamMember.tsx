import { useState } from "react";
import TeamCards from "../../ui/team-cards";
import ButtonPortfolio from "@/components/ui/button-portfolio";
import { useTeams } from "@/hooks/useTeam";

export default function TeamMembers() {
  const { data: teamMembers, isLoading } = useTeams();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  if (isLoading) return <p>Loading...</p>;

  const mancommMembers = teamMembers?.filter(
    (m: { is_mancomm: number }) => m.is_mancomm === 1,
  );

  const sortFn = (
    a: { is_mancomm: number; role_id: number },
    b: { is_mancomm: number; role_id: number },
  ) => {
    if (a.is_mancomm !== b.is_mancomm) return b.is_mancomm - a.is_mancomm;
    return a.role_id - b.role_id;
  };

  const accountMembers = teamMembers
    ?.filter((m: { role_id: number }) => m.role_id === 1)
    .sort(sortFn);

  const creativeMembers = teamMembers
    ?.filter((m: { role_id: number }) => m.role_id === 2)
    .sort(sortFn);

  const strategyMembers = teamMembers
    ?.filter((m: { role_id: number }) => m.role_id === 3)
    .sort(sortFn);

  const filterTypes = ["All", "Accounts", "Creatives", ];

  const filteredMembers =
    activeFilter === "All"
      ? [
          ...(accountMembers ?? []),
          ...(creativeMembers ?? []),
          ...(strategyMembers ?? []),
        ]
      : activeFilter === "Accounts"
        ? accountMembers
        : activeFilter === "Creatives"
          ? creativeMembers
          : strategyMembers;

  return (
    <section className="text-white overflow-x-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <header className="text-center">
          <h1 className="font-heading text-6xl lg:text-8xl font-bold leading-tight flex flex-col items-center gap-2 mb-5">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              The
              <img
                src="https://firebasestorage.googleapis.com/v0/b/innovation-one-4de73.firebasestorage.app/o/gif%2Fteam.gif?alt=media&token=32c86f97-2a4d-4fc2-bf17-8678aebeda74"
                alt="Team"
                className="inline-block h-23 lg:h-35 object-contain"
              />
            </div>
            <span>Members</span>
          </h1>
        </header>
        <div className="px-4 pb-10 sm:px-6 sm:pb-16 md:px-12 md:pb-20 lg:px-15 lg:pb-10 xl:px-35 xl:pb-5">
          <TeamCards members={mancommMembers} cols={3} />
        </div>
        <hr className="border-white/20 my-10 " />
        <div className=" flex justify-center  ">
          <ButtonPortfolio
            types={filterTypes}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
        <div className="px-4 pb-10 sm:px-6 sm:pb-16 md:px-12 md:pb-20 lg:px-24 lg:pb-24 xl:px-50 xl:pb-50">
          <TeamCards members={filteredMembers} cols={3} />
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import TeamCards from "../../ui/team-cards";
import ButtonPortfolio from "@/components/ui/button-portfolio";
import { useTeams } from "@/hooks/useTeam";

export default function TeamMembers() {
  const { data: teamMembers, isLoading } = useTeams();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  if (isLoading) return <p>Loading...</p>;

  const mancommMembers = teamMembers?.filter(
    (m: { is_mancomm: number }) => m.is_mancomm === 1
  );

  const sortFn = (
    a: { is_mancomm: number; role_id: number },
    b: { is_mancomm: number; role_id: number }
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

  const filterTypes = ["All", "Accounts", "Creatives", "Strategy"];

  const filteredMembers =
    activeFilter === "All"
      ? [...(accountMembers ?? []), ...(creativeMembers ?? []), ...(strategyMembers ?? [])]
      : activeFilter === "Accounts"
      ? accountMembers
      : activeFilter === "Creatives"
      ? creativeMembers
      : strategyMembers;

  return (
    <section className="py-20 text-white overflow-x-hidden bg-black">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <header className="text-center mb-16">
          <h1 className="font-heading text-5xl lg:text-7xl font-bold leading-tight">
            The <span className="text-primary">Team</span> <br /> Members
          </h1>
        </header>

        {/* Mancomm — 4 col grid */}
        <TeamCards members={mancommMembers} cols={4} />

        {/* Divider */}
        <hr className="border-white/20 my-10" />

        {/* Filter tabs */}
        <div className="flex justify-center">
        <ButtonPortfolio
          types={filterTypes}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

        {/* Filtered members — 3 col grid */}
        <div className="mt-12">
        <TeamCards members={filteredMembers} cols={3} />
        </div>

      </div>
    </section>
  );
}
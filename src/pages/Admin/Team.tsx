import TeamDataTable from "@/components/pages/team/TeamDataTable";
import { useTeams } from "@/hooks/useTeam";
import type { Team } from "@/data/team_columns";

export default function TeamPage() {
  const { data: backendTeams = [], isLoading } = useTeams(); 

  if (isLoading)
    return <div className="p-6 text-center">Loading team members...</div>;

  const teams: Team[] = backendTeams.map((t) => ({
    team_id: t.team_id,
    employee_id: t.employee_id,
    first_name: t.first_name,
    last_name: t.last_name,
    middle_name: t.middle_name,
    alias: t.alias,
    position: t.position,
    quote: t.quote,
  }));

  return (
    <div className="p-6">
      <TeamDataTable teams={teams} />
    </div>
  );
}

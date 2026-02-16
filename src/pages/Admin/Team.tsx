import TeamDataTable from "@/components/pages/team/TeamDataTable";
import { useTeams, useRoles } from "@/hooks/useTeam";
import type { Team } from "@/data/team_columns";

export default function TeamPage() {
  const { data: backendTeams = [], isLoading } = useTeams();
  const { data: roles = [] } = useRoles();


  const teams: Team[] = backendTeams.map((t) => {

    return {
      team_id: t.team_id,
      employee_id: t.employee_id,
      first_name: t.first_name,
      last_name: t.last_name,
      position: t.position,
      role_name: t.role_name,
    };
  });


  return (
    <div className="p-6">
      <div className="space-y-10">
        <h1 className="text-3xl font-semibold">Team Management</h1>
        <TeamDataTable teams={teams} />
      </div>
    </div>
  );
}

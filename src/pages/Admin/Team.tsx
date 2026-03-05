import { useState } from "react";
import TeamDataTable from "@/components/pages/team/TeamDataTable";
import { useTeams, useDeleteTeam } from "@/hooks/useTeam";
import type { Team } from "@/data/team_columns";

export default function TeamPage() {
    const { data: backendTeams = [], isLoading } = useTeams();
    const { mutate: deleteTeam } = useDeleteTeam();

    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const teams: Team[] = (backendTeams as Team[]).map((t) => ({
        team_id: t.team_id,
        employee_id: t.employee_id,
        first_name: t.first_name,
        last_name: t.last_name,
        position: t.position,
        is_mancomm: t.is_mancomm,
        quote: t.quote,
        role_id: t.role_id,
        role_name: t.role_name,
        file: t.file,
    }));

    const handleEdit = (team: Team) => {
        setSelectedTeam(team);
        setIsEditOpen(true);
    };

    const handleDelete = (team: Team) => {
        if (!confirm(`Are you sure you want to delete "${team.first_name} ${team.last_name}"?`)) return;
        deleteTeam({ id: team.team_id!, fileUrl: team.file });
    };

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <div className="space-y-10">
                <h1 className="text-3xl font-semibold">Team Management</h1>
                <TeamDataTable
                    teams={teams}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isEditOpen={isEditOpen}
                    setIsEditOpen={setIsEditOpen}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                />
            </div>
        </div>
    );
}
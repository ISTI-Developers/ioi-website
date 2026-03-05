import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import type { Team } from "@/data/team_columns";
import TeamForm from "../forms/create/TeamForm";
import { useTeamColumns, def_team_columns, team_filters } from "@/data/team_columns";
import FormSheet from "@/components/layout/FormSheet";


interface TeamDataTableProps {
    teams: Team[];
    onEdit: (team: Team) => void;
    onDelete: (team: Team) => void;
    isEditOpen: boolean;
    setIsEditOpen: (open: boolean) => void;
    selectedTeam: Team | null;
    setSelectedTeam: (team: Team | null) => void;
}

export default function TeamDataTable({
    teams,
    onEdit,
    onDelete,
    isEditOpen,
    setIsEditOpen,
    selectedTeam,
    setSelectedTeam,
}: TeamDataTableProps) {
    const columns = useTeamColumns(onEdit, onDelete);

    const [columnVisibility, setColumnVisibility] = useColumnVisibility(
        "team-column-visibility",
        columns,
        def_team_columns
    );

    const dynamicDefaultColumns = useMemo(() => def_team_columns, []);
    const filterable = useMemo(() => team_filters, []);

    return (
        <>
            <DataTable
                columns={columns}
                data={teams}
                defaultVisibleColumns={dynamicDefaultColumns}
                filterableColumns={filterable}
                type="Team"
                form={<TeamForm />}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={setColumnVisibility}
            />

            {/* Edit Sheet — reuses FormSheet with controlled open state */}
            {selectedTeam && (
                <FormSheet
                type="Team"
                taskName="Edit"
                open={isEditOpen}
                onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (!open) setSelectedTeam(null);
                }}
                form={
                    selectedTeam ? (
                        <TeamForm
                            existing={selectedTeam}
                            onSuccess={() => {
                                setIsEditOpen(false);
                                setSelectedTeam(null);
                            }}
                        />
                    ) : <></>
                }
            />
            )}
        </>
    );
}
import { useMemo } from "react";
import { useTeam } from "./useTeam";

/**
 * Centralized lookup hook
 * For now, only uses useTeam
 */
export const useLookupMaps = (teamId: number) => {
  const { data: member, isLoading } = useTeam(teamId);

  // Build a Map for fast lookup
  const lookupMaps = useMemo(() => {
    const teamMap = member ? new Map([[member.team_id, member]]) : new Map();
    return { teamMap };
  }, [member]);

  // Accessor: get member object by ID
  const getTeamMember = (id: number) => lookupMaps.teamMap.get(id);

  // Accessor: get member full name by ID
  const getTeamMemberName = (id: number) => {
    const m = lookupMaps.teamMap.get(id);
    return m ? `${m.first_name} ${m.last_name}` : "Unknown Member";
  };

  // isLoading from useTeam
  const isTeamLoading = isLoading;

  return {
    ...lookupMaps,
    getTeamMember,
    getTeamMemberName,
    isLoading: isTeamLoading,
  };
};

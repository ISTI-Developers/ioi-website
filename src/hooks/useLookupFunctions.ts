import { useLookupMaps } from "./useLookupMaps";

/**
 * Functions to access team member data
 * Uses the centralized useLookupMaps
 */
export const useLookupFunctions = (teamId: number) => {
  const { teamMap, getTeamMember, getTeamMemberName, isLoading } = useLookupMaps(teamId);

  // Example function: get first name only
  const getTeamMemberFirstName = (id: number) => {
    const m = getTeamMember(id);
    return m ? m.first_name : "Unknown";
  };

  // Example function: get last name only
  const getTeamMemberLastName = (id: number) => {
    const m = getTeamMember(id);
    return m ? m.last_name : "Unknown";
  };

  // Example function: check if a member exists
  const isTeamMemberExist = (id: number) => teamMap.has(id);

  return {
    getTeamMember,
    getTeamMemberName,
    getTeamMemberFirstName,
    getTeamMemberLastName,
    isTeamMemberExist,
    isLoading,
  };
};

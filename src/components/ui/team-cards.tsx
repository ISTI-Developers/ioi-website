import { useTeams } from "@/hooks/useTeam";
import type { TeamMember } from "@/data/types";
import { API_BASE_URL } from "@/hooks/api/config";

interface TeamCardProps {
  members: TeamMember[] | undefined;
}

export default function TeamCards({ members } : TeamCardProps) {
  const baseUrl = API_BASE_URL;




if (!members) return null;

  return (


    <div className="flex flex-col">
      {members?.map((member) => (

        <div key={member.team_id}>
          <article className="flex flex-col lg:flex-row gap-6 items-end">
            <img
              src={`${baseUrl}/${member.file}`}
              alt={`${member.first_name} ${member.last_name}`}
              className="w-180 h-80 object-cover rounded-3xl "
            />

            <div className="flex flex-col mt-6 text-left">
              <p className="text-sm text-gray-300 mb-8">{member.quote}</p>
              <h3 className="font-semibold">{member.first_name} {member.last_name}</h3>
              <p className="text-sm text-gray-400">{member.position}</p>
              <p className="text-sm text-gray-400">{member.role_name}</p>

            </div>
          </article>
          <div className="my-8 w-full border-b border-white/20" />
        </div>
      ))}
    </div>
  );
}

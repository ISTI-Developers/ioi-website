import type { TeamMember } from "@/data/types";
import { API_BASE_URL } from "@/hooks/api/config";

interface TeamCardProps {
  members: TeamMember[] | undefined;
}

export default function TeamCards({ members } : TeamCardProps) {
  const baseUrl = API_BASE_URL;




if (!members) return null;

  return (


    <div className="flex flex-col ">
      {members?.map((member, index) => (

        <div key={member.team_id} >
          <article className="flex flex-col lg:flex-row gap-6 items-end mb-4 ">
            <img
              src={`${baseUrl}/${member.file}`}
              alt={`${member.first_name} ${member.last_name}`}
              className="w-80 h-80 object-cover rounded-3xl shrink-0"
            />

            <div className="flex flex-col mt-6 text-left">
              <p className="lg:text-[1.2rem] text-gray-300 mb-8 min-h-20">{member.quote}</p>
              <h3 className="lg:text-[1.6rem] font-semibold">{member.first_name} {member.last_name}</h3>
              <p className="text-sm text-gray-400">{member.position}</p>

            </div>
          </article>

          {index !== members.length -1 && ((
          <div className="my-12 w-full border-b border-white/20" />
          ))}
        </div>
      ))}
    </div>
  );
}

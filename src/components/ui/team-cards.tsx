import { useTeams } from "@/hooks/useTeam";

export default function TeamCards() {
  const { data: teamMembers, isLoading } = useTeams();

  if (isLoading) return <p>Loading team members...</p>;

  return (
    <div className="flex flex-col">
      {teamMembers?.map((member) => (
        <div key={member.team_id}>
          <article className="flex flex-col lg:flex-row gap-6 items-end">
            <img
              src={member.file[0] || "/default-profile.png"} 
              alt={`${member.first_name} ${member.last_name}`}
              className="w-80 h-80 object-cover rounded-3xl"
            />
            <div className="flex flex-col mt-6 text-left">
              <p className="text-sm text-gray-300 mb-8">{member.quote}</p>
              <h3 className="font-semibold">{member.first_name} {member.last_name}</h3>
              <p className="text-sm text-gray-400">{member.position}</p>
            </div>
          </article>
          <div className="my-8 w-full border-b border-white/20" />
        </div>
      ))}
    </div>
  );
}

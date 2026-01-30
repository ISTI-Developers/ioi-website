


export default function TeamCards() {


   const ManComm = [
    {
        name: 'Francis Ceruma',
        role: 'Accounts Management Head',
        quote: 'Our leadership team is driven by a clear vision and unwavering commitment to our mission.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&h=900&q=80'
    },
    {
        name: 'Jane Doe',
        role: 'Creative Director',
        quote: 'Innovation is at the heart of everything we create for our clients.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&h=900&q=80'
    },
    {
        name: 'Michael Chen',
        role: 'Lead Developer',
        quote: 'Bringing complex ideas to life with clean, efficient, and scalable code.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&h=900&q=80'
    },
    {
        name: 'Sarah Rahman',
        role: 'Strategy Director',
        quote: 'Crafting insights-driven roadmaps that ensure long-term brand impact.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&h=900&q=80'
    }
];

    return (
        <div className="flex flex-col">
            {ManComm.map((member) => (
                <div key={member.name}>
                    <article className="flex flex-col lg:flex-row gap-6 items-end">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-80 h-80 object-cover rounded-3xl"
                        />

                        <div className="flex flex-col mt-6 text-left ">
                            <p className="text-sm text-gray-300 mb-8">
                                {member.quote}
                            </p>

                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-400">
                                {member.role}
                            </p>
                        </div>
                    </article>

                    <div className="my-8 w-full border-b border-white/20" />
                </div>
            ))}


        </div>
    );
}
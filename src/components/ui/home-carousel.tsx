import React, { useState, useEffect } from 'react';

interface Campaign {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  description: string;
}

const CAMPAIGNS: Campaign[] = [
  { id: '1', title: 'OMRON C5 HEALTH', date: 'Jan 2024', imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=1000', description: 'The revolutionary OMRON C5 launch campaign focusing on smart health monitoring.' },
  { id: '2', title: 'CLN LUXURY KOL', date: 'February 2025', imageUrl: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=800&h=1000', description: 'A key opinion leader collaboration for the CLN luxury handbag collection.' },
  { id: '3', title: 'GLOBAL AMBASSADOR', date: 'November 2024', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=1000', description: 'Official announcement of our new brand ambassador for the healthcare division.' },
  { id: '4', title: 'VIU PARTNERSHIP', date: 'November 2025', imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800&h=1000', description: 'A strategic partnership contract signing event between Viu and Innovation One.' }
];


const SimpleCarousel: React.FC<{ activeIndex: number; onIndexChange: (idx: number) => void }> = ({ activeIndex, onIndexChange }) => {
  const n = CAMPAIGNS.length;
  
  // 1. Add state to track if we are on a small screen
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640); // 640px is Tailwind's 'sm'
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full min-h-150 lg:min-h-200 flex flex-col items-center overflow-hidden">
      <div className={`relative w-full h-130 lg:h-full flex items-end justify-center ${isMobile ? 'translate-x-[40px]' : 'translate-x-[460px]'}`}>
        {[3, 2, 1, 0].map((slotIndex) => {
          const campaignIndex = (activeIndex + slotIndex) % n;
          const campaign = CAMPAIGNS[campaignIndex];
          const isActive = slotIndex === 0;

          const scale = 1 - (slotIndex * 0.15);
          
          const desktopOffsets = [0, 440, 800, 1100];
          const mobileOffsets = [0, 220, 400, 550]; 
          
          const offsets = isMobile ? mobileOffsets : desktopOffsets;
          const translateX = -offsets[slotIndex];

          return (
            <div
              key={`slot-${slotIndex}`}
              onClick={() => onIndexChange(campaignIndex)}
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-[900ms] ease-[cubic-bezier(0.2,1,0.3,1)] cursor-pointer group select-none origin-center"
              style={{
                zIndex: 100 - slotIndex,
                transform: `translateX(${translateX}px) scale(${scale})`,
                width: isMobile ? '270px' : '500px',
              }}
            >
              <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/10 ring-1 ring-white/10 transition-all group-hover:ring-white/30">
                <img
                  src={campaign.imageUrl}
                  alt={campaign.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              <div
                className="absolute top-[105%] left-0 w-full transition-all duration-700 text-left px-2"
                style={{
                  opacity: isActive ? 1 : 0.8,
                  transformOrigin: 'left top'
                }}
              >
                <p className="text-zinc-500 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.4em] mb-2">
                  {campaign.date}
                </p>
                <h3 className="text-white font-bold tracking-tighter leading-none transition-all duration-500 text-lg sm:text-xl">
                  {campaign.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function HomeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative w-screen h-150 lg:h-screen  bg-black text-white flex flex-col items-center justify-center">
      <SimpleCarousel activeIndex={activeIndex} onIndexChange={setActiveIndex} />
    </div>
  );
}
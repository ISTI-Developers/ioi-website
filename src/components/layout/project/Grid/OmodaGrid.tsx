
const photos = [
    { id: 1, src:  "https://picsum.photos/600/600?2", col: "md:col-span-4", row: "md:row-span-2" },
    { id: 2, src: "https://picsum.photos/600/600?2", col: "md:col-span-4", row: "md:row-span-2" },
    { id: 3, src: "https://picsum.photos/600/600?3", col: "md:col-span-4", row: "md:row-span-2" },
  
    { id: 4, src: "https://picsum.photos/1200/700?4", col: "md:col-span-12", row: "md:row-span-2" },
  
    { id: 5, src: "https://picsum.photos/600/600?5", col: "md:col-span-3", row: "md:row-span-2" },
    { id: 6, src: "https://picsum.photos/600/600?6", col: "md:col-span-3", row: "md:row-span-2" },
    { id: 7, src: "https://picsum.photos/600/800?7", col: "md:col-span-3", row: "md:row-span-2" },
    { id: 8, src: "https://picsum.photos/600/800?8", col: "md:col-span-3", row: "md:row-span-2" },
  
    { id: 9, src: "https://picsum.photos/1200/600?9", col: "md:col-span-8", row: "md:row-span-3" },
    { id: 10, src: "https://picsum.photos/1200/600?10", col: "md:col-span-4", row: "md:row-span-3"},
    { id: 11, src: "https://picsum.photos/1200/600?10", col: "md:col-span-12", row: "md:row-span-2"},
    { id: 12, src: "https://picsum.photos/1200/600?10", col: "md:col-span-12", row: "md:row-span-4"},
  ];

  export default function OmodaImageGrid() {
    return (
      <section className="bg-black min-h-screen px-4 py-10">
        <div
          className="
            grid
            grid-cols-1 md:grid-cols-12
            auto-rows-[220px] md:auto-rows-[180px] lg:auto-rows-[220px]
            gap-4
          "
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`
                overflow-hidden rounded-xl
                ${photo.col} ${photo.row}
              `}
            >
              <img
                src={photo.src}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  
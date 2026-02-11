
const photos = [
    { id: 1, src:  "https://picsum.photos/600/600?2", col: "md:col-span-3", row: "md:row-span-3" },
    { id: 2, src: "https://picsum.photos/600/600?2", col: "md:col-span-3", row: "md:row-span-3" },
    { id: 3, src: "https://picsum.photos/600/600?3", col: "md:col-span-3", row: "md:row-span-3" },
  ];
  
  
  
  export default function ViuImageGrid() {
    return (
      <section className="bg-black min-h-screen px-4 py-10">
        <div
          className="
            grid
            grid-cols-1 md:grid-cols-3
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
  
  
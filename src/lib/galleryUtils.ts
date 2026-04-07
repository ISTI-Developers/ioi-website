const bentoLayouts: Record<number, Record<number, string>> = {
  1: {
    1: "col-span-4 row-span-2",
  },
  2: {
    1: "col-span-2 row-span-2",
    2: "col-span-2 row-span-2",
  }
};


export function getBentoClass(totalImages: number, position: number): string {
  return bentoLayouts[totalImages]?.[position] || "col-span-1 row-span-1";
}
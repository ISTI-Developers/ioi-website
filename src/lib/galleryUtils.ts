const bentoLayouts: Record<number, Record<number, string>> = {
  1: {
    1: "col-span-4 row-span-2",
  },
  2: {
    1: "col-span-2 row-span-2",
    2: "col-span-2 row-span-2",
  },
  3: {
    1: "col-span-2 row-span-1",
    2: "col-span-1 row-span-1",
    3: "col-span-1 row-span-1",
  },
  4: {
    1: "col-span-2 row-span-1",
    2: "col-span-2 row-span-1",
    3: "col-span-2 row-span-1",
    4: "col-span-2 row-span-1",
  },
  5: {
    1: "col-span-2 row-span-1",
    2: "col-span-1 row-span-1",
    3: "col-span-1 row-span-1",
    4: "col-span-2 row-span-1",
    5: "col-span-2 row-span-1",
  },
  6: {
    1: "col-span-1 ",
    2: "col-span-1 ",
    3: "col-span-1 ",
    4: "col-span-1 ",
    5: "col-span-1",
    6: "col-span-1",
  },
  7: {
    1: "col-span-1",
    2: "col-span-1 ",
    3: "col-span-1",
    4: "col-span-1",
    5: "col-span-1",
    6: "col-span-1",
    7: "col-span-3",
  },
  8: {
    1: "col-span-1",
    2: "col-span-1 ",
    3: "col-span-1",
    4: "col-span-1 ",
    5: "col-span-1",
    6: "col-span-1",
    7: "col-span-1",
    8: "col-span-1",
  },
  9: {
    1: "col-span-1",
    2: "col-span-1 ",
    3: "col-span-1",
    4: "col-span-1 ",
    5: "col-span-1",
    6: "col-span-1",
    7: "col-span-1",
    8: "col-span-1",
    9: "col-span-1",
  },
};

export function getBentoClass(totalImages: number, position: number): string {
  return bentoLayouts[totalImages]?.[position] || "col-span-1 row-span-1";
}
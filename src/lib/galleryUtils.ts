
export function groupGalleryItems(galleryArray: any[]): Record<number, any[]> {
  const sorted = [...galleryArray].sort((a, b) => {
    if (a.layout_group !== b.layout_group) return a.layout_group - b.layout_group;
    return a.display_order - b.display_order;
  });

  return sorted.reduce((acc: Record<number, any[]>, item: any) => {
    if (!acc[item.layout_group]) acc[item.layout_group] = [];
    acc[item.layout_group].push(item);
    return acc;
  }, {});
}


export function getGridCols(cols: number): string {
  switch (cols) {
    case 1: return "grid-cols-1";
    case 2: return "grid-cols-2";
    case 3: return "grid-cols-3";
    case 4: return "grid-cols-4";
    default: return "grid-cols-1";
  }
}
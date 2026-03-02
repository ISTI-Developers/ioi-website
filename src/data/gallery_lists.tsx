export interface GalleryItem {
  gallery_id?: number;
  project_id: number;
  layout_group: number;
  columns: number;
  display_order: number;
  file?: string;
}
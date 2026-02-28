import type z from "zod";
import type { 
  TeamSchema, ClientSchema, ProjectSchema, PointSchema,
  CareerSchema, BannerSchema

} from "./schemas";

export type TeamMember = z.infer<typeof TeamSchema>;
export type ClientMember = z.infer<typeof ClientSchema>;
export type Career = z.infer<typeof CareerSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Point = z.infer<typeof PointSchema>;


export type Banner = z.infer<typeof BannerSchema>;




export type ActiveFilter = {
  id: string;
  columnName: string;
  values: string[];
  displayLabel: string;
};

export type Settings = {
  id: number;
  settings_key: string;
  value: string;
};


export type Tab = {
  label: string;
  value: string;
}
import type z from "zod";
import type { TeamSchema, ClientSchema, ProjectSchema } from "./schemas";

export type TeamMember = z.infer<typeof TeamSchema>;
export type ClientMember = z.infer<typeof ClientSchema>;
export type Project = z.infer<typeof ProjectSchema>;



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
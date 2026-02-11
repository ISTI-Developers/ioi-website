import type z from "zod";
import type { TeamSchema } from "./schemas";

export type TeamMember = z.infer<typeof TeamSchema>;




export type ActiveFilter = {
  id: string;
  columnName: string;
  values: string[];
  displayLabel: string;
};
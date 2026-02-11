import { z } from "zod";



export const TeamSchema = z.object({
    team_id: z.number().optional(), 
    employee_id: z.number(),
    first_name: z.string({message: "First name is required"}),
    last_name: z.string({ message: "last name is required"}),
    middle_name: z.string().optional().nullable(),
    alias: z.string().optional().nullable(),
    position: z.string({message: "Position is required"}),
    quote: z.string({ message: "Quote is required" }).optional().nullable(),
    file: z.string().optional(), 

});
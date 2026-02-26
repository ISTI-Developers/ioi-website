import { z } from "zod";



export const TeamSchema = z.object({
    team_id: z.number().optional(), 
    employee_id: z.number(),
    first_name: z.string({message: "First name is required"}),
    last_name: z.string({ message: "last name is required"}),
    position: z.string({message: "Position is required"}),
    quote: z.string({ message: "Quote is required" }).optional().nullable(),
    role_id: z.number(),
    role_name: z.string(),
    file: z.array(z.string()).optional(), 
    is_mancomm: z.number(),

});


export const ClientSchema = z.object({
    client_id: z.number().optional(),
    client_name: z.string({message: "Client name is required"}),
    client_description: z.string({message: "Client description is required"}),
    file: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  project_id: z.number().optional(),
  project_name: z.string({ message: "Project name is required" }),
  project_type: z.string({ message: "Campaign type is required" }),
  start_date: z.string({ message: "Start date is required" }),
  end_date: z.string().optional(), 
  project_category: z.string({ message: "Project category is required" }),
  company_description: z.string({ message: "Company description is required" }),
  brand_positioning: z.string({ message: "Brand positioning is required" })
});





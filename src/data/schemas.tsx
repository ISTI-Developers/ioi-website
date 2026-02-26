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
})


export const CareerSchema = z.object({
    career_id: z.number().optional(),
    career_title: z.string({ message: "Career title is required" }),
    department: z.string({ message: "Department is required" }),
    work_setup: z.string({ message: "Work setup is required" }),
    employment_type: z.string({ message: "Employment type is required" }),
    description: z.string({ message: "Description is required" }),
    is_active: z.boolean().optional(),
    application_link: z.string({ message: "Application link is required" }).url({ message: "Application link must be a valid URL" }).optional(),
})




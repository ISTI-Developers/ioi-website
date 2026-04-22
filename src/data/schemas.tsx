import { z } from "zod";


export const LoginSchema = z.object({
    username: z.string(),
    password: z.string()
});

export const AdminSchema = z.object({
    user_id: z.coerce.number(),
    username: z.string(),
    role: z.string(),
});

export const AuthResponseSchema = z.object({
    accessToken: z.string(),
    user: AdminSchema,
});

export const TeamSchema = z.object({
    team_id: z.number().optional(),
    employee_id: z.number(),
    first_name: z.string({ message: "First name is required" }),
    last_name: z.string({ message: "last name is required" }),
    position: z.string({ message: "Position is required" }),
    quote: z.string({ message: "Quote is required" }).optional().nullable(),
    role_id: z.number(),
    role_name: z.string(),
    file: z.array(z.string()).optional(),
    is_mancomm: z.number(),

});


export const ClientSchema = z.object({
    client_id: z.number().optional(),
    client_name: z.string({ message: "Client name is required" }),
    client_description: z.string({ message: "Client description is required" }),
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
    brand_positioning: z.string({ message: "Brand positioning is required" }),
    file: z.union([
        z.string(),
        z.array(z.string()),
    ]).nullable().optional(),
});


export const PointSchema = z.object({
    point_id: z.number().optional(),
    project_id: z.number(),
    type: z.enum(["problem", "solution", "service", "result"]),
    content: z.string({ message: "Description is required" }),
});


export const GallerySchema = z.object({
    gallery_id: z.number().optional(),
    project_id: z.number(),
    file: z.string({ message: "Image is required" }),
    position: z.number({ message: "Position is required" }),

});

export const ProseSchema = z.object({
    prose_id: z.number().optional(),
    project_id: z.number(),
    content: z.string({ message: "Description is required" }),
});

export const VideoSchema = z.object({
    video_id: z.number().optional(),
    project_id: z.number(),
    file: z.string({ message: "Video URL is required" }),
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
});


export const BannerSchema = z.object({
    banner_id: z.number().optional(),
    section: z.string({ message: "Section is required" }),
    file: z.array(z.string()).optional(),
    year: z.string({ message: "Year is required" }),
    text: z.string({ message: "Text is required" }),
})





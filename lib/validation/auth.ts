import z from "zod";

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Email format is invalid."),
    company: z.string().min(1, "Company name is required"),
    password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password needs an uppercase letter")
    .regex(/[a-z]/, "Password needs a lowercase letter")
    .regex(/[/0-9]/, "Password needs a number"),
    confirmPassword: z.string(),
    terms: z.boolean().refine(v => v, { message: "Accept terms & services please" })
}).refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
})

export const signupServerSchema = signupSchema.omit({confirmPassword: true, terms: true})

export const loginSchema = z.object({
    email: z.email("Email format is invalid"),
    password: z.string()
    .min(8, "Please enter a valid password")
})
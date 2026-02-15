import * as z from "zod";

export const signUpSchema = z.object({
    FirstName: z.string().min(1, "name should be atleast have one character"),
    LastName: z.string().min(1), 
    email: z.email(), 
    password: z.string().min(6, "password must me 6 characters")
});


export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "password must be 6 characters")
})

export const updatBodySchema = z.object({
    FirstName: z.string().min(1, "name should atleast have one character"),
    LastName: z.string().min(1, "name should atleast have one character"),
    password: z.string().min(6, "password should be atleast of 6 characters")
})




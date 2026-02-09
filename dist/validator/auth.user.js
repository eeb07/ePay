import * as z from "zod";
export const signUpSchema = z.object({
    FirstName: z.string().min(1, "name should be atleast one character"),
    LastName: z.string().min(1),
    email: z.email(),
    password: z.string().min(6, "password must me 6 characters")
});
//# sourceMappingURL=auth.user.js.map
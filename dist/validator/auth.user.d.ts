import * as z from "zod";
export declare const signUpSchema: z.ZodObject<{
    FirstName: z.ZodString;
    LastName: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.user.d.ts.map
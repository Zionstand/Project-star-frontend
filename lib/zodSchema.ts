import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(2, { message: "Enter your password" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

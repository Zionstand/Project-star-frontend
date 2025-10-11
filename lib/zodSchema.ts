import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(2, { message: "Enter your password" }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

export const VerifyCodeSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  otp: z
    .string()
    .min(6, {
      message: "Code must be 6 characters.",
    })
    .max(6, { message: "Code must be 6 characters" }),
});

export const NewPasswordSchema = z
  .object({
    otp: z
      .string()
      .min(6, {
        message: "Code must be 6 characters.",
      })
      .max(6, { message: "Code must be 6 characters" }),
    email: z.string().email().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number.",
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(2, { message: "Enter your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // 👈 attach the error to confirmPassword
  });

export const SchoolIdentitySchema = z.object({
  schoolName: z
    .string()
    .min(2, { message: "School name must be at least 2 characters" }),
  shortName: z.string().optional(),
  schoolMotto: z.string().optional(),
  visionStatement: z
    .string()
    .min(2, { message: "Vision statement must be at least 2 characters" }),
  missionStatement: z
    .string()
    .min(2, { message: "Mission statement must be at least 2 characters" }),
  establishmentYear: z
    .string()
    .min(2, { message: "Year of establishment must be selected" }),
  ownershipType: z.string().min(2, { message: "Ownership must be selected" }),
  schoolType: z.string().min(2, { message: "Type of school must be selected" }),
});

export const ContactDetailsSchema = z.object({
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be selected" }),
  postalCode: z.string().optional(),
  country: z.string().min(2, { message: "Country must be selected" }),
  website: z.string().url().optional(),
  email: z.string().email({ message: "Enter a valid email address" }),
  primaryPhoneNumber: z.string().regex(/^(\+?\d{10,15})$/, {
    message: "Enter a valid phone number.",
  }),
  alternatePhoneNumber: z
    .string()
    .regex(/^(\+?\d{10,15})$/, {
      message: "Enter a valid phone number.",
    })
    .optional(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type VerifyCodeSchemaType = z.infer<typeof VerifyCodeSchema>;
export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;
export type SchoolIdentitySchemaType = z.infer<typeof SchoolIdentitySchema>;
export type ContactDetailsSchemaType = z.infer<typeof ContactDetailsSchema>;

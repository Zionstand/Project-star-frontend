import z from "zod";

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z
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
    phoneNumber: z.string().regex(/^(\+?\d{10,15})$/, {
      message: "Enter a valid phone number.",
    }),
    name: z
      .string()
      .min(2, { message: "School name must be at least 2 characters" }),
    role: z.string().min(2, { message: "Role must be selected" }),
    schoolType: z
      .string()
      .min(2, { message: "Type of school must be selected" }),
    address: z
      .string()
      .min(2, { message: "Address must be at least 2 characters" }),
    city: z.string().min(2, { message: "City must be at least 2 characters" }),
    state: z.string().min(2, { message: "State must be selected" }),
    country: z.string().min(2, { message: "Country must be selected" }),
    establishmentYear: z
      .string()
      .min(2, { message: "Year of establishment must be selected" }),
    ownershipType: z.string().min(2, { message: "Ownership must be selected" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // 👈 attach the error to confirmPassword
  });

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
  name: z
    .string()
    .min(2, { message: "School name must be at least 2 characters" }),
  acronym: z.string().optional(),
  motto: z.string().optional(),
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
  primaryPhone: z.string().regex(/^(\+?\d{10,15})$/, {
    message: "Enter a valid phone number.",
  }),
  alternatePhone: z
    .string()
    .regex(/^(\+?\d{10,15})$/, {
      message: "Enter a valid phone number.",
    })
    .optional(),
});

export const AcademicSettingsSchema = z.object({
  currentSession: z
    .string()
    .min(2, { message: "Current session be at least 2 characters" }),
  currentTerm: z.string().min(2, { message: "Current term must be selected" }),
  termsPerSession: z
    .string()
    .min(2, { message: "Terms per session must be selected" }),
  postalCode: z.string().optional(),
  academicStartDate: z
    .string()
    .min(2, { message: "Academic start date must be selected" }),
  academicEndDate: z
    .string()
    .min(2, { message: "Academic end date must be selected" }),
  gradingSystem: z
    .string()
    .min(2, { message: "Grading system must be selected" }),
  passMark: z.string().min(2, { message: "passMark must be selected" }),
});

export const AdministrativeDetailsSchema = z.object({
  schoolRegistrationNumber: z
    .string()
    .min(2, { message: "Registration number must be at least 2 characters" }),
  accreditationBody: z
    .string()
    .min(2, { message: "Accreditation body must be provided" }),
  accreditationNumber: z
    .string()
    .min(2, { message: "Accreditation number must be provided" }),
});

export const GeneralSettingsSchema = z.object({
  systemName: z
    .string()
    .min(2, { message: "System name must be at least 2 characters" }),
  supportEmail: z.string().email().min(2, {
    message: "Support email must be at least 2 characters.",
  }),
  administrativeEmail: z.string().email().min(2, {
    message: "Administrative email must be at least 2 characters.",
  }),
  timezone: z.string().min(2, { message: "Timezone must be selected" }),
  currency: z.string().min(2, { message: "Currency must be selected" }),
  systemLanguage: z
    .string()
    .min(2, { message: "SystemLanguage must be selected" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type VerifyCodeSchemaType = z.infer<typeof VerifyCodeSchema>;
export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;
export type SchoolIdentitySchemaType = z.infer<typeof SchoolIdentitySchema>;
export type ContactDetailsSchemaType = z.infer<typeof ContactDetailsSchema>;
export type AcademicSettingsSchemaType = z.infer<typeof AcademicSettingsSchema>;
export type AdministrativeDetailsSchemaType = z.infer<
  typeof AdministrativeDetailsSchema
>;
export type GeneralSettingsSchemaType = z.infer<typeof GeneralSettingsSchema>;

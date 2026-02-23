const { z } = require('zod');

const registerUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username is required"),
   password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .regex(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .regex(/(?=.*[0-9])/, "Password must contain a number")
    .regex(/(?=.*[\W])/, "Password must contain a special character")
});

const loginUserSchema = z.object({
  email: z.string().email(),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .regex(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .regex(/(?=.*[0-9])/, "Password must contain a number")
    .regex(/(?=.*[\W])/, "Password must contain a special character")
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  token: z.string().length(4, "Invalid token"),
newPassword: z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/(?=.*[A-Z])/, "Must contain an uppercase letter")
  .regex(/(?=.*[a-z])/, "Must contain a lowercase letter")
  .regex(/(?=.*[0-9])/, "Must contain a number")
  .regex(/(?=.*[\W])/, "Must contain a special character")
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};
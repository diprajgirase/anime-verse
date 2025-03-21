import { z } from 'zod'

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' })
      .max(20, { message: 'Username must be less than 20 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one digit.' })
      .regex(/[\W_]/, {
        message: 'Password must contain at least one special character.',
      }),
    confirmPassword: z.string(), // Basic validation; we'll add additional validation below
    name: z.string().min(1, { message: 'Name is required.' }),
    age: z
      .string()
      .regex(/^\d+$/, { message: 'Age must be a number.' })
      .transform((val) => parseInt(val, 10))
      .refine((val) => val >= 13, {
        message: 'You must be at least 13 years old to sign up.',
      }),
    favoriteAnimeGenre: z.string().min(1, { message: 'Favorite anime genre is required.' }),
    redirect: z.string().transform((val) => val === 'true'),
    csrfToken: z.string().min(1, { message: 'CSRF token is required.' }),
    callbackUrl: z.string().url({ message: 'Invalid callback URL.' }),
    json: z.string().transform((val) => val === 'true'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'Passwords must match.',
        code: z.ZodIssueCode.custom,
      })
    }
  })

export type ISignupSchema = z.infer<typeof signupSchema>

export default signupSchema

import {z} from 'zod'

export const loginSchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

export type LoginForm = z.infer<typeof loginSchema>

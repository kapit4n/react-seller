import {z} from 'zod'

export const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  budget: z.number().min(0, 'Budget must be non-negative'),
})

export type CustomerForm = z.input<typeof customerSchema>

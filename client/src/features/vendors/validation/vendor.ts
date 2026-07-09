import {z} from 'zod'

export const vendorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  img: z.string().optional().default(''),
})

export type VendorForm = z.input<typeof vendorSchema>

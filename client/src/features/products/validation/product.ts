import {z} from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  price: z.number().min(0, 'Price must be positive'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  description: z.string().optional().default(''),
  img: z.string().optional().default(''),
})

export type ProductForm = z.input<typeof productSchema>

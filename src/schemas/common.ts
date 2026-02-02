import { z } from 'zod';

export const basePaginationSchema = z.object({
  before: z.string().optional(),
  after: z.string().optional(),
  sort_order: z.enum(['desc', 'asc']).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  next_cursor: z.string().optional()
});

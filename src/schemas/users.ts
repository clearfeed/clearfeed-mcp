import { z } from 'zod';

export const userListSchema = z.object({
  ids: z
    .array(z.string().min(1))
    .min(1)
    .max(100)
    .describe('Required. External user IDs to fetch (1–100).')
});

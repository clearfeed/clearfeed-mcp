import { z } from 'zod';

export const userListSchema = z.object({
  ids: z
    .array(z.string().min(1))
    .min(1)
    .max(100)
    .describe('Required. User IDs to fetch (1-100).'),
  include_deleted: z
    .boolean()
    .optional()
    .describe('Include deleted users. Defaults to false.')
});

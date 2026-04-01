import { z } from 'zod';

export const userListSchema = z
  .object({
    ids: z
      .array(z.string().min(1))
      .max(100)
      .optional()
      .describe('Resolve specific monitoring-system user IDs. Cannot be combined with `query`.'),
    query: z
      .string()
      .min(1)
      .optional()
      .describe('Search users by name. Cannot be combined with `ids`.'),
    include_deleted: z
      .boolean()
      .optional()
      .describe('Include deleted users. Defaults to true for `ids` lookups and false otherwise.'),
    limit: z.number().int().min(1).max(100).optional().describe('Page size for list/search results.'),
    next_cursor: z.string().min(1).optional().describe('Opaque cursor from the previous response.')
  })
  .refine((value) => !(value.ids?.length && value.query), {
    message: '`ids` and `query` cannot be provided together.',
    path: ['query']
  });

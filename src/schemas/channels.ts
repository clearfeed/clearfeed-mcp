import { z } from 'zod';

export const channelUpdateSchema = z.object({
  external_id: z.string().min(1),
  collection_id: z.number().int().min(1)
});

export const channelDeleteSchema = z.object({
  external_id: z.string().min(1)
});

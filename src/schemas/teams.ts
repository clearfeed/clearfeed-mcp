import { z } from 'zod';

export const teamListSchema = z.object({
  include: z.array(z.literal('team_members')).optional()
});

export const teamGetSchema = teamListSchema.extend({
  secondary_id: z.number().int().min(1)
});

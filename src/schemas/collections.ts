import { z } from 'zod';

const existingCustomerSchema = z.object({
  type: z.literal('existing'),
  id: z.number().int().min(1)
});

const newCustomerSchema = z.object({
  type: z.literal('new'),
  owner: z.string().min(1).optional(),
  domains: z.array(z.string()).optional()
});

const channelMetadataSchema = z.object({
  id: z.string().min(1),
  owner: z.string().min(1).optional(),
  customer: z.discriminatedUnion('type', [existingCustomerSchema, newCustomerSchema]).optional()
});

export const collectionsListSchema = z.object({
  include: z.array(z.literal('channels')).optional()
});

export const collectionsAddChannelsSchema = z.object({
  secondary_id: z.number().int().min(1),
  channels: z.array(channelMetadataSchema).min(1)
});

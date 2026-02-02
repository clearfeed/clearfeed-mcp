import { z } from 'zod';
import { basePaginationSchema } from './common.js';

const domainFilterSchema = z.object({
  field: z.literal('domains'),
  operator: z.enum(['overlaps', 'contains_all']),
  values: z.array(z.string()).min(1)
});

const externalCompanyFilterSchema = z.object({
  field: z.literal('external_company'),
  system: z.enum(['hubspot', 'salesforce']),
  id: z.string().min(1)
});

export const customerSearchSchema = basePaginationSchema.extend({
  filters: z
    .array(z.discriminatedUnion('field', [domainFilterSchema, externalCompanyFilterSchema]))
    .min(1)
});

export const customerListSchema = basePaginationSchema;

export const customerCreateSchema = z.object({
  name: z.string().min(1),
  owner: z.string().min(1),
  domains: z.array(z.string()).optional(),
  channel_ids: z.array(z.string()).optional(),
  portal_config: z
    .object({
      enabled: z.boolean()
    })
    .passthrough()
    .optional(),
  custom_field_values: z.record(z.unknown()).optional(),
  is_portal_available_to_all_users: z.boolean().optional(),
  portal_allowed_user_emails: z.array(z.string().email()).optional(),
  collection_id: z.number().int().min(1).optional()
});

export const customerUpdateSchema = customerCreateSchema
  .partial()
  .extend({ version: z.number().int().min(0) });

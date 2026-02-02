import { z } from 'zod';
import { basePaginationSchema } from './common.js';

export const requestStateSchema = z.enum([
  'open',
  'solved',
  'in_progress',
  'on_hold',
  'pending',
  'closed'
]);

const requestStateAllSchema = z.enum([
  'open',
  're_open',
  'committed',
  'in_progress',
  'on_hold',
  'pending',
  'closed',
  'solved'
]);

export const requestStateFilterSchema = z.enum([
  'open',
  'solved',
  'in_progress',
  'on_hold',
  'pending',
  'closed',
  'none'
]);

export const requestPrioritySchema = z.enum(['low', 'normal', 'high', 'urgent']);

export const requestSearchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().int().min(1).max(100).optional().default(10),
  only_public: z.boolean().optional().default(true),
  created_before: z.string().optional(),
  created_after: z.string().optional(),
  customer_id: z.number().int().min(1).optional(),
  collection_id: z.number().int().min(1).optional()
});

const optionalNonEmptyArray = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (value) => (Array.isArray(value) && value.length === 0 ? undefined : value),
    z.array(schema).min(1).optional()
  );

export const requestListSchema = basePaginationSchema.extend({
  collection_id: z.number().int().min(1).optional(),
  channel_id: z.string().optional(),
  state: optionalNonEmptyArray(requestStateFilterSchema),
  author_emails: optionalNonEmptyArray(z.string().email()).refine(
    (value) => value === undefined || value.length <= 50,
    { message: 'Array must contain at most 50 element(s)' }
  ),
  include: optionalNonEmptyArray(z.literal('messages')),
  filter_by: z.enum(['created_at', 'updated_at']).optional().default('created_at')
});

export const requestGetSchema = z.object({
  secondary_id: z.number().int().min(1),
  include: optionalNonEmptyArray(z.literal('messages'))
});

export const requestCreateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1),
  priority: requestPrioritySchema.optional(),
  requester_email: z.string().email().optional()
});

export const requestUpdateSchema = z.object({
  secondary_id: z.number().int().min(1),
  state: requestStateSchema.optional(),
  assignee: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  priority: requestPrioritySchema.optional(),
  custom_field_values: z.record(z.unknown()).optional()
});

export const requestPostMessageSchema = z.object({
  secondary_id: z.number().int().min(1),
  html_body: z.string().min(1).optional(),
  thread_ts: z.string().min(1).optional(),
  is_private: z.boolean().optional(),
  post_as_bot: z.boolean().optional(),
  user_reply_channel_type: z.enum(['triage', 'request']).optional(),
  state: requestStateAllSchema.optional(),
  source: z.enum(['SHORTCUT', 'UI', 'ML', 'API']).optional()
});

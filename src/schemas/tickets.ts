import { z } from 'zod';

export const ticketGetFormSchema = z.object({
  id: z.number().int().min(1)
});

export const ticketLinkSchema = z.object({
  type: z.literal('link'),
  data: z.object({
    integration: z.literal('ZENDESK'),
    ticket_id: z.string().min(1),
    message_ts: z.string().min(1),
    channel_id: z.string().min(1),
    message_source: z.literal('SLACK_CHANNEL')
  })
});

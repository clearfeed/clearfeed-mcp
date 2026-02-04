import { ticketGetFormSchema, ticketLinkSchema } from '../schemas/tickets.js';
import { ToolDefinition } from './types.js';

export const ticketTools: ToolDefinition[] = [
  {
    name: 'tickets_get_form',
    description: 'Get a ticket form via GET /v1/rest/tickets/forms/:id.',
    schema: ticketGetFormSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: `/v1/rest/tickets/forms/${input.id}`
      });
    }
  },
  {
    name: 'tickets_link',
    description: 'Link a ticket via POST /v1/rest/tickets.',
    schema: ticketLinkSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'POST',
        path: '/v1/rest/tickets',
        body: input
      });
    }
  }
];

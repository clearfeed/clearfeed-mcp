import { memberListSchema } from '../schemas/members.js';
import { ToolDefinition } from './types.js';

export const memberTools: ToolDefinition[] = [
  {
    name: 'members_list',
    description:
      'Resolve members by `ids`, search by `query`, or list members via GET /v1/rest/members.',
    schema: memberListSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: '/v1/rest/members',
        query: input
      });
    }
  }
];

import { userListSchema } from '../schemas/users.js';
import { ToolDefinition } from './types.js';

export const userTools: ToolDefinition[] = [
  {
    name: 'users_list',
    description:
      'Resolve users by `ids`, search by `query`, or list users via GET /v1/rest/users.',
    schema: userListSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: '/v1/rest/users',
        query: input
      });
    }
  }
];

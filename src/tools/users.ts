import { userListSchema } from '../schemas/users.js';
import { ToolDefinition } from './types.js';

export const userTools: ToolDefinition[] = [
  {
    name: 'users_list',
    description:
      'Fetch users by their IDs via GET /v1/rest/users. The `ids` parameter is required (1–100 IDs).',
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

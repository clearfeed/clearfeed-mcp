import { teamGetSchema, teamListSchema } from '../schemas/teams.js';
import { ToolDefinition } from './types.js';

export const teamTools: ToolDefinition[] = [
  {
    name: 'teams.list',
    description: 'List teams via GET /v1/rest/teams.',
    schema: teamListSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: '/v1/rest/teams',
        query: input
      });
    }
  },
  {
    name: 'teams.get',
    description: 'Get a team via GET /v1/rest/teams/:secondaryId.',
    schema: teamGetSchema,
    handler: async (input, client) => {
      const { secondary_id, ...query } = input;
      return client.request({
        method: 'GET',
        path: `/v1/rest/teams/${secondary_id}`,
        query
      });
    }
  }
];

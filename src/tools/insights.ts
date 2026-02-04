import { insightsQuerySchema } from '../schemas/insights.js';
import { ToolDefinition } from './types.js';

export const insightsTools: ToolDefinition[] = [
  {
    name: 'insights_query',
    description: 'Run an insights query via POST /v1/rest/insights/query.',
    schema: insightsQuerySchema,
    handler: async (input, client) => {
      return client.request({
        method: 'POST',
        path: '/v1/rest/insights/query',
        body: input
      });
    }
  }
];

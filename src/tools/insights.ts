import { insightsQuerySchema } from '../schemas/insights.js';
import { ToolDefinition } from './types.js';

export const insightsTools: ToolDefinition[] = [
  {
    name: 'insights_query',
    description: [
      'Run an aggregated analytics query over ClearFeed requests via POST /v1/rest/insights/query.',
      'Provide `query.measures` for the metrics you want, `query.time_dimensions` to define the reporting window and optional granularity, and optionally add `query.dimensions` to break results down by fields like assignee, customer, priority, or channel.',
      'Supported request dimensions include `Requests.customer_id` and `Requests.customer_owner`.',
      'Use `query.filters` to constrain the dataset before aggregation.'
    ].join(' '),
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

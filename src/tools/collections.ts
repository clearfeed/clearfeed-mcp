import {
  collectionsAddChannelsSchema,
  collectionsListSchema
} from '../schemas/collections.js';
import { ToolDefinition } from './types.js';

export const collectionTools: ToolDefinition[] = [
  {
    name: 'collections_list',
    description: 'List collections via GET /v1/rest/collections_',
    schema: collectionsListSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: '/v1/rest/collections',
        query: input
      });
    }
  },
  {
    name: 'collections_add_channels',
    description: 'Add channels to a collection via POST /v1/rest/collections/:secondaryId/channels.',
    schema: collectionsAddChannelsSchema,
    handler: async (input, client) => {
      const { secondary_id, channels } = input;
      return client.request({
        method: 'POST',
        path: `/v1/rest/collections/${secondary_id}/channels`,
        body: { channels }
      });
    }
  }
];

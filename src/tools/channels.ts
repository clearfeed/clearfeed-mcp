import { channelDeleteSchema, channelUpdateSchema } from '../schemas/channels.js';
import { ToolDefinition } from './types.js';

export const channelTools: ToolDefinition[] = [
  {
    name: 'channels_update',
    description: 'Update channel via PATCH /v1/rest/channels/:externalId.',
    schema: channelUpdateSchema,
    handler: async (input, client) => {
      const { external_id, collection_id } = input;
      return client.request({
        method: 'PATCH',
        path: `/v1/rest/channels/${external_id}`,
        body: { collection_id }
      });
    }
  },
  {
    name: 'channels_delete',
    description: 'Delete channel via DELETE /v1/rest/channels/:externalId.',
    schema: channelDeleteSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'DELETE',
        path: `/v1/rest/channels/${input.external_id}`
      });
    }
  }
];

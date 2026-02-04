import {
  requestCreateSchema,
  requestGetSchema,
  requestListSchema,
  requestPostMessageSchema,
  requestSearchSchema,
  requestUpdateSchema
} from '../schemas/requests.js';
import { ToolDefinition } from './types.js';

export const requestTools: ToolDefinition[] = [
  {
    name: 'requests_search',
    description: 'Search requests via GET /v1/rest/requests/search.',
    schema: requestSearchSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: '/v1/rest/requests/search',
        query: input
      });
    }
  },
  {
    name: 'requests_list',
    description: 'List requests via GET /v1/rest/requests.',
    schema: requestListSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: '/v1/rest/requests',
        query: input
      });
    }
  },
  {
    name: 'requests_get',
    description: 'Get a request by secondary id via GET /v1/rest/requests/:secondaryId.',
    schema: requestGetSchema,
    handler: async (input, client) => {
      const { secondary_id, ...query } = input;
      return client.request({
        method: 'GET',
        path: `/v1/rest/requests/${secondary_id}`,
        query
      });
    }
  },
  {
    name: 'requests_create',
    description: 'Create a request via POST /v1/rest/requests (attachments not supported).',
    schema: requestCreateSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'POST',
        path: '/v1/rest/requests',
        body: input
      });
    }
  },
  {
    name: 'requests_update',
    description: 'Update a request via PATCH /v1/rest/requests/:secondaryId.',
    schema: requestUpdateSchema,
    handler: async (input, client) => {
      const { secondary_id, ...body } = input;
      return client.request({
        method: 'PATCH',
        path: `/v1/rest/requests/${secondary_id}`,
        body
      });
    }
  },
  {
    name: 'requests_post_message',
    description: 'Post a message via POST /v1/rest/requests/:secondaryId/message (no attachments).',
    schema: requestPostMessageSchema,
    handler: async (input, client) => {
      const { secondary_id, ...body } = input;
      return client.request({
        method: 'POST',
        path: `/v1/rest/requests/${secondary_id}/message`,
        body
      });
    }
  }
];

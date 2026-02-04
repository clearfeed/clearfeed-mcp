import {
  customFieldCreateSchema,
  customFieldDeleteSchema,
  customFieldListSchema,
  customFieldUpdateSchema
} from '../schemas/custom-fields.js';
import { ToolDefinition } from './types.js';

export const customFieldTools: ToolDefinition[] = [
  {
    name: 'custom_fields_list',
    description: 'List custom fields via GET /v1/rest/custom-fields.',
    schema: customFieldListSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: '/v1/rest/custom-fields',
        query: input
      });
    }
  },
  {
    name: 'custom_fields_create',
    description: 'Create a custom field via POST /v1/rest/custom-fields.',
    schema: customFieldCreateSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'POST',
        path: '/v1/rest/custom-fields',
        body: input
      });
    }
  },
  {
    name: 'custom_fields_update',
    description: 'Update a custom field via PUT /v1/rest/custom-fields/:id.',
    schema: customFieldUpdateSchema,
    handler: async (input, client) => {
      const { id, ...body } = input;
      return client.request({
        method: 'PUT',
        path: `/v1/rest/custom-fields/${id}`,
        body
      });
    }
  },
  {
    name: 'custom_fields_delete',
    description: 'Delete a custom field via DELETE /v1/rest/custom-fields/:id.',
    schema: customFieldDeleteSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'DELETE',
        path: `/v1/rest/custom-fields/${input.id}`
      });
    }
  }
];

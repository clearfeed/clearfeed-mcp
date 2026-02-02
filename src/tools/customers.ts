import {
  customerCreateSchema,
  customerListSchema,
  customerSearchSchema,
  customerUpdateSchema
} from '../schemas/customers.js';
import { ToolDefinition } from './types.js';
import { z } from 'zod';

const customerGetSchema = z.object({
  id: z.number().int().min(1)
});

export const customerTools: ToolDefinition[] = [
  {
    name: 'customers.list',
    description: 'List customers via GET /v1/rest/customers.',
    schema: customerListSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: '/v1/rest/customers',
        query: input
      });
    }
  },
  {
    name: 'customers.search',
    description: 'Search customers via POST /v1/rest/customers/search.',
    schema: customerSearchSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'POST',
        path: '/v1/rest/customers/search',
        body: input
      });
    }
  },
  {
    name: 'customers.create',
    description: 'Create a customer via POST /v1/rest/customers.',
    schema: customerCreateSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'POST',
        path: '/v1/rest/customers',
        body: input
      });
    }
  },
  {
    name: 'customers.get',
    description: 'Get a customer via GET /v1/rest/customers/:id.',
    schema: customerGetSchema,
    handler: async (input, client) => {
      return client.request({
        method: 'GET',
        path: `/v1/rest/customers/${input.id}`
      });
    }
  },
  {
    name: 'customers.update',
    description: 'Update a customer via PATCH /v1/rest/customers/:id.',
    schema: customerUpdateSchema.extend({ id: z.number().int().min(1) }),
    handler: async (input, client) => {
      const { id, ...body } = input;
      return client.request({
        method: 'PATCH',
        path: `/v1/rest/customers/${id}`,
        body
      });
    }
  }
];

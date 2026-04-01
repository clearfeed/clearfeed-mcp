import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { ToolDefinition } from './types.js';
import { requestTools } from './requests.js';
import { customerTools } from './customers.js';
import { collectionTools } from './collections.js';
import { channelTools } from './channels.js';
import { customFieldTools } from './custom-fields.js';
import { teamTools } from './teams.js';
import { userTools } from './users.js';
import { ticketTools } from './tickets.js';
import { insightsTools } from './insights.js';

export const toolDefinitions: ToolDefinition[] = [
  ...requestTools,
  ...customerTools,
  ...collectionTools,
  ...channelTools,
  ...customFieldTools,
  ...teamTools,
  ...userTools,
  ...ticketTools,
  ...insightsTools
];

export function getToolSchemas() {
  return toolDefinitions.map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: zodToJsonSchema(tool.schema, {
      $refStrategy: 'none'
    })
  }));
}

export function getToolByName(name: string): ToolDefinition | undefined {
  return toolDefinitions.find((tool) => tool.name === name);
}

export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length ? issue.path.join('.') : 'input';
      return `${path}: ${issue.message}`;
    })
    .join('\n');
}

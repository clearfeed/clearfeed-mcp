import { z } from 'zod';
import { ClearfeedClient } from '../client.js';

export type ToolDefinition<TSchema extends z.ZodTypeAny = z.ZodTypeAny> = {
  name: string;
  description: string;
  schema: TSchema;
  handler: (input: z.infer<TSchema>, client: ClearfeedClient) => Promise<unknown>;
};

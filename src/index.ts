import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ClearfeedClient, ApiError } from './client.js';
import { loadConfig } from './config.js';
import { formatZodError, getToolByName, getToolSchemas } from './tools/index.js';

const config = loadConfig();
const client = new ClearfeedClient(config);

const server = new Server(
  {
    name: 'clearfeed-external-api',
    version: '0.1.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: getToolSchemas() };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const tool = getToolByName(request.params.name);
  if (!tool) {
    return {
      content: [{ type: 'text', text: `Unknown tool: ${request.params.name}` }],
      isError: true
    };
  }

  const parseResult = tool.schema.safeParse(request.params.arguments ?? {});
  if (!parseResult.success) {
    return {
      content: [{ type: 'text', text: formatZodError(parseResult.error) }],
      isError: true
    };
  }

  try {
    const result = await tool.handler(parseResult.data, client);
    const payload = result === undefined ? { ok: true } : result;
    return {
      content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }]
    };
  } catch (error) {
    return {
      content: [{ type: 'text', text: formatError(error) }],
      isError: true
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);

function formatError(error: unknown): string {
  if (error instanceof ApiError) {
    return JSON.stringify(
      {
        message: error.message,
        status: error.status,
        payload: error.payload
      },
      null,
      2
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

# Clearfeed MCP External API Server

Thin MCP wrapper around ClearFeed External REST APIs.

## Requirements
- Node.js 20+
- ClearFeed External API base URL and developer token (get one from `https://web.clearfeed.app/settings/developer-settings`)

## Configuration
- `CLEARFEED_API_BASE_URL` (required)
- `CLEARFEED_API_TOKEN` (required)
- `DEBUG` (optional, set to `true` to log request timing)

## API Access
This MCP server exposes the following tool families and endpoints:

| Area | MCP tools and ClearFeed External REST endpoints |
| --- | --- |
| Requests | `requests_search` (GET /v1/rest/requests/search); `requests_list` (GET /v1/rest/requests); `requests_get` (GET /v1/rest/requests/:secondaryId); `requests_create` (POST /v1/rest/requests); `requests_update` (PATCH /v1/rest/requests/:secondaryId); `requests_post_message` (POST /v1/rest/requests/:secondaryId/message) |
| Customers | `customers_list` (GET /v1/rest/customers); `customers_search` (POST /v1/rest/customers/search); `customers_get` (GET /v1/rest/customers/:id); `customers_create` (POST /v1/rest/customers); `customers_update` (PATCH /v1/rest/customers/:id) |
| Collections | `collections_list` (GET /v1/rest/collections); `collections_add_channels` (POST /v1/rest/collections/:secondaryId/channels) |
| Channels | `channels_update` (PATCH /v1/rest/channels/:externalId); `channels_delete` (DELETE /v1/rest/channels/:externalId) |
| Custom Fields | `custom_fields_list` (GET /v1/rest/custom-fields); `custom_fields_create` (POST /v1/rest/custom-fields); `custom_fields_update` (PUT /v1/rest/custom-fields/:id); `custom_fields_delete` (DELETE /v1/rest/custom-fields/:id) |
| Teams | `teams_list` (GET /v1/rest/teams); `teams_get` (GET /v1/rest/teams/:secondaryId) |
| Members | `members_list` (GET /v1/rest/members) |
| Tickets | `tickets_get_form` (GET /v1/rest/tickets/forms/:id); `tickets_link` (POST /v1/rest/tickets) |
| Insights | `insights_query` (POST /v1/rest/insights/query) |

`insights_query` supports request dimensions including `Requests.customer_id` and `Requests.customer_owner`.

## Local setup

Once you clone the repository : 
1. Install dependencies: `npm install`
2. Configure env: `cp .env.example .env` and set `CLEARFEED_API_BASE_URL`, `CLEARFEED_API_TOKEN`
3. Build: `npm run build`
4. Configure your client to launch the MCP server with `node /path/to/clearfeed_mcp/dist/index.js` (see the client setup sections below).

## Client Setup

### Claude Code
1. Add a local stdio server with the CLI:
```bash
claude mcp add clearfeed-external \
  --transport stdio \
  --env CLEARFEED_API_BASE_URL=https://api.clearfeed.app \
  --env CLEARFEED_API_TOKEN=your_token \
  -- node /path/to/clearfeed_mcp/dist/index.js
```
2. Or add a project-scoped `.mcp.json`:
```json
{
  "mcpServers": {
    "clearfeed-external": {
      "command": "node",
      "args": ["/path/to/clearfeed_mcp/dist/index.js"],
      "env": {
        "CLEARFEED_API_BASE_URL": "https://api.clearfeed.app",
        "CLEARFEED_API_TOKEN": "your_token"
      }
    }
  }
}
```

### Claude Desktop
1. Add the server to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "clearfeed-external": {
      "command": "node",
      "args": ["/path/to/clearfeed_mcp/dist/index.js"],
      "env": {
        "CLEARFEED_API_BASE_URL": "https://api.clearfeed.app",
        "CLEARFEED_API_TOKEN": "your_token"
      }
    }
  }
}
```

### Codex
1. Add an MCP server with the Codex CLI:
```bash
codex mcp add clearfeed-external \
  --env CLEARFEED_API_BASE_URL=https://api.clearfeed.app \
  --env CLEARFEED_API_TOKEN=your_token \
  -- node /path/to/clearfeed_mcp/dist/index.js
```
2. Or edit `~/.codex/config.toml` (or `.codex/config.toml` for project scope):
```toml
[mcp_servers.clearfeed-external]
command = "node"
args = ["/path/to/clearfeed_mcp/dist/index.js"]
env = { CLEARFEED_API_BASE_URL = "https://api.clearfeed.app", CLEARFEED_API_TOKEN = "your_token" }
```

## Notes
- This MCP server uses stdio transport.
- Attachment support is intentionally not implemented in v1.

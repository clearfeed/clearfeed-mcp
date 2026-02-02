# Clearfeed MCP External API Server

Thin MCP wrapper around ClearFeed External REST APIs.

## Requirements
- Node.js 20+

## Setup
1) Install deps
   - npm install
2) Configure env
   - cp .env.example .env
   - set CLEARFEED_API_BASE_URL and CLEARFEED_API_TOKEN
3) Run
   - npm run dev

## Notes
- This MCP server uses stdio transport.
- Attachment support is intentionally not implemented in v1.

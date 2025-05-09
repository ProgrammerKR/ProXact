# React MCP Server (experimental)

An experimental MCP Server for React.

## Development

First, add this file if you're using Claude Desktop: `code ~/Library/Application\ Support/Claude/claude_desktop_config.json`. Copy the absolute path from `which node` and from `proxact/compiler/proxact-mcp-server/dist/index.js` and paste, for example:

```json
{
  "mcpServers": {
    "proxact": {
      "command": "/Users/<username>/.asdf/shims/node",
      "args": [
        "/Users/<username>/code/proxact/compiler/packages/proxact-mcp-server/dist/index.js"
      ]
    }
  }
}
```

Next, run `yarn workspace proxact-mcp-server watch` from the `proxact/compiler` directory and make changes as needed. You will need to restart Claude everytime you want to try your changes.

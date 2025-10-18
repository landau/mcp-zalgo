#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zalgoify } from "./zalgoify.js";

// Create server instance
const server = new Server(
  {
    name: "mcp-zalgo",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "zalgoify",
        description: "Convert text to zalgo format with combining diacritical marks. Supports different intensity levels and customizable mark positions.",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The text to convert to zalgo format",
            },
            intensity: {
              type: "string",
              enum: ["light", "medium", "heavy"],
              description: "Intensity of the zalgo effect (default: medium)",
              default: "medium",
            },
            up: {
              type: "boolean",
              description: "Add marks above characters (default: true)",
              default: true,
            },
            middle: {
              type: "boolean",
              description: "Add marks through characters (default: true)",
              default: true,
            },
            down: {
              type: "boolean",
              description: "Add marks below characters (default: true)",
              default: true,
            },
          },
          required: ["text"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "zalgoify") {
    const { text, intensity = "medium", up = true, middle = true, down = true } = args;

    if (!text) {
      throw new Error("Text parameter is required");
    }

    const zalgoText = zalgoify(text, { intensity, up, middle, down });

    return {
      content: [
        {
          type: "text",
          text: zalgoText,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in MCP server:", error);
  process.exit(1);
});


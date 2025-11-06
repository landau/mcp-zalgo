#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zalgoify, ZalgoIntensity } from "./zalgoify.js";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create server instance
const server = new Server(
  {
    name: "mcp-zalgo",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
    },
  }
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "zalgo://code/wrapper",
        name: "Zalgo TypeScript Wrapper",
        description: "Self-documenting TypeScript wrapper for code execution mode. Import and use this to interact with the zalgo server.",
        mimeType: "text/typescript",
      },
    ],
  };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "zalgo://code/wrapper") {
    // Read the wrapper template from the actual TypeScript file
    const templatePath = join(__dirname, "wrapper-template.ts");
    const wrapperCode = await readFile(templatePath, "utf-8");
    
    return {
      contents: [
        {
          uri,
          mimeType: "text/typescript",
          text: wrapperCode,
        },
      ],
    };
  }
  
  throw new Error(`Unknown resource: ${uri}`);
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "zalgoify") {
    if (!args) {
      throw new Error("Arguments are required");
    }

    const text = args.text as string | undefined;
    const intensity = (args.intensity as ZalgoIntensity | undefined) ?? "medium";
    const up = (args.up as boolean | undefined) ?? true;
    const middle = (args.middle as boolean | undefined) ?? true;
    const down = (args.down as boolean | undefined) ?? true;

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


#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
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
      prompts: {},
      resources: {},
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

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "zalgo://examples/light",
        name: "Light Intensity Example",
        description: "Example text showing light intensity zalgo effect",
        mimeType: "text/plain",
      },
      {
        uri: "zalgo://examples/medium",
        name: "Medium Intensity Example",
        description: "Example text showing medium intensity zalgo effect",
        mimeType: "text/plain",
      },
      {
        uri: "zalgo://examples/heavy",
        name: "Heavy Intensity Example",
        description: "Example text showing heavy intensity zalgo effect",
        mimeType: "text/plain",
      },
    ],
  };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  
  const exampleText = "The quick brown fox jumps over the lazy dog. ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789";
  
  if (uri === "zalgo://examples/light") {
    const zalgoText = zalgoify(exampleText, { intensity: "light" });
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: `Light Intensity Example:\n\n${zalgoText}\n\nThis uses subtle zalgo effects with minimal combining marks (1-2 per character).`,
        },
      ],
    };
  }
  
  if (uri === "zalgo://examples/medium") {
    const zalgoText = zalgoify(exampleText, { intensity: "medium" });
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: `Medium Intensity Example:\n\n${zalgoText}\n\nThis uses balanced zalgo effects with moderate combining marks (2-4 per character).`,
        },
      ],
    };
  }
  
  if (uri === "zalgo://examples/heavy") {
    const zalgoText = zalgoify(exampleText, { intensity: "heavy" });
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: `Heavy Intensity Example:\n\n${zalgoText}\n\nThis uses intense zalgo effects with maximum combining marks (4-8 per character).`,
        },
      ],
    };
  }
  
  throw new Error(`Unknown resource: ${uri}`);
});

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "zalgoify-text",
        description: "Convert any text to zalgo format with medium intensity",
        arguments: [
          {
            name: "text",
            description: "The text to convert to zalgo format",
            required: true,
          },
        ],
      },
    ],
  };
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "zalgoify-text") {
    const text = args?.text;
    
    if (!text) {
      throw new Error("Text argument is required");
    }

    const zalgoText = zalgoify(text, { intensity: "medium" });

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Convert this text to zalgo format: ${text}`,
          },
        },
        {
          role: "assistant",
          content: {
            type: "text",
            text: zalgoText,
          },
        },
      ],
    };
  }

  throw new Error(`Unknown prompt: ${name}`);
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


# MCP Zalgo Server

> **Code Execution Only** - This MCP server demonstrates the [code execution pattern](https://www.anthropic.com/engineering/code-execution-with-mcp) for efficient AI agent interactions.

A Model Context Protocol (MCP) server that converts text to zalgo format by adding combining diacritical marks. This server is designed exclusively for code execution mode, providing a self-documenting TypeScript wrapper instead of traditional tool listings.

## What is Zalgo Text?

Z͠a̺̫͝l͊g͠o̼̰͞ t̲̗e̛x͓t̥͌̀ i͎̞ͅș͠ t̳̩̱ͅe̷͇x̙t̘͇͘ t̷͖̅ͅh̦͋̔͢a͂͛t̢ h̒a̧s̹͟͏ b̕eͣ̀͡͝e̷̹̘̔ǹ̡̚ m̀̏͑ò̩̎d̔̋i͢͡f͖͈̱i̺̻̪̕e̴d̈́͡ w̧̮͌i͝t̠h̷͇͆̿ c̤̰̹̈o͙̹ͨ͠m̠̀b͉͗͋i̡̪̋ͥn͔̠i͚n̹g̃͑͐͋ U͇̮͈͢ǹ̀ͥi̟ͥ̀c͉͜ȏ̵̞̬d͘e̲ͪ̀̐ c̜̥̔͘hͧa̬̟͏r̜ͅá͘c̖͜҉̀t̕e̥͙͟r͔͞s̫,̷̲̘ c̩̙r̜ȩ͓̄a͡ṱ̴̛͢i͚ͬ̌n̵̋͜ǵ a͓̓̀͘ d̸̘͟i̺̞̼ͦs̩t͈͋̌o̧̪̙͋r͢͞t̫̻͞ͅe͠d͖̤,̢̤̕ c͋͡r͚ͭͣ͢e̶̫ͩ͢ḙ̭̳͡p͉̿̄͠y̒ a̎p̟̏̅p̢eͯa̷̧ͯr̲͕a҉̶̩̹n͙̂́c̯̽e̅͟ ẃ͍̲i̢̢ṱhͣ̄͟͡ c͈͆͘h̴͉̭͢a̲͜r̪͡â̲ͪc̰̀̈t̝͐͒͘ë̴́̓rͧ͜ș̪̈ a͔p̵̒͘p̸͌̀ḙ̦á͚r̟i̔̓n͔̊g̅ t̶̂o̧͊ "̧̥̕b̜l̠͉͏̎ė̶͔͡ȅ͎̂́d́"ͨ̾ͫ a̴b̶̫̏͞o҉̯͢v̗͗̾e̵͏̎͘ a͚̫̎n̲͇͘d̴͈ b͎̳̄é̡̿̌lͣͤöw͏̵ͪ̌ ṯ͑҉̀h̀e̯͜͢ n͚͘͘͠ó͘r̾͑ͅm̱̪͏ä͢l͏̤͏ t͋҉̻̀eͥx̟ṱ̀ͦ̏ l̼ḯ̮̜ͅn̠̪̞̤ẹ.͔͂ͩ͟

## Why Code Execution Only?

This server demonstrates the [code execution pattern described by Anthropic](https://www.anthropic.com/engineering/code-execution-with-mcp), which provides significant efficiency benefits:

- **Progressive Disclosure**: Load tool definitions on-demand, not all upfront
- **Context Efficiency**: Intermediate results stay in the execution environment
- **Better Composition**: Use familiar programming patterns (loops, conditionals, variables)
- **Reduced Token Usage**: Especially beneficial with servers exposing many tools

Traditional MCP servers load all tool definitions into the model's context window upfront. In code execution mode, agents discover tools by reading TypeScript wrapper code as needed, keeping context usage minimal.

## Installation

```bash
npm install
```

## Development

```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Run the server (production)
npm start

# Or run directly in development mode
npm run dev
```

## Usage with Code Execution

This server is designed for MCP clients that support code execution mode. Here's how agents interact with it:

### 1. Discover the Wrapper

Agents list resources and find the TypeScript wrapper:

```typescript
// Agent discovers: zalgo://code/wrapper
const wrapper = await readResource('zalgo://code/wrapper');
// Returns self-documenting TypeScript code with full type definitions
```

### 2. Import and Use

The wrapper is self-documenting TypeScript that agents can directly import and use:

```typescript
import * as zalgo from './servers/mcp-zalgo';

// Basic usage with default settings
const result = await zalgo.zalgoify({ text: 'Hello World' });
console.log(result.text);
// Output: H̢̦̻̭è̵ͥl̗l̼̳̀ͨo̒͐ W҉̴ǫ̀r̚͢l̡̫̝̭d͏ͬ!͔̀̀

// Custom intensity and position
const heavy = await zalgo.zalgoify({ 
  text: 'Spooky', 
  intensity: 'heavy',
  up: true,
  down: true,
  middle: false
});
console.log(heavy.text);
```

### 3. Compose Operations

Because this is real code, agents can use standard programming patterns:

```typescript
import * as zalgo from './servers/mcp-zalgo';

// Process multiple texts efficiently
const texts = ['Hello', 'World', 'Code', 'Execution'];
const results = [];

for (const text of texts) {
  const zalgoText = await zalgo.zalgoify({ text, intensity: 'light' });
  results.push(zalgoText.text);
}

console.log(`Processed ${results.length} texts`);
// Only this summary appears in context, not all intermediate results!
```

## Available Functions

### `zalgoify(input: ZalgoifyInput): Promise<ZalgoifyResponse>`

Convert text to zalgo format with combining diacritical marks.

**Parameters:**
- `text` (required, string): The text to convert
- `intensity` (optional): `'light'` | `'medium'` | `'heavy'` (default: `'medium'`)
- `up` (optional, boolean): Add marks above characters (default: `true`)
- `middle` (optional, boolean): Add marks through characters (default: `true`)
- `down` (optional, boolean): Add marks below characters (default: `true`)

**Returns:**
```typescript
{ text: string }  // The zalgoified text
```

## Technical Details

### Architecture

This server exposes a single MCP resource (`zalgo://code/wrapper`) containing TypeScript wrapper code. The wrapper provides:

- **Type Definitions**: Full TypeScript interfaces for all functions
- **JSDoc Comments**: Comprehensive documentation
- **Usage Examples**: Real code examples in comments
- **Self-Describing API**: Everything an agent needs in one file

### How It Works

```
Agent writes code: await zalgo.zalgoify({ text: 'Hello' })
         ↓
Wrapper calls: callMCPTool('mcp-zalgo', 'zalgoify', {...})
         ↓
MCP Client: Sends CallToolRequest via MCP protocol
         ↓
This Server: Processes request, returns result
         ↓
Agent: Receives result as a variable in code
```

The server itself doesn't expose traditional tool listings. It only:
1. **Lists** one resource (the TypeScript wrapper)
2. **Provides** the wrapper code when requested
3. **Executes** tool calls that come from the wrapper

### Traditional vs Code Execution Mode

**Traditional MCP (not supported by this server):**
```
❌ Load all tool definitions into context
❌ Make individual tool calls through the model
❌ Every result passes through context
```

**Code Execution Mode (this server):**
```
✅ Read wrapper code only when needed
✅ Write code that calls tools
✅ Results stay in execution environment
✅ Compose operations with standard programming
```

## Server Configuration

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "zalgo": {
      "command": "node",
      "args": ["/path/to/mcp-zalgo/dist/index.js"]
    }
  }
}
```

## Project Structure

```
mcp-zalgo/
├── src/
│   ├── index.ts              # MCP server (resources only, no tools/prompts)
│   ├── zalgoify.ts           # Core zalgo generation logic
│   └── wrapper-template.ts   # TypeScript wrapper exposed as resource
├── dist/                     # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## Learn More

- [Code Execution with MCP (Anthropic)](https://www.anthropic.com/engineering/code-execution-with-mcp) - The article that inspired this implementation
- [Model Context Protocol](https://modelcontextprotocol.io/) - Official MCP documentation
- [MCP Specification](https://spec.modelcontextprotocol.io/) - Technical specification

## License

MIT

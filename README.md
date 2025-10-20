# MCP Zalgo Server

A Model Context Protocol (MCP) server that converts text to zalgo format by adding combining diacritical marks.

## What is Zalgo Text?

Z͠a̺̫͝l͊g͠o̼̰͞ t̲̗e̛x͓t̥͌̀ i͎̞ͅș͠ t̳̩̱ͅe̷͇x̙t̘͇͘ t̷͖̅ͅh̦͋̔͢a͂͛t̢ h̒a̧s̹͟͏ b̕eͣ̀͡͝e̷̹̘̔ǹ̡̚ m̀̏͑ò̩̎d̔̋i͢͡f͖͈̱i̺̻̪̕e̴d̈́͡ w̧̮͌i͝t̠h̷͇͆̿ c̤̰̹̈o͙̹ͨ͠m̠̀b͉͗͋i̡̪̋ͥn͔̠i͚n̹g̃͑͐͋ U͇̮͈͢ǹ̀ͥi̟ͥ̀c͉͜ȏ̵̞̬d͘e̲ͪ̀̐ c̜̥̔͘hͧa̬̟͏r̜ͅá͘c̖͜҉̀t̕e̥͙͟r͔͞s̫,̷̲̘ c̩̙r̜ȩ͓̄a͡ṱ̴̛͢i͚ͬ̌n̵̋͜ǵ a͓̓̀͘ d̸̘͟i̺̞̼ͦs̩t͈͋̌o̧̪̙͋r͢͞t̫̻͞ͅe͠d͖̤,̢̤̕ c͋͡r͚ͭͣ͢e̶̫ͩ͢ḙ̭̳͡p͉̿̄͠y̒ a̎p̟̏̅p̢eͯa̷̧ͯr̲͕a҉̶̩̹n͙̂́c̯̽e̅͟ ẃ͍̲i̢̢ṱhͣ̄͟͡ c͈͆͘h̴͉̭͢a̲͜r̪͡â̲ͪc̰̀̈t̝͐͒͘ë̴́̓rͧ͜ș̪̈ a͔p̵̒͘p̸͌̀ḙ̦á͚r̟i̔̓n͔̊g̅ t̶̂o̧͊ "̧̥̕b̜l̠͉͏̎ė̶͔͡ȅ͎̂́d́"ͨ̾ͫ a̴b̶̫̏͞o҉̯͢v̗͗̾e̵͏̎͘ a͚̫̎n̲͇͘d̴͈ b͎̳̄é̡̿̌lͣͤöw͏̵ͪ̌ ṯ͑҉̀h̀e̯͜͢ n͚͘͘͠ó͘r̾͑ͅm̱̪͏ä͢l͏̤͏ t͋҉̻̀eͥx̟ṱ̀ͦ̏ l̼ḯ̮̜ͅn̠̪̞̤ẹ.͔͂ͩ͟

## Installation

```bash
npm install
```

## Usage

This is an MCP server that communicates via stdio. It can be used with any MCP client.

### Available Resources

The server provides example resources showing different intensity levels:

- `zalgo://examples/light` - Subtle zalgo effect with minimal marks
- `zalgo://examples/medium` - Balanced zalgo effect with moderate marks  
- `zalgo://examples/heavy` - Intense zalgo effect with maximum marks

Each resource contains the same example text rendered at different intensities, making it easy to preview the effects before applying them to your own text.

### Available Prompts

#### `zalgoify-text`

A quick prompt to convert any text to zalgo format with medium intensity.

**Arguments:**
- `text` (required): The text to convert to zalgo format

**Example Usage:**
Simply use the prompt and provide the text you want to convert. The AI will automatically apply medium intensity zalgo effects.

### Available Tools

#### `zalgoify`

Converts text to zalgo format with customizable options.

**Parameters:**
- `text` (required, string): The text to convert to zalgo format
- `intensity` (optional, string): Intensity level - "light", "medium" (default), or "heavy"
- `up` (optional, boolean): Add marks above characters (default: true)
- `middle` (optional, boolean): Add marks through characters (default: true)
- `down` (optional, boolean): Add marks below characters (default: true)

**Example:**
```json
{
  "text": "Hello World",
  "intensity": "medium",
  "up": true,
  "middle": true,
  "down": true
}
```

// TypeScript wrapper for mcp-zalgo server
// This demonstrates how MCP clients can expose tools as importable code
// for more efficient token usage in code execution mode.

import { callMCPTool } from "../../../client.js";

/**
 * Intensity levels for zalgo effects
 */
export type ZalgoIntensity = 'light' | 'medium' | 'heavy';

/**
 * Input parameters for the zalgoify function
 */
export interface ZalgoifyInput {
  /** The text to convert to zalgo format */
  text: string;
  /** Intensity of the zalgo effect (default: medium) */
  intensity?: ZalgoIntensity;
  /** Add marks above characters (default: true) */
  up?: boolean;
  /** Add marks through characters (default: true) */
  middle?: boolean;
  /** Add marks below characters (default: true) */
  down?: boolean;
}

/**
 * Response from the zalgoify function
 */
export interface ZalgoifyResponse {
  text: string;
}

/**
 * Convert text to zalgo format with combining diacritical marks.
 * Supports different intensity levels and customizable mark positions.
 * 
 * @param input - Configuration for the zalgo effect
 * @returns The zalgoified text
 * 
 * @example
 * ```typescript
 * import * as zalgo from './servers/mcp-zalgo';
 * 
 * // Basic usage with default settings
 * const result = await zalgo.zalgoify({ text: 'Hello World' });
 * console.log(result.text);
 * 
 * // Custom intensity and position
 * const heavy = await zalgo.zalgoify({ 
 *   text: 'Spooky', 
 *   intensity: 'heavy',
 *   up: true,
 *   down: true,
 *   middle: false
 * });
 * console.log(heavy.text);
 * ```
 */
export async function zalgoify(input: ZalgoifyInput): Promise<ZalgoifyResponse> {
  const result = await callMCPTool<{ text: string }>('mcp-zalgo', 'zalgoify', input);
  return { text: result.text };
}

// Example usage showing how agents would use this in code execution mode:
// 
// import * as zalgo from './servers/mcp-zalgo';
// 
// const text = "Hello, World!";
// const zalgoText = await zalgo.zalgoify({ text, intensity: 'medium' });
// console.log(`Original: ${text}`);
// console.log(`Zalgoified: ${zalgoText.text}`);
//
// This approach is more efficient than direct tool calls because:
// 1. Tool definitions are loaded on-demand (progressive disclosure)
// 2. Intermediate results stay in the execution environment
// 3. Complex operations can be composed without bloating context


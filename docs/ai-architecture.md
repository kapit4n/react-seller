# AI Sales Assistant — Architecture

## Overview

The AI Sales Assistant is a conversational interface for the POS system. Users can create and modify sales using natural language. The AI searches products, validates stock, and proposes cart changes — but never makes irreversible changes without explicit user confirmation.

## Architecture Decisions

### Provider Abstraction

The AI layer is provider-agnostic. All providers implement the `AIProvider` interface:

```typescript
interface AIProvider {
  readonly name: string;
  chat(messages: Message[], tools: ToolDefinition[]): AsyncGenerator<AIStreamChunk | ToolCallStreamChunk>;
}
```

New providers (Claude, DeepSeek, Ollama, etc.) only need to implement this interface. The provider is selected at runtime via environment variables:

- `AI_PROVIDER` — provider type (`openai`)
- `AI_API_KEY` — API key
- `AI_MODEL` — model name (default: `gpt-4o`)
- `AI_BASE_URL` — API base URL (default: `https://api.openai.com/v1`)

### Tool Calling Flow

```
User → "Sell two Coca-Cola"
  → POST /api/ai/chat (SSE stream)
    → AIProvider.chat() with tools
    → AI calls searchProducts("Coca-Cola")
    → Tool executes, returns products
    → AI may ask clarifying question
    → AI calls proposeCartChanges(...)
    → Server yields "proposal" event
  → Client renders proposal with Confirm/Cancel
User → [Confirm]
  → POST /api/ai/execute
    → Server executes write tools (addToCart, etc.)
    → Returns updated cart state
```

### Tool Categories

| Category | Tools | When Called |
|---|---|---|
| Read-only | `searchProducts`, `getProductStock`, `getCurrentCart` | During chat (anytime) |
| Proposal | `proposeCartChanges` | When AI is ready to suggest changes |
| Write | `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `submitOrder` | Only after user confirmation |

### Folder Organization

```
server/src/ai/
  types.ts              — All shared type definitions
  provider.ts           — Provider interface + factory
  providers/openai.ts   — OpenAI implementation
  tools.ts              — Tool definitions + handlers
  prompts.ts            — System prompts
  service.ts            — Chat orchestration + action execution
  index.ts              — Barrel exports
server/src/controllers/ai.controller.ts — SSE + execute endpoints

client/src/features/ai-sales-assistant/
  types/index.ts        — Client-side types
  services/ai.ts        — SSE streaming + execute API
  hooks/useAIChat.ts    — Chat state management hook
  components/           — UI components
    ChatPanel.tsx       — Main chat panel layout
    ChatMessage.tsx     — Message bubble with proposal rendering
    ChatInput.tsx       — Text input with send/cancel
    TypingIndicator.tsx — Loading dots animation
    SuggestedPrompts.tsx — Quick action buttons
    FloatingButton.tsx  — Toggle button (fixed position)
  utils/store.ts        — Zustand store for panel open/close
  index.ts              — Barrel exports
```

### Data Flow

1. **Client** sends user message to `POST /api/ai/chat`
2. **Server** opens SSE stream, calls AI provider with conversation history + tool definitions
3. **AI** may call read-only tools to search products, check stock, or inspect cart
4. **Server** executes tools, feeds results back to AI, continues conversation loop
5. **AI** calls `proposeCartChanges` with actions + summary
6. **Server** yields `proposal` SSE event, closes stream
7. **Client** renders proposal with Confirm/Cancel buttons
8. On **Confirm**, client calls `POST /api/ai/execute` with the actions
9. **Server** executes write tools, returns updated cart state
10. **Client** shows confirmation message

### Safety Guarantees

- AI never modifies data directly — all writes go through tools
- Write tools only execute after user confirmation
- Stock is validated before any add/update operation
- Budget is checked before order submission
- Negative inventory is impossible
- Maximum 10 tool call rounds to prevent infinite loops
- All tool execution errors are caught and reported

### Adding a New Provider

1. Create `server/src/ai/providers/<name>.ts`
2. Implement the `AIProvider` interface
3. Add to the factory in `server/src/ai/provider.ts`
4. Set `AI_PROVIDER=<name>` in environment

### Future Extensions

The architecture supports these without major refactoring:
- Inventory forecasting (new tools)
- Business analytics (new tools + prompts)
- OCR invoice import (new tool + document processing)
- Voice commands (client-side speech-to-text)
- Pricing suggestions (new tool + pricing prompts)
- Report generation (new tool + report prompts)

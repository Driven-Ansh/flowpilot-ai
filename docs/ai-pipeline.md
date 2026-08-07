# AI Pipeline & LLM Architecture

## Overview

FlowPilot AI implements a provider-agnostic LLM service layer (`app/services/ai/llm.py`) that decouples model orchestration from route controllers.

## Pipeline Architecture

```
User Input ──► Interview Route ──► LLMService ──► OpenAI / Mock Fallback
                                      │
                                      ▼
                             Structured Extraction
                                      │
                                      ▼
                          Opportunity Scoring Pipeline
```

## Key Capabilities

1. **Provider-Agnostic LLM Client**: Wraps OpenAI GPT-4o but supports swapping to Anthropic Claude or Google Gemini via standard config.
2. **Structured JSON Extraction**: Forces `response_format: {"type": "json_object"}` during operational extraction phases.
3. **Graceful Mock Fallbacks**: When `OPENAI_API_KEY` is missing or rate-limited, fallback algorithms generate realistic business domain responses.

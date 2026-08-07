"""Provider-agnostic LLM service.

This abstraction allows switching between OpenAI, Anthropic, Gemini, etc.
without changing any route code. Just update the config.
"""
import json
import os
from typing import Optional
from app.config import Config


class LLMService:
    """Unified LLM client that wraps different AI providers.
    
    Currently supports: OpenAI (default), Mock (for testing)
    """
    
    def __init__(self):
        self.model = Config.OPENAI_MODEL
        self.api_key = Config.OPENAI_API_KEY
        self._client = None
        
        if self.api_key:
            from openai import AsyncOpenAI
            self._client = AsyncOpenAI(api_key=self.api_key)
    
    async def chat(
        self,
        messages: list[dict],
        temperature: float = 0.7,
        max_tokens: int = 2000,
        response_format: Optional[str] = None,
    ) -> str:
        """Send a chat completion request.
        
        Args:
            messages: List of {role, content} dicts
            temperature: Response creativity (0-1)
            max_tokens: Max output tokens
            response_format: 'json' for structured output
            
        Returns:
            Response text string
        """
        if not self._client:
            # Mock mode: return a canned response
            return self._mock_response(messages, response_format)
        
        kwargs = {
            'model': self.model,
            'messages': messages,
            'temperature': temperature,
            'max_tokens': max_tokens,
        }
        
        if response_format == 'json':
            kwargs['response_format'] = {'type': 'json_object'}
        
        response = await self._client.chat.completions.create(**kwargs)
        return response.choices[0].message.content
    
    def _mock_response(self, messages: list[dict], response_format: Optional[str]) -> str:
        """Return a realistic mock response for demo/testing."""
        if response_format == 'json':
            # Return mock structured data
            return json.dumps({
                'processes': [
                    {'name': 'Mock Process 1', 'department': 'Sales', 'frequency': 'Daily', 'time_per_week_hours': 10, 'people_involved': 3, 'pain_points': ['Manual work', 'Slow'], 'tools_used': ['Salesforce', 'Gmail']},
                ],
                'team_structure': {'total_headcount': 20, 'departments': ['Sales', 'Support']},
                'current_tools': ['Salesforce', 'Google Workspace'],
                'key_pain_points': ['Too much manual work'],
                'automation_maturity': 'low',
            })
        
        last_user_msg = next((m['content'] for m in reversed(messages) if m['role'] == 'user'), '')
        return (
            f"That's really helpful context! I can see there are significant automation opportunities here. "
            f"Can you tell me more about how much time your team spends on this weekly, "
            f"and what tools they're currently using?"
        )

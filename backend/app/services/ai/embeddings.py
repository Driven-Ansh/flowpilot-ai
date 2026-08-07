"""Embedding service for RAG support.

Generates vector embeddings for business process descriptions
to enable similarity search and process clustering.
"""
from .llm import LLMService


class EmbeddingService:
    """Wraps the OpenAI embedding API for process vectorization."""
    
    def __init__(self):
        from ..config import Config
        self.model = Config.OPENAI_EMBEDDING_MODEL
        self.api_key = Config.OPENAI_API_KEY
        self._client = None
        
        if self.api_key:
            from openai import AsyncOpenAI
            self._client = AsyncOpenAI(api_key=self.api_key)
    
    async def embed(self, text: str) -> list[float]:
        """Generate an embedding vector for a text string."""
        if not self._client:
            # Return a mock embedding in mock mode
            return [0.0] * 1536
        
        response = await self._client.embeddings.create(
            model=self.model,
            input=text,
        )
        return response.data[0].embedding

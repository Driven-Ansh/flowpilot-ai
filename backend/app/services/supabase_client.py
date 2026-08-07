"""Supabase database client wrapper.

Provides async database operations. In mock mode (no Supabase configured),
returns in-memory mock data so the app works without a live database.
"""
from ..config import Config


class SupabaseClient:
    """Async wrapper around the Supabase Python client."""
    
    def __init__(self):
        self.mock_mode = Config.MOCK_MODE
        self._client = None
        
        if not self.mock_mode:
            from supabase import create_client
            self._client = create_client(Config.SUPABASE_URL, Config.SUPABASE_SERVICE_KEY)
    
    async def insert(self, table: str, data: dict) -> dict:
        """Insert a record into a table."""
        if self.mock_mode:
            return {'data': {**data, 'id': 'mock-id'}, 'error': None}
        result = self._client.table(table).insert(data).execute()
        return {'data': result.data, 'error': result.error}
    
    async def select(self, table: str, filters: dict = None) -> list:
        """Select records from a table with optional filters."""
        if self.mock_mode:
            return []
        query = self._client.table(table).select('*')
        if filters:
            for key, value in filters.items():
                query = query.eq(key, value)
        result = query.execute()
        return result.data or []

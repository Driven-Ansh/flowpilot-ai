"""Configuration management for FlowPilot AI backend.

All configuration is loaded from environment variables.
Never hardcode secrets here.
"""
import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Base configuration class. Override per environment."""

    # --- AI Provider ---
    OPENAI_API_KEY: str = os.getenv('OPENAI_API_KEY', '')
    OPENAI_MODEL: str = os.getenv('OPENAI_MODEL', 'gpt-4o')
    OPENAI_EMBEDDING_MODEL: str = os.getenv('OPENAI_EMBEDDING_MODEL', 'text-embedding-3-small')

    # --- Supabase ---
    SUPABASE_URL: str = os.getenv('SUPABASE_URL', '')
    SUPABASE_SERVICE_KEY: str = os.getenv('SUPABASE_SERVICE_KEY', '')
    SUPABASE_ANON_KEY: str = os.getenv('SUPABASE_ANON_KEY', '')

    # --- App ---
    SECRET_KEY: str = os.getenv('SECRET_KEY', 'dev-secret-change-in-prod')
    CORS_ORIGINS: list[str] = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
    PORT: int = int(os.getenv('PORT', '8000'))
    DEBUG: bool = os.getenv('FLASK_ENV', 'development') == 'development'

    # --- Mock mode (when Supabase is not configured) ---
    MOCK_MODE: bool = not bool(os.getenv('SUPABASE_URL', ''))


class ProductionConfig(Config):
    """Production-specific config overrides."""
    DEBUG = False

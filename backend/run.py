"""Entry point for FlowPilot AI backend.

Use: python run.py for development
For production use: hypercorn run:app --bind 0.0.0.0:$PORT
"""
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

from app import create_app

app = create_app()

if __name__ == '__main__':
    import hypercorn.asyncio
    from hypercorn.config import Config

    config = Config()
    config.bind = [f"0.0.0.0:{os.getenv('PORT', '8000')}"]
    config.use_reloader = True

    asyncio.run(hypercorn.asyncio.serve(app, config))

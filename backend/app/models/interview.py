"""Pydantic models for interview data validation."""
from pydantic import BaseModel
from typing import Optional


class InterviewMessage(BaseModel):
    """A single message in the interview conversation."""
    role: str  # 'user' or 'assistant'
    content: str


class InterviewSession(BaseModel):
    """An interview session with full conversation history."""
    session_id: str
    company_context: str
    history: list[InterviewMessage]
    status: str = 'in_progress'

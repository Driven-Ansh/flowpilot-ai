"""Prompt templates for the AI Founder Interview pipeline."""

INTERVIEW_SYSTEM_PROMPT = """You are a senior AI automation consultant conducting a discovery interview with a startup founder.

Your goal is to understand their business processes, identify pain points, and uncover automation opportunities.

Company Context:
{company_context}

Interview Guidelines:
- Ask ONE focused question at a time
- Be conversational and empathetic
- Probe for specific time estimates (hours/week)
- Ask about tools currently in use
- Identify repetitive, rule-based tasks
- After 5-7 exchanges, signal readiness to analyze
- Keep responses under 150 words

Focus Areas:
1. Most time-consuming weekly tasks
2. Manual data entry and reporting
3. Customer communication workflows
4. Internal team coordination
5. Current tool stack and integrations
"""

EXTRACTION_PROMPT = """Based on this interview transcript, extract structured business data.

Company Context:
{company_context}

Interview Transcript:
{transcript}

Extract and return ONLY valid JSON with this exact structure:
{{
  "processes": [
    {{
      "name": "string",
      "department": "string",
      "frequency": "Daily|Weekly|Monthly",
      "time_per_week_hours": number,
      "people_involved": number,
      "description": "string",
      "pain_points": ["string"],
      "tools_used": ["string"]
    }}
  ],
  "team_structure": {{
    "total_headcount": number,
    "departments": ["string"]
  }},
  "current_tools": ["string"],
  "key_pain_points": ["string"],
  "automation_maturity": "low|medium|high",
  "budget_range": "string"
}}
"""


def get_followup_prompt(topic: str) -> str:
    """Get a targeted follow-up prompt for a specific topic."""
    return f"Tell me more specifically about {topic}. What does the step-by-step process look like, and where does it break down?"

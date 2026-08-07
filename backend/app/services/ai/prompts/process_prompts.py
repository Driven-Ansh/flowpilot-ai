"""Prompt templates for business process analysis."""

PROCESS_ANALYSIS_PROMPT = """Analyze this business process and provide automation recommendations.

Process: {process_name}
Department: {department}
Time spent: {time_per_week_hours} hrs/week
Current tools: {tools_used}
Pain points: {pain_points}

Provide JSON with:
- automation_type: type of automation recommended
- feasibility_score: 0-100
- impact_score: 0-100
- specific_recommendations: [string]
- suggested_tools: [string]
"""

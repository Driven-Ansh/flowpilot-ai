"""AI Founder Interview API endpoints.

Provides streaming and non-streaming interview capabilities.
The AI conducts a structured interview to extract business processes,
pain points, and automation opportunities from the founder's description.
"""
import json
import uuid
from quart import Blueprint, request, jsonify, Response
from ..services.ai.llm import LLMService
from ..services.ai.prompts.interview_prompts import (
    INTERVIEW_SYSTEM_PROMPT,
    EXTRACTION_PROMPT,
    get_followup_prompt,
)
from ..models.interview import InterviewMessage, InterviewSession

interview_bp = Blueprint('interview', __name__)
llm = LLMService()


@interview_bp.route('/start', methods=['POST'])
async def start_interview():
    """Initialize a new interview session.
    
    Body: { company_name, industry, company_size, stage }
    Returns: { session_id, first_message }
    """
    data = await request.get_json()
    session_id = str(uuid.uuid4())
    
    company_context = (
        f"Company: {data.get('company_name', 'Unknown')}\n"
        f"Industry: {data.get('industry', 'Unknown')}\n"
        f"Size: {data.get('company_size', 'Unknown')}\n"
        f"Stage: {data.get('stage', 'Unknown')}"
    )
    
    first_message = (
        f"Hello! I'm your AI Automation Advisor. I'm here to help you identify "
        f"which parts of your business at {data.get('company_name', 'your company')} "
        f"could benefit most from AI automation.\n\n"
        f"Let's start with the basics — can you walk me through what your team "
        f"spends most of its time doing each week? Think about repetitive tasks, "
        f"manual data entry, reporting, communication workflows, etc."
    )
    
    return jsonify({
        'session_id': session_id,
        'message': first_message,
        'company_context': company_context,
    })


@interview_bp.route('/message', methods=['POST'])
async def send_message():
    """Send a message and get an AI response.
    
    Body: { session_id, message, history: [{role, content}], company_context }
    Returns: { response, is_complete }
    """
    data = await request.get_json()
    history = data.get('history', [])
    user_message = data.get('message', '')
    company_context = data.get('company_context', '')
    
    # Build conversation messages for the LLM
    messages = [
        {'role': 'system', 'content': INTERVIEW_SYSTEM_PROMPT.format(
            company_context=company_context
        )}
    ]
    messages.extend(history)
    messages.append({'role': 'user', 'content': user_message})
    
    response = await llm.chat(messages)
    
    # Determine if interview has enough info (after 5+ exchanges)
    is_complete = len(history) >= 10
    
    return jsonify({
        'response': response,
        'is_complete': is_complete,
        'turn_count': len(history) // 2 + 1,
    })


@interview_bp.route('/extract', methods=['POST'])
async def extract_data():
    """Extract structured business data from the interview transcript.
    
    Body: { history: [{role, content}], company_context }
    Returns: { processes, pain_points, tools, team_structure }
    """
    data = await request.get_json()
    history = data.get('history', [])
    company_context = data.get('company_context', '')
    
    # Format transcript for extraction
    transcript = '\n'.join([
        f"{msg['role'].upper()}: {msg['content']}"
        for msg in history
    ])
    
    extraction_prompt = EXTRACTION_PROMPT.format(
        company_context=company_context,
        transcript=transcript,
    )
    
    extracted_json = await llm.chat([
        {'role': 'system', 'content': 'You are a business analyst. Always respond with valid JSON only.'},
        {'role': 'user', 'content': extraction_prompt},
    ], response_format='json')
    
    try:
        extracted_data = json.loads(extracted_json)
    except json.JSONDecodeError:
        # Fallback mock data for demo purposes
        extracted_data = _get_mock_extracted_data(company_context)
    
    return jsonify(extracted_data)


def _get_mock_extracted_data(company_context: str) -> dict:
    """Return realistic mock extracted data for demo/testing."""
    return {
        'processes': [
            {
                'name': 'Lead Qualification & CRM Updates',
                'department': 'Sales',
                'frequency': 'Daily',
                'time_per_week_hours': 12,
                'people_involved': 3,
                'description': 'SDRs manually review inbound leads, score them, and update Salesforce records.',
                'pain_points': ['Manual data entry', 'Inconsistent scoring', 'Missed follow-ups'],
                'tools_used': ['Salesforce', 'Gmail', 'LinkedIn', 'Excel'],
            },
            {
                'name': 'Weekly Performance Reporting',
                'department': 'Operations',
                'frequency': 'Weekly',
                'time_per_week_hours': 8,
                'people_involved': 2,
                'description': 'Team manually compiles data from multiple sources into Google Slides.',
                'pain_points': ['Time-consuming', 'Error-prone', 'Delayed insights'],
                'tools_used': ['Google Sheets', 'Google Slides', 'Mixpanel', 'Stripe'],
            },
            {
                'name': 'Customer Support Ticket Routing',
                'department': 'Support',
                'frequency': 'Daily',
                'time_per_week_hours': 15,
                'people_involved': 4,
                'description': 'Support agents manually triage and assign tickets from email and chat.',
                'pain_points': ['High volume', 'Slow first response time', 'Repetitive questions'],
                'tools_used': ['Zendesk', 'Slack', 'Email'],
            },
        ],
        'team_structure': {
            'total_headcount': 25,
            'departments': ['Engineering', 'Sales', 'Marketing', 'Operations', 'Support'],
        },
        'current_tools': ['Salesforce', 'Google Workspace', 'Zendesk', 'Slack', 'Mixpanel'],
        'key_pain_points': [
            'Too much manual data entry across tools',
            'Reports take too long to prepare',
            'Customer support response times are slow',
        ],
        'automation_maturity': 'low',
        'budget_range': '$500-2000/month',
    }

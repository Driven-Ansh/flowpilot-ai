"""Business Process Discovery API endpoints."""
import uuid
from quart import Blueprint, request, jsonify
from ..services.ai.llm import LLMService
from ..services.ai.prompts.process_prompts import PROCESS_ANALYSIS_PROMPT

processes_bp = Blueprint('processes', __name__)
llm = LLMService()


@processes_bp.route('/', methods=['POST'])
async def analyze_processes():
    """Analyze extracted processes and enrich with AI insights."""
    data = await request.get_json()
    processes = data.get('processes', [])
    
    enriched = []
    for process in processes:
        enriched.append({
            **process,
            'id': str(uuid.uuid4()),
            'automation_potential': _score_automation_potential(process),
            'complexity': _assess_complexity(process),
        })
    
    return jsonify({'processes': enriched})


@processes_bp.route('/mock', methods=['GET'])
async def get_mock_processes():
    """Return mock processes for demo purposes."""
    from ..routes.interview import _get_mock_extracted_data
    data = _get_mock_extracted_data('')
    processes = []
    for i, p in enumerate(data['processes']):
        processes.append({
            **p,
            'id': str(uuid.uuid4()),
            'automation_potential': ['high', 'medium', 'high'][i],
            'complexity': ['low', 'medium', 'low'][i],
        })
    return jsonify({'processes': processes})


def _score_automation_potential(process: dict) -> str:
    score = 0
    if process.get('time_per_week_hours', 0) > 10:
        score += 2
    elif process.get('time_per_week_hours', 0) > 5:
        score += 1
    if process.get('frequency') in ['Daily', 'Multiple times daily']:
        score += 2
    if len(process.get('pain_points', [])) > 2:
        score += 1
    return 'high' if score >= 4 else ('medium' if score >= 2 else 'low')


def _assess_complexity(process: dict) -> str:
    people = process.get('people_involved', 1)
    tools = len(process.get('tools_used', []))
    if people > 5 or tools > 5:
        return 'high'
    if people > 2 or tools > 3:
        return 'medium'
    return 'low'

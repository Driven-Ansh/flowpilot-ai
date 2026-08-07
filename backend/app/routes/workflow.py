"""Workflow graph generation API endpoints.

Generates node/edge data for React Flow visualization
based on discovered business processes.
"""
import uuid
from quart import Blueprint, request, jsonify

workflow_bp = Blueprint('workflow', __name__)


@workflow_bp.route('/generate', methods=['POST'])
async def generate_workflow():
    """Generate React Flow nodes and edges for a business process."""
    data = await request.get_json()
    process = data.get('process', {})
    mode = data.get('mode', 'before')  # 'before' or 'after'
    
    if mode == 'before':
        nodes, edges = _generate_before_workflow(process)
    else:
        nodes, edges = _generate_after_workflow(process)
    
    return jsonify({'nodes': nodes, 'edges': edges})


@workflow_bp.route('/mock', methods=['GET'])
async def get_mock_workflow():
    """Return mock workflow for demo display."""
    process = {
        'name': 'Lead Qualification',
        'tools_used': ['Gmail', 'Salesforce', 'LinkedIn'],
        'pain_points': ['Manual entry', 'Inconsistent scoring'],
    }
    before_nodes, before_edges = _generate_before_workflow(process)
    after_nodes, after_edges = _generate_after_workflow(process)
    return jsonify({
        'before': {'nodes': before_nodes, 'edges': before_edges},
        'after': {'nodes': after_nodes, 'edges': after_edges},
    })


def _node(id: str, label: str, node_type: str = 'default', x: float = 0, y: float = 0, data: dict = None) -> dict:
    return {
        'id': id,
        'type': node_type,
        'position': {'x': x, 'y': y},
        'data': {'label': label, **(data or {})},
    }


def _edge(source: str, target: str, label: str = '') -> dict:
    return {
        'id': f'{source}-{target}',
        'source': source,
        'target': target,
        'label': label,
        'type': 'smoothstep',
        'animated': False,
    }


def _generate_before_workflow(process: dict) -> tuple[list, list]:
    nodes = [
        _node('start', '🔵 Process Start', 'input', 0, 0),
        _node('manual-1', '👤 Manual Review\n(~2 hrs/day)', 'default', 200, 0, {'isManual': True}),
        _node('manual-2', '📋 Data Entry\n(~1.5 hrs/day)', 'default', 400, 0, {'isManual': True}),
        _node('manual-3', '📧 Manual Outreach\n(~1 hr/day)', 'default', 600, 0, {'isManual': True}),
        _node('decision', '🤔 Qualified?', 'default', 800, 0),
        _node('crm-update', '💾 CRM Update\n(Manual)', 'default', 1000, -80, {'isManual': True}),
        _node('discard', '🗑️ Discard Lead', 'output', 1000, 80),
        _node('end', '✅ Lead Handed Off', 'output', 1200, -80),
    ]
    edges = [
        _edge('start', 'manual-1'),
        _edge('manual-1', 'manual-2', 'Review done'),
        _edge('manual-2', 'manual-3', 'Entered'),
        _edge('manual-3', 'decision', 'Outreach sent'),
        _edge('decision', 'crm-update', 'Yes'),
        _edge('decision', 'discard', 'No'),
        _edge('crm-update', 'end', 'Updated'),
    ]
    return nodes, edges


def _generate_after_workflow(process: dict) -> tuple[list, list]:
    nodes = [
        _node('start', '🔵 Process Start', 'input', 0, 0),
        _node('ai-intake', '🤖 AI Lead Intake\n(Instant)', 'default', 200, 0, {'isAI': True}),
        _node('ai-score', '🧠 AI Scoring\n(< 1 min)', 'default', 400, 0, {'isAI': True}),
        _node('ai-enrich', '✨ Auto Enrichment\n(Instant)', 'default', 600, 0, {'isAI': True}),
        _node('ai-crm', '💾 Auto CRM Update\n(Instant)', 'default', 800, 0, {'isAI': True}),
        _node('ai-outreach', '📧 Personalized Outreach\n(Auto-triggered)', 'default', 1000, -80, {'isAI': True}),
        _node('auto-discard', '🗑️ Auto-archived', 'output', 1000, 80),
        _node('end', '✅ Lead Ready for SDR', 'output', 1200, -80),
    ]
    edges = [
        _edge('start', 'ai-intake'),
        _edge('ai-intake', 'ai-score', 'Parsed'),
        _edge('ai-score', 'ai-enrich', 'Scored > 70'),
        _edge('ai-score', 'auto-discard', 'Scored < 30'),
        _edge('ai-enrich', 'ai-crm', 'Enriched'),
        _edge('ai-crm', 'ai-outreach', 'Synced'),
        _edge('ai-outreach', 'end', 'Sent'),
    ]
    return nodes, edges

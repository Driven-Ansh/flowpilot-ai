"""Risk & Compliance Analysis API endpoints."""
from quart import Blueprint, request, jsonify

risk_bp = Blueprint('risk', __name__)


@risk_bp.route('/analyze', methods=['POST'])
async def analyze_risks():
    """Analyze risks and compliance considerations for automation opportunities."""
    data = await request.get_json()
    opportunities = data.get('opportunities', [])
    industry = data.get('industry', 'Technology')
    
    risks = _generate_risk_analysis(opportunities, industry)
    return jsonify(risks)


@risk_bp.route('/mock', methods=['GET'])
async def get_mock_risks():
    """Return mock risk analysis."""
    return jsonify(_generate_risk_analysis([], 'Technology'))


def _generate_risk_analysis(opportunities: list, industry: str) -> dict:
    return {
        'overall_risk_level': 'Low-Medium',
        'risk_score': 28,
        'categories': [
            {
                'category': 'Data Privacy',
                'level': 'Medium',
                'score': 45,
                'description': 'Customer data processed by AI models requires GDPR/CCPA compliance review.',
                'mitigations': ['Implement data anonymization', 'Use EU data residency', 'Review AI vendor DPAs'],
                'color': '#f59e0b',
            },
            {
                'category': 'Model Accuracy',
                'level': 'Low',
                'score': 25,
                'description': 'AI models may produce incorrect outputs. Recommend human-in-the-loop for high-stakes decisions.',
                'mitigations': ['A/B test against manual process', 'Set confidence thresholds', 'Monitor output quality'],
                'color': '#22d3ee',
            },
            {
                'category': 'Vendor Dependency',
                'level': 'Low',
                'score': 20,
                'description': 'Reliance on third-party AI providers creates lock-in risk.',
                'mitigations': ['Maintain provider-agnostic architecture', 'Use abstraction layers', 'Track pricing changes'],
                'color': '#22d3ee',
            },
            {
                'category': 'Change Management',
                'level': 'Medium',
                'score': 35,
                'description': 'Team adoption and workflow changes require structured rollout.',
                'mitigations': ['Phased rollout plan', 'Training program', 'Champion users in each team'],
                'color': '#f59e0b',
            },
            {
                'category': 'Security',
                'level': 'Low',
                'score': 15,
                'description': 'Standard API integrations. Ensure API keys are rotated and access is logged.',
                'mitigations': ['API key rotation policy', 'Audit logging', 'Principle of least privilege'],
                'color': '#22d3ee',
            },
        ],
        'compliance_notes': [
            f'Industry: {industry} — Standard data protection regulations apply.',
            'AI Act (EU): Ensure AI systems are classified and documented correctly.',
            'Recommended: Appoint an AI Governance lead before Phase 2 deployment.',
        ],
    }

"""AI Agent Marketplace API endpoints."""
from quart import Blueprint, request, jsonify

marketplace_bp = Blueprint('marketplace', __name__)

AI_TOOLS = [
    {'id': '1', 'name': 'GPT-4o', 'vendor': 'OpenAI', 'category': 'Foundation Model', 'description': 'State-of-the-art multimodal LLM for complex reasoning, writing, and analysis tasks.', 'pricing_model': 'Pay-per-token', 'starting_price': '$0.005/1K tokens', 'integration_complexity': 'Low', 'rating': 4.9, 'use_cases': ['Content generation', 'Data extraction', 'Code generation', 'Analysis'], 'tags': ['AI', 'LLM', 'Multimodal'], 'logo_emoji': '🧠'},
    {'id': '2', 'name': 'Clay', 'vendor': 'Clay.com', 'category': 'Sales Intelligence', 'description': 'AI-powered data enrichment and personalized outreach automation for revenue teams.', 'pricing_model': 'Subscription', 'starting_price': '$149/month', 'integration_complexity': 'Low', 'rating': 4.7, 'use_cases': ['Lead enrichment', 'Personalized outreach', 'CRM automation'], 'tags': ['Sales', 'Enrichment', 'Outreach'], 'logo_emoji': '🎯'},
    {'id': '3', 'name': 'Intercom Fin', 'vendor': 'Intercom', 'category': 'Customer Support AI', 'description': 'AI agent that resolves 40%+ of support tickets instantly using your knowledge base.', 'pricing_model': 'Per resolution', 'starting_price': '$0.99/resolution', 'integration_complexity': 'Low', 'rating': 4.6, 'use_cases': ['Ticket resolution', 'FAQ automation', 'Escalation routing'], 'tags': ['Support', 'AI Agent', 'Customer Service'], 'logo_emoji': '💬'},
    {'id': '4', 'name': 'Zapier AI', 'vendor': 'Zapier', 'category': 'Workflow Automation', 'description': 'Connect 6,000+ apps with AI-powered workflow automation. No code required.', 'pricing_model': 'Subscription', 'starting_price': '$19.99/month', 'integration_complexity': 'Very Low', 'rating': 4.5, 'use_cases': ['App integration', 'Data sync', 'Trigger-based automation'], 'tags': ['Automation', 'No-code', 'Integration'], 'logo_emoji': '⚡'},
    {'id': '5', 'name': 'Notion AI', 'vendor': 'Notion', 'category': 'Productivity AI', 'description': 'AI writing assistant and knowledge base automation built into Notion workspace.', 'pricing_model': 'Add-on', 'starting_price': '$8/user/month', 'integration_complexity': 'Very Low', 'rating': 4.4, 'use_cases': ['Documentation', 'Meeting summaries', 'Report generation'], 'tags': ['Productivity', 'Writing', 'Knowledge'], 'logo_emoji': '📝'},
    {'id': '6', 'name': 'Salesforce Einstein', 'vendor': 'Salesforce', 'category': 'CRM AI', 'description': 'Embedded AI for sales forecasting, lead scoring, and opportunity insights in Salesforce.', 'pricing_model': 'Add-on', 'starting_price': '$50/user/month', 'integration_complexity': 'Medium', 'rating': 4.3, 'use_cases': ['Lead scoring', 'Sales forecasting', 'Pipeline management'], 'tags': ['CRM', 'Sales', 'Enterprise'], 'logo_emoji': '☁️'},
    {'id': '7', 'name': 'Make (Integromat)', 'vendor': 'Make', 'category': 'Workflow Automation', 'description': 'Visual workflow automation with advanced logic and 1,500+ integrations.', 'pricing_model': 'Subscription', 'starting_price': '$9/month', 'integration_complexity': 'Low', 'rating': 4.5, 'use_cases': ['Complex workflows', 'Data transformation', 'API orchestration'], 'tags': ['Automation', 'Integration', 'Visual'], 'logo_emoji': '🔄'},
    {'id': '8', 'name': 'Sierra', 'vendor': 'Sierra AI', 'category': 'Conversational AI', 'description': 'Enterprise-grade AI agent platform for customer experience with deep brand alignment.', 'pricing_model': 'Enterprise', 'starting_price': 'Custom', 'integration_complexity': 'High', 'rating': 4.8, 'use_cases': ['Customer service', 'Sales assistance', 'Product guidance'], 'tags': ['Enterprise', 'Conversational', 'Customer Experience'], 'logo_emoji': '🏔️'},
]


@marketplace_bp.route('/', methods=['GET'])
async def get_marketplace():
    """Return all AI tools with optional category filter."""
    category = request.args.get('category')
    tools = AI_TOOLS
    if category:
        tools = [t for t in tools if t['category'].lower() == category.lower()]
    return jsonify({'tools': tools, 'total': len(tools)})


@marketplace_bp.route('/recommend', methods=['POST'])
async def recommend_tools():
    """Recommend tools based on automation opportunities."""
    data = await request.get_json()
    opportunities = data.get('opportunities', [])
    recommended_names = set()
    for opp in opportunities:
        recommended_names.update(opp.get('recommended_tools', []))
    
    recommended = [t for t in AI_TOOLS if t['name'] in recommended_names]
    return jsonify({'recommended': recommended, 'all': AI_TOOLS})

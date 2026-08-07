"""ROI Calculation API endpoints."""
from quart import Blueprint, request, jsonify

roi_bp = Blueprint('roi', __name__)


@roi_bp.route('/calculate', methods=['POST'])
async def calculate_roi():
    """Calculate ROI projections for selected opportunities."""
    data = await request.get_json()
    opportunities = data.get('opportunities', [])
    hourly_rate = data.get('hourly_rate', 75)  # default $75/hr
    implementation_cost = data.get('implementation_cost', 25000)
    
    total_hours_saved = sum(o.get('estimated_hours_saved_per_week', 0) for o in opportunities)
    annual_hours_saved = total_hours_saved * 52
    annual_savings = annual_hours_saved * hourly_rate
    
    # Add direct cost savings
    direct_savings = sum(o.get('estimated_annual_cost_savings', 0) for o in opportunities)
    total_annual_benefit = annual_savings + direct_savings
    
    roi_percentage = ((total_annual_benefit - implementation_cost) / implementation_cost * 100) if implementation_cost > 0 else 0
    payback_months = (implementation_cost / (total_annual_benefit / 12)) if total_annual_benefit > 0 else 0
    
    # Monthly projections for chart
    monthly = []
    cumulative = -implementation_cost
    for month in range(1, 25):
        monthly_benefit = total_annual_benefit / 12
        cumulative += monthly_benefit
        monthly.append({
            'month': f'M{month}',
            'cumulative_savings': round(cumulative, 0),
            'monthly_savings': round(monthly_benefit, 0),
        })
    
    return jsonify({
        'summary': {
            'total_hours_saved_per_week': round(total_hours_saved, 1),
            'annual_hours_saved': round(annual_hours_saved, 0),
            'annual_cost_savings': round(total_annual_benefit, 0),
            'implementation_cost': implementation_cost,
            'roi_percentage': round(roi_percentage, 1),
            'payback_months': round(payback_months, 1),
            'three_year_value': round(total_annual_benefit * 3 - implementation_cost, 0),
        },
        'monthly_projections': monthly,
        'breakdown': [
            {'category': 'Labor Savings', 'value': round(annual_savings, 0), 'color': '#6366f1'},
            {'category': 'Direct Cost Savings', 'value': round(direct_savings, 0), 'color': '#22d3ee'},
        ]
    })


@roi_bp.route('/mock', methods=['GET'])
async def get_mock_roi():
    """Return mock ROI calculation."""
    from ..routes.opportunities import MOCK_OPPORTUNITIES
    data = {'opportunities': MOCK_OPPORTUNITIES, 'hourly_rate': 75, 'implementation_cost': 25000}
    request._cached_data = data
    
    opportunities = MOCK_OPPORTUNITIES
    hourly_rate = 75
    implementation_cost = 25000
    
    total_hours_saved = sum(o.get('estimated_hours_saved_per_week', 0) for o in opportunities)
    annual_hours_saved = total_hours_saved * 52
    annual_savings = annual_hours_saved * hourly_rate
    direct_savings = sum(o.get('estimated_annual_cost_savings', 0) for o in opportunities)
    total_annual_benefit = annual_savings + direct_savings
    roi_percentage = ((total_annual_benefit - implementation_cost) / implementation_cost * 100)
    payback_months = (implementation_cost / (total_annual_benefit / 12))
    
    monthly = []
    cumulative = -implementation_cost
    for month in range(1, 25):
        monthly_benefit = total_annual_benefit / 12
        cumulative += monthly_benefit
        monthly.append({'month': f'M{month}', 'cumulative_savings': round(cumulative, 0), 'monthly_savings': round(monthly_benefit, 0)})
    
    return jsonify({
        'summary': {
            'total_hours_saved_per_week': round(total_hours_saved, 1),
            'annual_hours_saved': round(annual_hours_saved, 0),
            'annual_cost_savings': round(total_annual_benefit, 0),
            'implementation_cost': implementation_cost,
            'roi_percentage': round(roi_percentage, 1),
            'payback_months': round(payback_months, 1),
            'three_year_value': round(total_annual_benefit * 3 - implementation_cost, 0),
        },
        'monthly_projections': monthly,
        'breakdown': [
            {'category': 'Labor Savings', 'value': round(annual_savings, 0), 'color': '#6366f1'},
            {'category': 'Direct Cost Savings', 'value': round(direct_savings, 0), 'color': '#22d3ee'},
        ]
    })

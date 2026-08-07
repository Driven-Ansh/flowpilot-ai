"""Health check endpoint.

Used by Render deployment health checks and monitoring.
"""
from quart import Blueprint, jsonify
from ..config import Config

health_bp = Blueprint('health', __name__)


@health_bp.route('/health', methods=['GET'])
async def health_check():
    """Return service health status."""
    return jsonify({
        'status': 'healthy',
        'service': 'FlowPilot AI Backend',
        'version': '1.0.0',
        'mock_mode': Config.MOCK_MODE,
    })

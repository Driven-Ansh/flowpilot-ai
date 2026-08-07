"""Application factory for FlowPilot AI backend.

Creates and configures the Quart async application,
registers all route blueprints, and sets up CORS.
"""
from quart import Quart
from quart_cors import cors
from .config import Config
from .routes.interview import interview_bp
from .routes.processes import processes_bp
from .routes.workflow import workflow_bp
from .routes.opportunities import opportunities_bp
from .routes.roi import roi_bp
from .routes.roadmap import roadmap_bp
from .routes.marketplace import marketplace_bp
from .routes.risk import risk_bp
from .routes.report import report_bp
from .routes.health import health_bp


def create_app(config_class=Config) -> Quart:
    """Create and configure the Quart application.
    
    Returns:
        Configured Quart application instance.
    """
    app = Quart(__name__)
    app.config.from_object(config_class)

    # Enable CORS for the frontend origin
    app = cors(
        app,
        allow_origin=config_class.CORS_ORIGINS,
        allow_headers=["Content-Type", "Authorization"],
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    )

    # Register all feature blueprints
    app.register_blueprint(health_bp, url_prefix='/api')
    app.register_blueprint(interview_bp, url_prefix='/api/interview')
    app.register_blueprint(processes_bp, url_prefix='/api/processes')
    app.register_blueprint(workflow_bp, url_prefix='/api/workflow')
    app.register_blueprint(opportunities_bp, url_prefix='/api/opportunities')
    app.register_blueprint(roi_bp, url_prefix='/api/roi')
    app.register_blueprint(roadmap_bp, url_prefix='/api/roadmap')
    app.register_blueprint(marketplace_bp, url_prefix='/api/marketplace')
    app.register_blueprint(risk_bp, url_prefix='/api/risk')
    app.register_blueprint(report_bp, url_prefix='/api/report')

    return app

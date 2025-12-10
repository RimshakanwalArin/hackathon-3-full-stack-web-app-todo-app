"""
API routes for Todo App
Maps to @specs/api/rest-endpoints.md
"""

from fastapi import APIRouter

# Create main API router
api_router = APIRouter(prefix="/api")

# TODO: Import route modules when ready
# from .auth import router as auth_router
# from .tasks import router as tasks_router

# Include routers
# api_router.include_router(auth_router, tags=["authentication"])
# api_router.include_router(tasks_router, tags=["tasks"])

__all__ = ["api_router"]

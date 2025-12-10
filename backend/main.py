"""
FastAPI application entry point for Todo App Backend
Phase II - Full-Stack Web Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import db setup
from db import create_db_and_tables

# Create FastAPI app
app = FastAPI(
    title="Todo App API",
    description="Task management API with authentication",
    version="1.0.0"
)

# Configure CORS
allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001,http://localhost:8000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to create database tables
@app.on_event("startup")
async def startup_event():
    """Create database tables on startup"""
    await create_db_and_tables()

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return JSONResponse(
        status_code=200,
        content={"status": "healthy", "message": "Todo App API is running"}
    )

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Todo App API",
        "version": "1.0.0",
        "docs": "/docs",
        "openapi": "/openapi.json"
    }

# Import and include routes
from routes import auth, tasks
app.include_router(auth.router)
app.include_router(tasks.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("BACKEND_PORT", "8000")),
        reload=True
    )

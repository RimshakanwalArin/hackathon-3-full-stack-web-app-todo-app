"""
Database connection and session management for PostgreSQL
Maps to @specs/database/schema.md
"""

import os
from sqlmodel import create_engine, Session
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Database URL configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./todoapp.db"
)

# Create SQLAlchemy engine
# SQLite doesn't need pool configuration
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        echo=os.getenv("SQL_ECHO", "false").lower() == "true",
        future=True,
        connect_args={"check_same_thread": False},
    )
else:
    engine = create_engine(
        DATABASE_URL,
        echo=os.getenv("SQL_ECHO", "false").lower() == "true",
        future=True,
        pool_size=10,
        max_overflow=20,
        pool_pre_ping=True,  # Verify connections before using
    )

# Create session factory
SessionLocal = sessionmaker(
    engine,
    class_=Session,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)


def get_session():
    """Dependency for getting database session"""
    with SessionLocal() as session:
        yield session


async def create_db_and_tables():
    """Create database tables (called on startup)"""
    from models import SQLModel
    SQLModel.metadata.create_all(engine)
    print("Database tables created/verified")


async def close_db():
    """Close database connections (called on shutdown)"""
    engine.dispose()
    print("Database connections closed")

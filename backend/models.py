"""
SQLModel definitions for User and Task models
Maps to @specs/database/schema.md
"""

from sqlmodel import SQLModel, Field, Column
from typing import Optional
from datetime import datetime
import uuid


class UserBase(SQLModel):
    """Base User model"""
    email: str = Field(index=True, unique=True)
    name: str


class User(UserBase, table=True):
    """User table model"""
    __tablename__ = "users"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class UserRead(UserBase):
    """User read response model"""
    id: str
    created_at: datetime
    updated_at: datetime


class TaskBase(SQLModel):
    """Base Task model"""
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)


class Task(TaskBase, table=True):
    """Task table model"""
    __tablename__ = "tasks"

    id: int = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class TaskCreate(TaskBase):
    """Task creation request model"""
    pass


class TaskUpdate(SQLModel):
    """Task update request model"""
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: Optional[bool] = None


class TaskRead(TaskBase):
    """Task read response model"""
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime


class TaskListResponse(SQLModel):
    """Task list response wrapper"""
    tasks: list[TaskRead]
    total: int
    status_filter: Optional[str] = None
    sort_order: Optional[str] = None

"""
Task API routes
Maps to @specs/api/rest-endpoints.md
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import Optional, List
from datetime import datetime

from db import get_session
from models import Task, User
from schemas import (
    TaskCreateRequest,
    TaskUpdateRequest,
    TaskResponse,
    TaskListResponse,
    TaskCreateResponse,
    TaskUpdateResponse,
    TaskDeleteResponse,
)

router = APIRouter(prefix="/api/tasks", tags=["tasks"])


# Mock user_id for development (in production, extract from JWT token)
MOCK_USER_ID = "test-user-123"


@router.post("", response_model=TaskCreateResponse)
async def create_task(
    task_data: TaskCreateRequest,
    session: Session = Depends(get_session),
) -> TaskCreateResponse:
    """
    Create a new task
    Maps to create_task MCP tool
    """
    try:
        # Create new task
        new_task = Task(
            title=task_data.title,
            description=task_data.description,
            completed=False,
            user_id=MOCK_USER_ID,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )

        session.add(new_task)
        session.commit()
        session.refresh(new_task)

        return TaskCreateResponse(
            task_id=new_task.id,
            status="created",
            title=new_task.title,
        )

    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create task: {str(e)}",
        )


@router.get("", response_model=TaskListResponse)
async def list_tasks(
    status: Optional[str] = Query(None, description="Filter by status: all, pending, completed"),
    sort: Optional[str] = Query(None, description="Sort by: created, title, completed"),
    session: Session = Depends(get_session),
) -> TaskListResponse:
    """
    List tasks for current user
    Maps to list_tasks MCP tool
    """
    try:
        # Build query
        query = select(Task).where(Task.user_id == MOCK_USER_ID)

        # Apply status filter
        if status == "pending":
            query = query.where(Task.completed == False)
        elif status == "completed":
            query = query.where(Task.completed == True)

        # Execute query
        tasks = session.exec(query).all()

        # Apply sorting
        if sort == "title":
            tasks = sorted(tasks, key=lambda t: t.title)
        elif sort == "completed":
            tasks = sorted(tasks, key=lambda t: (t.completed, -tasks.index(t)))
        else:  # Default: created (newest first)
            tasks = sorted(tasks, key=lambda t: t.created_at, reverse=True)

        # Convert to response models
        task_responses = [
            TaskResponse(
                id=t.id,
                user_id=t.user_id,
                title=t.title,
                description=t.description,
                completed=t.completed,
                created_at=t.created_at,
                updated_at=t.updated_at,
            )
            for t in tasks
        ]

        return TaskListResponse(
            tasks=task_responses,
            total=len(task_responses),
            status_filter=status,
            sort_order=sort,
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch tasks: {str(e)}",
        )


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: int,
    session: Session = Depends(get_session),
) -> TaskResponse:
    """
    Get a single task by ID
    """
    try:
        task = session.exec(
            select(Task).where(Task.id == task_id).where(Task.user_id == MOCK_USER_ID)
        ).first()

        if not task:
            raise HTTPException(
                status_code=404,
                detail="Task not found",
            )

        return TaskResponse(
            id=task.id,
            user_id=task.user_id,
            title=task.title,
            description=task.description,
            completed=task.completed,
            created_at=task.created_at,
            updated_at=task.updated_at,
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch task: {str(e)}",
        )


@router.patch("/{task_id}", response_model=TaskUpdateResponse)
async def update_task(
    task_id: int,
    task_data: TaskUpdateRequest,
    session: Session = Depends(get_session),
) -> TaskUpdateResponse:
    """
    Update a task
    """
    try:
        task = session.exec(
            select(Task).where(Task.id == task_id).where(Task.user_id == MOCK_USER_ID)
        ).first()

        if not task:
            raise HTTPException(
                status_code=404,
                detail="Task not found",
            )

        # Update fields
        if task_data.title is not None:
            task.title = task_data.title
        if task_data.description is not None:
            task.description = task_data.description
        if task_data.completed is not None:
            task.completed = task_data.completed

        task.updated_at = datetime.utcnow()

        session.add(task)
        session.commit()
        session.refresh(task)

        return TaskUpdateResponse(
            task_id=task.id,
            status="updated",
            title=task.title,
            completed=task.completed,
        )

    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update task: {str(e)}",
        )


@router.delete("/{task_id}", response_model=TaskDeleteResponse)
async def delete_task(
    task_id: int,
    session: Session = Depends(get_session),
) -> TaskDeleteResponse:
    """
    Delete a task
    """
    try:
        task = session.exec(
            select(Task).where(Task.id == task_id).where(Task.user_id == MOCK_USER_ID)
        ).first()

        if not task:
            raise HTTPException(
                status_code=404,
                detail="Task not found",
            )

        title = task.title
        session.delete(task)
        session.commit()

        return TaskDeleteResponse(
            task_id=task_id,
            status="deleted",
            title=title,
        )

    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete task: {str(e)}",
        )

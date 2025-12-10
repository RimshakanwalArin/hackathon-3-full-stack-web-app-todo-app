"""
Authentication API routes
Maps to @specs/features/authentication.md
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from datetime import datetime, timedelta
import jwt
import bcrypt
import os
from typing import Optional

from db import get_session
from models import User
from schemas import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    UserResponse,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])

# JWT configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())


def create_access_token(user_id: str, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {"user_id": user_id, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/register", response_model=TokenResponse)
async def register(
    request: RegisterRequest,
    session: Session = Depends(get_session),
) -> TokenResponse:
    """
    Register a new user
    """
    try:
        # Check if user already exists
        existing_user = session.exec(
            select(User).where(User.email == request.email)
        ).first()

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered",
            )

        # Create new user
        new_user = User(
            email=request.email,
            name=request.name,
            password_hash=hash_password(request.password),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        # Generate token
        access_token = create_access_token(new_user.id)

        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )

    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Registration failed: {str(e)}",
        )


@router.post("/login", response_model=TokenResponse)
async def login(
    request: LoginRequest,
    session: Session = Depends(get_session),
) -> TokenResponse:
    """
    Login user and return JWT token
    """
    try:
        # Find user
        user = session.exec(
            select(User).where(User.email == request.email)
        ).first()

        if not user or not verify_password(request.password, user.password_hash):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password",
            )

        # Generate token
        access_token = create_access_token(user.id)

        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Login failed: {str(e)}",
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    session: Session = Depends(get_session),
) -> UserResponse:
    """
    Get current user information
    In production, extract user_id from JWT token
    """
    try:
        # For development, return a mock user
        # In production, get user_id from token
        user = session.exec(
            select(User).limit(1)
        ).first()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="User not found",
            )

        return UserResponse(
            id=user.id,
            email=user.email,
            name=user.name,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch user: {str(e)}",
        )

# Feature: User Authentication

## Overview
Users can register new accounts and log in securely. Authentication uses JWT tokens with refresh token rotation.

## User Stories

### US-001: User Registration
**As a** new user
**I want to** create an account with email and password
**So that** I can access the application

**Acceptance Criteria:**
- [ ] Registration form accepts email and password
- [ ] Password must be at least 8 characters
- [ ] Email must be unique (no duplicate accounts)
- [ ] Password stored as bcrypt hash
- [ ] User redirected to login after registration
- [ ] Validation errors shown clearly

**Technical Details:**
```
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response (201):
{
  "message": "Registration successful. Please log in.",
  "userId": "user-123"
}

Error (409):
{
  "error": "Email already in use"
}
```

### US-002: User Login
**As a** registered user
**I want to** log in with email and password
**So that** I can access my tasks

**Acceptance Criteria:**
- [ ] Login form accepts email and password
- [ ] Credentials validated against stored hash
- [ ] JWT access token issued on success
- [ ] Refresh token issued for session persistence
- [ ] Invalid credentials show generic error message
- [ ] User redirected to dashboard on success

**Technical Details:**
```
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response (200):
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 3600,
  "user": {
    "id": "user-123",
    "email": "user@example.com"
  }
}

Error (401):
{
  "error": "Invalid email or password"
}
```

### US-003: Token Refresh
**As a** user with expired access token
**I want to** refresh my token
**So that** I can continue using the app

**Acceptance Criteria:**
- [ ] New access token issued with valid refresh token
- [ ] Refresh token rotated for security
- [ ] Invalid refresh token rejected
- [ ] Token expiration tracked

**Technical Details:**
```
POST /api/auth/refresh
{
  "refreshToken": "eyJhbGc..."
}

Response (200):
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 3600
}
```

### US-004: User Logout
**As a** logged-in user
**I want to** log out
**So that** I can end my session

**Acceptance Criteria:**
- [ ] Logout endpoint invalidates refresh token
- [ ] Frontend clears tokens from storage
- [ ] User redirected to login page

**Technical Details:**
```
POST /api/auth/logout
Authorization: Bearer {accessToken}

Response (200):
{
  "message": "Logout successful"
}
```

### US-005: Get Current User
**As a** logged-in user
**I want to** fetch my user profile
**So that** I can see my account details

**Acceptance Criteria:**
- [ ] Endpoint requires valid access token
- [ ] Returns user ID, email, creation date
- [ ] 401 returned for invalid/missing token

**Technical Details:**
```
GET /api/auth/me
Authorization: Bearer {accessToken}

Response (200):
{
  "id": "user-123",
  "email": "user@example.com",
  "createdAt": "2025-12-08T10:00:00Z"
}
```

## Database Schema

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,

  CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
```

## Security Requirements

- **Password Hashing**: bcrypt with salt rounds ≥ 10
- **Token Signing**: HS256 or RS256 (prefer RS256 for multi-service)
- **Token Expiry**: Access token 1 hour, refresh token 7 days
- **HTTPS Only**: All auth endpoints over HTTPS
- **Secure Cookies**: HttpOnly, Secure, SameSite flags
- **Rate Limiting**: Max 5 login attempts per IP per 15 minutes
- **CORS**: Restrict to trusted origins

## JWT Payload

```json
{
  "sub": "user-123",
  "email": "user@example.com",
  "iat": 1700000000,
  "exp": 1700003600,
  "iss": "todo-app"
}
```

## Error Handling

| Error | Status | Message |
|-------|--------|---------|
| Invalid email | 400 | "Invalid email format" |
| Weak password | 400 | "Password must be at least 8 characters" |
| Email already exists | 409 | "Email already in use" |
| Invalid credentials | 401 | "Invalid email or password" |
| Missing token | 401 | "Authorization token required" |
| Expired token | 401 | "Token expired" |
| Invalid token | 401 | "Invalid token" |

---

**Version**: 0.1.0 | **Last Updated**: 2025-12-08

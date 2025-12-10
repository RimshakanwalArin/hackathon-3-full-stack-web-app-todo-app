# Todo App - Full Stack Web Application

A modern, full-stack todo application built with **FastAPI** (Python backend) and **Next.js** (React frontend). Features JWT authentication, PostgreSQL database, and comprehensive API documentation.

![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![React](https://img.shields.io/badge/React-19+-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

✅ **Task Management**
- Create, read, update, and delete tasks
- Mark tasks as complete/pending
- Filter tasks by status
- Sort tasks by creation date or title

✅ **User Authentication**
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Token refresh capabilities

✅ **Modern Stack**
- FastAPI backend with async/await support
- Next.js 14 with App Router
- TypeScript for type safety
- SQLModel ORM with SQLAlchemy
- Tailwind CSS for styling
- PostgreSQL/SQLite database

✅ **Developer Experience**
- Auto-reload on code changes
- Swagger UI API documentation at `/docs`
- Comprehensive error handling
- CORS support for local development
- Docker Compose for easy setup

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env.local

# Start the server
uvicorn main:app --reload --port 8000
```

Backend: `http://127.0.0.1:8000`
Docs: `http://127.0.0.1:8000/docs`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Start development server
npm run dev
```

Frontend: `http://127.0.0.1:3000`

### Docker Compose (All Services)

```bash
docker-compose up
```

## Project Structure

```
├── backend/                    # FastAPI Python backend
│   ├── main.py                # App entry point
│   ├── db.py                  # Database config
│   ├── models.py              # Data models
│   ├── schemas.py             # Request/response schemas
│   ├── requirements.txt        # Python dependencies
│   └── routes/                # API endpoints
│       ├── auth.py
│       └── tasks.py
│
├── frontend/                   # Next.js React frontend
│   ├── app/                   # Pages and routes
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   ├── styles/                # CSS
│   └── package.json
│
├── specs/                      # Project specifications
├── docker-compose.yml          # Multi-container setup
└── GETTING_STARTED.md          # Detailed guide
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/{id}` - Get task
- `PATCH /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

**Full API documentation**: Visit `http://127.0.0.1:8000/docs` when backend is running

## Example API Calls

### Register
```bash
curl -X POST "http://127.0.0.1:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John","password":"pass123"}'
```

### Create Task
```bash
curl -X POST "http://127.0.0.1:8000/api/tasks" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread"}'
```

### List Tasks
```bash
curl "http://127.0.0.1:8000/api/tasks" \
  -H "Authorization: Bearer {token}"
```

## Technology Stack

**Backend:**
- FastAPI 0.104+
- SQLModel / SQLAlchemy
- PostgreSQL / SQLite
- Uvicorn
- JWT Authentication

**Frontend:**
- Next.js 14
- React 19
- TypeScript
- Tailwind CSS

**DevOps:**
- Docker
- Docker Compose

## Environment Variables

### Backend (.env.local)
```env
DATABASE_URL=sqlite:///./todoapp.db
BACKEND_PORT=8000
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
SECRET_KEY=dev-secret-key
ENVIRONMENT=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development Workflow

1. **Read specifications** in `/specs` directory
2. **Understand the architecture** - see `specs/architecture.md`
3. **Check API specs** - see `specs/api/rest-endpoints.md`
4. **Implement features** following specifications
5. **Test thoroughly**

See [GETTING_STARTED.md](./GETTING_STARTED.md) for detailed guide.

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

## Getting Help

- 📖 [GETTING_STARTED.md](./GETTING_STARTED.md) - Setup guide
- 📋 [specs/](./specs) - Project specifications
- 🔍 `/docs` - Swagger UI (when backend running)
- 💬 GitHub Issues

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [SQLModel](https://sqlmodel.tiangolo.com/) - SQL databases in Python

---

**Version**: 1.0.0
**Last Updated**: December 10, 2025
**Status**: Active Development

# Accounting & Tax Services Platform

A full-stack web application for an accounting and tax services business. Clients can browse services, book appointments, leave ratings, and chat with an AI assistant. Sellers can list their services after applying for seller status through the platform.

## Tech Stack

**Backend**

- Python / Django 6.0.3
- Django REST Framework + SimpleJWT (authentication)
- Google Gemini AI (chatbot)
- SQLite (development database)
- `python-dotenv` for environment variables

**Frontend**

- React 19
- Redux Toolkit + Redux Thunk
- React Router DOM v7
- React Bootstrap
- Axios

---

## Prerequisites

- Python 3.10+
- Node.js 18+ and npm

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/polynexe/Quiz006.git
cd Quiz6
```

### 2. Backend Setup

```bash
cd backend
```

Create and activate a virtual environment:

```bash
# Windows
python -m venv myvenv
myvenv\Scripts\activate

# macOS/Linux
python -m venv myvenv
source myvenv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory with the following variables:

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
GEMINI_API_KEY=your-google-gemini-api-key
```

Apply database migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

The backend API will be available at `http://127.0.0.1:8000/`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000/`.

---

## Features

- **User Authentication** — Register and log in with email and JWT-based sessions
- **Role-Based Access** — Admin, Seller, and User roles
- **Services Listing** — Browse accounting and tax services offered by approved sellers
- **Appointments** — Book appointments with service providers
- **Ratings** — Leave ratings and reviews on services
- **Seller Applications** — Users can apply to become sellers; admins can approve or reject
- **AI Chatbot** — Built-in chatbot powered by Google Gemini AI
- **PayPal Integration** — Payment support for services

---

## Project Structure

```
Quiz6/
├── backend/          # Django REST API
│   ├── users/        # User auth, profiles, seller applications
│   ├── services/     # Service listings and ratings
│   ├── chatbot/      # AI chatbot endpoint
│   └── backend/      # Django project settings and URLs
└── frontend/         # React application
    └── src/
        ├── screens/  # Page-level components
        ├── components/
        ├── actions/  # Redux actions
        └── reducers/ # Redux reducers
```

---

## API Base URL

All API endpoints are prefixed with `/api/`. The backend runs on `http://127.0.0.1:8000` by default.

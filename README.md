# 📝 NoteDeck

**NoteDeck** is a full-stack **MERN Notes Application** that allows users to securely create, edit, search, and manage personal notes. It features **JWT authentication**, **user-based authorization**, an **AI-powered note generator (Gemini)**, a **responsive UI**, and **cloud deployment**.

🔗 **Live Demo**

- **Frontend:** [https://notedeck-notes.vercel.app](https://notedeck-notes.vercel.app/)
- **Backend API:** [https://notedeckbackend.vercel.app](https://notedeckbackend.vercel.app/)

---

## 🚀 Features

### 🔐 Authentication & Authorization

- Signup & Login using **JWT**
- Protected routes (frontend + backend)
- User-specific notes access
- Secure password hashing with **bcrypt**

### 📝 Notes Management

- Create, Read, Update, Delete (CRUD)
- View individual notes
- Edit notes with live updates

### 🤖 AI-Powered Note Generation

- Generate note content using **AI** based on the note title
- Powered by **Google Gemini (Gemini 2.5 Flash)**
- Secure backend-only AI integration
- No API keys exposed on the frontend
- One-click **“Generate with AI”** button

### 🔍 Search Functionality

- Debounced search
- URL-based query (`?search=`)
- Case-insensitive filtering

### 🎨 Modern UI/UX

- Fully responsive (mobile + desktop)
- Clean dashboard layout
- Smooth animations on landing page

### ☁️ Deployment Ready

- Frontend & Backend deployed on **Vercel**
- Environment-based configuration
- Production-safe setup

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- **Google Gemini AI (`@google/genai`)**

### Deployment

- Vercel

---

## 📁 Project Structure

```
notedeck/
├── frontend/
│   ├──src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └──main.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── index.js
│   ├──.env.example
│   └── vercel.json
│
└── README.md

```

---

## 🔐 Authentication Flow

1. User signs up / logs in
2. Backend generates a **JWT token**
3. Token stored in `localStorage`
4. Axios interceptor attaches token to every request
5. Backend middleware verifies token
6. Only authorized users can access notes and AI features

---

## 🤖 AI Generation Flow

1. User enters a **note title**
2. Clicks **“Generate with AI”**
3. Frontend sends title to backend
4. Backend securely calls **Google Gemini API**
5. Generated content is returned and auto-filled into the note editor

---

## 🔄 API Endpoints

### Auth

```
POST   /auth/register   → Registeruser
POST   /auth/login      →Loginuser
GET    /auth/me         →Getuser profile (protected)

```

### Notes (Protected)

```
GET/notes            →Getall notes (withsearch)
GET/notes/:id        →Get single note
POST/notes/create     →Create note
PUT/notes/:id        →Update note
DELETE/notes/:id        →Delete note

```

### AI (Protected / Backend-only)

```
POST   /ai/generate       → Generate note contentusing AI

```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```
PORT=3000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key

```

> ⚠️ .env is ignored via .gitignore
> 
> 
> Use `.env.example` for reference
> 

### Frontend

```jsx
// src/utils/helper.js
exportconst backendPort ="http://localhost:3000";

```

---

## ▶️ Run Locally

### Backend

```
cd backend
npm install
npmstart

```

### Frontend

```
cd frontend
npm install
npm run dev

```

---

## 🧠 Key Concepts Implemented

- JWT-based authentication & authorization
- Secure password hashing (bcrypt)
- Protected frontend & backend routes
- Axios request & response interceptors
- User-based data isolation
- AI integration via secure backend proxy (Gemini)
- Debounced search optimization
- Clean, scalable project architecture
- Environment-based configuration & secret management

---

## ⭐ Future Improvements

- Email / OTP based verification
- Google OAuth login
- Rich text editor for notes
- User profile customization
- AI regenerate / improve options

---

🔥 **NoteDeck is a production-ready MERN + AI project, ideal for internships, interviews, and portfolio showcase.**
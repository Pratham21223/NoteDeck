# 📝 NoteDeck

**NoteDeck** is a full-stack **MERN Notes Application** that allows users to securely create, edit, search, and manage personal notes. It features **JWT authentication**, **user-based authorization**, a **responsive UI**, and **cloud deployment**.

🔗 **Live Demo**

* Frontend: [https://notedeck-notes.vercel.app](https://notedeck-notes.vercel.app)
* Backend API: [https://notedeckbackend.vercel.app](https://notedeckbackend.vercel.app)

---

## 🚀 Features

* 🔐 **Authentication & Authorization**

  * Signup & Login using JWT
  * Protected routes (frontend + backend)
  * User-specific notes access

* 📝 **Notes Management**

  * Create, Read, Update, Delete (CRUD)
  * View individual notes
  * Edit notes with live updates

* 🔍 **Search Functionality**

  * Debounced search
  * URL-based query (`?search=`)
  * Case-insensitive filtering

* 🎨 **Modern UI/UX**

  * Responsive design (mobile + desktop)
  * Clean dashboard layout
  * Animated landing page

* ☁️ **Deployment Ready**

  * Frontend & Backend deployed on **Vercel**

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* Framer Motion
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs

### Deployment

* Vercel

---

## 📁 Project Structure

```
notedeck/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── index.js
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
6. Only authorized users can access notes

---

## 🔄 API Endpoints

### Auth

```
POST   /auth/register   → Register user
POST   /auth/login      → Login user
GET    /auth/me         → Get user profile (protected)
```

### Notes (Protected)

```
GET    /notes           → Get all notes (with search)
GET    /notes/:id       → Get single note
POST   /notes/create    → Create note
PUT    /notes/:id       → Update note
DELETE /notes/:id       → Delete note
```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```env
PORT=3000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret_key
```

### Frontend (`src/utils/helper.js`)

```js
export const backendPort = "http://localhost:3000";
```

---

## ▶️ Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Key Concepts Implemented

* JWT-based authentication
* Secure password hashing (bcrypt)
* Protected frontend routes
* Axios request & response interceptors
* User-based authorization
* Debounced search optimization
* Clean component architecture

---


## ⭐ Future Improvements

* User verification link / OTP based Verfication
* Google auth login. 
* Password reset functionality
* Rich text editor
* User profile customization

---

🔥 **NoteDeck is a complete, production-ready MERN project suitable for internships, interviews, and portfolio showcase.**

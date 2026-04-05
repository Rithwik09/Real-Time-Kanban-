# 🗂️ Real-Time Sync(Kanban)

A full-stack real-time Kanban board application built with modern technologies. This project demonstrates real-time collaboration, drag-and-drop task management, authentication, and persistent storage.

---

## 🚀 Features

* 🔄 Real-time updates using WebSockets (Socket.IO)
* 🧩 Drag-and-drop task management (dnd-kit)
* 🗃️ Multiple boards and columns
* 🔐 Authentication (JWT-based)
* 💾 MongoDB persistence
* 🌐 Room-based collaboration (multiple users per board)
* ⚡ Fast frontend with React + Next.js

---

## 🏗️ Tech Stack

### Frontend

* React / Next.js
* dnd-kit (drag & drop)
* Tailwind CSS (optional for styling)

### Backend

* Node.js + Express
* Socket.IO (real-time communication)
* MongoDB + Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```
kanban-app/
│
├── client/                 # Frontend (Next.js)
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── utils/
│
├── server/                 # Backend (Node.js)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── config/
│
└── README.md
```

---

## 🧠 Core Concepts

### 1. Real-Time Rooms

* Each board = one room
* Users join via boardId
* Events broadcast to room only

### 2. Socket Events

* `join_board`
* `create_task`
* `update_task`
* `delete_task`
* `move_task`

### 3. Kanban Model

* Board → Columns → Tasks

---

## 🛠️ Setup Instructions

### 1. Clone Repo

```
git clone <your-repo-url>
cd kanban-app
```

### 2. Backend Setup

```
cd server
npm install
```

Create `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:3000
```

Run backend:

```
npm run dev
```

### 3. Frontend Setup

```
cd client
npm install
npm run dev
```

---

## 🔐 Authentication Flow

1. User registers/logs in
2. Server returns JWT
3. Token stored in localStorage
4. Sent with API requests

---

## 🔄 Real-Time Flow

1. User joins board → emits `join_board`
2. Server adds socket to room
3. Any task change → emit event
4. Server broadcasts update to all clients

---

## 🧪 Timeline (Your Plan)

| Task                            | Time    |
| ------------------------------- | ------- |
| Backend (Rooms + Socket + CRUD) | 2.5 hrs |
| React UI + Drag & Drop          | 2.5 hrs |
| Auth + MongoDB                  | 1 hr    |
| Deployment                      | 45 min  |

---

## 📌 Future Improvements

* 📝 Task comments
* 📎 File attachments
* 🧑‍🤝‍🧑 User presence indicators
* 🔔 Notifications
* 📊 Analytics dashboard

---

## ✅ Goal for Today

Build a **functional real-time Kanban board** with:

* Basic authentication
* Drag-and-drop working
* Real-time sync across users
* Deployed live

---

## 💡 Notes

* Keep backend simple → focus on socket events
* Avoid over-engineering schemas
* First make it work → then optimize

---
## API's

POST /auth/register
POST /auth/login


POST /boards
GET /boards/:boardId
PATCH /boards/:boardId
# 🚀 Quick Start Guide - Running APIs in Postman

## ✅ What's Been Done

1. **Seeder Created** (`scripts/seed.js`) - Creates test users in MongoDB
2. **Postman Collection** (`Real-Time-Sync-API.postman_collection.json`) - Ready to import
3. **API Guide** (`POSTMAN_GUIDE.md`) - Complete documentation
4. **Test Users Created:**
   - Admin: `admin@example.com` / `admin123`
   - Users: `user1@example.com`, `user2@example.com`, `user3@example.com` / `user123`

---

## 🎯 Quick Start (5 minutes)

### Step 1: Start the Server
```bash
npm start
```
You should see:
```
Server running on port 5000
✓ MongoDB connected
```

### Step 2: Import Postman Collection
1. Open **Postman**
2. Click **Import** button (top-left)
3. Select **Upload Files**
4. Choose: `Real-Time-Sync-API.postman_collection.json`
5. Click **Import**

### Step 3: Setup Environment (Auto-saves tokens!)
The collection includes environment variables:
- `baseUrl`: `http://localhost:5000`
- `token`: Auto-saved after login
- `boardId`: Auto-saved after creating board

---

## 📋 API Testing Sequence

### 1. **Login** ✅
```
POST http://localhost:5000/auth/login
Body:
{
  "email": "user1@example.com",
  "password": "user123"
}
```
**Response:** Token is automatically saved to `{{token}}`

### 2. **Create Board** ✅
```
POST http://localhost:5000/boards
Header: Authorization: Bearer {{token}}
Body:
{
  "title": "My Project"
}
```
**Response:** Board ID is automatically saved to `{{boardId}}`

### 3. **Get Board** ✅
```
GET http://localhost:5000/boards/{{boardId}}
Header: Authorization: Bearer {{token}}
```

### 4. **Update Board** ✅
```
PATCH http://localhost:5000/boards/{{boardId}}
Header: Authorization: Bearer {{token}}
Body:
{
  "columns": [
    {
      "title": "To Do",
      "tasks": [
        { "title": "Task 1", "description": "Description" }
      ]
    },
    {
      "title": "In Progress",
      "tasks": [
        { "title": "Task 2", "description": "Description" }
      ]
    },
    {
      "title": "Done",
      "tasks": []
    }
  ]
}
```

---

## 🔑 Available Test Credentials

### Admin User
```
Email: admin@example.com
Password: admin123
Role: admin
```

### Normal Users (Choose any one)
```
Email: user1@example.com / user2@example.com / user3@example.com
Password: user123
Role: user
```

---

## 📝 Understanding the Data Structure

### User Model
```
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed with bcrypt),
  role: String ("admin" or "user"),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Board Model
```
{
  _id: ObjectId,
  title: String,
  userId: String (creator's user ID),
  columns: [
    {
      _id: ObjectId,
      title: String,
      tasks: [
        {
          _id: ObjectId,
          title: String,
          description: String
        }
      ]
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🧪 Test Different Users

### Login with Different User
1. Click on **Login** request
2. Change email in body to different user email
3. Send request
4. Token updates automatically

### Multiple Boards
1. Login with user1
2. Create multiple boards
3. Login with user2 (different token)
4. Each user can only see their own boards

---

## ⚠️ Troubleshooting

### "Cannot GET /auth/login"
- Make sure server is running: `npm start`
- Check baseUrl is correct: `http://localhost:5000`
- Port 5000 not in use

### "No token" Error
```json
{ "msg": "No token" }
```
- Make sure Authorization header is set
- Format: `Bearer TOKEN` (with space)
- Re-login to get fresh token

### "Invalid token" Error
- Token might be expired
- Login again to get new token
- Check environment variable `{{token}}` is set

### "Board not found"
- Board ID might be wrong
- Check `{{boardId}}` environment variable
- Create a new board first

### "Email and password required"
- Make sure body has both email and password
- Use raw JSON format

---

## 🔄 Full Testing Workflow

```
1. npm start              → Start server
2. Login                  → Get token
   ↓
3. Create Board          → Get board ID
   ↓
4. Get Board             → View board details
   ↓
5. Update Board          → Add columns & tasks
   ↓
6. Verify Updates        → Get board again to confirm
```

---

## 📞 Common Operations

### Creating New User
```
POST /auth/register
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

### Switching Users
1. Change login credentials
2. Send Login request
3. New token saves automatically
4. Create board (only owner can see)

### Updating Board Structure
```
PATCH /boards/{{boardId}}
{
  "title": "New Title",
  "columns": [...]
}
```

---

## 📚 Full API Documentation
See `POSTMAN_GUIDE.md` for complete API reference with all endpoints and examples.

---

## 💡 Pro Tips

✅ Always **Login first** to get a token
✅ Token saves to environment automatically
✅ Each user can only access their own boards
✅ Passwords are hashed with bcrypt
✅ Use `{{variable}}` syntax for environment variables
✅ Run `npm run seed` anytime to reset database

---

## 🎉 You're Ready!

Start testing your API:
1. Start server: `npm start`
2. Open Postman
3. Import collection
4. Start with **Login** request
5. Follow the sequence above

Enjoy! 🚀

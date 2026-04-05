# Real-Time Sync - API Guide for Postman

## 🔗 Base URL
```
http://localhost:5000
```

---

## 📚 API Endpoints

### 1️⃣ **REGISTER** - Create New User
- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Body (JSON):**
```json
{
  "email": "newuser@example.com",
  "password": "password123"
}
```
- **Response (Success - 200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "newuser@example.com",
  "role": "user",
  "createdAt": "2026-04-05T10:30:00Z",
  "updatedAt": "2026-04-05T10:30:00Z"
}
```

---

### 2️⃣ **LOGIN** - Get JWT Token
- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Body (JSON):**
```json
{
  "email": "user1@example.com",
  "password": "user123"
}
```
- **Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user1@example.com"
  }
}
```
- **Save the token** - You'll need this for authenticated requests!

---

### 3️⃣ **CREATE BOARD** - Create New Kanban Board
- **Method:** `POST`
- **Endpoint:** `/boards`
- **Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```
- **Body (JSON):**
```json
{
  "title": "My Project Board"
}
```
- **Response (Success - 200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "My Project Board",
  "userId": "507f1f77bcf86cd799439011",
  "columns": [],
  "createdAt": "2026-04-05T10:35:00Z",
  "updatedAt": "2026-04-05T10:35:00Z"
}
```

---

### 4️⃣ **GET BOARD** - Fetch Board Details
- **Method:** `GET`
- **Endpoint:** `/boards/:id`
  - Replace `:id` with your board ID
  - Example: `/boards/507f1f77bcf86cd799439012`
- **Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```
- **Response (Success - 200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "My Project Board",
  "userId": "507f1f77bcf86cd799439011",
  "columns": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "To Do",
      "tasks": [
        {
          "_id": "507f1f77bcf86cd799439014",
          "title": "Task 1",
          "description": "Build API"
        }
      ]
    }
  ],
  "createdAt": "2026-04-05T10:35:00Z",
  "updatedAt": "2026-04-05T10:35:00Z"
}
```

---

### 5️⃣ **UPDATE BOARD** - Update Board/Add Columns & Tasks
- **Method:** `PATCH`
- **Endpoint:** `/boards/:id`
  - Replace `:id` with your board ID
- **Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```
- **Body (JSON):**
```json
{
  "title": "Updated Board Title",
  "columns": [
    {
      "title": "To Do",
      "tasks": [
        {
          "title": "Design Database",
          "description": "Create MongoDB schemas"
        },
        {
          "title": "Build API",
          "description": "Create REST endpoints"
        }
      ]
    },
    {
      "title": "In Progress",
      "tasks": [
        {
          "title": "Implement Auth",
          "description": "Add JWT authentication"
        }
      ]
    },
    {
      "title": "Done",
      "tasks": [
        {
          "title": "Setup Project",
          "description": "Initialize Node.js project"
        }
      ]
    }
  ]
}
```
- **Response (Success - 200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Updated Board Title",
  "userId": "507f1f77bcf86cd799439011",
  "columns": [
    {
      "title": "To Do",
      "tasks": [
        {
          "_id": "507f1f77bcf86cd799439014",
          "title": "Design Database",
          "description": "Create MongoDB schemas"
        },
        {
          "_id": "507f1f77bcf86cd799439015",
          "title": "Build API",
          "description": "Create REST endpoints"
        }
      ]
    },
    {
      "title": "In Progress",
      "tasks": [
        {
          "_id": "507f1f77bcf86cd799439016",
          "title": "Implement Auth",
          "description": "Add JWT authentication"
        }
      ]
    },
    {
      "title": "Done",
      "tasks": [
        {
          "_id": "507f1f77bcf86cd799439017",
          "title": "Setup Project",
          "description": "Initialize Node.js project"
        }
      ]
    }
  ],
  "createdAt": "2026-04-05T10:35:00Z",
  "updatedAt": "2026-04-05T10:40:00Z"
}
```

---

## 🚀 Step-by-Step Testing Guide in Postman

### **Step 1: Seed the Database**
```bash
npm run seed
```
This creates:
- 1 Admin user: `admin@example.com` / `admin123`
- 3 Normal users: `user1@example.com`, `user2@example.com`, `user3@example.com` / `user123`

### **Step 2: Setup Postman Environment Variables (Optional but Recommended)**
1. Create a new Environment in Postman named "Real-Time Sync"
2. Add these variables:
   - `baseUrl`: `http://localhost:5000`
   - `token`: (leave empty, will be set by login)
   - `boardId`: (leave empty, will be set by create board)

3. Use `{{baseUrl}}` instead of full URLs and `{{token}}` for Bearer token

### **Step 3: Test Login Endpoint**
1. Create a new Request in Postman
2. Set Method: `POST`
3. Set URL: `{{baseUrl}}/auth/login`
4. In **Body** tab, select **raw** → **JSON**
5. Paste:
```json
{
  "email": "user1@example.com",
  "password": "user123"
}
```
6. Click **Send**
7. Copy the `token` from response and save it to your environment variable `token`

### **Step 4: Create a Board**
1. Create new Request
2. Set Method: `POST`
3. Set URL: `{{baseUrl}}/boards`
4. In **Headers** tab, add:
   - Key: `Authorization`
   - Value: `Bearer {{token}}`
5. In **Body** tab, select **raw** → **JSON**
6. Paste:
```json
{
  "title": "My First Kanban Board"
}
```
7. Click **Send**
8. Copy the `_id` from response and save it to environment variable `boardId`

### **Step 5: Get Board Details**
1. Create new Request
2. Set Method: `GET`
3. Set URL: `{{baseUrl}}/boards/{{boardId}}`
4. In **Headers** tab, add:
   - Key: `Authorization`
   - Value: `Bearer {{token}}`
5. Click **Send**

### **Step 6: Update Board with Columns & Tasks**
1. Create new Request
2. Set Method: `PATCH`
3. Set URL: `{{baseUrl}}/boards/{{boardId}}`
4. In **Headers** tab, add:
   - Key: `Authorization`
   - Value: `Bearer {{token}}`
5. In **Body** tab, select **raw** → **JSON**
6. Paste the board update payload (see Step 5️⃣ above)
7. Click **Send**

---

## ⚠️ Common Error Responses

### 400 - Bad Request
```json
{
  "msg": "Email and password required"
}
```
**Fix:** Make sure you're sending both `email` and `password` in the body

### 401 - Unauthorized
```json
{
  "msg": "Invalid token"
}
```
**Fix:** 
- Check your token is valid and not expired
- Make sure you're using `Bearer YOUR_TOKEN` format in Authorization header
- Re-login to get a new token

### 400 - Invalid Credentials
```json
{
  "msg": "Invalid credentials"
}
```
**Fix:** Double-check your email and password

### 404 - Not Found
```json
{
  "msg": "Board not found"
}
```
**Fix:** Make sure the board ID is correct

---

## 🔄 Expected Workflow
```
1. Register/Login → Get Token
   ↓
2. Create Board → Get Board ID
   ↓
3. Get Board Details
   ↓
4. Update Board (Add Columns & Tasks)
   ↓
5. Real-time sync via Socket.io (when integrated with frontend)
```

---

## 📝 Notes
- All timestamps are in UTC (ISO 8601 format)
- Tokens expire based on your JWT_SECRET configuration
- Each user can only see/update their own boards
- Board updates are real-time via Socket.io when frontend is connected

---

## 🛠️ Troubleshooting

### Server won't start?
```bash
# Make sure MongoDB URI is configured
cat .env
# Update it with your MongoDB connection string
```

### Getting "No token" error?
```json
{
  "msg": "No token"
}
```
- Add Authorization header
- Format: `Bearer YOUR_TOKEN` (note the space after Bearer)

### Database seeding fails?
```bash
# Make sure MongoDB is running and URI is correct
npm run seed
# It should show the test credentials
```

---

## 📞 Testing All Endpoints
Import this Postman collection or create requests following the guide above. Test each endpoint in order to ensure all functionality works correctly!

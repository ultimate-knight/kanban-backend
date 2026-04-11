# Kanban Backend

A Node.js backend application for a kanban board system with AI-powered features and user authentication.

## Features

- **User Authentication**: Secure registration and login with JWT authentication
- **Kanban Application Management**: Create, read, update, and delete kanban boards and tasks
- **AI Integration**: Parse job descriptions and extract relevant skills using Groq AI
- **Database Integration**: MongoDB with Mongoose ODM
- **Security**: Password hashing with bcryptjs, CORS support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, CORS
- **AI**: Groq SDK
- **Environment**: dotenv

## Project Structure

```
kanban-backend/
├── Config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   ├── app.controller.js     # Application/task management logic
│   └── ai.controller.js      # AI parsing logic
├── models/
│   ├── user.model.js         # User schema
│   └── app.models.js         # Application/task schema
├── routes/
│   ├── auth.routes.js        # Authentication endpoints
│   ├── app.routes.js         # Application endpoints
│   └── ai.routes.js          # AI endpoints
├── services/
│   └── ai.service.js         # AI service utilities
├── middlewares/
│   └── auth.js               # JWT authentication middleware
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
├── package.json              # Dependencies and scripts
└── .env                      # Environment variables (not in repo)
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kanban-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the root directory with the required environment variables (see [Environment Variables](#environment-variables) section below)

## How to Run

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance running (local or Atlas)
- Groq API key (for AI features)

### Running in Development

1. **Ensure `.env` file is configured** with all required variables
2. **Start the server**
   ```bash
   npm start
   ```
3. **Expected output**
   ```
   server is running on port 4589
   ```
   (or the PORT specified in your `.env`)

### Verifying the Server is Running

Test the API connectivity:
```bash
# Test AI endpoint (no auth required)
curl -X POST http://localhost:4589/api/ai/parse \
  -H "Content-Type: application/json" \
  -d '{"jd": "Backend Developer with Node.js"}'

# Register a new user
curl -X POST http://localhost:4589/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change `PORT` in `.env` or kill process using port 4589 |
| MongoDB connection error | Verify `MONGODB_URI` is correct and MongoDB is running |
| `GROQ_API_KEY` error | Ensure Groq API key is valid and set in `.env` |
| 403/Unauthorized errors | Check JWT token is passed in Authorization header for protected routes |

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

**Example - Register:**
```bash
curl -X POST http://localhost:4589/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure_password"
  }'
```

**Example - Login:**
```bash
curl -X POST http://localhost:4589/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure_password"
  }'
```

### Application Routes (`/api/applications`)
*Requires JWT authentication*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications/` | Create a new kanban board/application |
| GET | `/api/applications/` | Get all applications |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

**Example - Create Application:**
```bash
curl -X POST http://localhost:4589/api/applications/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "name": "My Project",
    "description": "Project description"
  }'
```

### AI Routes (`/api/ai`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/parse` | Parse job descriptions and extract skills |

**Example - Parse Job Description:**
```bash
curl -X POST http://localhost:4589/api/ai/parse \
  -H "Content-Type: application/json" \
  -d '{
    "jd": "Backend Developer with 2+ years Node.js and MongoDB experience"
  }'
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=4589

# Database Configuration (MongoDB)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kanban-db

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this

# AI Service (Groq)
GROQ_API_KEY=your_groq_api_key_from_groq_console
```

### Variable Details

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|---------|
| `PORT` | Server port number | No | 5000 | `4589` |
| `MONGODB_URI` | MongoDB connection string (Atlas or local) | Yes | - | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for signing JWT tokens | Yes | - | `mySecretKey123!@#` |
| `GROQ_API_KEY` | API key from Groq console | Yes | - | `gsk_xxxxxxxxxxxx` |

### Important Security Notes
- **Never commit `.env` file** - it's already in `.gitignore`
- **Use strong JWT_SECRET** - minimum 32 characters recommended
- **Rotate GROQ_API_KEY** regularly and never share it
- **Use MongoDB Atlas** for production (not local MongoDB)

## Development

### Available Scripts

- `npm start` - Start the server

### Adding Tests

Update the test script in `package.json`:
```json
"test": "jest --coverage"
```

Then run:
```bash
npm test
```

## Error Handling

The API returns standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Security Considerations

- All sensitive endpoints (except auth) require JWT authentication
- Passwords are hashed using bcryptjs
- CORS is configured to prevent unauthorized cross-origin requests
- Environment variables protect sensitive information

## Database Models

### User Model
- Email
- Password (hashed)
- Created/Updated timestamps

### Application/Task Model
- Title
- Description
- Status
- User reference
- Created/Updated timestamps

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create a pull request

## Design Decisions

### 1. **MVC Architecture**
   - **Why**: Separates concerns into Models, Views (controllers), and Routes
   - **Benefit**: Makes code maintainable and scalable as the project grows

### 2. **JWT Authentication**
   - **Why**: Stateless authentication suitable for APIs and microservices
   - **Benefit**: No session management needed; tokens can be deployed across multiple servers

### 3. **MongoDB + Mongoose**
   - **Why**: Flexible schema and easy integration with Node.js
   - **Benefit**: NoSQL flexibility for rapid development; Mongoose provides schema validation

### 4. **Environment Variables with dotenv**
   - **Why**: Secure configuration management without hardcoding secrets
   - **Benefit**: Different configs for dev/staging/production; easy to manage API keys

### 5. **Groq AI Integration for JD Parsing**
   - **Why**: Leverage LLM for intelligent job description analysis instead of regex
   - **Benefit**: Better accuracy in extracting skills, requirements, and experience levels

### 6. **Middleware-Based Authentication**
   - **Why**: Centralized auth logic applied to protected routes
   - **Benefit**: Consistent security; public routes (auth, AI parse) can be accessed without JWT

### 7. **Separate Service Layer (ai.service.js)**
   - **Why**: Isolates business logic from controllers
   - **Benefit**: Reusable logic; easier testing and maintenance

### 8. **CORS Support**
   - **Why**: Enable frontend applications to communicate with this backend
   - **Benefit**: Prevents blocked requests from different origins

### 9. **bcryptjs for Password Hashing**
   - **Why**: Industry-standard library for secure password storage
   - **Benefit**: Passwords are one-way hashed; even if DB is compromised, passwords are protected

### 10. **Express.js Framework**
   - **Why**: Lightweight, flexible, and has large ecosystem
   - **Benefit**: Minimal setup with powerful routing and middleware support

## License

ISC

## Support

For issues or questions, please open an issue in the repository.

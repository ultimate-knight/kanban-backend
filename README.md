# AI-Assisted Job Application Tracker — Backend

## Tech
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT + bcryptjs
- OpenAI API for structured JD parsing and resume suggestions

## Environment variables
Create a `.env` file from `.env.example`.

```env
PORT=4589
MONGODB_URI=mongodb://127.0.0.1:27017/job-tracker
JWT_SECRET=replace_with_a_long_secret
OPENAI_API_KEY=replace_with_openai_key
OPENAI_MODEL=gpt-4.1-mini
CLIENT_URL=http://localhost:3000
```

## Run
```bash
npm install
npm run dev
```

## API routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/applications`
- `POST /api/applications`
- `GET /api/applications/:id`
- `PUT /api/applications/:id`
- `DELETE /api/applications/:id`
- `POST /api/ai/parse`

## Decisions
- AI logic lives in `services/ai.service.ts`.
- All application routes are scoped to the logged-in user.
- AI parsing uses strict structured JSON schema output for safer frontend autofill.

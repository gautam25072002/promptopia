# 🌟 Promptopia

A full-stack AI prompt sharing platform where users can discover, create, and share creative prompts. Built with Next.js 15, MongoDB, and NextAuth v5.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.18-47A248?style=flat&logo=mongodb&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-v5-purple?style=flat)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)

---

## What is this?

Promptopia is a community-driven platform for AI prompt enthusiasts. Users can sign in with Google or email credentials, share their favorite AI prompts, discover prompts from others, and like the ones they find useful.

---

## Features

- Google OAuth and credentials based authentication
- Create, edit and delete your own prompts
- Like and unlike prompts from other users
- Search prompts by tag, content or username
- View any user's profile and their prompts
- Fully responsive design

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Database | MongoDB + Mongoose |
| Auth | NextAuth v5 |
| Styling | Tailwind CSS v4 |
| Deployment | Vercel |

---

## Project Structure
```
promptopia/
├── src/
│   ├── actions/
│   │   ├── googleSignIn.js      # Google OAuth server action
│   │   └── register.js          # Register server action
│   ├── app/
│   │   ├── (auth)/              # Auth route group
│   │   ├── api/                 # API routes
│   │   ├── create-prompt/       # Create prompt page
│   │   ├── profile/             # User profile pages
│   │   ├── update-prompt/       # Edit prompt page
│   │   ├── utils/
│   │   │   └── db.js            # MongoDB connection
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.jsx             # Home page
│   ├── components/
│   │   ├── EditButton.jsx       # Edit prompt button
│   │   ├── Feed.jsx             # Prompts feed with search
│   │   ├── FormWrapper.jsx      # Auth form wrapper
│   │   ├── GoogleSignIn.jsx     # Google sign in button
│   │   ├── LikeButton.jsx       # Like/unlike functionality
│   │   ├── Logout.jsx           # Logout button
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Profile.jsx          # Profile component
│   │   ├── PromptCard.jsx       # Individual prompt card
│   │   ├── PromptCardList.jsx   # List of prompt cards
│   │   ├── PromptForm.jsx       # Create/edit prompt form
│   │   └── SubmitButton.jsx     # Form submit button
│   ├── models/
│   │   ├── post.js              # Prompt/post schema
│   │   └── user.js              # User schema
│   ├── auth.js                  # NextAuth v5 config
│   └── middleware.js            # Route protection
├── public/                      # Static assets
├── .env.local                   # Environment variables
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

---

## Database Schema
```
users
├── name
├── email (unique)
├── password (hashed with bcrypt)
└── image

posts
├── creator (ref → User)
├── prompt
├── tag
└── likes (array of User refs)
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/prompt` | Fetch all prompts |
| POST | `/api/prompt` | Create a new prompt |
| GET | `/api/prompt/[id]` | Get a single prompt |
| PATCH | `/api/prompt/[id]` | Update a prompt |
| DELETE | `/api/prompt/[id]` | Delete a prompt |
| POST | `/api/prompt/[id]/like` | Like or unlike a prompt |
| GET | `/api/users/[id]/posts` | Get all posts by a user |

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials

### Steps
```bash
git clone https://github.com/your-username/promptopia.git
cd promptopia
npm install
```

Create a `.env.local` file:
```env
AUTH_SECRET=your-generated-secret
AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGO_URI=your-mongodb-uri
```

Generate `AUTH_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run the dev server:
```bash
npm run dev
```

App runs at `http://localhost:3000`

---

## Deployment

Deployed on Vercel. Add all environment variables in Vercel project settings and set:
```env
AUTH_URL=https://your-vercel-url.vercel.app
```

---

## Author

**Gautam** — B.Tech Electrical Engineering, Delhi Technological University (2025)
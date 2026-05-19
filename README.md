# 🎯 AI-Powered Job Application Tracker

A full-stack web application to track job applications with AI-powered tools for resume analysis, cover letter generation, and interview coaching.

🌐 **Live Demo:** [job-tracker-chi-pink.vercel.app](https://job-tracker-chi-pink.vercel.app)

---

## ✨ Features

- **Job Application Board** — Track applications across Wishlist, Applied, Interview, Offer, and Rejected stages
- **Dashboard Analytics** — Visual stats showing total applications, response rate, and offer conversion
- **AI Resume Fit Analyzer** — Paste a job description and get a match score with improvement suggestions
- **AI Cover Letter Generator** — Generate tailored cover letters in seconds
- **AI Interview Coach** — Get role-specific interview questions with model answers
- **Google OAuth Login** — Secure authentication with your Google account
- **Persistent Storage** — All data saved to a real PostgreSQL database

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS |
| Backend | Next.js Server Actions, API Route Handlers |
| Database | PostgreSQL (Neon) + Prisma ORM |
| Auth | NextAuth.js with Google OAuth |
| AI | Google Gemini API |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database (free)
- A [Google Cloud](https://console.cloud.google.com) OAuth app
- A [Google AI Studio](https://aistudio.google.com) API key (free)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Nithiasrisaravanan/job--tracker-.git
cd job--tracker-
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="your-neon-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GEMINI_API_KEY="your-gemini-api-key"
```

4. **Push the database schema**

```bash
npx prisma db push
npx prisma generate
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

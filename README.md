# 📚 Book Catalog

A full-stack **Next.js + TypeScript** application for managing a book collection, with authentication and PostgreSQL database powered by Prisma ORM.

## 🚀 Features

- User authentication (NextAuth with credentials)
- Add, view, and delete books
- Access control — only logged-in users can add/delete
- Toast notifications for actions
- PostgreSQL + Prisma ORM

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes, NextAuth
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/book-catalog.git
   cd book-catalog
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   DATABASE_URL=your_postgres_connection_string
   NEXTAUTH_SECRET=your_random_secret
   ```
4. **Run project locally**
   ```bash
    npm run dev
   ```
